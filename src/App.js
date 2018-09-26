import React, {Component} from 'react';
import {Text,ScrollView, View, TextInput, TouchableOpacity, StatusBar, AsyncStorage} from 'react-native';
import socketIO from 'socket.io-client';
import styles from './styles'

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            messages:[],
            text:''
        }
        this._sendMessage = this._sendMessage.bind(this);
        this.socket = socketIO('http://172.16.94.230:3000')
    }
    
    _sendMessage(){
        if(this.state.text != ''){
            this.socket.emit('message',{user:'Bot',message:this.state.text});
            let newMsgs = [...this.state.messages];
            newMsgs.push({user:'Me',message:this.state.text});
            this.setState({text:'',messages:newMsgs});
            AsyncStorage.setItem('messages',JSON.stringify({messages:newMsgs}))
        }
    }

    _getMessages(){
        AsyncStorage.getItem('messages').then(val => {
            if(val){
                let parsedVal = JSON.parse(val);
                if(parsedVal.messages && parsedVal.messages.length > 0){
                    this.setState({messages:parsedVal.messages})
                }
            }
        }).catch(e=>{
            console.log('no data')
        })
    }
    componentWillMount(){
        this._getMessages()
    }

    componentDidMount(){
        this.socket.on('message',(message) => {
            
            let newMsgs = [...this.state.messages];
            newMsgs.push(message);
            AsyncStorage.setItem('messages',JSON.stringify({messages:newMsgs}))
            this.setState({messages:newMsgs});
        })
        // this.socket.emit('connection',{user:'1',message:this.state.text});
    }

    _renderMessages(){
        return this.state.messages.map((item,index) => {
            if(item.user == 'Me'){
                return(
                    <View key={index} style ={[styles.message]}>
                        <View style={{flex:1}}></View>
                        <View>
                            <Text style={[styles.sender,styles.userName]}>{item.user}</Text>
                            <View style={styles.mesageBox}>
                                <Text style={[styles.messageContent]}>{item.message}</Text>
                            </View>
                        </View>
                    </View>
                )
            }else{
                return(
                    <View key={index} style ={[styles.message]}>
                        <View>
                            <Text style={[styles.receiver,styles.userName]}>{item.user}</Text>
                            <View style={styles.mesageBox2}>
                                <Text style={[styles.messageContent]}>{item.message}</Text>
                            </View>
                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                )
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor='#303f94' />
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bot</Text>
                </View>
                <ScrollView 
                    style={styles.messageView} 
                    ref={ref=>this.scrollView = ref}
                    onContentSizeChange= {() => {
                        this.scrollView.scrollToEnd({animated:true})
                    }}
                >
                    {this._renderMessages()}
                    <View style={{height:10}}></View>
                </ScrollView>
                <View style={styles.input}>
                    <TextInput 
                        onSubmitEditing={this._sendMessage} 
                        placeholder="Start typing here" 
                        style={styles.inputText} 
                        onChangeText={(text) => {
                            this.setState({text:text})
                        }} 
                        value={this.state.text} 
                    />
                    <TouchableOpacity 
                        activeOpacity={0.3} 
                        delayPressIn={0} 
                        style={styles.buttCont} 
                        onPress={this._sendMessage}
                    >
                        <Text style={styles.textColor}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}