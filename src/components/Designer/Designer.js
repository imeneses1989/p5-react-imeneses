/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import React from 'react';
import has from 'lodash/has';
import mapValues from 'lodash/mapValues';
import {HotKeys} from 'react-hotkeys';
import InsertMenu from '@od/react-preview/_panels/InsertMenu';
import SVGRenderer from '@od/react-preview/SVGRenderer';
import {modes} from '@od/react-preview/constants';
import Handler from '@od/react-preview/Handler';
import {Dragger, Rotator, Scaler} from '@od/react-preview/_actions';
import {Text, Path, Rect, Circle, Image} from '@od/react-preview/_objects';
import PanelList from '@od/react-preview/_panels/PanelList';

import SafeZone from '@od/react-preview/SafeZone';
import {DefaultFonts, Fonts} from '@od/react-preview/Fonts';
let opentype = require('opentype.js');

class Designer extends React.Component {
    static defaultProps = {
        objectTypes: {
            'text': Text,
            'rectangle': Rect,
            'circle': Circle,
            'polygon': Path,
            'image': Image
        },
        snapToGrid: 1,
        svgStyle: {},
        insertMenu: InsertMenu,
        safeZone: {
            offset: {left: 10, right: 10, top: 10, bottom: 10},
            strokeStyle: {stroke: '#006600', strokeWidth: 2}
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            mode: modes.FREE,
            handler: {
                top: 200,
                left: 200,
                width: 50,
                height: 50,
                rotate: 0
            },
            currentObjectIndex: null,
            selectedObjectIndex: null,
            textObjects: [],
            selectedTool: null,
            displaySafeZoneWarning: false
        };

        //Initializing fonts
        this.defaultFonts = DefaultFonts;
        if(this.props.fonts) {
            this.defaultFonts.setFonts(this.props.fonts);
        }
    }

    keyMap = {
        'removeObject': ['del', 'backspace'],
        'moveLeft': ['left', 'shift+left'],
        'moveRight': ['right', 'shift+right'],
        'moveUp': ['up', 'shift+up'],
        'moveDown': ['down', 'shift+down'],
        'closePath': ['enter']
    };

    componentWillMount() {
        this.objectRefs = {};
    }

    generateUUID = () => {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c==='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    showHandler = (index) => {
        let {mode} = this.state;
        let {objects} = this.props;
        let object = objects[index];

        if (mode !== modes.FREE || object.isclosed) {
            return;
        }

        this.updateHandler(index, object);
        this.setState({
            currentObjectIndex: index,
            showHandler: true
        });
    };

    hideHandler = () => {
        let {mode} = this.state;
        if (mode === modes.FREE) {
            this.setState({
                showHandler: false
            });
        }
    };

    getStartPointBundle = (event, object) => {
        let {currentObjectIndex} = this.state;
        let {objects} = this.props;
        let mouse = this.getMouseCoords(event);
        object = object || objects[currentObjectIndex];
        return {
            clientX: mouse.x,
            clientY: mouse.y,
            objectX: object.x,
            objectY: object.y,
            width: object.width,
            height: object.height,
            rotate: object.rotate
        };
    };

    startDrag = (mode, event) => {
        let {currentObjectIndex} = this.state;
        this.setState({
            mode: mode,
            startPoint: this.getStartPointBundle(event),
            selectedObjectIndex: currentObjectIndex
        });
    };

    resetSelection = () => {
        this.setState({
            selectedObjectIndex: null
        });
    };

    newObject = (event) => {

        let {mode, selectedTool} = this.state;

        this.resetSelection(event);

        if (mode !== modes.DRAW) {
            return;
        }

        let {meta} = this.getObjectComponent(selectedTool);
        let mouse = this.getMouseCoords(event);

        let {objects, onUpdate} = this.props;
        let object = {
            ...meta.initial,
            type: selectedTool,
            x: mouse.x,
            y: mouse.y,
            uuid: this.generateUUID()
        };

        onUpdate([...objects, object]);

        let textObj= null;
        if(selectedTool === 'text') {
            textObj = Object.assign({}, object);
            textObj['index'] = objects.length;
        }

        this.setState({
            currentObjectIndex: objects.length,
            selectedObjectIndex: objects.length,
            startPoint: this.getStartPointBundle(event, object),
            mode: meta.initEditor ? modes.EDIT_OBJECT : meta.mode,
            selectedTool: null,
            textObjects: textObj ? [...this.state.textObjects, textObj] : this.state.textObjects
        });

    };

