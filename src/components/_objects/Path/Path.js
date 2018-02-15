import React from 'react';
import {modes} from '@od/react-preview/constants';
import Icon from '@od/react-preview/Icon';
import Vector from '@od/react-preview/_objects/Vector';
import BezierEditor from '@od/react-preview/_editors/BezierEditor';

export default class Path extends Vector {
    static meta = {
        initial: {
            fill: "#e3e3e3",
            closed: "false",
            rotate: 0,
            movex: 0,
            movey: 0,
            path: [],
            stroke: "gray",
            strokeWidth: 1
        },
        mode: modes.DRAW,
        icon: <Icon icon={'polygon'} size={30} />,
        editor: BezierEditor,
        initEditor: true
    };

    buildPath = (object) => {
        let {path} = object;

        let curves = path.map(({x1, y1, x2, y2, x, y}, i) => (
            `C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`
        ));

        let instructions = [
            `M ${object.movex} ${object.movey}`,
            ...curves
        ];

        if (object.closed) {
            instructions = [
                ...instructions, 'Z'
            ];
        }

        return instructions.join('\n');
    };

    getTransformMatrix = ({rotate, x, y, movex, movey}) => {
        return `
      translate(${x - movex} ${y - movey})
      rotate(${rotate} ${x} ${y})
    `;
    };

    render() {
        let {object} = this.props;
        let fill = (object.closed ? object.fill
            : "transparent");
        return (
            <path style={this.getStyle(object)}
                  {...this.getObjectAttributes()}
                  d={this.buildPath(object)}
                  fill={fill} />
        );
    }
}