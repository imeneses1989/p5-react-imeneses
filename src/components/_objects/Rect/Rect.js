/* eslint-disable no-unused-vars */
import React from 'react';
import {modes} from '@od/react-preview/constants';
import Icon from '@od/react-preview/Icon';
import Vector from '@od/react-preview/_objects/Vector';

export default class Rect extends Vector {
    static meta = {
        icon: <Icon icon={'rectangle'} size={30} />,
        initial: {
            width: 5,
            height: 5,
            strokeWidth: 0,
            fill: "blue",
            radius: 0,
            blendmode: "normal",
            rotate: 0
        },
        mode: modes.SCALE
    };

    render() {
        let {object, index} = this.props;
        return (
            <rect style={this.getStyle()}
                  {...this.getObjectAttributes()}
                  rx={object.radius}
                  width={object.width}
                  height={object.height} />
        );
    }
}