import React from 'react';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'source',
            text: this.props.object.text
        }
    }

    componentWillMount() {
        this.props.onChange('text', '');
    }

    componentDidMount() {
        this.textArea.focus();
        let txtLength = this.props.object.text.length;
        this.textArea.setSelectionRange(txtLength, txtLength);
    }

    onFocusOut = () => {
        this.props.onChange('text', this.textArea.value);
        this.props.onClose();
    };

    updateState = (textValue) => {
        this.setState({text: textValue});
    };

    render() {
        let {object, width, height} = this.props;
        let styles = {
            fontSize: parseInt(object.fontSize, 10),
            height: 'auto',
            fontFamily: object.fontFamily,
            fontWeight: object.fontWeight,
            fontStyle: object.fontStyle,
            textDecoration: object.textDecoration,
            color: object.fill,
            position: "absolute",
            left: object.x, top: object.y - (object.fontSize / 2),
            border: 'none',
            background: 'white',
            width: width - object.x,
            wordWrap: 'break-word',
            whiteSpace: 'pre-line'
        };

        return (
            <div className="canvas"
                 onKeyPress={this.onKeyPress}>
                <svg style={{width, height}}></svg>
                <textarea rows="4" cols="50"
                          onChange={(e) => this.updateState(e.target.value)}
                          onBlur={this.onFocusOut}
                          ref={(textarea) => {this.textArea = textarea}}
                          value={this.state.text} style={styles}>
                </textarea>
            </div>
        );

    };

}

export default TextEditor;