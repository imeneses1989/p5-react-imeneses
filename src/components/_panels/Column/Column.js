import React from 'react';

const Column = ({showIf=true, ...props}) => {
    if (!showIf) {
        return <div className="empty" />;
    }

    return (
        <div className="column" style={props.style}>
            {props.children ||
            <input className="input-decorator integer-input" value={props.value}
                   onChange={(e) => props.onChange(e.target.value)} />
            }
            {props.label &&
            <div className="input-helper">{props.label}</div>}
        </div>
    );
};

export default Column;