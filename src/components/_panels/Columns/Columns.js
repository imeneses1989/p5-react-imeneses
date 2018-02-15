import React from 'react';

const Columns = ({showIf=true, ...props}) => {
    if (!showIf) {
        return <div className="empty"/>;
    }
    return (
        <div className="columns">
            <div className="panel-title">{props.label}</div>
            {props.children}
        </div>
    )
};

export default Columns;


