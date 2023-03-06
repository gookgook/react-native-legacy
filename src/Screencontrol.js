import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Alert, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import LoginPage from './pages/MobileApp';
import MainPage from './pages/Mainpage';
import SignUpPage from './pages/Signuppage';
import ReviewPage from './pages/Reviewpage';
import AddReviewPage from './pages/AddReviewpage';
import Verifypage from './pages/Verifypage'
import Discussionpage from './pages/Discussionpage';
import AddDiscussionpage from './pages/AddDiscussionpage'
import ShowDiscussionpage from './pages/ShowDiscussionpage'
import Mypage from './pages/Mypage'
import FreeBoardPage from './pages/FreeBoardPage'
import ShowFreeBoardPage from './pages/ShowFreeBoardPage'
import EditReviewpage from './pages/EditReviewpage';
import EditDiscussionpage from './pages/EditDiscussionpage';
import SignUpSearchpage  from './pages/SignUpSearchpage.js'
import SignUpAddReviewpage from './pages/SignUpAddReviewpage'
import Descriptionpage from './pages/Descriptionpage'
import FindIdPwPage from './pages/FindIdPwPage'
import EditFreeBoardPage from './pages/EditFreeBoardPage'
import AddFreeBoardPage from './pages/AddFreeBoardPage'

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';



const Stack = createStackNavigator();
const ReviewStack = createStackNavigator();
const Tab = createBottomTabNavigator()




