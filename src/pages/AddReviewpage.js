import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity, Platform, Button, TouchableWithoutFeedback, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body } from 'native-base';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';
import language from '../Language'


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';//@@@@@android에서는 지워야함
import {SERVER_URL} from '@env'

export default class AddReviewpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviewbody: "",
            overallScore: 2.5,
            assignmentScore: 2.5,
            difficultyScore: 2.5,
            examScore: 2.5,
            easeScore: 2.5,
            satisfactionScore : 5,
            spinner: false,
            language : '',
            tmp : false



        }
        this.getLanguage()
    }

    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
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
    

    /*afterfetch = () =>{
        Alert.alert("thank you for your review")
        const {navi}=this.props;
        navi.navigate("ReviewScreen")
    }*/
    addreviewflow = async () => {
        //Alert.alert("thank you for your review")
        const URL = `${SERVER_URL}`+"/addreview"
        const { route } = this.props;
        const currentCourseId = route.params.course_id
        if (this.state.reviewbody.length < 1) {
            Alert.alert(language(this.state.language,"One or more questions is blank. Please check again"))
        } else {

            try {
                const { navi } = this.props;
                this.setState({ spinner: true })
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        course_id: currentCourseId,
                        reviewbody: this.state.reviewbody,
                        overallScore: this.state.overallScore,
                        assignmentScore: this.state.assignmentScore,
                        difficultyScore: this.state.difficultyScore,
                        examScore: this.state.examScore,
                        easeScore: this.state.easeScore,
                        satisfactionScore: 5,
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
                this.props.navi.navigate("ReviewScreen",{changing:true})
            }
        }
    }

    render() {
        if (Platform.OS === 'android') {
            const { route } = this.props;
            const currentCourseName = route.params.course_name;
            return (

                <View>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <View>


                        <Header style={{ backgroundColor: "#6a0dad" }}>
                            <Left style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => this.props.navi.navigate("ReviewScreen", { changing: false })}>
                                    <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                                </TouchableOpacity>
                            </Left>
                            <Body style={{ flex: 1, alignItems: 'center' }}>
                                <Title style={{ fontSize: 22, color: "white" }}>Add Review</Title>
                                <Text style={{ color: "white" }}>{currentCourseName}</Text>
                            </Body>
                            <Right style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => this.addreviewflow()}>
                                    <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                    </View>
                    <ScrollView>
                        <View>

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
                                <TextInput multiline style={styles.textinput}
                                    placeholder="Share your thoughts about the Course. More detailed, better help your mates can get!" onChangeText={this.setReview}></TextInput>
                                <View style={{ height: 100 }}>
                                </View>

                            </View>

                        </View>
                    </ScrollView>
                </View>

            )
        } else {
            const { route } = this.props;
            const currentCourseName = route.params.course_name;
            return (
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
                            <Title style={{ fontSize: 22, color: "#6a0dad" }}>{language(this.state.language,'Add Review')}</Title>
                            <Text style={{ color: "#6a0dad" }}>{currentCourseName}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => this.addreviewflow()}>
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
                            {this.state.language == 'j'
                                ? <TextInput multiline style={styles.textinput} placeholder='科目についてあなたの感想を公有してくださ い。具体的であるほど、コミュニティ㆒のよ り多くの友達を助けることができます!' onChangeText={this.setReview}></TextInput>
                                : <TextInput multiline style={styles.textinput} placeholder='Share your thoughts about the Course. More detailed, better help your mates can get!' onChangeText={this.setReview}></TextInput>
                                }
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
        marginHorizontal: 5,
        paddingLeft : 10
    }

})