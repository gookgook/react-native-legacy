import React, { Component } from 'react'
import { Text, TextInput, StyleSheet, View, TouchableOpacity, Alert, Button, ScrollView, TouchableWithoutFeedback, Keyboard, Image, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/Ionicons'
import IconLogin from 'react-native-vector-icons/MaterialCommunityIcons'
import { Tab, Tabs, Header, Left, Right, Body, Container } from 'native-base'
import { SERVER_URL } from "@env"

import language from '../Language'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class FindIdPwPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailForPw: '',
            verifyClick : false,
            verifyCode: '',
            language : ''
        }
        this.getLanguage()

    }

    getLanguage = async() => {
        this.setState({language:await AsyncStorage.getItem('language')})
    }

    sendIdToEmail = async () => {
        const URL = `${SERVER_URL}` + "/signupin/sendIdToEmail";
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.email
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
                Alert.alert('We have emailed your ID')
            } else {
                Alert.alert(language(this.state.language,'Please enter your valid Waseda school email'))
            }

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    sendPwToEmail = async () => {
        const URL = `${SERVER_URL}` + "/signupin/sendPwVerificationCode";
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.emailForPw
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            const responseText = await response.text();
            if (responseText == 'success') {
                Alert.alert(language(this.state.language,'We have sent the verification code to your university email'))
                this.setState({verifyClick:true})
            } else {
                Alert.alert(language(this.state.language,'Please enter your valid Waseda school email'))
            }

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    setEmail = (text) => {
        this.setState({ email: text });
    }

    setEmailForPw = (text) => {
        this.setState({ emailForPw: text });
    }
    checkCode = async () => {
        const URL = `${SERVER_URL}`+"/signupin/checkCode";
        try {

            //const response = await fetch(URL + "/" + this.state.user_id); 주소방식
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    verifyCode: this.state.verifyCode,
                    email: this.state.emailForPw
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            var responseText = await response.text()
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            if (responseText == 'Success') {
                Alert.alert(language(this.state.language,'Correct Code! We will send new password to your email.'))
                this.state.emailVerified = true
            }
            this.setState({ response: responseText })


        } catch (error) {
            Alert.alert(error.message);
        }

    }
    setVerifyCode = (text) =>{
        this.state.verifyCode=text;
    }
    render() {
        var isVerifyClick = (<View></View>)

        if (this.state.verifyClick) {
            isVerifyClick = (
                <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: 20 }}>
                    <View style={{ flex: 4 }}>
                        <TextInput style={styles.textInput2} placeholder={language(this.state.language,"Verification code")} onChangeText={this.setVerifyCode}></TextInput>
                    </View>
                    <View style={{ flex: 1.5 }}>
                        <TouchableOpacity onPress={() => this.checkCode()}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, alignSelf: "center", marginTop:19}}>{language(this.state.language,'Submit')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            )
        }
        var fid='FIND ID'
        var fpw='FIND PASSWORD'
        if(this.state.language=='j'){
            fid='IDを探す'
            fpw='パスワードを探す'
        }
        return (
            <Container style={{ backgroundColor: "#6a0dad" }}>
                <Header style={{ backgroundColor: "#6a0dad" }}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                            <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <View>
                        <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/MateLogo.png')}></Image>
                        </View>
                    </Body>
                    <Right style={{ flex: 1 }}>

                    </Right>
                </Header>

                
                <Tabs tabBarPosition="bottom" style={{ marginBottom: 25 }}>
                    <Tab heading={fid} style={{ backgroundColor: "#6a0dad" }}>
                        <KeyboardAwareScrollView>
                        <IconLogin name='account-lock-outline' style={{ color: "#98fc74", fontSize: 100, alignSelf: "center", marginTop: 45 }} size={30} />
                        <Text style={styles.bigText}>{language(this.state.language,'Forgot Your ID?')}</Text>
                        <Text style={styles.smallText}>{language(this.state.language,'Tell us your school email. Then we will send your ID to your email.')}</Text>
                        <TextInput style={styles.textInput} placeholder={language(this.state.language,'School Email')} onChangeText={this.setEmail} />
                        <TouchableOpacity style={{ alignSelf: "center", marginTop: 40 }} onPress={() => this.sendIdToEmail()}>
                            <IconLogin name='email-send-outline' style={{ color: "white", fontSize: 40 }} size={30} />
                        </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </Tab>
                    <Tab heading={fpw} style={{ backgroundColor: "#6a0dad" }}>
                        <KeyboardAwareScrollView>
                        <IconLogin name='lock-open-outline' style={{ color: "#98fc74", fontSize: 100, alignSelf: "center", marginTop: 45 }} size={30} />
                        <Text style={styles.bigText}>{language(this.state.language,'Forgot Your PASSWORD?')}</Text>
                        <Text style={styles.smallText}>{language(this.state.language,'Tell us your school email. Then we will send you a Verification code.')}</Text>
                        <TextInput style={styles.textInput} placeholder={language(this.state.language,'School Email')} onChangeText={this.setEmailForPw} />
                        <TouchableOpacity style={{ alignSelf: "center", marginTop: 40 }} onPress={() => this.sendPwToEmail()}>
                            <IconLogin name='email-send-outline' style={{ color: "white", fontSize: 40 }} size={30} />
                        </TouchableOpacity>
                        <View>{isVerifyClick}</View>
                        </KeyboardAwareScrollView>
                    </Tab>
                </Tabs>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    bigText: {
        alignSelf: "center",
        fontSize: 35,
        color: "white",
        marginTop: 5
    },
    smallText: {
        alignSelf: "center",
        color: "#f2f2f2",
        marginHorizontal: 50,
        fontSize: 15,
        marginTop: 20
    },
    textInput: {
        alignSelf: "center",
        marginTop: 30,
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: "white",
        paddingLeft : 15
    },
    textInput2: {
        alignSelf: "center",
        marginTop: 10,
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: "white",
        paddingLeft:15
    }
})
