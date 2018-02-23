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
            productWidth: 600,
            productHeight: 600,
            productRealWidth: '36in',
            productRealHeight: '48in',
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
        event.preventDefault();
        let svgElement = this.designer.getSVGElement();
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgElement.setAttribute("width", this.state.productRealWidth);
        svgElement.setAttribute("height", this.state.productRealHeight);
        svgElement.setAttribute("viewBox", "0 0 " + this.state.productWidth + " " + this.state.productHeight + "");
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
           width={this.state.productWidth} height={this.state.productHeight}
           objects={this.state.objects}
           style={preview.styles}
       />);
    };

    render() {


        return (
            <div>
                <Designer
                    ref={(ref) => this.designer = ref}
                    width={this.state.productWidth} height={this.state.productHeight}
                    objects={this.state.objects}
                    onUpdate={this.handleUpdate}
                    />
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