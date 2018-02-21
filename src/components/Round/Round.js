import React from 'react';

let Round = (props) => {
    let {number, precision} = props;
    let factor = Math.pow(10, precision);
    let roundedNumber = Math.round(number * factor) / factor;

    return (
        <span style={props.styles} className={props.className}>{roundedNumber}</span>
    );
};
export default Round;
