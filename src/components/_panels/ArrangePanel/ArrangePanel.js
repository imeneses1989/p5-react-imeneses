/* eslint-disable no-unused-vars */
import React from 'react';
import Icon from '@od/react-preview/Icon';
import Panel from '@od/react-preview/_panels/Panel/Panel';
import {PropertyGroup, Button, Columns, Column} from '@od/react-preview/_panels';

class ArrangePanel extends Panel {
    render() {
        let {object} = this.props;
        return (
            <PropertyGroup>
                <Columns label="Arrange">
                    <Column>
                        <Button onClick={this.props.onArrange.bind(this, 'back')}>
                            <Icon icon="send-to-back" />
                            <span>send to back</span>
                        </Button>
                        <Button onClick={this.props.onArrange.bind(this, 'front')}>
                            <Icon icon="bring-to-front" />
                            <span>bring to front</span>
                        </Button>
                    </Column>
                </Columns>
            </PropertyGroup>
        );
    }
}

export default ArrangePanel;
