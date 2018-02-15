/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import ColorPicker from 'react-color';

class ColorInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            x: 0,
            y: 0
        }
    }

    toggleVisibility = (event) => {
        if (event.preventDefault) {
            event.preventDefault();
            let rect = event.target.getBoundingClientRect();
            this.setState({
                x: rect.left,
                y: rect.top
            });
        }

        let {show} = this.state;
        this.setState({
            show: !show
        })
    };

    handleChange = (color) => {
        let {r, g, b, a} = color.rgb;
        this.props.onChange(`rgba(${r}, ${g}, ${b}, ${a})`);
    };

    render() {
        let {show, x, y} = this.state;
        let {value} = this.props;

        let position = {
            position: "fixed",
            left: x + 3,
            top: y - 2
        };

        return (
           <div>
               { this.state.show ?
                   <div style={position}><ColorPicker
                   color={value}
                   onChange={this.handleChange.bind(this)}
                   onClose={this.toggleVisibility.bind(this)}
                   type="chrome" /> </div> : null }
               <a href="#"
                   className="color-input"
                   onClick={this.toggleVisibility.bind(this)}>
                    <span className="color" style={{backgroundColor: value}} />
                </a>
            </div>
        );
    }
}

export default ColorInput;