import React from 'react';

class SafeZone extends React.Component {
    render() {
        let {width, height, strokestyle, offset, onRender} = this.props;

        return (
            <g id="svgSafeZone" ref={onRender}>
                <line id="top-line" strokeDasharray="1, 5" x1={offset.left} y1={offset.top} x2={width - offset.right} y2={offset.top}
                      style={strokestyle}/>
                <line id="bottom-line" strokeDasharray="1, 5" x1={offset.left} y1={height - offset.bottom} x2={width - offset.right} y2={height - offset.bottom}
                      style={strokestyle}/>
                <line id="left-line" strokeDasharray="1, 5" x1={offset.left} y1={offset.top} x2={offset.left} y2={height - offset.bottom}
                      style={strokestyle}/>
                <line id="right-line" strokeDasharray="1, 5" x1={width - offset.right} y1={offset.top} x2={width - offset.right} y2={height - offset.bottom}
                      style={strokestyle}/>
            </g>
        );
    }
}

export default SafeZone;
