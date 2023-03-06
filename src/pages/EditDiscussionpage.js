import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Platform } from 'react-native'
import { Header, Left, Right, Body, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay';

import language from '../Language'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default class EditDiscussionpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            discussion_title: "",
            discussion_body: ""
        }
        this.getLanguage()
    }

    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }

    editDiscussionFlow = async () => {
        //Alert.alert("thank you for your review")
        const URL = "http://13.231.20.191/discussion/editDiscussion"
        const { route } = this.props;
        if (this.state.discussion_title.length < 1 || this.state.discussion_body.length < 1) {
            Alert.alert("One or more questions is blank. Please check again.")
        } else {

            try {
                const { navi } = this.props;
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        discussion_id: route.params.discussion_id,
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
                this.props.navi.navigate("ShowDiscussionScreen", { discussion_id: route.params.discussion_id, like_count: route.params.like_count })
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
    componentDidMount() {
        this.props.navi.addListener('focus', this.load)
    }
    load = () => {
        this.setState({ discussionJson: [] })
        const { route } = this.props;
        this.setState({ discussion_title: route.params.discussion_title })
        this.setState({ discussion_body: route.params.discussion_body })
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
                            <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1, alignItems: 'center' }}>
                            <Title style={{ fontSize: 22, color: "white" }}>Edit Discussion</Title>
                            <Text style={{ color: "white" }}>{this.props.route.params.course_name}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.editDiscussionFlow()}>
                                <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <View style={{ marginHorizontal: 5 }}>
                        <TextInput style={styles.titleinput} defaultValue={this.state.discussion_title} onChangeText={this.setTitle}></TextInput>
                        <TextInput multiline style={styles.textinput} defaultValue={this.state.discussion_body} onChangeText={this.setBody}></TextInput>
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
                        <Header style={{ backgroundColor: "#6a0dad" }}>
                            <Left style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                    <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                                </TouchableOpacity>
                            </Left>
                            <Body style={{ flex: 1 }}>
                            <Title style={{ fontSize: 22, color: "white" }}>{language(this.state.language,'Discussion Board')}</Title>
                            <Text style={{ color: "white" }}>{this.props.route.params.course_name}</Text>
                            </Body>
                            <Right style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => this.editDiscussionFlow()}>
                                    <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <View style={{ marginHorizontal: 5, marginBottom: 200 }}>
                            <TextInput style={styles.titleinput} defaultValue={this.state.discussion_title} onChangeText={this.setTitle}></TextInput>
                            <TextInput multiline style={styles.textinput} defaultValue={this.state.discussion_body} onChangeText={this.setBody}></TextInput>
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
        borderRadius: 7
    },
    titleinput: {
        marginTop: 5,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 7
    }

})