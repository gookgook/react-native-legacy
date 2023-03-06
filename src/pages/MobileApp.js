import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Alert, TextInput,Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {SERVER_URL} from "@env"
import language from '../Language'

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>   
)

export default class MobileApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: "Click to Login or Sign Up",
            user_id: "",
            user_password: "",
            LogSign : false,
            ShowLogSign : false,
            userGoogleInfo : {},
            language : '',
            ShowLanguageButton : false
        }
        
        this.state.ShowLogSign=true
        this.state.LogSign=false
    }

    componentDidMount() {
        this.props.navi.addListener('focus', this.load)
    }
    load = async () => {
        /*GoogleSignin.configure({
            webClientId: "295539988161-m2hbnprhh8p2ner7beclkf0a6b7v2ce6.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)

          });*/
          this.state.ShowLanguageButton=false
          const value = await AsyncStorage.getItem('language');
            if (value == null) {
                await AsyncStorage.setItem('language', 'j')
                this.state.language='j'//지워줘야함
            }else{
                this.setState({language:value})
            }

        if (await this.tokenCheck()) {
            await this.props.navi.navigate('Main')
        }
        this.state.response="Click to Login or Sign Up" 
        this.state.user_id="" 
        this.setState({ user_password: "" })
        
    }
    



    tokenCheck = async () => {
        try {
            if (await AsyncStorage.getItem('token') == null) {
                return false
            } else {
                return await this.tokenVaildCheck()
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    tokenVaildCheck = async () => {
        const URL = `${SERVER_URL}`+ "/reviewsearch/tokenValidCheck";
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    token: await AsyncStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            const responseText = await response.text();
            if (responseText == 'true') {
                return true
            } else {
                return false
            }

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    loginFlow = async () => {
        const URL = `${SERVER_URL}`+ "/signupin/loginJWT";
        try {
            if (this.state.user_id == "" || this.state.user_password == "") {
                Alert.alert(language(this.state.language,'Please type your ID and Password'))
                return
            }
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    user_password: this.state.user_password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            const responseJson = await response.json();
            if (responseJson.success === true) {
                await AsyncStorage.setItem('token', responseJson.info)
                const { navi } = this.props;
                this.setState({ response: "Login Success!" });
                navi.navigate("Main")
            } else {
                if(responseJson.success=="IDWRONG"){
                    Alert.alert(language(this.state.language,"Wrong ID! Please try again"))
                }else if(responseJson.success=="PASSWORDWRONG"){
                    Alert.alert(language(this.state.language,"Wrong Password! Please try again"))
                }
            }

        } catch (error) {
            Alert.alert(error.message);
        }

    }
    setText = (text) => {
        this.setState({ user_id: text });
    }
    setPassword = (text) => {

        this.setState({ user_password: text });
    }
    LogSign(){
        if(this.state.LogSign==true)this.setState({LogSign:false})
        else{
            this.state.ShowLogSign=false
            this.setState({LogSign:true})
        }
    }

    ShowLanguageSelect(){
        if(this.state.ShowLanguageButton==false)this.setState({ShowLanguageButton:true})
        else this.setState({ShowLanguageButton:false})
    }
    ShowLanguageSelect(){
        if(this.state.ShowLanguageButton==false)this.setState({ShowLanguageButton:true})
        else this.setState({ShowLanguageButton:false})
    }
    goEnglish = async () => {
        await AsyncStorage.setItem('language', 'e')
        this.setState({language:'e'})
        Alert.alert("ENGLISH")
    }
    goJapanese = async () => {
        await AsyncStorage.setItem('language', 'j')
        this.setState({language:'j'})
        Alert.alert("日本語")
    }

    render() {
        const { navi } = this.props;
        var LogSign = (
            <View style={{marginTop: 20}}>
            <TextInput style={styles.textinput} onSubmitEditing={() => { this.secondTextInput.focus(); }} value={this.state.user_id} placeholder={language(this.state.language,"ID")} onChangeText={this.setText}></TextInput>
            <TextInput style={styles.textinput} ref={(input) => { this.secondTextInput = input; }} onSubmitEditing={this.loginFlow} value={this.state.user_password} placeholder={language(this.state.language,"Password")} secureTextEntry={true} onChangeText={this.setPassword}></TextInput>
                <View style={{marginTop:30}}>
                    <TouchableOpacity onPress={this.loginFlow} style={styles.LogSign}><Text style={{color:"#6a0dad",fontWeight:"bold",fontSize:20}}>{language(this.state.language,'LOGIN')}</Text></TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                <TouchableOpacity onPress={() => { navi.navigate("SignUp",{googleSignUp:false}) }}style={styles.LogSign}><Text style={{color:"#6a0dad",fontWeight:"bold",fontSize:20}}>{language(this.state.language,'SIGN UP')}</Text></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=> navi.navigate('FindIdPwScreen')}>
                    <Text style={{alignSelf:"center", marginTop:20, color:"white", fontSize: 20}}>{language(this.state.language,'Forgot ID/Password?')}</Text>
                </TouchableOpacity>
                </View>
        )
        if(this.state.LogSign==false){
            LogSign=(
                <View style={{marginTop:120}}></View>
            )
        }
        var LogSignButton = (
            <TouchableOpacity  onPress={() => { this.LogSign()}}><Text style={{fontSize:22,color:"white"}}>{language(this.state.language,'Touch Here')}</Text></TouchableOpacity>
        )
        var LanguageButton = (
            <TouchableOpacity  style={{marginTop:20}} onPress={() => { this.ShowLanguageSelect()}}><Text style={{fontSize:20,color:"white"}}>Language/言語</Text></TouchableOpacity>
        )
        var SelectLanguageButton = (
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity  style={{marginTop:20, marginRight:30, borderWidth:2, borderColor:'white', borderRadius: 7.5,  paddingHorizontal:2.8,paddingVertical:1.8}} onPress={() => { this.goEnglish()}}><Text style={{fontSize:20,color:"white"}}>English</Text></TouchableOpacity>
            <TouchableOpacity  style={{marginTop:20,borderWidth:2, borderColor:'white', borderRadius: 7.5, paddingHorizontal:4.3,paddingVertical:3.7}} onPress={() => { this.goJapanese()}}><Text style={{fontSize:20,color:"white"}}>日本語</Text></TouchableOpacity>
            </View>
        )
        if(this.state.ShowLogSign==false){
            LogSignButton=(<View></View>)
        }
        if(this.state.ShowLanguageButton==false){
            SelectLanguageButton=(<View></View>)
        }

        return (
            
            <DismissKeyboard>
            <KeyboardAvoidingView 
            style={{flex:1}}
            keyboardVerticalOffset={0}
            behavior={Platform.OS === "ios" ? "padding" : null}>
            <View style={{backgroundColor:"#6a0dad", flex:1, justifyContent: "center", alignItems:"center"} }>
            <Image style={{width:210,height:140,resizeMode:'contain'}} source={require('../../assets/MateLogo.png')}></Image>
            
            <View style={{alignSelf:"stretch"}}>{LogSign}</View> 
            {LogSignButton}
            {LanguageButton}
            {SelectLanguageButton}
            </View>
            </KeyboardAvoidingView>
            </DismissKeyboard>    
        )
    }
}

const styles = StyleSheet.create({
    bodytext: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center'
    },
    title: {
        alignSelf: "center",
        color: "#f8f8ff",
        textAlign: "center",
        fontSize: 65,
        fontWeight: "bold"
    },
    author: {
        color: "#000000",
        fontSize: 20
    },
    textinput: {
        backgroundColor : "#f2f1f0",
        borderRadius : 10,
        marginTop: 25,
        height : 35,
        alignSelf : "stretch",
        marginHorizontal : 60,
        paddingLeft: 15
    },
    LogSign: {
        backgroundColor : "white",
        width : 150,
        height : 35,
        borderRadius : 10,
        alignSelf : "center",
        alignItems : "center",
        justifyContent : "center"
    }
})
