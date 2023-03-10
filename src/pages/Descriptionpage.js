
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, LogBox, Platform, StatusBar } from 'react-native'


import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { Header, Left, Right, Title, Body, DeckSwiper } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage'
import language from '../Language'
import { lang } from 'moment';

LogBox.ignoreLogs(["Animated:"])




export default class Descriptionpage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cardCount: 1,
            toggle: "",
            tmp: false,
            language : this.props.route.params.language
        }
        if (Platform.OS == "android") {
            StatusBar.setBackgroundColor("#6a0dad", true)
        }
        
    }
    componentDidUpdate = () => {
        console.log('update')
    }
    goSearch = () => {
        this.props.navi.navigate("SignUpSearch", { email: this.props.route.params.email, count: 1, review: this.props.route.params.review, user_id: this.props.route.params.user_id, user_password: this.props.route.params.user_password, recommendationCode: this.props.route.params.recommendationCode, language:this.props.route.params.language})
    }

    render() {
        if(this.state.language=='e'){
        var cards = [
            {
                text: 'This project was created in order to create a database of the best courses/instructors for them. ',
                name: "one",
                count: 1
            },
            {
                text: 'The more course reviews you provide, the better help we can give.',
                name: "one",
                count: 2
            },
            {
                text: 'The more you help us, the more you can help yourself',
                name: "one",
                count: 3
            },
            {
                text: 'Oh and that is why we are asking for 3+1 reviews of your taken courses.',
                name: "one",
                count: 4
            },
            {
                text: 'Press "Next" at the top right.',
                name: "one",
                count: 5
            },
        
        ];
    }else{
        var cards = [
            {
                text: '??????????????????????????????????????????????????????/????????????????????????????????????????????????????????????????????????',
                name: "one",
                count: 1
            },
            {
                text: '????????????????????????????????????????????????????????????????????????????????????????????????????????????',
                name: "one",
                count: 2
            },
            {
                text: '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
                name: "one",
                count: 3
            },
            {
                text: '????????????????????????????????????????????????????????? 3+1????????????????????????????????????',
                name: "one",
                count: 4
            },
            {
                text: '????????????????????????????????????????????????www',
                name: "one",
                count: 5
            },
        
        ];

    }
        
        if (this.state.language=='j') {

            return (
                <View style={{ flex: 1, backgroundColor: "white" }}>
                <Header style={{ backgroundColor: "white" }}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                            <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <View>
                            
                        </View>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <TouchableOpacity >
                            <Text style={{ color: "white" }}>{language(this.state.language, 'NEXT')}</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={{flex:0.3,justifyContent:'center',marginHorizontal:40}}>
                    <Text style={{color:'#6a0dad',fontWeight:'bold',fontSize:25}}>
                        Welcome to{'\n'}
                        Your University
                    </Text>
                </View >
                <View style={{flex:0.4,justifyContent:'center',marginHorizontal:40}}>
                    <View>
                        <FontAwesomeIcon  name='chalkboard-teacher'  size={25} ></FontAwesomeIcon>
                        <Text style={{marginTop:5}}>
                        ??????????????????????????????????????????????????????{'\n'}
                        </Text>
                        <FontAwesomeIcon  name='user-friends'  size={25} ></FontAwesomeIcon>
                        <Text style={{marginTop:5}}>
                        ????????????????????????????????????????????????????????????????????????(??????????????????????????????????????????){'\n'}
                        </Text>
                        <Icon  name='school'  size={25} ></Icon>
                        <Text>
                        ??????????????????????????????????????????????????????????????????????????????
                        </Text>
                    </View>
                </View>
                <View style={{flex:0.3,marginHorizontal:20,alignItems:'center'}}>
                <View style={{flex:0.5}}></View>
                    <View style={{flex:0.5,marginHorizontal:20,alignItems:'center',alignSelf:'stretch',justifyContent:'center'}}>
    
                <TouchableOpacity style={{backgroundColor:'#6a0dad',alignSelf:'stretch',alignItems:'center',justifyContent:'center',height:50,borderRadius:25}} onPress={() => this.goSearch()}>
                            <Text style={{ color: "white",fontWeight:'bold',fontSize:20 }}>Start</Text>
                        </TouchableOpacity>
                        
                        </View>
                </View>
            </View>
            )
        } else {



            return (
                <View style={{ flex: 1, backgroundColor: "white" }}>
                <Header style={{ backgroundColor: "white" }}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                            <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <View>
                            
                        </View>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <TouchableOpacity >
                            <Text style={{ color: "white" }}>{language(this.state.language, 'NEXT')}</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={{flex:0.3,justifyContent:'center',marginHorizontal:40}}>
                    <Text style={{color:'#6a0dad',fontWeight:'bold',fontSize:25}}>
                        Welcome to{'\n'}
                        Your University
                    </Text>
                </View >
                <View style={{flex:0.4,justifyContent:'center',marginHorizontal:40}}>
                    <View>
                        <FontAwesomeIcon  name='chalkboard-teacher'  size={25} ></FontAwesomeIcon>
                        <Text style={{marginTop:5}}>
                            Create your own community.{'\n'}
                        </Text>
                        <FontAwesomeIcon  name='user-friends'  size={25} ></FontAwesomeIcon>
                        <Text style={{marginTop:5}}>
                            Tell your friends about the courses you took. (3 reviews to be specific){'\n'}
                        </Text>
                        <Icon  name='school'  size={25} ></Icon>
                        <Text>
                            It only takes 3mins to create your university.
                        </Text>
                    </View>
                </View>
                <View style={{flex:0.3,marginHorizontal:20,alignItems:'center'}}>
                <View style={{flex:0.5}}></View>
                    <View style={{flex:0.5,marginHorizontal:20,alignItems:'center',alignSelf:'stretch',justifyContent:'center'}}>
    
                <TouchableOpacity style={{backgroundColor:'#6a0dad',alignSelf:'stretch',alignItems:'center',justifyContent:'center',height:50,borderRadius:25}} onPress={() => this.goSearch()}>
                            <Text style={{ color: "white",fontWeight:'bold',fontSize:20 }}>Start</Text>
                        </TouchableOpacity>
                        
                        </View>
                </View>
            </View>
            )
        }
    }
}

const styles = StyleSheet.create({})