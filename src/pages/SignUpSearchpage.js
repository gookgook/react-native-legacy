
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { SearchBar } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import language from '../Language'
import {checkCharacter} from '../Language'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
    }}>
        {children}
    </TouchableWithoutFeedback>
)

export default class SignUpSearchpage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchContents: "",
            courseJson: [],
            schoolList: [
                { label: 'All', value: '' }
            ],
            selectedSchool: "",
            creditList: [
                { label: 'All', value: '' }
            ],
            selectedCredit: '',
            isVisibleA: false,
            isVisibleB: false,
            maxDisplay: 10,
            advancedSearch: false,
            spinner: false,
            language:''
        }
        this.getSchoolList()
        this.getCreditList()
        this.getLanguage();
        
        if(this.props.route.params.count==1){
            Alert.alert(language(this.props.route.params.language,"Sign up is NOT done yet... Search Course you took and tell us about it"))
        }
    }

    
    getLanguage = async() => {
        this.state.language = await AsyncStorage.getItem('language')
        this.setState({tmp:true})
    }

    courseSearch = async () => {
        const URL = "http://13.231.20.191/reviewsearch/courseSearch"
        try {
            var currentC=checkCharacter(this.state.searchContents)
            if (this.state.selectedCredit == '' && this.state.selectedSchool == '' && this.state.searchContents.length <= 2 &&currentC!='kanji') {
                Alert.alert(language(this.state.language,'Please enter at least three letters'))
            } else {

                this.setState({ spinner: true })
                this.state.courseJson = []
                this.state.maxDisplay = 10
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        searchContents: this.state.searchContents,
                        selectedSchool: this.state.selectedSchool,
                        selectedCredit: this.state.selectedCredit,
                        language:this.state.language,
                        token: 'tempUser'
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.status != 200) {
                    throw new Error("Something is wrong");
                }
                if (response.text == 'error') {
                    throw new Error("Token doesn't exist");
                }
                const responseJson = await response.json();
                // var tmp;
                for (var i = 0; i < Object.keys(responseJson).length; i++) {
                    var joined = this.state.courseJson.concat(responseJson[i])
                    // tmp=joined
                    this.state.courseJson = joined

                    //this.setState({courseJson: joined})
                }
                this.setState({ courseJson: this.state.courseJson, spinner: false })
                if(this.state.courseJson.length==0)Alert.alert("No results found")

            }


        } catch (error) {
            Alert.alert(error.message);
        }
    }

    getSchoolList = async () => {
        const URL = "http://13.231.20.191/reviewsearch/getSchoolList"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    school_id: 1, //@@@@@@@@@@@@@@@@@@@ 이새끼 1 변수로 바꿔야 됌@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    token: 'tempUser'
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            if (response.text == 'error') {
                throw new Error("Token doesn't exist");
            }
            const responseJson = await response.json();
            // var tmp;
            for (var i = 0; i < Object.keys(responseJson).length; i++) {
                var joined = this.state.schoolList.concat({ label: responseJson[i], value: responseJson[i] })
                // tmp=joined
                this.state.schoolList = joined
                //this.setState({courseJson: joined})
            }
            this.setState({ schoolList: this.state.schoolList })

        } catch (error) {
            Alert.alert(error.message);
        }
    }

    getCreditList = async () => {
        const URL = "http://13.231.20.191/reviewsearch/getCreditList"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    school_id: 1, //@@@@@@@@@@@@@@@@@@@ 이새끼 1 변수로 바꿔야 됌@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    token: 'tempUser'
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            if (response.text == 'error') {
                throw new Error("Token doesn't exist");
            }
            const responseJson = await response.json();
            // var tmp;
            for (var i = 0; i < Object.keys(responseJson).length; i++) {
                var joined = this.state.creditList.concat({ label: responseJson[i], value: responseJson[i] })
                // tmp=joined
                this.state.creditList = joined
                //this.setState({courseJson: joined})
            }
            this.setState({ creditList: this.state.creditList })

        } catch (error) {
            Alert.alert(error.message);
        }
    }




    changeVisibility(state) {
        this.setState({
            isVisibleA: false,
            isVisibleB: false,
            ...state
        });
        Keyboard.dismiss()
    }

    setSearchContents = (text) => {
        this.setState({ searchContents: text })
        this.setState({ courseJson: [] })
    }



    moremore = () => {
        this.setState({ maxDisplay: (this.state.maxDisplay) + 10 })
    }

    createLogoutAlert() {
        Alert.alert(
            "Are you sure you want to logout?", "Tab OK or Cancel",
            [
                { text: "OK", onPress: () => this.logout() },
                { text: "Cancel" }
            ]
        )
    }
    isVerified(course) {
        if (course.isVerified) {
            this.props.navi.navigate("ReviewScreen", { course_name: course.course_name, course_id: course.course_id, professor: course.professor, school: course.school, course_credit: course.course_credit, course_code: course.course_code})
        } else {
            Alert.alert("Please do the verification process")
        }
    }
    advancedSearch() {
        if (this.state.advancedSearch == true) this.setState({ advancedSearch: false })
        else this.setState({ advancedSearch: true })
    }
    connect = async () => {
        const URL = "http://13.231.20.191/signupin/signupinsert";
        try {

            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    user_id: this.props.route.params.user_id,
                    user_password: this.props.route.params.user_password,
                    email: this.props.route.params.email,
                    recommendationCode : this.props.route.params.recommendationCode
                }),//서버랑 user_id이라는거 같아야함
                headers: {
                    "Content-Type": "application/json"
                }
            });
            var responseText = await response.text();
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            return responseText



        } catch (error) {
            Alert.alert(error.message);
        }

    }

    forAddReview = async (review) => {


        for (var i = 0; i < review.length; i++) {
            await this.addReviewSignUp(review[i])
        }
        Alert.alert('Welcome to Mate!')

    }

    addReviewSignUp = async (review) => {
        //Alert.alert("thank you for your review")
        const URL = "http://13.231.20.191/addreview/addreviewsignup"
        const { route } = this.props;

        try {

            const { navi } = this.props;
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    course_id: review.course_id,
                    reviewbody: review.reviewbody,
                    overallScore: review.overallScore,
                    assignmentScore: review.assignmentScore,
                    difficultyScore: review.difficultyScore,
                    examScore: review.examScore,
                    easeScore: review.easeScore,
                    satisfactionScore: review.satisfactionScore,
                    user_id: this.props.route.params.user_id

                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }

        } catch (error) {
            Alert.alert(error.message);
        }
    }

    async skip() {
        await this.connect()
        this.forAddReview(this.props.route.params.review)
        this.props.navi.navigate('Login')
    }
    render() {
        if (Platform.OS === 'android') {
            const { navi } = this.props;
            const courses = this.state.courseJson;

            const tmpCourseList = courses.map(
                (course) => (
                    <View key={course.course_id} style={{ marginTop: 18 }}>
                        <TouchableOpacity style={styles.courseButton} onPress={() => { navi.navigate('SignUpAddReview', { email: this.props.route.params.email, course_name: course.course_name, course_id: course.course_id, count: this.props.route.params.count, review: this.props.route.params.review, user_id: this.props.route.params.user_id, user_password: this.props.route.params.user_password, recommendationCode:this.props.route.params.recommendationCode }) }}>
                            <View style={{ marginVertical: 5 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 5 }}>{course.course_name}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ fontSize: 17 }}>{course.course_code}</Text><Text style={{ fontSize: 17 }}>  (20/21)</Text>
                                    </View>
                                    <Text style={{ color: "grey" }}>{course.professor}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>)
            );
            const courseList = new Array();
            for (var i = 0; i < Math.min(courses.length, this.state.maxDisplay); i++) {
                courseList.push(tmpCourseList[i])
            }

            var dropDownPicker = (
                <View >
                    <DropDownPicker
                        items={this.state.schoolList}
                        searchable={true}
                        searchablePlaceholder="Search for school"
                        placeholder="Select school"
                        defaultValue={this.state.selectedSchool}
                        containerStyle={{ height: 40 }}
                        dropDownStyle={{
                            height: 300 // Or     minHeight: 500
                        }}
                        dropDownMaxHeight={300}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        isVisible={this.state.isVisibleA}
                        onOpen={() =>
                            this.changeVisibility({
                                isVisibleA: true
                            })
                        }
                        onClose={() => this.setState({
                            isVisibleA: false
                        })}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            selectedSchool: item.value
                        })}
                    />
                    <DropDownPicker
                        items={this.state.creditList}
                        searchable={true}
                        searchablePlaceholder="Search for credit"
                        placeholder="Select credit"
                        defaultValue={this.state.selectedCredit}
                        containerStyle={{ height: 40 }}
                        dropDownStyle={{
                            height: 300 // Or     minHeight: 500
                        }}
                        dropDownMaxHeight={300}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        isVisible={this.state.isVisibleB}
                        onOpen={() => this.changeVisibility({
                            isVisibleB: true
                        })}
                        onClose={() => this.setState({
                            isVisibleB: false
                        })}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            selectedCredit: item.value
                        })}
                    />
                </View>
            )

            if (this.state.advancedSearch == false) {
                dropDownPicker = (<View></View>)
            }

            StatusBar.setBackgroundColor("#6a0dad", true)

            if (this.props.route.params.count == 4) {
                skipButton = (
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.skip()}>
                        <Text style={{ fontSize: 20, color: "#6a0dad" }}>SKIP</Text>
                    </TouchableOpacity>
                )
            } else {
                skipButton = (<View></View>)
            }
            return (
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        isVisibleA: false,
                        isVisibleB: false
                    })
                    Keyboard.dismiss()
                }}>
                    <View style={{ flex: 1 }}>
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
                            <Body style={{ flex: 1, alignItems: "center" }}>

                                <Title style={{ fontSize: 22, color: "white" }}>Course Search</Title>

                            </Body>
                            <Right style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => this.courseSearch()}>
                                    {<Icon name='checkmark-outline' style={{ color: "white" }} size={30} />}
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <View style={{ alignItems: "center" }}>{skipButton}</View>
                        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                            <SearchBar lightTheme={true} placeholderTextColor="#6a0dad" round={true} inputStyle={{ backgroundColor: "white", borderRadius: 15 }} containerStyle={{ backgroundColor: "#6a0dad", borderRadius: 20 }} inputContainerStyle={{ backgroundColor: "white" }}
                                onFocus={() => { this.setState({ isVisibleA: false, isVisibleB: false }) }} onSubmitEditing={this.courseSearch} placeholder="  Search course or professor" onChangeText={this.setSearchContents} value={this.state.searchContents}></SearchBar>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => { this.advancedSearch() }}><Text style={{ color: "gray", marginHorizontal: 15 }}>Advanced Search</Text></TouchableOpacity>
                        </View>
                        {dropDownPicker}
                        <ScrollView onScroll={(e) => {
                            let paddingToBottom = 10;
                            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                            if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                                this.moremore()
                            }
                        }}
                            style={{ marginTop: 10 }}>
                            <View style={{ marginLeft: 10, marginRight: 10 }}>{courseList}</View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {

            
            const { navi } = this.props;
            const courses = this.state.courseJson;

            var dropDownPicker = (
                <View style={{ zIndex: 10 }}>
                    <DropDownPicker
                        items={this.state.schoolList}
                        searchable={true}
                        searchablePlaceholder={language(this.state.language,"Search for school")}
                        placeholder={language(this.state.language,"Select school")}
                        defaultValue={this.state.selectedSchool}
                        containerStyle={{ height: 40 }}
                        dropDownStyle={{
                            height: 300 // Or     minHeight: 500
                        }}
                        dropDownMaxHeight={300}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        isVisible={this.state.isVisibleA}
                        onOpen={() =>
                            this.changeVisibility({
                                isVisibleA: true
                            })
                        }
                        onClose={() => this.setState({
                            isVisibleA: false
                        })}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            selectedSchool: item.value
                        })}
                    />
                    <DropDownPicker
                        items={this.state.creditList}
                        searchable={true}
                        searchablePlaceholder={language(this.state.language,"Search for credit")}
                        placeholder={language(this.state.language,"Select credit")}
                        defaultValue={this.state.selectedCredit}
                        containerStyle={{ height: 40 }}
                        dropDownStyle={{
                            height: 300 // Or     minHeight: 500
                        }}
                        dropDownMaxHeight={300}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        isVisible={this.state.isVisibleB}
                        onOpen={() => this.changeVisibility({
                            isVisibleB: true
                        })}
                        onClose={() => this.setState({
                            isVisibleB: false
                        })}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            selectedCredit: item.value
                        })}
                    />
                </View>
            )
            if (this.state.advancedSearch == false) {
                dropDownPicker = (<View></View>)
            }

            const tmpCourseList = courses.map(
                (course) => (<View style={{ marginTop: 18 }}>
                    <TouchableOpacity style={styles.courseButton} onPress={() => { navi.navigate('SignUpAddReview', { email: this.props.route.params.email, course_name: course.course_name, course_id: course.course_id, count: this.props.route.params.count, review: this.props.route.params.review, user_id: this.props.route.params.user_id, user_password: this.props.route.params.user_password,  recommendationCode:this.props.route.params.recommendationCode }) }}>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 5 }}>{course.course_name}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 17 }}>{course.course_code}</Text><Text style={{ fontSize: 17 }}>  ({course.course_year} {course.course_start})</Text>
                                </View>
                                {course.professor.length>20
                                ?<Text style={{ color: "grey" }}>{course.professor.substring(0,18)+'...'}</Text>
                                :<Text style={{ color: "grey" }}>{course.professor}</Text>}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>)
            );
            const courseList = new Array();
            for (var i = 0; i < Math.min(courses.length, this.state.maxDisplay); i++) {
                courseList.push(tmpCourseList[i])
            }

            if (this.props.route.params.count == 4) {
                skipButton = (
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.skip()}>
                        <Text style={{ fontSize: 20, color: "#6a0dad" }}>{language(this.state.language,'SKIP')}</Text>
                    </TouchableOpacity>
                )
            } else {
                skipButton = (<View></View>)
            }

            return (
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        isVisibleA: false,
                        isVisibleB: false
                    })
                    Keyboard.dismiss()
                }}>
                    <View style={{ flex: 1 }}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />
                        <Header style={{ backgroundColor: "white" }}>
                            <Left>

                                <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />
                            </Left>
                            <Body style={{ flex: 1 }}>
                                <View>
                                    <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/MatePurple.png')}></Image>
                                </View>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => this.courseSearch()}>
                                    {<Icon name='checkmark-outline' style={{ color: "#6a0dad" }} size={30} />}
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <View style={{ alignItems: "center" }}>{skipButton}</View>
                        <Text style={{alignSelf:"center", marginVertical:10, color:"gray", fontSize:22}}>{language(this.state.language,'Sign Up...Last Step')}</Text>
                        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <SearchBar lightTheme={true} placeholderTextColor="#6a0dad" round={true} inputStyle={{ backgroundColor: "white", borderRadius: 15 }} containerStyle={{ backgroundColor: "#6a0dad", borderRadius: 20 }} inputContainerStyle={{ backgroundColor: "white" }}
                                onFocus={() => { this.setState({ isVisibleA: false, isVisibleB: false }) }} onSubmitEditing={this.courseSearch} placeholder={"  "+language(this.state.language,"Search course or professor")} onChangeText={this.setSearchContents} value={this.state.searchContents}></SearchBar>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            {this.state.language == 'j'
                                ?<TouchableOpacity onPress={() => { this.advancedSearch() }}><Text style={{ color: "gray", marginHorizontal: 15, fontSize: 18 }}>{language(this.state.language,"Advanced Search")}</Text></TouchableOpacity>
                                :<TouchableOpacity onPress={() => { this.advancedSearch() }}><Text style={{ color: "gray", marginHorizontal: 15 }}>{language(this.state.language,"Advanced Search")}</Text></TouchableOpacity>}
                        </View>
                        {dropDownPicker}
                        <ScrollView onScroll={(e) => {
                            let paddingToBottom = 10;
                            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                            if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                                this.moremore()
                            }
                        }}
                            style={{ marginTop: 10, zIndex: 5 }}>
                            <View style={{ marginLeft: 10, marginRight: 10 }}>{courseList}</View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
}

const styles = StyleSheet.create({
    logoutbutton: {
        width: 100,
        height: 40,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#f08080"
    },
    verifybutton: {
        width: 100,
        height: 40,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#6495ed"
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop: 20
    },
    courseButton: {
        backgroundColor: "#FDFEFE",
        borderColor: '#00adb5',
        borderRadius: 7,
        elevation: 1
    }
})