/* eslint-disable no-unused-vars */
import React from 'react';
import {modes} from '@od/react-preview/constants';
import {SizePanel, TextPanel, StylePanel, ArrangePanel, ImagePanel} from '@od/react-preview/_panels';


export default class Vector extends React.Component {
    static panels = [
        SizePanel,
        TextPanel,
        StylePanel,
        ArrangePanel,
        ImagePanel
    ];

    getStyle = () => {
        let {object} = this.props;
        return {
            mixblendmode: object.blendmode
        }
    };

    getTransformMatrix = ({rotate, x, y, width, height}) => {
        if (rotate) {
            let centerX = width / 2 + x;
            let centerY = height / 2 + y;
            return `rotate(${rotate} ${centerX} ${centerY})`;
        }
    };

    getObjectAttributes = () => {
        let {object, onRender, ...rest} = this.props;
        let obj = Object.assign({}, object);
        delete obj.rotate;
        return {
            ...obj,
            transform: this.getTransformMatrix(object),
            ref: onRender,
            ...rest
        };
    }
}
