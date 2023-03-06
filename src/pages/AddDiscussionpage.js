import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import language from '../Language'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
    }}>
        {children}
    </TouchableWithoutFeedback>
)

export default class AddDiscussionpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            discussion_title: "",
            discussion_body: "",
            language : ''
        }
        this.getLanguage()
    }
    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }
    adddiscussionflow = async () => {
        //Alert.alert("thank you for your review")
        const URL = "http://13.231.20.191/discussion/adddiscussion"
        const { route } = this.props;
        const currentCourseId = route.params.course_id

        if (this.state.discussion_title.length < 1 || this.state.discussion_body.length < 1) {
            Alert.alert(language(this.state.language,"One or more questions is blank. Please check again"))
        } else {

            try {
                const { navi } = this.props;
                this.setState({ spinner: true })
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        course_id: currentCourseId,
                        discussion_title: this.state.discussion_title,
                        discussion_body: this.state.discussion_body,
                        token: await AsyncStorage.getItem('token')
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.status != 200) {
                    throw new Error("Something is wrong");
                }
                if (response.text == 'error') {
                    throw new Error("Token doesn't exist");
                }

            } catch (error) {
                Alert.alert(error.message);
            } finally {
                this.props.navi.navigate("DiscussionScreen")
            }
        }
    }
    setTitle = (text) => {
        this.state.discussion_title = text
        //this.setState({reviewbody:text})
    }
    setBody = (text) => {
        this.state.discussion_body = text
        //this.setState({reviewbody:text})
    }
    
    render() {

        if (Platform.OS === 'android') {
            return (

                <ScrollView>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <Header style={{ backgroundColor: "#6a0dad" }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.props.navi.navigate("DiscussionScreen", { changing: false })}>
                                <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1, alignItems: 'center' }}>
                            <Title style={{ fontSize: 22, color: "white" }}>Add Discussion</Title>
                            <Text style={{ color: "white" }}>{this.props.route.params.course_name}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.adddiscussionflow()}>
                                <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <View style={{ marginHorizontal: 5 }}>
                        <TextInput style={styles.titleinput} placeholder="Title" onChangeText={this.setTitle}></TextInput>
                        <TextInput multiline style={styles.textinput} placeholder="Discuss freely about this course!" onChangeText={this.setBody}></TextInput>
                    </View>
                </ScrollView>

            )
        } else {
            return (
                <DismissKeyboard>
                    <View>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />
                        <Header style={{ backgroundColor: "white" }}>
                            <Left style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                    <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                                </TouchableOpacity>
                            </Left>
                            <Body style={{ flex: 1 }}>
                            <Title style={{ fontSize: 22, color: "#6a0dad" }}>{language(this.state.language,'Discussion Board')}</Title>
                            <Text style={{ color: "#6a0dad" }}>{this.props.route.params.course_name}</Text>
                            </Body>
                            <Right style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => this.adddiscussionflow()}>
                                    <Icon name='checkmark-outline' style={{ color: "#6a0dad" }} size={30} />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <View style={{ marginHorizontal: 5 }}>
                            <TextInput style={styles.titleinput} placeholder={language(this.state.language,"Title")} onChangeText={this.setTitle}></TextInput>
                            {this.state.language == 'j'
                                ? <TextInput multiline style={styles.textinput} placeholder='この授業について自由に話してください！' onChangeText={this.setBody}></TextInput>
                                : <TextInput multiline style={styles.textinput} placeholder="Discuss freely about this course!" onChangeText={this.setBody}></TextInput>
                                }
                          
                        </View>
                    </View>
                </DismissKeyboard>
            )
        }
    }
}

const styles = StyleSheet.create({
    textinput: {
        height: 240,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 7,
        paddingHorizontal:10
    },
    titleinput: {
        marginTop: 5,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 10
    }

})