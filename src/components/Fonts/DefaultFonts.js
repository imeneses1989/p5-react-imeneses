const DefaultFonts = () => {
    let fonts  = [
        {
            bccSrcList: [
                {name: "Ubuntu-italic-bold/configurator/bcc/fonts/Ubuntu-BoldItalic.eotembedded-opentype", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-BoldItalic.eot", format: "embedded-opentype"},
                {name: "Ubuntu-italic-bold/configurator/bcc/fonts/Ubuntu-BoldItalic.woffwoff", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-BoldItalic.woff", format: "woff"}],
            compositeName: "Ubuntu-italic-bold",
            family: "Ubuntu",
            linkedDto: "F-1341356484",
            style: "italic",
            weigth: "bold"
        },
        {
            bccSrcList: [
                {name: "Ubuntu-normal-normal/configurator/bcc/fonts/Ubuntu-Regular.eotembedded-opentype", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-Regular.eot", format: "embedded-opentype"},
                {name: "Ubuntu-normal-normal/configurator/bcc/fonts/Ubuntu-Regular.woffwoff", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-Regular.woff", format: "woff"}
            ],
            compositeName: "Ubuntu-normal-normal",
            family: "Ubuntu",
            linkedDto: "F1373128775",
            style: "normal",
            weigth: "normal"
        },
        {
            bccSrcList: [
                {name: "Ubuntu-italic-normal/configurator/bcc/fonts/Ubuntu-Italic.eotembedded-opentype", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-Italic.eot", format: "embedded-opentype"},
                {name: "Ubuntu-italic-normal/configurator/bcc/fonts/Ubuntu-Italic.woffwoff", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-Italic.woff", format: "woff"}
            ],
            compositeName: "Ubuntu-italic-normal",
            family: "Ubuntu",
            linkedDto: "F-209652002",
            style: "italic",
            weigth: "normal"
        },
        {
            bccSrcList: [
                {name: "Ubuntu-normal-bold/configurator/bcc/fonts/Ubuntu-Bold.eotembedded-opentype", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-Bold.eot", format: "embedded-opentype"},
                {name: "Ubuntu-normal-bold/configurator/bcc/fonts/Ubuntu-Bold.woffwoff", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/Ubuntu-Bold.woff", format: "woff"}
            ],
            compositeName: "Ubuntu-normal-bold",
            family: "Ubuntu",
            linkedDto: "F2074811877",
            style: "normal",
            weigth: "bold"
        },
        {
            bccSrcList:[
                {name: "DancingScript-normal-normal/configurator/bcc/fonts/DancingScript.eotembedded-opentype", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/DancingScript.eot", format: "embedded-opentype"},
                {name: "DancingScript-normal-normal/configurator/bcc/fonts/DancingScript.woffwoff", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/DancingScript.woff", format: "woff"}
            ],
            compositeName: "DancingScript-normal-normal",
            family: "Dancing Script",
            linkedDto: "F178928315",
            style: "normal",
            weigth: "normal"
        },
        {
            bccSrcList:[
                {name: "DancingScript-normal-bold/configurator/bcc/fonts/DancingScript-Bold.eotembedded-opentype", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/DancingScript-Bold.eot", format: "embedded-opentype"},
                {name: "DancingScript-normal-bold/configurator/bcc/fonts/DancingScript-Bold.woffwoff", url: "https://s3.amazonaws.com/ag2staticsqs/configurator/bcc/fonts/DancingScript-Bold.woff", format: "woff"}
            ],
            compositeName: "DancingScript-normal-bold",
            family: "Dancing Script",
            linkedDto: "F1501502809",
            style: "normal",
            weigth: "bold"
        }
    ];

    this.setFonts = (fontsToUse) => {
        fonts = fontsToUse;
    };

    this.getFonts = () => {
        return fonts;
    };

    this.getGroupFonts = () => {
        let fontGroups = [];
        let currentGroups = {};
        for(let i = 0; i < fonts.length; i++) {
            if (!currentGroups[fonts[i].family]) {
                currentGroups[fonts[i].family] = true;
                fontGroups.push({
                    family: fonts[i].family,
                    linkedDto: fonts[i].linkedDto
                });
            }
        }
        return fontGroups;
    };

    return {
        setFonts: this.setFonts,
        getFonts: this.getFonts,
        getGroupFonts: this.getGroupFonts
    };

  };

export default new DefaultFonts()
