import React from 'react';
import has from 'lodash/has';
import Panel from '@od/react-preview/_panels/Panel/Panel';
import PropertyGroup from '@od/react-preview/_panels/PropertyGroup';
import SwitchState from '@od/react-preview/_panels/SwitchState';
import Column from '@od/react-preview/_panels/Column';
import Icon from '@od/react-preview/Icon';

export default class TextPanel extends Panel {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    fontFamilies = [
        ['Helvetica', 'Helvetica, Arial, sans-serif'],
        ['Helvetica Neue', '"Helvetica Neue", Arial, sans-serif'],
        ['Georgia', 'Georgia, serif'],
        ['American Typewriter', 'AmericanTypewriter, Georgia, serif'],
        ['Monaco', 'Monaco, consolas, monospace'],
    ];

    render() {
        let {object} = this.props;
        return (
            <PropertyGroup showIf={has(object, 'text')}>
                <div className="columns">
                    <Column style={{marginRight: 10}}>
                        {has(object, 'fontWeight') &&
                        <SwitchState icon="format-bold"
                                     defaultValue={'normal'}
                                     nextState={'bold'}
                                     value={object.fontWeight}
                                     onChange={this.props.onChange.bind(this, 'fontWeight')} />}
                        {has(object, 'fontStyle') &&
                        <SwitchState icon="format-italic"
                                     defaultValue={'normal'}
                                     nextState={'italic'}
                                     value={object.fontStyle}
                                     onChange={this.props.onChange.bind(this, 'fontStyle')} />}
                        {has(object, 'textDecoration') &&
                        <SwitchState icon="format-underline"
                                     defaultValue={'none'}
                                     nextState={'underline'}
                                     value={object.textDecoration}
                                     onChange={this.props.onChange.bind(this, 'textDecoration')} />}
                    </Column>
                    <Column style={{"float": "left"}}>
                        {has(object, 'fontSize') &&
                        <input className="input-decorator integer-input" style={{width: 35}}
                               value={object.fontSize}
                               onChange={(e) => this.props.onChange('fontSize', e.target.value)} />}
                    </Column>
                    <Column style={{"float": "right", marginRight: 10}}>
                        <select className="select-decorator"
                                value={object.fontFamily}
                                onChange={(e) => this.props.onChange('fontFamily', e.target.value)}  >
                            {this.fontFamilies.map(([name, value]) =>
                                <option key={value} value={value}>{name}</option>)}
                        </select>
                    </Column>
                   {/* <Column style={{"float": "right", marginRight: 10}}>
                        <select className="select-decorator"
                                value={object.fontFamily}
                                onChange={(e) => this.props.onChange('fontFamily', e.target.value)}  >
                            {this.fontFamilies.map(([name, value]) =>
                                <option key={value} value={value}>{name}</option>)}
                        </select>
                    </Column>*/}
                    <div style={{marginTop: 25, paddingRight: 10, position: 'relative'}}>
                        <input className="input-decorator text-input"
                               onChange={(e) => this.props.onChange('text', e.target.value)}
                               value={object.text} />
                        <Icon icon="copy-icon" size="15"  style={{position: 'absolute', bottom: 1, right: 25}}
                              onClick={(e) => this.props.onClone(e, 'text')} viewbox="0 0 40 40"/>
                        <Icon icon="remove-icon"  style={{position: 'absolute', bottom: 1, right: 10}}
                              onClick={(e) => this.props.onRemove(e)} viewbox="0 0 30 30"/>
                    </div>

                </div>
            </PropertyGroup>
        );
    }
}