    updatePath = (object) => {
        let {path} = object;
        let diffX = object.x - object.movex;
        let diffY = object.y - object.movey;

        let newPath = path.map(({x1, y1, x2, y2, x, y}) => ({
            x1: diffX + x1,
            y1: diffY + y1,
            x2: diffX + x2,
            y2: diffY + y2,
            x: diffX + x,
            y: diffY + y
        }));

        return {
            ...object,
            path: newPath,
            movex: object.x,
            movey: object.y
        };
    };

    updateObject = (objectIndex, changes, updatePath) => {
        let {objects, onUpdate} = this.props;

        onUpdate(objects.map((object, index) => {
            if (index === objectIndex) {
                let newObject = {
                    ...object,
                    ...changes
                };
                return updatePath
                    ? this.updatePath(newObject)
                    : newObject;
            } else {
                return object;
            }
        }));
    };

    getOffset = () => {
        let parent = this.svgElement.getBoundingClientRect();
        let {canvasWidth, canvasHeight} = this.getCanvas();
        return {
            x: parent.left,
            y: parent.top,
            width: canvasWidth,
            height: canvasHeight
        };
    };

    applyOffset = (bundle) => {
        let offset = this.getOffset();
        return {
            ...bundle,
            x: bundle.x - offset.x,
            y: bundle.y - offset.y
        }
    };

    updateHandler = (index, object) => {
        let target = this.objectRefs[index];
        let bbox = target.getBoundingClientRect();
        let {canvasOffsetX, canvasOffsetY} = this.getCanvas();

        let handler = {
            ...this.state.handler,
            width: object.width || bbox.width,
            height: object.height || bbox.height,
            top: object.y + canvasOffsetY,
            left: object.x + canvasOffsetX,
            rotate: object.rotate
        };

        if (!object.width || !object.height) {
            let offset = this.getOffset();
            handler = {
                ...handler,
                left: bbox.left - offset.x,
                top: bbox.top - offset.y
            };
        }

        this.setState({
            handler: handler
        });
    };

    snapCoordinates = ({x, y}) => {
        let {snapToGrid} = this.props;
        return {
            x: x - (x % snapToGrid),
            y: y - (y % snapToGrid)
        };
    };

    getMouseCoords = ({clientX, clientY}) => {
        let coords = this.applyOffset({
            x: clientX,
            y: clientY
        });

        return this.snapCoordinates(coords);
    };

    onDrag = (event) => {
        let {currentObjectIndex, startPoint, mode} = this.state;
        let {objects} = this.props;
        let object = objects[currentObjectIndex];

        let mouse = this.getMouseCoords(event);

        let map = {
            [modes.SCALE]: Scaler,
            [modes.ROTATE]: Rotator,
            [modes.DRAG]: Dragger
        };

        let action = map[mode];

        if (action && !object.isclosed) {
            let newObject = action({
                object,
                startPoint,
                mouse,
                objectIndex: currentObjectIndex,
                objectRefs: this.objectRefs
            });

            this.updateObject(currentObjectIndex, newObject);
            this.updateHandler(currentObjectIndex, newObject);
        }

        if (currentObjectIndex !== null) {
            this.detectOverlappedObjects(event);
            this.validateSafeZone();
        }
    };

    validateSafeZone = () => {
        let {currentObjectIndex} = this.state;
        let {objects, safeZone, width, height} = this.props;
        let currentObject = objects[currentObjectIndex];
        let currentRect = this.objectRefs[currentObjectIndex].getBoundingClientRect();

        if( (currentObject.x < safeZone.offset.left) ||
            (currentObject.x + currentRect.width > (width - safeZone.offset.right)) ||
            ((currentObject.y) < safeZone.offset.top) ||
            (currentObject.y + currentRect.height> height - safeZone.offset.bottom)) {
            this.setState({displaySafeZoneWarning: true});
        } else if(this.state.displaySafeZoneWarning){
            this.setState({displaySafeZoneWarning: false});
        }
    };

    detectOverlappedObjects = (event) => {
        let {currentObjectIndex} = this.state;
        let {objects} = this.props;
        let mouse = this.getMouseCoords(event);

        let refs = this.objectRefs,
            keys = Object.keys(refs),
            offset = this.getOffset();

        let currentRect = (refs[currentObjectIndex]
            .getBoundingClientRect());

        keys.filter(
            (object, index) => index !== currentObjectIndex
        ).forEach((key) => {
            let rect = refs[key].getBoundingClientRect();
            let {left, top, width, height} = rect;

            left -= offset.x;
            top -= offset.y;

            let isOverlapped = (
                mouse.x > left && mouse.x < left + width &&
                mouse.y > top && mouse.y < top + height &&
                currentRect.width > width &&
                currentRect.height > height
            );

            if (isOverlapped) {
                this.showHandler(Number(key));
            }
        });
    };

    stopDrag = () => {
        let {mode} = this.state;

        if ([modes.DRAG,
                modes.ROTATE,
                modes.SCALE].includes(mode)) {
            this.setState({
                mode: modes.FREE
            });
        }
    };

