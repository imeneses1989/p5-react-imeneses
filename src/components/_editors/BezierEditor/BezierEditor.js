/* eslint-disable no-unused-vars */
import React from 'react';

class BezierEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'source'
        }
    }

    componentWillMount(props) {
        let {object} = this.props;
        if (!object.path.length) {
            this.props.onUpdate({
                path: [
                    {x1: object.x, y1: object.y, x2: object.x, y2: object.y, x: object.x, y: object.y }
                ],
                movex: object.x,
                movey: object.y
            });
        } else {
            this.setState({
                mode: 'edit'
            });
        }
    }

    getMouseCoords = (event) => {
        let {object, offset} = this.props;
        return {
            x: event.clientX - offset.x - (object.x - object.movex),
            y: event.clientY - offset.y - (object.y - object.movey)
        };
    };

    getCurrentPath = () => {
        let {path} = this.props.object;
        return path[path.length - 1];
    };

    updatePath = (updates, index) => {
        let {path} = this.props.object;
        let current = path[index];

        this.props.onUpdate({
            path: [
                ...path.slice(0, index),
                {
                    ...current,
                    ...updates
                },
                ...path.slice(index + 1)
            ]
        });
    };

    updateCurrentPath = (updates, close=false) => {
        let {path} = this.props.object;
        let current = this.getCurrentPath();

        this.props.onUpdate({
            closed: close.toString(),
            path: [
                ...path.slice(0, path.length - 1),
                {
                    ...current,
                    ...updates
                }
            ]
        });
    };

    onMouseMove = (event) => {
        let {mode} = this.state;
        let currentPath = this.getCurrentPath();
        let mouse = this.getMouseCoords(event);
        let {object} = this.props;
        let {movex, movey} = object;
        let {x, y} = mouse;

        let snapToInitialVertex = (
            this.isCollides(movex, movey, x, y)
        );

        if (snapToInitialVertex) {
            x = movex;
            y = movey;
        }

        if (mode === 'source') {
            console.log("source");
            this.updateCurrentPath({
                x1: mouse.x,
                y1: mouse.y,
                x: mouse.x,
                y: mouse.y,
                x2: x,
                y2: y,
            });
        }

        if (mode === 'target') {
            console.log("target");
            this.updateCurrentPath({
                x2: x,
                y2: y,
                x: x,
                y: y
            })
        }

        if (mode === 'connect') {
            console.log("connect");
            this.updateCurrentPath({x, y})
        }

        if (mode === 'target' || mode === 'connect') {
            console.log("target, connect");
            this.setState({
                closePath: snapToInitialVertex
            });
        }

        if (mode === 'move') {
            console.log("move");
            let {movedPathIndex,
                movedTargetX,
                movedTargetY} = this.state;
            this.updatePath({
                [movedTargetX]: x,
                [movedTargetY]: y
            }, movedPathIndex);
        }

        if (mode === 'moveInitial') {
            console.log("moveInitial");
            this.props.onUpdate({
                movex: x,
                movey: y
            });
        }
    };

    isCollides = (x1, y1, x2, y2, radius=5) => {
        let xd = x1 - x2;
        let yd = y1 - y2;
        let wt = radius * 2;
        return (xd * xd + yd * yd <= wt * wt);
    };

    onMouseDown= (event) => {
        if (this.state.closePath) {
            return this.closePath();
        }

        if (event.target.tagName === 'svg') {
            return this.props.onClose();
        }

        let {mode} = this.state;

        if (mode === 'target') {
            this.setState({
                mode: 'connect'
            });
        }

    };

    onMouseUp = (event) => {
        let {mode} = this.state;
        let {path} = this.props.object;
        let mouse = this.getMouseCoords(event);
        let currentPath = this.getCurrentPath();

        if (this.state.closePath) {
            return this.closePath();
        }

        if (mode === 'source') {
            this.setState({
                mode: 'target'
            });
        }

        if (mode === 'connect') {
            this.setState({
                mode: 'target'
            });
            this.props.onUpdate({
                path: [
                    ...path,
                    {
                        x1: currentPath.x + (currentPath.x - currentPath.x2),
                        y1: currentPath.y + (currentPath.y - currentPath.y2),
                        x2: mouse.x,
                        y2: mouse.y,
                        x: mouse.x,
                        y: mouse.y
                    }
                ]
            });
        }

        if (mode === 'move' || mode === 'moveInitial') {
            this.setState({
                mode: 'edit'
            });
        }
    };

    getCurrentPoint = (pathIndex) => {
        let {state} = this;
        let {object} = this.props;
        if (pathIndex === 0) {
            return {x: object.movex, y: object.movey}
        } else {
            let path = state.path[pathIndex - 1];
            return {x: path.x, y: path.y};
        }
    };

    closePath = () => {
        this.setState({
            mode: null
        });

        this.props.onClose();

        this.updateCurrentPath({
            x: this.props.object.movex,
            y: this.props.object.movey
        }, true);
    };

    moveVertex = (pathIndex, targetX, targetY, event) => {
        event.preventDefault();

        if (this.state.mode !== 'edit') {
            return;
        }

        let mouse = this.getMouseCoords(event);

        this.setState({
            mode: 'move',
            movedPathIndex: pathIndex,
            movedTargetX: targetX,
            movedTargetY: targetY
        });
    };

    moveInitialVertex = (event) => {
        this.setState({
            mode: 'moveInitial'
        });
    };

    render() {
        let {object, width, height} = this.props;
        let {path} = object;
        let {state} = this;

        let {movex, movey, x, y} = object;

        let offsetX = x - movex,
            offsetY = y - movey;

        //Remove arrow function from inside render (Performance)
        return (
            <div className="canvas"
                 onMouseUp={this.onMouseUp.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}
                 onMouseDown={this.onMouseDown.bind(this)}>
                <svg style={{width, height}}>
                    <g transform={`translate(${offsetX} ${offsetY})
                         rotate(${object.rotate} ${object.x} ${object.y})`}>
                        {object.path.map(({x1, y1, x2, y2, x, y}, i) => (
                            <g key={i}>
                                {x2 && y2 && (
                                    <g>
                                        <line x1={x2} y1={y2}
                                              x2={x} y2={y}
                                              className="edge"
                                              onMouseDown={this.moveVertex.bind(this, i, 'x', 'y')}  />

                                        <circle r={4} cx={x2} cy={y2}
                                                className="vertex"
                                                onMouseDown={this.moveVertex.bind(this, i, 'x2', 'y2')} />

                                        <circle r={4} cx={x} cy={y}
                                                className="vertex"
                                                onMouseDown={this.moveVertex.bind(this, i, 'x', 'y')} />
                                    </g>
                                )}
                                {i === 0 && (
                                    <g>
                                        <line x1={movex} y1={movey}
                                              className="edge"
                                              onMouseDown={this.moveVertex.bind(this, i, 'x1', 'y1')}
                                              x2={x1} y2={y1} stroke="black" />

                                        <circle className="vertex" r={4} cx={x1} cy={y1}
                                                onMouseDown={this.moveVertex.bind(this, i, 'x1', 'y1')} />

                                        <circle r={4} cx={movex} cy={movey}
                                                className="vertex initialVertex" />
                                    </g>
                                )}
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        );
    }
}

export default BezierEditor;