export default class ServerExample extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: "",
            id: "",
            pw: ""
        }
    }

    MainScreen = ({ navigation, route }) => {
        return (
            <MainPage
                navi={navigation}
                route={route}
            />
        )

    }

    FreeBoardScreen = ({ navigation, route }) => {
        return (
            <FreeBoardPage
                navi={navigation}
                route={route}
            />
        )

    }

    ShowFreeBoardScreen = ({ navigation, route }) => {
        return (
            <ShowFreeBoardPage
                navi={navigation}
                route={route}
            />
        )

    }

    VerifyScreen = ({ navigation, route }) => {
        return (
            <Verifypage
                navi={navigation}
                route={route}
            />
        )
    }

    ReviewScreen = ({ navigation, route }) => {
        return (
            <ReviewPage
                navi={navigation}
                route={route}
            />
        )

    }

    AddReviewScreen = ({ navigation, route }) => {
        return (
            <AddReviewPage
                navi={navigation}
                route={route}
            />
        )

    }

    SignUpScreen = ({ navigation, route }) => {
        return (
            <SignUpPage
                navi={navigation}
                route={route}
            />
        )

    }

    SignUpSearchScreen = ({ navigation, route }) => {
        return (
            <SignUpSearchpage
                navi={navigation}
                route={route}
            />
        )

    }

    SignUpAddReviewScreen = ({ navigation, route }) => {
        return (
            <SignUpAddReviewpage
                navi={navigation}
                route={route}
            />
        )

    }

    FindIdPwScreen = ({ navigation, route }) => {
        return (
            <FindIdPwPage
                navi={navigation}
                route={route}
            />
        )

    }

    LoginScreen = ({ navigation, route }) => {
        return (
            <LoginPage
                navi={navigation}
                route={route}
            />
        )

    }

    DiscussionScreen = ({ navigation, route }) => {
        return (
            <Discussionpage
                navi={navigation}
                route={route}
            />
        )

    }

    ShowDiscussionScreen = ({ navigation, route }) => {
        return (
            <ShowDiscussionpage
                navi={navigation}
                route={route}
            />
        )

    }


    AddDiscussionScreen = ({ navigation, route }) => {
        return (
            <AddDiscussionpage
                navi={navigation}
                route={route}
            />
        )

    }

    MyPageScreen = ({ navigation, route }) => {
        return (
            <Mypage
                navi={navigation}
                route={route}
            />
        )

    }

    EditReviewScreen = ({ navigation, route }) => {
        return (
            <EditReviewpage
                navi={navigation}
                route={route}
            />
        )

    }

    EditDiscussionScreen = ({ navigation, route }) => {
        return (
            <EditDiscussionpage
                navi={navigation}
                route={route}
            />
        )

    }

    DescriptionScreen = ({ navigation, route }) => {
        return (
            <Descriptionpage
                navi={navigation}
                route={route}
            />
        )

    }

    AddFreeBoardScreen = ({ navigation, route }) => {
        return (
            <AddFreeBoardPage
                navi={navigation}
                route={route}
            />
        )

    }

    EditFreeBoardScreen = ({ navigation, route }) => {
        return (
            <EditFreeBoardPage
                navi={navigation}
                route={route}
            />
        )

    }

    ShowFreeBoardScreen = ({ navigation, route }) => {
        return (
            <ShowFreeBoardPage
                navi={navigation}
                route={route}
            />
        )

    }

    tapNavigator = () =>{
        return(
            <Tab.Navigator activeColor="red" tabBarOptions={{
                activeBackgroundColor:"#6a0dad",
                showLabel:false,
                labelStyle: {
                    color:"#252a34",
                    fontSize: 15,
                    margin: 0,
                    padding: 0,
                  },
                keyboardHidesTabBar: true
             }}>
        <Tab.Screen options={{tabBarLabel:'Search',tabBarIcon:(()=><Icon size={17} name="search-outline"/>)}}  name="Main" component={this.MainScreen} />
        <Tab.Screen options={{tabBarLabel:'Free Board',tabBarIcon:(()=><FontAwesome5Icon size={14} name="chalkboard-teacher"/>)}} name="FreeBoardScreen"  component={this.FreeBoardScreen} />
        <Tab.Screen options={{tabBarLabel:'My page',tabBarIcon:(()=><Icon size={17} name="person-circle-outline"/>)}} name="MyPageScreen" component={this.MyPageScreen} />
      </Tab.Navigator>
        )
    }


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={this.LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FindIdPwScreen" options={{ headerShown: false }} component={this.FindIdPwScreen} />
                    <Stack.Screen name="Main"
                        component={this.tapNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }}  component={this.SignUpScreen} />
                    <Stack.Screen name="SignUpSearch" options={{ headerShown: false }} component={this.SignUpSearchScreen} />
                    <Stack.Screen name="SignUpAddReview" options={{ headerShown: false }} component={this.SignUpAddReviewScreen} />
                    <Stack.Screen name="ShowFreeBoardScreen"  options={{ headerShown: false }} component={this.ShowFreeBoardScreen} />
                    <Stack.Screen name="ReviewScreen" options={{ headerShown: false }}  component={this.ReviewScreen} />
                    <Stack.Screen name="AddReviewScreen" options={{ headerShown: false }} component={this.AddReviewScreen} />
                    <Stack.Screen name="EditReviewScreen" options={{ headerShown: false }} component={this.EditReviewScreen} />
                    <Stack.Screen name="DiscussionScreen" options={{ headerShown: false }} component={this.DiscussionScreen} />
                    <Stack.Screen name="ShowDiscussionScreen"  options={{ headerShown: false }} component={this.ShowDiscussionScreen} />
                    <Stack.Screen name="AddDiscussionScreen" options={{ headerShown: false }} component={this.AddDiscussionScreen} />
                    <Stack.Screen name="EditDiscussionScreen" options={{ headerShown: false }} component={this.EditDiscussionScreen} />
                    <Stack.Screen name="DescriptionScreen" options={{ headerShown: false }} component={this.DescriptionScreen} />
                    <Stack.Screen name="AddFreeBoardScreen" options={{ headerShown: false }} component={this.AddFreeBoardScreen} />
                    <Stack.Screen name="EditFreeBoardScreen"  options={{ headerShown: false }} component={this.EditFreeBoardScreen} />
                    <Stack.Screen name="VerifyScreen" component={this.VerifyScreen} />
                </Stack.Navigator>

            </NavigationContainer>
        )
    }


}

const styles = StyleSheet.create({})