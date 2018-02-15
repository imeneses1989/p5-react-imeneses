import React from 'react';

const PropertyGroup = ({showIf=true, ...props}) => {
    if (!showIf) {
        return <div className="empty" />;
    }
    return (
        <div className="property-group">
            {props.children}
        </div>
    );
};

export default PropertyGroup;