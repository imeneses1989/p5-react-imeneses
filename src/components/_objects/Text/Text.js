/* eslint-disable no-unused-vars */
import React from 'react';
import {modes} from '@od/react-preview/constants';
import Icon from '@od/react-preview/Icon';
import Vector from '@od/react-preview/_objects/Vector';
import TextEditor from '@od/react-preview/_editors/TextEditor';

export default class Text extends Vector {
    static meta = {
        icon: <Icon icon={'text'} size={30} />,
        initial: {
            text: "Hello CPD!",
            rotate: 0,
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            fill: "black",
            fontSize: 50,
            fontFamily: "Helvetica",
            lineheight: 1,
            width: 250,
            dominantBaseline: "hanging"
        },
        mode: modes.FREE,
        editor: TextEditor,
        initEditor: false,
        lines: []
    };
    constructor(props) {
        super(props);
        this.state = {
            lines: [],
            text: ''
        }
    }

    componentWillMount() {
       this.getLines();
    }

    componentDidUpdate(nextProps) {
        if (this.props.children !== nextProps.children) {
            const { wordsWithComputedWidth, spaceWidth } = this.calculateWordWidths();
            this.wordsWithComputedWidth = wordsWithComputedWidth;
            this.spaceWidth = spaceWidth;
        }

        const lines = this.calculateLines(this.wordsWithComputedWidth, this.spaceWidth, this.props.object.width);
        const newLineAdded = this.state.lines.length !== lines.length;
        const wordMoved = this.state.lines.some((line, index) => line.length !== lines[index].length);
        // Only update if number of lines or length of any lines change
        if (newLineAdded || wordMoved) {
            this.setState({ lines: lines })
        }
    }

    componentWillReceiveProps(nextProps) {

        if((this.props.object.text !== nextProps.object.text) || (this.props.object.width !== nextProps.object.width)) {
            this.getLines(nextProps.object.text);
        }
    }

    getLines = (newText) => {
        const textToUse =  newText || this.props.object.text;
        const { wordsWithComputedWidth, spaceWidth } = this.calculateWordWidths(textToUse);
        this.wordsWithComputedWidth = wordsWithComputedWidth;
        this.spaceWidth = spaceWidth;
        const lines = this.calculateLines(this.wordsWithComputedWidth, this.spaceWidth, this.props.object.width);
        this.setState({ lines: lines, text: textToUse});
     };

    getStyles = () => {
        let {object} = this.props;
        return {
            ...this.getStyle(),
            dominantBaseline: "hanging",
            fontWeight: object.fontWeight,
            fontStyle: object.fontStyle,
            textDecoration: object.textDecoration,
            mixblendmode: object.blendmode,
            WebkitUserSelect: "none"
        };
    };

    getTransformMatrix = ({rotate, x, y}) => {
        if(rotate) {
            return `rotate(${rotate} ${x}, ${y})`;
        }
    };

    calculateWordWidths(textToSplit) {
        const words = textToSplit.split(/\s+/);
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        let styles= {
            ...this.getStyles(),
            ...{fontSize: this.props.object.fontSize},
            ...{fontFamily: this.props.object.fontFamily}
        };
        Object.assign(text.style, styles);
        svg.appendChild(text);
        document.body.appendChild(svg);

        const wordsWithComputedWidth = words.map(word => {
            text.textContent = word;
            return { word, width: text.getComputedTextLength() }
        });

        text.textContent = '\u00A0'; // Unicode space

        const spaceWidth = text.getComputedTextLength();

        document.body.removeChild(svg);

        return { wordsWithComputedWidth, spaceWidth }
    }

    calculateLines(wordsWithComputedWidth, spaceWidth, lineWidth) {

        const wordsByLines = wordsWithComputedWidth.reduce((result, { word, width}) => {

             const lastLine = result[result.length - 1] || { words: [], width: 0 };

            if (lastLine.words.length === 0) {
                // First word on line
                const newLine = { words: [word], width };
                result.push(newLine);
            } else if (lastLine.width + width + (lastLine.words.length * spaceWidth) < lineWidth) {
                // Word can be added to an existing line
                lastLine.words.push(word);
                lastLine.width += width;
            } else {
                // Word too long to fit on existing line
                const newLine = { words: [word], width };
                result.push(newLine);
            }

            return result;
        }, []);

        return wordsByLines.map(line => line.words.join(' '));
    }

    render() {
        let {object, index} = this.props;

        return (
            <text {...this.getObjectAttributes()}
                  textAnchor="start"
                  fontSize={object.fontSize}
                  fontFamily={object.fontFamily}>
                {this.state.lines.map((word, index) => (
                    <tspan key={word} x={object.x} y={object.y} dy={`${index * object.lineheight}em`}>
                        {word}
                    </tspan>
                ))}
            </text>
        );
    }
}