    showEditor = () => {
        let {selectedObjectIndex} = this.state;

        let {objects} = this.props,
            currentObject = objects[selectedObjectIndex],
            objectComponent = this.getObjectComponent(currentObject.type);

        if (objectComponent.meta.editor) {
            this.setState({
                mode: modes.EDIT_OBJECT,
                showHandler: false
            });
        }
    };

    getObjectComponent = (type) => {
        let {objectTypes} = this.props;
        return objectTypes[type];
    };

    getCanvas = () => {
        let {width, height} = this.props;
        let {
            canvasWidth=width,
            canvasHeight=height
        } = this.props;
        return {
            width, height, canvasWidth, canvasHeight,
            canvasOffsetX: (canvasWidth - width) / 2,
            canvasOffsetY: (canvasHeight - height) / 2
        };
    };

    getObjectsByType = (type, objects) => {
       return objects.filter((object) => {return object.type === type});
    };

    renderSVG = () => {
        let canvas = this.getCanvas();
        let {width, height, canvasOffsetX, canvasOffsetY} = canvas;
        let {background, objects, svgStyle, objectTypes} = this.props;

        return (
            <SVGRenderer
                background={background}
                width={width}
                canvas={canvas}
                height={height}
                objects={objects}
                onMouseOver={this.showHandler.bind(this)}
                objectTypes={objectTypes}
                objectRefs={this.objectRefs}
                onRender={(ref) => this.svgElement = ref}
                onMouseDown={this.newObject.bind(this)} >
                <Fonts textObjects={this.getObjectsByType('text', objects)} fonts={this.defaultFonts.getFonts()}/>
                <SafeZone width={width}
                          height={height}
                          offset={this.props.safeZone.offset}
                          strokestyle={this.props.safeZone.strokeStyle}
                          onRender={(ref) => this.safeZoneElement = ref}/>
            </SVGRenderer>
        );
    };

    getSVGShapeText = () => {
        opentype.load(this.state.fonts[0].url, function(err, font) {
            if (err) {
                alert('Font could not be loaded: ' + err);
            } else {
                // Construct a Path object containing the letter shapes of the given text.
                // The other parameters are x, y and fontSize.
                // Note that y is the position of the baseline.
                let path = font.getPath('Hello, World!', 0, 150, 72);
                // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).

                this.setState({commands: path.commands});

            }
        }.bind(this));
    };

    getSVGElement = () => {
        let sbgElement = this.svgElement;
        let safeZoneObj = sbgElement.getElementById('svgSafeZone');
        sbgElement.removeChild(safeZoneObj);
        return sbgElement;
    };

    selectTool = (tool) => {
        this.setState({
            selectedTool: tool,
            mode: modes.DRAW,
            currentObjectIndex: null,
            showHandler: false,
            handler: null
        });
    };

    handleObjectChange = (key, value) => {
        let {selectedObjectIndex} = this.state;
        this.updateObject(selectedObjectIndex, {
            [key]: value
        });
    };

    copyObject = (event) => {
        event.preventDefault();
        let {objects, onUpdate} = this.props;
        let {selectedObjectIndex} = this.state;
        let object = Object.assign({},  objects[selectedObjectIndex]);
        object.y = object.y + 15;

        onUpdate([...objects, object]);
        this.setState({
            currentObjectIndex: objects.length,
            selectedObjectIndex: objects.length,
            startPoint: this.getStartPointBundle(event, object),
            mode: modes.FREE,
            selectedTool: null
        });

    };

    handleArrange = (arrange)  => {
        let {selectedObjectIndex} = this.state;
        let {objects} = this.props;
        let object = objects[selectedObjectIndex];

        let arrangers = {
            'front': (rest, object) => ([[...rest, object], rest.length]),
            'back': (rest, object) => ([[object, ...rest], 0])
        };

        let rest = objects.filter(
            (object, index) =>
            selectedObjectIndex !== index
        );

        this.setState({
            selectedObjectIndex: null
        }, () => {

            let arranger = arrangers[arrange];
            let [arranged, newIndex] = arranger(rest, object);
            this.props.onUpdate(arranged);
            this.setState({
                selectedObjectIndex: newIndex
            });
        });
    };

    removeCurrent = (e) => {
        e && e.preventDefault();
        let {selectedObjectIndex} = this.state;
        let {objects} = this.props;

        let rest = objects.filter(
            (object, index) =>
            selectedObjectIndex !== index
        );

        this.setState({
            currentObjectIndex: null,
            selectedObjectIndex: null,
            showHandler: false,
            handler: null
        }, () => {
            this.objectRefs = {};
            this.props.onUpdate(rest);
        });
    };

