import React from 'react';
import Icon from '@od/react-preview/Icon';

class InsertMenu extends React.Component {

    render() {
        let {currentTool, tools} = this.props;
        let keys = Object.keys(tools);

        return (
            <div className="insert-menu" >
                <div className="main-icon" >
                    {currentTool
                        ? tools[currentTool].meta.icon
                        : <Icon icon={"add"} size={30} />}
                </div>
                <ul className="tool-box">
                    {keys.map((type, i) => (
                        <li className={"tool-box-item " + (currentTool === type && "current-toolbox-item")}
                            onMouseDown={this.props.onSelect.bind(this, type)}
                            key={i}>
                            {tools[type].meta.icon}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default InsertMenu;