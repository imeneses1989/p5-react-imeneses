/* eslint-disable no-unused-vars */
import React from 'react';
import {modes} from '@od/react-preview/constants';
import Icon from '@od/react-preview/Icon';
import Vector from '@od/react-preview/_objects/Vector';

export default class Circle extends Vector {
    static meta = {
        icon: <Icon icon={'circle'} size={30} />,
        initial: {
            width: 5,
            height: 5,
            rotate: 0,
            fill: "yellow",
            strokeWidth: 0,
            blendmode: "normal"
        },
        mode: modes.SCALE
    };

    render() {
        let {object, index} = this.props;
        return (
            <ellipse style={this.getStyle()}
                     {...this.getObjectAttributes()}
                     rx={object.width / 2}
                     ry={object.height / 2}
                     cx={object.x + object.width / 2}
                     cy={object.y + object.height / 2} />
        );
    }
}
