import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, Button, ScrollView, TouchableWithoutFeedback, Keyboard, Image, Platform, Modal, ImageBackground, TextInput } from 'react-native'
import { SearchBar } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { SERVER_URL } from '@env'
import language from '../Language'
import {checkCharacter} from '../Language'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
    }}>
        {children}
    </TouchableWithoutFeedback>
)

export default class Mainpage extends Component {
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
            alertBody: "sdf",
            IsNullNickname: false,
            nickname: '',
            language: ' '

        }
        this.getSchoolList()
        this.getCreditList()
        this.getAlert()
        this.IsNullNickname()
        this.getLanguage()
        
        //this.alertRender()

    }

    getLanguage = async() => {
        this.state.language = await AsyncStorage.getItem('language')
    }
    courseSearch = async () => {
        const URL = `${SERVER_URL}` + "/reviewsearch/courseSearch"
        //const URL = 'http://13.231.20.191/reviewsearch/courseSearch'
        try {
            var currentC=checkCharacter(this.state.searchContents)
            this.setState({ spinner: true })
            if (this.state.selectedCredit == '' && this.state.selectedSchool == '' && this.state.searchContents.length <= 2 && currentC!='kanji') {
                Alert.alert(language(this.state.language,'Please enter at least three letters'))
            } else {
                this.state.courseJson = []
                this.state.maxDisplay = 10
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        searchContents: this.state.searchContents,
                        selectedSchool: this.state.selectedSchool,
                        selectedCredit: this.state.selectedCredit,
                        language:this.state.language,
                        token: await AsyncStorage.getItem('token')
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
                
            if(this.state.courseJson.length==0)Alert.alert(language(this.state.language,"No results found"))

            }

            
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            this.setState({ courseJson: this.state.courseJson, spinner: false })
        }
    }
    getAlert = async () => {
        //const URL = `${SERVER_URL}` + "/reviewsearch/getSchoolList"
        const URL = 'http://13.231.20.191/reviewsearch/getAlert'
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    nothing: 'nothing'
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            const responseText = await response.text();
            Alert.alert("Welcome to Mate")
        } catch (error) {
            Alert.alert(error.message);
        }
    }


    getSchoolList = async () => {
        const URL = `${SERVER_URL}` + "/reviewsearch/getSchoolList"
        //const URL = 'http://13.231.20.191/reviewsearch/getSchoolList'
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    school_id: 1,
                    token: await AsyncStorage.getItem('token')

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
        const URL = `${SERVER_URL}` + "/reviewsearch/getCreditList"


        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    school_id: 1, //@@@@@@@@@@@@@@@@@@@ 이새끼 1 변수로 바꿔야 됌@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    token: await AsyncStorage.getItem('token')
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

    IsNullNickname = async () => {
        const URL = `${SERVER_URL}` + "/reviewsearch/IsNullNickname"
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
            if (response.text == 'error') {
                throw new Error("Token doesn't exist");
            }
            const responseJson = await response.json();
            this.setState({ IsNullNickname: responseJson.isNull })

        } catch (error) {
            Alert.alert(error.message);
        }
    }

    setNickname = async () => {
        const URL = `${SERVER_URL}` + "/reviewsearch/setNickname"
        if (this.state.nickname.length < 3) {
            Alert.alert(language(this.state.language,'Your nickname must be at least 3 characters long'))
        } else {
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        token: await AsyncStorage.getItem('token'),
                        nickname: this.state.nickname
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
                const responseText = await response.text();

                if (responseText == 'duplicate') {
                    Alert.alert(language(this.state.language,'This nickname already exists. Please try other nickname'))
                } else {
                    this.setState({ IsNullNickname: false })
                }



            } catch (error) {
                Alert.alert(error.message);
            }
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

    logout = async () => {
        this.props.navi.navigate("Login")
        await AsyncStorage.removeItem('token')
    }

    moremore = () => {

        this.setState({ maxDisplay: (this.state.maxDisplay) + 10 })
    }
    advancedSearch() {
        if (this.state.advancedSearch == true) this.setState({ advancedSearch: false })
        else this.setState({ advancedSearch: true })
    }

    setNicknameState = (text) => {
        this.state.nickname = text
    }

    render() {
        if (Platform.OS === 'android') {
            const { navi } = this.props;
            const courses = this.state.courseJson;

            const tmpCourseList = courses.map(
                (course) => (<View key={course.course_id} style={{ marginTop: 18 }}>
                    <TouchableOpacity style={androidStyles.courseButton} onPress={() => { navi.navigate("ReviewScreen", { course_name: course.course_name, course_id: course.course_id, professor: course.professor, school: course.school, course_credit: course.course_credit, course_code: course.course_code }) }}>
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
                        searchablePlaceholder={language(this.state.language,"Search for school")}
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
            if (this.state.IsNullNickname) {
                return (

                    <ImageBackground blurRadius={4} style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>
                        <ScrollView>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.IsNullNickname}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(this.state.IsNullNickname);
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    margin: 50,
                                }}>
                                    <Text>{language(this.state.language,'Choose your Nickname')}</Text>
                                    <View style={{ backgroundColor: 'grey', alignSelf: 'stretch', marginHorizontal: 10 }}>
                                        <TextInput onChangeText={(text) => this.setNicknameState(text)}></TextInput>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setNickname()}>
                                        <Text>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </ScrollView>
                    </ImageBackground>

                )
            } else {

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
                                    <Icon name='checkmark-outline' style={{ color: "#6a0dad" }} size={30} />

                                </Left>
                                <Body style={{ flex: 1, alignItems: 'center' }}>
                                    <View>
                                        <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/MateLogo.png')}></Image>
                                    </View>
                                </Body>
                                <Right style={{ flex: 0 }}>
                                    <TouchableOpacity onPress={() => this.courseSearch()}>
                                        <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />
                                    </TouchableOpacity>
                                </Right>
                            </Header>
                            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                                <SearchBar lightTheme={true} placeholderTextColor="#6a0dad" round={true} inputStyle={{ backgroundColor: "white", borderRadius: 15 }} containerStyle={{ backgroundColor: "#6a0dad", borderRadius: 20 }} inputContainerStyle={{ backgroundColor: "white" }}
                                    onFocus={() => { this.setState({ isVisibleA: false, isVisibleB: false }) }} onSubmitEditing={this.courseSearch} placeholder={"  "+language(this.state.language,"Search course or professor")} onChangeText={this.setSearchContents} value={this.state.searchContents}></SearchBar>
                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                {this.state.language == 'j'
                                ?<TouchableOpacity onPress={() => { this.advancedSearch() }}><Text style={{ color: "gray", marginHorizontal: 15, fontSize: 30 }}>{language(this.state.language,"Advanced Search")}</Text></TouchableOpacity>
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
                                style={{ marginTop: 10 }}>
                                <View style={{ marginLeft: 10, marginRight: 10 }}>{courseList}</View>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
        } else {
            const { navi } = this.props;
            const courses = this.state.courseJson;
            const tmpCourseList = courses.map(
                (course) => (<View style={{ marginTop: 18 }}>
                    <TouchableOpacity style={iosStyles.courseButton} onPress={() => { navi.navigate("ReviewScreen", { course_name: course.course_name, course_id: course.course_id, professor: course.professor, school: course.school, course_credit: course.course_credit, course_code: course.course_code,course_year: course.course_year, course_start : course.course_start }) }}>
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

            var dropDownPicker = (
                <View style={{ zIndex: 10 }}>
                    <DropDownPicker
                        items={this.state.schoolList}
                        searchable={true}
                        searchablePlaceholder={language(this.state.language,"Search for school")}
                        placeholder={language(this.state.language,"Select department")}
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
            if (this.state.IsNullNickname) {
                return (

                    <ImageBackground blurRadius={4} style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                        
                    }}>
                        <ScrollView>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.IsNullNickname}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(this.state.IsNullNickname);
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#6a0dad',
                                    
                                   
                                }}>
                                    <Text style={{color:"white", fontSize: 20}}>{language(this.state.language,'Choose your Nickname')}</Text>
                                    <View style={{ backgroundColor: '#6a0dad', alignSelf: 'stretch', marginHorizontal: 30, height: 30, marginVertical: 20 }}>
                                        <TextInput style={{
                                            backgroundColor: "white",
                                            borderRadius : 5,
                                            height:30,
                                            paddingLeft : 10
                                    }}
                                        placeholder={language(this.state.language,"Nickname")}
                                        onChangeText={(text) => this.setNicknameState(text)}></TextInput>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setNickname()}>
                                        <Text style={{color: "white", fontSize: 20}}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </ScrollView>
                    </ImageBackground>

                )
            } else {

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
                            <Header style={{ backgroundColor:"white"}}>
                                <Left style={{ flex: 0 }}>
                                    <Icon name='checkmark-outline' style={{ color: "transparent" }} size={30} />

                                </Left>
                                <Body style={{ flex: 1 }}>
                                    <View>
                                        <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/MatePurple.png')}></Image>
                                    </View>
                                </Body>
                                <Right style={{ flex: 0 }}>
                                    <TouchableOpacity onPress={() => this.courseSearch()}>
                                        <Icon name='checkmark-outline' style={{ color: "#6a0dad" }} size={30} />
                                    </TouchableOpacity>
                                </Right>
                            </Header>
                            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
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
}

const androidStyles = StyleSheet.create({
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

const iosStyles = StyleSheet.create({
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