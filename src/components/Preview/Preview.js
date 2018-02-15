import React from 'react';
import SVGRenderer from '@od/react-preview/SVGRenderer';
import {Text, Path, Rect, Circle, Image} from '@od/react-preview/_objects';

class Preview extends React.Component {
    static defaultProps = {
        objectTypes: {
            'text': Text,
            'rectangle': Rect,
            'circle': Circle,
            'polygon': Path,
            'image': Image
        }
    };

    componentWillMount() {
        this.objectRefs = {};
    }

    render() {
        let {width, height, objects, objectTypes} = this.props;

        let style = {
            ...styles.container,
            ...this.props.style,
            width: width,
            height: height
        };

        let canvas = {
            width,
            height,
            canvasWidth: width,
            canvasHeight: height
        };

        return (
            <div className={'container'} style={style}>
                <SVGRenderer
                    width={width}
                    height={height}
                    objects={objects}
                    objectRefs={this.objectRefs}
                    objectTypes={objectTypes}
                    onRender={(ref) => this.svgElement = ref}
                    canvas={canvas} />
            </div>
        );
    }
}

const styles = {
    container: {
        position: "relative"
    }
};

export default Preview;
