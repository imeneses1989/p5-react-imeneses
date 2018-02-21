const Scaler = ({object, startPoint, mouse}) => {
    let {objectX, objectY, clientX, clientY} = startPoint;
    let width = startPoint.width + mouse.x - clientX;
    let height = startPoint.height ? (startPoint.height + mouse.y - clientY) : 0;

    let newObj = {
        ...object,
        x: width > 0 ? objectX: objectX + width,
        y: height > 0 ? objectY: objectY + height
    };

    if(width) {
        newObj['width'] = Math.abs(width)
    }

    if(height) {
        newObj['height'] =  Math.abs(height)
    }
    return newObj;
};

export default Scaler;