    moveSelectedObject = (attr, points, event, key) => {
        let {selectedObjectIndex} = this.state;
        let {objects} = this.props;
        let object = objects[selectedObjectIndex];

        if (key.startsWith('shift')) {
            points *= 10;
        }

        let changes = {
            ...object,
            [attr]: object[attr] + points
        };

        this.updateObject(selectedObjectIndex, changes);
        this.updateHandler(selectedObjectIndex, changes);
    };

    getKeymapHandlers = () => {
        let handlers = {
            removeObject: this.removeCurrent.bind(this),
            moveLeft: this.moveSelectedObject.bind(this, 'x', -1),
            moveRight: this.moveSelectedObject.bind(this, 'x', 1),
            moveUp: this.moveSelectedObject.bind(this, 'y', -1),
            moveDown: this.moveSelectedObject.bind(this, 'y', 1),
            closePath: () => this.setState({mode: modes.FREE})
        };

        return mapValues(handlers, (handler) => (event, key) => {
            if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                event.preventDefault();
                handler(event, key);
            }
        });
    };

    render() {
        let {showHandler, handler, mode,
            selectedObjectIndex, selectedTool} = this.state;

        let {
            objects,
            objectTypes,
            insertMenu: InsertMenuComponent,
            background
        } = this.props;

        let currentObject = objects[selectedObjectIndex],
            isEditMode = mode === modes.EDIT_OBJECT,
            showPropertyPanel = selectedObjectIndex !== null;

        let {width, height, canvasWidth, canvasHeight} = this.getCanvas();

        let objectComponent, objectWithInitial, ObjectEditor;
        if (currentObject) {
            objectComponent = this.getObjectComponent(currentObject.type);
            objectWithInitial = {
                ...objectComponent.meta.initial,
                ...currentObject
            };

            ObjectEditor = objectComponent.meta.editor;
        }

        return (
            <HotKeys
                keyMap={this.keyMap}
                style={styles.keyboardManager}
                handlers={this.getKeymapHandlers()}>
                <div style={{height: 20}}>
                    {this.state.displaySafeZoneWarning &&
                        <span>NOTICE: Content is outside the printable area! Adjust your content so that it is inside the safe zone.</span>
                    }
                </div>

                <div className={'container'}
                     style={{
                         ...styles.container,
                         ...this.props.style,
                         width: canvasWidth,
                         height: canvasHeight
                     }}
                     onMouseMove={this.onDrag}
                     onMouseUp={this.stopDrag}>

                    {isEditMode && ObjectEditor && (
                        <ObjectEditor object={currentObject}
                                      offset={this.getOffset()}
                                      onUpdate={(object) =>
                                          this.updateObject(selectedObjectIndex, object)}
                                      onClose={() => this.setState({mode: modes.FREE})}
                                      onChange={this.handleObjectChange}
                                      width={width}
                                      height={height} />)}

                    {showHandler && (
                        <Handler
                            boundingBox={handler}
                            canResize={has(currentObject, 'width') ||
                            has(currentObject, 'height')}
                            canRotate={has(currentObject, 'rotate')}
                            isIncrease={!has(currentObject, 'height')}
                            onMouseLeave={this.hideHandler}
                            onDoubleClick={this.showEditor}
                            onDrag={this.startDrag.bind(this, modes.DRAG)}
                            onResize={this.startDrag.bind(this, modes.SCALE)}
                            onRotate={this.startDrag.bind(this, modes.ROTATE)}
                            onIncrease={this.startDrag.bind(this, modes.INCREASE)}/> )}

                    {InsertMenuComponent && (
                        <InsertMenuComponent tools={objectTypes}
                                             currentTool={selectedTool}
                                             onSelect={this.selectTool} />
                    )}

                    <div style={{...background || styles.grid}}>
                        {this.renderSVG()}
                    </div>

                    {showPropertyPanel && (
                        <PanelList
                            id={this.props.id}
                            offset={this.getOffset()}
                            object={objectWithInitial}
                            onArrange={this.handleArrange}
                            onChange={this.handleObjectChange}
                            onRemove= {this.removeCurrent}
                            onClone= {this.copyObject}
                            objectComponent={objectComponent} />
                    )}
                </div>
            </HotKeys>
        );
    }
}

export const styles = {
    container: {
        position: 'relative'
    },
    keyboardManager: {
        outline: 'none'
    },
    grid: {
        backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5'
        + 'vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0'
        + 'PSIyMCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9I'
        + 'iNGN0Y3RjciPjwvcmVjdD4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIG'
        + 'ZpbGw9IiNGN0Y3RjciPjwvcmVjdD4KPC9zdmc+)',
        backgroundSize: "auto"
    }
}

export default Designer;