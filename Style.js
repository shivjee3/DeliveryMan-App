const React = require("react-native");

const { StyleSheet, Dimensions } = React;

const dh = Dimensions.get("window").height;
const dw = Dimensions.get("window").width;

export default StyleSheet.create({

    lgnbtn:{
        marginTop: 50,
        marginHorizontal: 10,
        backgroundColor:'#FFCA28'
    },

    iconColor:{
        color:'#FFCA28'
    },
    container:{

        flex: 1,
        
    },
    text:{
        fontSize:14,
    }


});