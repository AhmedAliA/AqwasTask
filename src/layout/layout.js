import { Dimensions, } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//Assume that this is the design width
const guidelineBaseWidth = 414;
//Assume that this is the design height
const guidelineBaseHeight = 896;

export default {
    height: height,
    width: width,
    horizontalScale(size) {
        return (width / guidelineBaseWidth) * size
    },
    verticalScale(size) {
        return (height / guidelineBaseHeight) * size
    },
    getAdaptedFontSize(size) {
        var font = (width / guidelineBaseWidth) * size;
        return font;
    },
}