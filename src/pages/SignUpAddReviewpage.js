import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Body, Right, Title } from 'native-base';
import StarRating from 'react-native-star-rating';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import language from '../Language'



export default class SignUpAddReviewpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviewbody: "",
            overallScore: 2.5,
            assignmentScore: 2.5,
            difficultyScore: 2.5,
            examScore: 2.5,
            easeScore: 2.5,
            satisfactionScore: 2.5,
            language : '',
            tmp : false



        }
        this.getLanguage()
    }

    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }
    componentDidMount() {
        this.props.navi.addListener('focus', this.load)
    }
    load = () => {

        var duplicate = false
        var i = 1
        var temp = -1
        while (i < this.props.route.params.count) {
            if (this.props.route.params.review[i - 1].course_id == this.props.route.params.course_id) {
                duplicate = true
                temp = i - 1
            }
            i++
        }

        if (duplicate) {
            review = this.props.route.params.review
            this.setState({
                reviewbody: review[temp].reviewbody,
                overallScore: review[temp].overallScore,
                assignmentScore: review[temp].assignmentScore,
                difficultyScore: review[temp].difficultyScore,
                examScore: review[temp].examScore,
                easeScore: review[temp].easeScore,
                satisfactionScore: review[temp].satisfactionScore
            })
        }
    }

    setReview = (text) => {
        this.setState({ reviewbody: text })
    }
    overallCompleted = (rating) => {
        this.setState({ overallScore: rating })
    }
    assignmentCompleted = (rating) => {
        this.setState({ assignmentScore: rating })
    }
    difficultyCompleted = (rating) => {
        this.setState({ difficultyScore: rating })
    }
    examCompleted = (rating) => {
        this.setState({ examScore: rating })
    }
    easeCompleted = (rating) => {
        this.setState({ easeScore: rating })
    }
    satisfactionCompleted = (rating) => {
        this.setState({ satisfactionScore: rating })
    }
    /*afterfetch = () =>{
        Alert.alert("thank you for your review")
        const {navi}=this.props;
        navi.navigate("ReviewScreen")
    }*/
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

    }




    async duplicateCheck(count, review) {
        var duplicate = false
        var i = 1
        while (i < count - 1) {
            if (review[i - 1].course_id == this.props.route.params.course_id) {
                duplicate = true
                temp = i - 1
            }
            i++
        }
        if (review[review.length - 1].reviewbody.length < 1) {
            Alert.alert("One or more questions is blank. Please check again.")
        } else {
            if (duplicate) {
                review[temp] = review.pop()
                count = count - 1
                Alert.alert(language(this.state.language,"No repetition, mate"))
                this.props.navi.navigate('SignUpSearch', { email: this.props.route.params.email, count: count, review: review, user_id: this.props.route.params.user_id, user_password: this.props.route.params.user_password, recommendationCode:this.props.route.params.recommendationCode })
            } else {
                if (count == 5) {
                    Alert.alert('Welcome to Mate!')
                    var a = await this.connect()
                    this.forAddReview(review)
                    this.props.navi.navigate('Login')
                } else {
                    Alert.alert((count - 1).toString() + '/4'+' '+language(this.state.language,'complete'))
                    this.props.navi.navigate('SignUpSearch', { email: this.props.route.params.email, count: count, review: review, user_id: this.props.route.params.user_id, user_password: this.props.route.params.user_password, recommendationCode:this.props.route.params.recommendationCode })
                }

            }
        }
    }

    render() {

        if (Platform.OS === 'android') {
            const { route } = this.props;
            const currentCourseName = route.params.course_name;
            var count = this.props.route.params.count + 1
            var tempList = new Array()
            tempList.push({
                course_id: route.params.course_id,
                reviewbody: this.state.reviewbody,
                overallScore: this.state.overallScore,
                assignmentScore: this.state.assignmentScore,
                difficultyScore: this.state.difficultyScore,
                examScore: this.state.examScore,
                easeScore: this.state.easeScore,
                satisfactionScore: this.state.satisfactionScore,
            })
            var review = this.props.route.params.review.concat(tempList)
            StatusBar.setBackgroundColor("#6a0dad", true)
            return (

                <View >
                    <Header style={{ backgroundColor: "#6a0dad" }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title style={{ fontSize: 22, color: "white", alignSelf: "center" }}>Add Review</Title>
                            <Text style={{ color: "white", alignSelf: "center" }}>{currentCourseName}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.duplicateCheck(count, review)}>
                                <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <ScrollView>
                        <View style={{ backgroundColor: "white" }}>
                            <View style={{ alignItems: "center", marginTop: 10 }}>


                                <Text style={{ fontSize: 18 }}>Amount of Assignment</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginRight: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>None</Text></View>
                                    <StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5 }} fullStarColor="#6a0dad" rating={this.state.assignmentScore} halfStarEnabled={true} selectedStar={(rating) => this.assignmentCompleted(rating)} smaxStars={5} />
                                    <View style={{ justifyContent: "center", marginLeft: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Tons</Text></View>
                                </View>

                                <Text style={{ fontSize: 18, marginTop: 20 }}>Difficulty of lecture</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginRight: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Easy</Text></View>
                                    <StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5 }} fullStarColor="#6a0dad" rating={this.state.difficultyScore} halfStarEnabled={true} selectedStar={(rating) => this.difficultyCompleted(rating)} smaxStars={5} />
                                    <View style={{ justifyContent: "center", marginLeft: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Hard</Text></View>
                                </View>


                                <Text style={{ fontSize: 18, marginTop: 20 }}>Difficulty of exam</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginRight: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Easy</Text></View>
                                    <StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5 }} fullStarColor="#6a0dad" rating={this.state.examScore} halfStarEnabled={true} selectedStar={(rating) => this.examCompleted(rating)} smaxStars={5} />
                                    <View style={{ justifyContent: "center", marginLeft: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Hard</Text></View>
                                </View>

                                <Text style={{ fontSize: 18, marginTop: 20 }}>Difficulty of good grade</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginRight: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Easy</Text></View>
                                    <StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5 }} fullStarColor="#6a0dad" rating={this.state.easeScore} halfStarEnabled={true} selectedStar={(rating) => this.easeCompleted(rating)} smaxStars={5} />
                                    <View style={{ justifyContent: "center", marginLeft: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Hard</Text></View>
                                </View>

                                <Text style={{ marginHorizontal: 10, marginTop: 33, color: "#404040" }}>Would you recommend this course to your friends?{"\n"}Give 5 if you think this was an amazing course.{"\n"}Give 1 if you regret taking this course.</Text>
                                <Text style={{ fontSize: 18, marginTop: 7 }}>Overall</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginRight: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Regret</Text></View>
                                    <StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5 }} fullStarColor="#6a0dad" rating={this.state.overallScore} halfStarEnabled={true} selectedStar={(rating) => this.overallCompleted(rating)} smaxStars={5} />
                                    <View style={{ justifyContent: "center", marginLeft: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>Great </Text></View>
                                </View>

                            </View>
                            <TextInput defaultValue={this.state.reviewbody} multiline style={styles.textinput}
                                placeholder="Share your thoughts about the Course. More detailed, better help your mates can get!" onChangeText={this.setReview}></TextInput>
                            <View style={{ height: 100 }}>
                            </View>

                        </View>
                    </ScrollView>
                </View>

            )
        } else {
            const { route } = this.props;
            const currentCourseName = route.params.course_name;
            var count = this.props.route.params.count + 1
            var tempList = new Array()
            tempList.push({
                course_id: route.params.course_id,
                reviewbody: this.state.reviewbody,
                overallScore: this.state.overallScore,
                assignmentScore: this.state.assignmentScore,
                difficultyScore: this.state.difficultyScore,
                examScore: this.state.examScore,
                easeScore: this.state.easeScore,
                satisfactionScore: this.state.satisfactionScore,
            })
            var review = this.props.route.params.review.concat(tempList)
            return (
                <View>
                    <Header style={{ backgroundColor: "white" }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title style={{ fontSize: 22, color: "#6a0dad" }}>Add Review</Title>
                            <Text style={{ color: "#6a0dad" }}>{currentCourseName}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.duplicateCheck(count, review)}>
                                <Icon name='checkmark-outline' style={{ color: "#6a0dad" }} size={30} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
                        <View style={{ backgroundColor: "white" }}>
                            <View style={{ alignItems: "center", marginTop: 10 }}>


                                <Text style={{ fontSize: 18 }}>{language(this.state.language,'Amount of Assignment')}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", flex: 1}}><Text style={{ color: "#6a0dad", fontSize: 18,alignSelf : "center" }}>{language(this.state.language,'None')}</Text></View>
                                    <View style={{flex:2.2 }}><StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5, alignSelf:"center" }} fullStarColor="#6a0dad" rating={this.state.assignmentScore} halfStarEnabled={true} selectedStar={(rating) => this.assignmentCompleted(rating)} smaxStars={5} /></View>
                                    <View style={{ justifyContent: "center",flex: 1 }}><Text style={{ color: "#6a0dad", fontSize: 18, alignSelf:"center" }}>{language(this.state.language,'Tons')}</Text></View>
                                </View>

                                <Text style={{ fontSize: 18, marginTop: 20 }}>{language(this.state.language,'Difficulty of Lecture')}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", flex: 1}}><Text style={{ color: "#6a0dad", fontSize: 18,alignSelf : "center" }}>{language(this.state.language,'Easy')}</Text></View>
                                    <View style={{flex:2.2 }}><StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5, alignSelf:"center" }} fullStarColor="#6a0dad" rating={this.state.difficultyScore} halfStarEnabled={true} selectedStar={(rating) => this.difficultyCompleted(rating)} smaxStars={5} /></View>
                                    <View style={{ justifyContent: "center", flex: 1 }}><Text style={{ color: "#6a0dad", fontSize: 18, alignSelf:"center" }}>{language(this.state.language,'Hard')}</Text></View>
                                </View>


                                <Text style={{ fontSize: 18, marginTop: 20 }}>{language(this.state.language,'Difficulty of Exam')}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", flex: 1}}><Text style={{ color: "#6a0dad", fontSize: 18, alignSelf:"center" }}>{language(this.state.language,'Easy')}</Text></View>
                                    <View style={{flex:2.2 }}><StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5, alignSelf:"center" }} fullStarColor="#6a0dad" rating={this.state.examScore} halfStarEnabled={true} selectedStar={(rating) => this.examCompleted(rating)} smaxStars={5} /></View>
                                    <View style={{ justifyContent: "center", flex : 1}}><Text style={{ color: "#6a0dad", fontSize: 18, alignSelf:"center" }}>{language(this.state.language,'Hard')}</Text></View>
                                </View>

                                <Text style={{ fontSize: 18, marginTop: 20 }}>{language(this.state.language,'Difficulty of Good Grade')}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", flex: 1}}><Text style={{ color: "#6a0dad", fontSize: 18, alignSelf:"center" }}>{language(this.state.language,'Easy')}</Text></View>
                                    <View style={{flex:2.2 }}><StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5, alignSelf:"center" }} fullStarColor="#6a0dad" rating={this.state.easeScore} halfStarEnabled={true} selectedStar={(rating) => this.easeCompleted(rating)} smaxStars={5} /></View>
                                    <View style={{ justifyContent: "center", flex:1}}><Text style={{ color: "#6a0dad", fontSize: 18, alignSelf:"center" }}>{language(this.state.language,'Hard')}</Text></View>
                                </View>

                                {this.state.language == 'e'
                                ?  <Text style={{ marginHorizontal: 10, marginTop: 33, color: "#404040", textAlign:"center"}}>Would you recommend this course to your friends?{'\n'}Give 5 if you think this was an amazing course.{'\n'}Give 1 if you regret taking this course</Text>
                                :  <Text style={{ marginHorizontal: 10, marginTop: 33, color: "#404040" }}>友達にこの科目を推薦しますか?満足でした ら5を付けてください。後悔したら1を付け てください。</Text>
                                }
                                <Text style={{ fontSize: 18, marginTop: 7 }}>{language(this.state.language,'Overall')}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginRight: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>{language(this.state.language,'Regret')}</Text></View>
                                    <StarRating disabled={false} containerStyle={{ marginBottom: 5, marginTop: 5 }} fullStarColor="#6a0dad" rating={this.state.overallScore} halfStarEnabled={true} selectedStar={(rating) => this.overallCompleted(rating)} smaxStars={5} />
                                    <View style={{ justifyContent: "center", marginLeft: 20 }}><Text style={{ color: "#6a0dad", fontSize: 18 }}>{language(this.state.language,'Great')} </Text></View>
                                </View>

                            </View>
                            <TextInput multiline style={styles.textinput}
                                placeholder={language(this.state.language,'Share your thoughts about the Course. More detailed, better help your mates can get!')} onChangeText={this.setReview}></TextInput>
                            <View style={{ height: 150 }}>
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    textinput: {
        marginTop: 30,
        height: 200,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 5
    }

})