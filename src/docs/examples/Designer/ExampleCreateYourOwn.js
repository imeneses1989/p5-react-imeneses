/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Designer from '@od/react-preview/Designer';
import Preview from '@od/react-preview/Preview';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            showPreview: false,
            previews: [{
                styles: {
                    backgroundColor: 'red',
                    display: 'inline-block',
                    marginTop: 20,
                    marginRight: 20
                }
            },
            {
                styles: {
                    backgroundColor: 'white',
                    marginTop: 20,
                    display: 'inline-block'
                }
            }]
        }
    }

    handleUpdate = (objects) => {
        this.setState({objects});
    };

    download = (event) => {
        let realWidth = '36in';
        let realHeight = '48in';
        event.preventDefault();
        let svgElement = this.designer.svgElement;
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgElement.setAttribute("width", realWidth);
        svgElement.setAttribute("height", realHeight);
        svgElement.setAttribute("viewBox", "0 0 318 424");
        svgElement.setAttribute("xml:space", "preserve");
        svgElement.setAttribute("preserveAspectRatio", "none");
        let source = svgElement.outerHTML;

        let wd = window.open("_blank");
        wd.document.body.innerHTML = "";
        wd.document.write(source);
        wd.focus();
        wd = null;


    };

    seePreview = () => {
        this.setState({showPreview: !this.state.showPreview});
    };

    renderPreview = (preview) => {
       return (<Preview
           width={350} height={400}
           objects={this.state.objects}
           style={preview.styles}
       />);
    };

    render() {
        return (
            <div>
                <Designer
                    ref={(ref) => this.designer = ref}
                    width={350} height={400}
                    objects={this.state.objects}
                    onUpdate={this.handleUpdate}/>
                <p>
                    <a href="#" style={{marginRight: 10, display: 'inline-block'}} onClick={this.seePreview}>{this.state.showPreview ? 'Hide' : 'Show'} Preview</a>
                    <a href="#" onClick={this.download}>Export SVG</a>
                </p>

                {this.state.showPreview &&
                    this.state.previews.map(this.renderPreview)
                }
            </div>
        );
    }
}