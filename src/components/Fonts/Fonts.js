import React from 'react';

class Fonts extends React.Component {
    constructor(props) {
        super(props);
    }

    addFontFace = (object, index) => {
        let fontLiteral = '';
        if(!this.fontFaceAdded[object.fontFamily]) {
            this.fontFaceAdded[object.fontFamily] = true;
            let {fonts} = this.props;
            let selectedFonts = fonts.filter((f) => { return f.family === object.fontFamily});

            fontLiteral = fontLiteral + ' ' + selectedFonts.map((font) => {
                    return '@font-face {font-family:"' + font.family + '"; src: url("' + font.bccSrcList[1].url + '") format("'+ font.bccSrcList[1].format +'"); font-weight: "' + font.weigth + '"; font-style: "' + font.style + '";}';
             });
        }

        return fontLiteral;
    };

    render() {
        let {textObjects} = this.props;
        this.fontFaceAdded = {};

        return (
            <defs xmlns="http://www.w3.org/2000/svg">
                {textObjects.length &&
                    <style type="text/css">
                        {textObjects.map(this.addFontFace)}
                    </style>}

            </defs>
        );
    }
}



export default Fonts;
