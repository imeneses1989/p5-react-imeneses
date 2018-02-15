import React from 'react';

function ScaleAnchor(props) {
    let {boundingBox} = props;
    let style = {
        marginTop: boundingBox.height - 4,
        marginLeft: boundingBox.width - 4
    };
    return (
        <div style={style}
             className='resize-anchor anchor scale-anchor'
             onMouseDown={props.onMouseDown} />
    );
};

function RotateAnchor(props) {
    let style = {
        marginLeft: props.boundingBox.width - 3
    };
    return (
        <div style={style}
             className={'rotate-anchor anchor rotate-anchor'}
             onMouseDown={props.onMouseDown} />
    )
};

class Handler extends React.Component {
    onMouseDown = (event) => {
        // event.preventDefault();

        if (event.target.classList.contains('handler')) {
            this.props.onDrag(event);
        }
    };

    render() {
        let {props} = this;
        let {boundingBox} = props;

        let handlerStyle = {
            ...styles.handler,
            ...boundingBox,
            left: boundingBox.left - 2,
            top: boundingBox.top - 2,
            transform: `rotate(${boundingBox.rotate}deg)`
        };

        return (
            <div className={'handler'}
                 style={handlerStyle}
                 onMouseLeave={props.onMouseLeave}
                 onDoubleClick={props.onDoubleClick}
                 onMouseDown={this.onMouseDown.bind(this)}>
                {props.canRotate &&
                <RotateAnchor onMouseDown={props.onRotate}
                              boundingBox={boundingBox} />}
                {props.canResize &&
                <ScaleAnchor onMouseDown={props.onResize}
                             boundingBox={boundingBox} />}
            </div>
        );
    }
}

const styles = {
    handler: {
        'position': 'absolute',
        'border': '2px solid #dedede',
        'zIndex': 999999
    }
};

export default Handler;