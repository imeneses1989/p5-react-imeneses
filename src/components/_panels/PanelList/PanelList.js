/* eslint-disable no-unused-vars */
import React from 'react';
import {Portal} from 'react-portal';
import Panel from '@od/react-preview/_panels/Panel';

class PanelList extends React.Component {
    render() {
        let {offset, objectComponent, id} = this.props;
        let style = {
            left: offset.width + offset.x,
            top: offset.y + window.scrollY,
        };
        return (
            <Portal closeOnEsc closeOnOutsideClick isOpened={true}>
                <div className="property-panel" style={style}>
                    {objectComponent.panels.map((Panel, i) => <Panel id={id} key={i} {...this.props} />)}
                </div>
            </Portal>
        );
    }
};

export default PanelList;
