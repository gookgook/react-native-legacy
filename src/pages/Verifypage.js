import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, TextInput, Alert, ActivityIndicator,TouchableWithoutFeedback,Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss()
        }}>
        {children}
    </TouchableWithoutFeedback>   
)

export default class Signinpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             response: "Unverified",    
             email: ""
        }
    }
    beforeconnect = () =>{
        let that=this
        if(this.state.password!=this.state.checkpassword){
            Alert.alert("please check the password!")
        }else{
            this.setState({response: 'Verification in Process.....'});
            setTimeout(function(){that.connect()},2000)
        }
    }
    connect = async () => {
        const URL = "http://13.231.20.191/schoolverify";
        try {
            if(this.state.email==""){
                Alert.alert("Please type your School email");
                return
            }
            //const response = await fetch(URL + "/" + this.state.name); 주소방식
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.email,
                    token: await AsyncStorage.getItem('token')
                }),//서버랑 name이라는거 같아야함
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(response.status !=200){
                throw new Error("Something is wrong with verify");
            }
            const responseText = await response.json();
            this.setState({response: responseText.success});
        }catch(error){
            Alert.alert(error.message);
        }
         
    }

    setText = (text) =>{
        this.setState({email: text});
    }
    render() {
        const {navi}=this.props;
        
        var isverified;
        if(this.state.response=="Unverified"){
            isverified=(
                <Text style={styles.bodytext}> {this.state.response} </Text>
            )
        }else if(this.state.response=="Verification in Process....."){
            /*isverified=(
                <Text style={styles.bodytext}> {this.state.response} </Text>
            )*/
            isverified=(<ActivityIndicator size="large" color="0000ff"/>)
        }else if(this.state.response=="Unvalid email"){
            isverified=(
                <Text style={styles.failtext}> {this.state.response} </Text>
            )
        }else if(this.state.response=="Verified") {
            isverified=(
                <Text style={styles.successtext}> {this.state.response} </Text>
            )
        }
        return (
            <DismissKeyboard>
            <View style={{marginHorizontal:15}}>
                <Text style={styles.title}>Verify your school ID!</Text>
                
                <TextInput style={styles.textinput} placeholder="please enter your school email account" onChangeText={this.setText}></TextInput>
                <View>{isverified}</View>
                <Button color="#f194ff" title="verify" onPress={this.beforeconnect}></Button>
            </View>
            </DismissKeyboard>
        )
    }
}

const styles = StyleSheet.create({
    bodytext: {
        fontSize : 30,
        margin : 10,
        textAlign : 'center'
    },
    successtext: {
        fontSize : 30,
        margin : 10,
        textAlign : 'center',
        color: 'green'
    },
    failtext: {
        fontSize : 30,
        margin : 10,
        textAlign : 'center',
        color: 'red'

    },
    title: {
        marginTop: 50,
        marginBottom: 50,
        alignSelf: "center",
        width: 400,
        height: 100,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#ffdead",
        color: "#20232a",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    textinput:{
        marginTop:8,
        borderColor: "gray",
        borderWidth: 1
    }
})