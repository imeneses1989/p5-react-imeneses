/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Designer from '@od/react-preview/Designer';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [{
                "width": 163,
                "height": 84,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(0, 123, 255, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 17,
                "y": 15
            }, {
                "width": 70,
                "height": 146,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(255, 255, 255, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 19,
                "y": 109
            }, {
                "width": 81,
                "height": 69,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(241, 97, 99, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 100,
                "y": 110
            }, {
                "width": 231,
                "height": 70,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(0, 123, 255, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 100,
                "y": 187
            }, {
                "width": 183,
                "height": 60,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(255, 241, 0, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 19,
                "y": 265
            }, {
                "width": 118,
                "height": 119,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(241, 97, 99, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 211,
                "y": 266
            }, {
                "width": 82,
                "height": 51,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(255, 255, 255, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 120,
                "y": 333
            }, {
                "width": 89,
                "height": 50,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(241, 97, 99, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 21,
                "y": 334
            }, {
                "width": 143,
                "height": 160,
                "rotate": 0,
                "strokeWidth": 0,
                "fill": "rgba(255, 241, 0, 1)",
                "radius": "0",
                "blendmode": "normal",
                "type": "rectangle",
                "x": 190,
                "y": 16
            }]
        }
    }

    handleUpdate(objects) {
        this.setState({objects});
    }

    download(event) {
        let realWidth = '36in';
        let realHeight = '48in';
        event.preventDefault();
        let svgElement = this.designer.svgElement;
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgElement.setAttribute("width", realWidth);
        svgElement.setAttribute("height", realHeight);
        svgElement.setAttribute("viewBox", "64 11 318 424");
        svgElement.setAttribute("xml:space", "preserve");
        svgElement.setAttribute("preserveAspectRatio", "none");
        let source = svgElement.outerHTML;

        let wd = window.open("_blank");
        wd.document.body.innerHTML = "";
        wd.document.write(source);
        wd.focus();
        wd = null;


    }

    render() {
        return (
            <div>
            <Designer
                ref={(ref) => this.designer = ref}
                width={350} height={400}
                objects={this.state.objects}
                onUpdate={this.handleUpdate.bind(this)}/>
                <p>
                    <a href="#" onClick={this.download.bind(this)}>Export SVG</a>
                </p>
            </div>
        );
    }
}