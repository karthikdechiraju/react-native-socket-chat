import { StyleSheet,Dimensions } from 'react-native';
let {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'space-between'
    },
    messageView:{
        flex:1,
        backgroundColor: '#ffffff',
        // padding:15,
        paddingLeft:15,
        paddingRight:15
    },
    input:{
        height:60,
        width:width,
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:'#eee'
    },
    inputText:{
        backgroundColor: '#eee',
        flex:1,
        paddingLeft:20,
        paddingRight:10
    },
    buttCont:{
        width:80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#eee'
    },
    textColor:{
        color:'#3f51b5',
        fontWeight:'900'
    },
    message:{
        flexDirection:'row',
        marginTop:10
    },
    messageContent:{
        color:'#000',
        fontSize:16,
        fontWeight:'400'
    },
    mesageBox:{
        padding:10,
        backgroundColor:'#d1d8ff',
        borderRadius:5,
        maxWidth:250
    },
    mesageBox2:{
        padding:10,
        backgroundColor:'#e1ffd8',
        borderRadius:5,
        maxWidth:250
    },
    header:{
        height:60,
        backgroundColor:'#3f51b5',
        justifyContent:'center',
        paddingLeft:15
    },
    headerText:{
        color:'#fff',
        fontSize:20
    },
    userName:{
        fontWeight:'900'
    },
    sender:{
        textAlign:'right',
        color:'#303f94'
    },
    receiver:{
        textAlign:'left',
        color:'#3f5638'
    }
});

export default styles;