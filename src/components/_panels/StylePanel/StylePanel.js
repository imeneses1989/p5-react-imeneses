import React from 'react';
import has from 'lodash/has';
import Panel from '@od/react-preview/_panels/Panel/Panel';
import PropertyGroup from '@od/react-preview/_panels/PropertyGroup';
import Columns from '@od/react-preview/_panels/Columns';
import Column from '@od/react-preview/_panels/Column';
import ColorInput from '@od/react-preview/_panels/ColorInput';

export default class StylePanel extends Panel {
    modes = [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity'
    ];

    render() {
        let {object} = this.props;
        return (
            <PropertyGroup>
                <Columns label="Fill" showIf={has(object, 'fill')}>
                    <Column>
                        <ColorInput value={object.fill}
                                    onChange={this.props.onChange.bind(this, 'fill')} />
                    </Column>
                </Columns>
                <Columns label="Stroke" showIf={has(object, 'stroke')}>
                    <Column>
                        <ColorInput value={object.stroke}
                                    onChange={this.props.onChange.bind(this, 'stroke')} />
                    </Column>
                    <Column label="width">
                        <input className="input-decorator integer-input" style={{width: 30}}
                               onChange={(e) => this.props.onChange('strokeWidth', e.target.value)}
                               value={object.strokeWidth} />
                    </Column>
                    <Column showIf={has(object, 'radius')} label="radius">
                        <input className="input-decorator integer-input" style={{width: 30}}
                               onChange={(e) => this.props.onChange('radius', e.target.value)}
                               value={object.radius} />
                    </Column>
                </Columns>
                <Columns label="Blending">
                    <Column>
                        <select className="select-decorator"
                                value={object.blendmode}
                                onChange={(e) => this.props.onChange('blendmode', e.target.value)}>
                            {this.modes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                        </select>
                    </Column>
                </Columns>
            </PropertyGroup>
        );
    }
}