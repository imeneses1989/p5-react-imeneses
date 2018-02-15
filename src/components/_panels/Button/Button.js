/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';

const Button = ({onClick, ...props}) => {
    let _onClick = (e, ...args) => {
        e.preventDefault();
        onClick(...args);
    }
    return (
        <a href="#" className="button-decorator" onClick={_onClick}>
            {props.children}
        </a>
    );
}

export default Button;
