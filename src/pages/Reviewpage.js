import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, TouchableOpacity, ScrollView, Button, Image, Platform } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body } from 'native-base';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';
import { SERVER_URL} from "@env"
import language from '../Language'
import jTimago from '../JTimeago'

export default class Reviewpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviewJson: [],
            isFavorite: false,
            moreInfo: false,
            spinner: false,
            language : ''
        }
        this.getLanguage()
    }
    getLanguage = async() => {
        this.state.language = await AsyncStorage.getItem('language')
    }
    reviewrender = async (course_id) => {
        const URL = "http://13.231.20.191/reviewsearch/reviewrender"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    course_id: course_id,
                    token: await AsyncStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            const responseJson = await response.json();
            for (var i = 0; i < Object.keys(responseJson).length; i++) {
                var joined = this.state.reviewJson.concat(responseJson[i])
                this.state.reviewJson = joined

            }
            //this.setState({reviewJson:this.state.reviewJson})
            this.state.reviewJson = this.state.reviewJson

            this.setState({ spinner: false })

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    addFavorite = async (course_id) => {
        this.setState({ isFavorite: true })
        Alert.alert(language(this.state.language,"Added to My Courses"))
        const URL = "http://13.231.20.191/favorite/addFavorite"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    course_id: course_id,
                    token: await AsyncStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            //this.isFavorite(this.props.route.params.course_id)

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    deleteFavorite = async (course_id) => {
        const URL = "http://13.231.20.191/favorite/deleteFavorite"
        Alert.alert(language(this.state.language,"Removed from My Courses"))
        this.setState({ isFavorite: false })
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    course_id: course_id,
                    token: await AsyncStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            // this.isFavorite(this.props.route.params.course_id)

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    isFavorite = async (course_id) => {
        const URL = "http://13.231.20.191/favorite/isFavorite"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    course_id: course_id,
                    token: await AsyncStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            if (await response.text() == 'true') {
                this.setState({ isFavorite: true })
            } else {
                this.setState({ isFavorite: false })
            }
        } catch (error) {
            Alert.alert(error.message);
        }

    }

    moreInfo() {
        if (this.state.moreInfo == true) this.setState({ moreInfo: false })
        else this.setState({ moreInfo: true })
    }

    componentDidMount() {
        this.props.navi.addListener('focus', this.load)

    }
    load = () => {
        this.setState({ spinner: true, reviewJson: [] })
        const { route } = this.props;
        const currentCourseId = route.params.course_id
        this.reviewrender(currentCourseId)
        this.isFavorite(this.props.route.params.course_id)
    }
    findavg = (reviews) => {
        var avg = 0;
        var a = 0, b = 0, c = 0, d = 0, e = 0;
        var tmp = new Array()
        for (var i = 0; i < reviews.length; i++) {
            avg += reviews[i].overall_score
            a += reviews[i].assignment_score
            b += reviews[i].lecture_difficulty_score
            c += reviews[i].exam_score
            d += reviews[i].grade_ease_score
            e += reviews[i].satisfaction_score
        }
        avg /= reviews.length
        a /= reviews.length
        b /= reviews.length
        c /= reviews.length
        d /= reviews.length
        tmp.push(avg)
        tmp.push(a)
        tmp.push(b)
        tmp.push(c)
        tmp.push(d)
        return tmp
    }

    createDeleteAlert(review_id) {
        Alert.alert(
            language(this.state.language,"Do you want to delete this Review?"), language(this.state.language,"Tab OK or Cancel"),
            [
                { text: "OK", onPress: () => this.deleteReview(review_id) },
                { text: language(this.state.language,"Cancel") }
            ]
        )
    }
    createEditAlert(review) {
        const { route } = this.props
        Alert.alert(
            language(this.state.language,"Do you want to edit this Review?"), language(this.state.language,"Tab OK or Cancel"),
            [
                { text: "OK", onPress: () => this.props.navi.navigate("EditReviewScreen", { course_name: route.params.course_name, course_id: route.params.course_id, review: review,course_code:route.params.course_code }) },
                { text: language(this.state.language,"Cancel") }
            ]
        )
    }

    deleteReview = async (review_id) => {
        //Alert.alert("thank you for your review")
        const URL = "http://13.231.20.191/addreview/deleteReview"
        try {
            const { navi } = this.props;
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    review_id: review_id,
                    token: await AsyncStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(this.load())

            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            if (response.text == 'error') {
                throw new Error("Token doesn't exist");
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }
    assignmentText = (score) => {

        if (isNaN(score)) return language(this.state.language,"No reviews yet")
        else if (score < 1.7) return language(this.state.language,"Almost None")
        else if (1.7 < score && score < 3.4) return language(this.state.language,"Average")
        else return language(this.state.language,"A Lot")
    }
    difficultyText = (score) => {
        if (isNaN(score)) return language(this.state.language,"No reviews yet")
        else if (score < 1.7) return language(this.state.language,"Easy")
        else if (1.7 < score && score < 3.4) return language(this.state.language,"Average")
        else return language(this.state.language,"Hard")
    }
    difficultyGradeText = (score) => {
        if (isNaN(score)) return language(this.state.language,"No reviews yet")
        else if (score < 1.7) return language(this.state.language,"Easy")
        else if (1.7 < score && score < 3.4) return language(this.state.language,"Average")
        else return language(this.state.language,"Impossible to get A")
    }
    render() {
        if (Platform.OS === 'android') {
            const { navi } = this.props;
            const { route } = this.props;
            const currentCourseName = route.params.course_name;
            const reviews = this.state.reviewJson;

            let favoriteOpacity = null;

            var ratingArray = new Array()
            ratingArray = this.findavg(reviews)
            const avgrating = ratingArray[0]

            var moreInfo = (
                <View style={{ zIndex: 10, marginHorizontal: 5, marginTop: 10, marginBottom: 10 }}>

                    <Text style={{ fontSize: 18 }}>{language(this.state.language,'Amount of Assignment')}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[1].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.assignmentText(ratingArray[1])}</Text>
                    </View>

                    <Text style={{ fontSize: 18, marginTop: 5 }}>Difficulty of Lecture</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[2].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.difficultyText(ratingArray[2])}</Text>
                    </View>

                    <Text style={{ fontSize: 18, marginTop: 5 }}>Difficulty of Exam </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[3].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.difficultyText(ratingArray[3])}</Text>
                    </View>

                    <Text style={{ fontSize: 18, marginTop: 5 }}>Difficulty of Good Grade </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[4].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.difficultyGradeText(ratingArray[4])}</Text>
                    </View>

                </View>
            )
            var MoreClose = (<Text style={{ color: "gray", fontSize: 15 }}>{language(this.state.language,'Close')}</Text>)
            if (this.state.moreInfo == false) {
                moreInfo = (<View></View>)
                MoreClose = (<Text style={{ color: "gray", fontSize: 15 }}>{'+'+language(this.state.language,'More')}</Text>)
            }


            if (this.state.isFavorite) {
                favoriteOpacity = (<TouchableOpacity style={styles.addreview} onPress={() => {
                    this.deleteFavorite(route.params.course_id)
                }}>
                    <Image style={{ width: 21, height: 21 }} source={require('../../assets/favorite_full.png')} />

                </TouchableOpacity>)
            } else {
                favoriteOpacity = (<TouchableOpacity style={styles.addreview} onPress={() => {
                    this.addFavorite(route.params.course_id)
                }}>
                    <Image style={{ width: 21, height: 21 }} source={require('../../assets/favorite_empty.png')} />

                </TouchableOpacity>)

            }

            const reviewList = reviews.map(
                (review) => {
                    if (review.isMine) {
                        return (<View key={review.review_id} style={{ marginTop: 10, backgroundColor: "white", borderRadius: 7 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 5, marginTop: 3 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>{review.user_id}</Text>
                                <TimeAgo time={review.post_time} style={{ color: "grey" }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <StarRating
                                    disabled={true}
                                    containerStyle={{ width: 45, marginHorizontal: 5, marginBottom: 5, marginTop: 5 }}
                                    fullStarColor="#6a0dad"
                                    rating={review.overall_score}
                                    maxStars={5} />
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.createEditAlert(review)} >
                                        <Icon name='create-outline' style={{ color: "#6a0dad" }} size={25} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.createDeleteAlert(review.review_id)} style={{ marginHorizontal: 10 }}>
                                        <Icon name='trash-outline' style={{ color: "#6a0dad" }} size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, marginHorizontal: 7, marginBottom: 7 }}>{review.review_body}</Text>
                        </View>)
                    } else {
                        return (<View style={{ marginTop: 10, backgroundColor: "white", borderRadius: 7 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 5, marginTop: 3 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>{review.user_id}</Text>
                                {this.state.language == 'j'
                                ? <Text style={{ color: "grey", fontSize: 16.5 }}>{jTimago(review.post_time)}</Text>
                                : <TimeAgo time={review.post_time} style={{color:"grey", fontSize:16.5}}/>
                                }
                            </View>
                            <StarRating
                                disabled={true}
                                containerStyle={{ width: 45, marginHorizontal: 7, marginBottom: 5, marginTop: 5 }}
                                fullStarColor="#6a0dad"
                                rating={review.overall_score}
                                maxStars={5} />
                            <Text style={{ fontSize: 16, marginHorizontal: 7, marginBottom: 7 }}>{review.review_body}</Text>
                        </View>)
                    }
                }
            );

            if (reviews.length == 0) {
                return (
                    <View style={{ flex: 1 }}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />
                        <Header style={{ backgroundColor: "#6a0dad" }}>
                            <Left style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => { this.props.navi.navigate("Main") }}>
                                    <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                                </TouchableOpacity>
                            </Left>
                            <Body style={{ flex: 1, alignItems: 'center' }}>
                                <Title style={{ fontSize: 22, color: "white" }}>{currentCourseName}</Title>
                                <Text style={{ color: "white" }}>{route.params.course_code}</Text>
                            </Body>
                            <Right style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => { navi.navigate("AddReviewScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }}>
                                    <Icon name='add-circle-outline' style={{ color: "white" }} size={30} />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
                            <View style={styles.overallInfo}>
                                <View style={{ marginTop: 10, marginHorizontal: 5, marginBottom: 5, flexDirection: "row" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Professor </Text>
                                    <Text style={{ fontSize: 18, color: "#424949" }}>{route.params.professor}</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.course_credit + ' credits'} | 20/21</Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.school}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <StarRating
                                        disabled={true}
                                        containerStyle={{ width: 60, marginHorizontal: 7, marginBottom: 5, marginTop: 5 }}
                                        fullStarColor="#6a0dad"
                                        rating={avgrating}
                                        maxStars={5} />
                                    <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10, marginBottom: 5 }} onPress={() => { this.moreInfo() }}>
                                        {MoreClose}
                                    </TouchableOpacity>
                                </View>
                                {moreInfo}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 4.3, marginRight: 5 }}>
                                    <TouchableOpacity style={styles.addreview} onPress={() => { navi.navigate("DiscussionScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }} >
                                        <Text style={styles.addreviewtext}>{language(this.state.language,'Discussion Board')}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    {favoriteOpacity}
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}><Text style={{ alignSelf: "center", fontSize: 20, color: "gray" }}>Be the first one to review this course!</Text></View>
                        </ScrollView>
                    </View>
                )

            }

            return (

                <View style={{ flex: 1 }}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <Header style={{ backgroundColor: "#6a0dad" }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { this.props.navi.navigate("Main") }}>
                                <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1, alignItems: 'center' }}>
                            <Title style={{ fontSize: 22, color: "white" }}>{currentCourseName}</Title>
                            <Text style={{ color: "white" }}>{route.params.course_code}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { navi.navigate("AddReviewScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }}>
                                <Icon name='add-circle-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={styles.overallInfo}>
                            <View style={{ marginTop: 10, marginHorizontal: 5, marginBottom: 5, flexDirection: "row" }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Professor </Text>
                                <Text style={{ fontSize: 18, color: "#424949" }}>{route.params.professor}</Text>
                            </View>
                            <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.course_credit + ' credits'} | 20/21</Text>
                            <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.school}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <StarRating
                                    disabled={true}
                                    containerStyle={{ width: 60, marginHorizontal: 7, marginBottom: 5, marginTop: 5 }}
                                    fullStarColor="#6a0dad"
                                    rating={avgrating}
                                    maxStars={5} />
                                <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10, marginBottom: 5 }} onPress={() => { this.moreInfo() }}>
                                    {MoreClose}
                                </TouchableOpacity>
                            </View>
                            {moreInfo}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 4.3, marginRight: 5 }}>
                                <TouchableOpacity style={styles.addreview} onPress={() => { navi.navigate("DiscussionScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }} >
                                    <Text style={styles.addreviewtext}>Discussion Board</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginLeft: 5 }}>
                                {favoriteOpacity}
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>{reviewList}</View>
                    </ScrollView>
                </View>
            )
        } else {
            const { navi } = this.props;
            const { route } = this.props;
            const currentCourseName = route.params.course_name;
            const reviews = this.state.reviewJson;

            let favoriteOpacity = null;

            var ratingArray = new Array()
            ratingArray = this.findavg(reviews)
            const avgrating = ratingArray[0]

            var moreInfo = (
                <View style={{ zIndex: 10, marginHorizontal: 5, marginTop: 10, marginBottom: 10 }}>

                    <Text style={{ fontSize: 18 }}>{language(this.state.language,'Amount of Assignment')}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[1].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.assignmentText(ratingArray[1])}</Text>
                    </View>

                    <Text style={{ fontSize: 18, marginTop: 5 }}>{language(this.state.language,'Difficulty of Lecture')}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[2].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.difficultyText(ratingArray[2])}</Text>
                    </View>

                    <Text style={{ fontSize: 18, marginTop: 5 }}>{language(this.state.language,'Difficulty of Exam')} </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[3].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.difficultyText(ratingArray[3])}</Text>
                    </View>

                    <Text style={{ fontSize: 18, marginTop: 5 }}>{language(this.state.language,'Difficulty of Good Grade')} </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: "#6a0dad" }}>{ratingArray[4].toFixed(1)}/5</Text>
                        <Text style={{ marginHorizontal: 10, fontSize: 15, fontWeight: "bold" }}>{this.difficultyGradeText(ratingArray[4])}</Text>
                    </View>

                </View>
            )
            var MoreClose = (<Text style={{ color: "gray", fontSize: 15 }}>{language(this.state.language,'Close')}</Text>)
            if (this.state.moreInfo == false) {
                moreInfo = (<View></View>)
                MoreClose = (<Text style={{ color: "gray", fontSize: 15 }}>{'+'+language(this.state.language,'More')}</Text>)
            }


            if (this.state.isFavorite) {
                favoriteOpacity = (<TouchableOpacity style={styles.addreview} onPress={() => {
                    this.deleteFavorite(route.params.course_id)
                }}>
                    <Image style={{ width: 21, height: 21 }} source={require('../../assets/favorite_full.png')} />

                </TouchableOpacity>)
            } else {
                favoriteOpacity = (<TouchableOpacity style={styles.addreview} onPress={() => {
                    this.addFavorite(route.params.course_id)
                }}>
                    <Image style={{ width: 21, height: 21 }} source={require('../../assets/favorite_empty.png')} />

                </TouchableOpacity>)

            }

            const reviewList = reviews.map(
                (review) => {
                    if (review.isMine) {
                        return (<View style={{ marginTop: 10, backgroundColor: "white", borderRadius: 7 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 5, marginTop: 3 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>{review.user_id}</Text>
                                {this.state.language == 'j'
                                ? <Text style={{ color: "grey", fontSize: 16.5 }}>{jTimago(review.post_time)}</Text>
                                : <TimeAgo time={review.post_time} style={{color:"grey", fontSize:16.5}}/>
                                }
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <StarRating
                                    disabled={true}
                                    containerStyle={{ width: 45, marginHorizontal: 5, marginBottom: 5, marginTop: 5 }}
                                    fullStarColor="#6a0dad"
                                    rating={review.overall_score}
                                    maxStars={5} />
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.createEditAlert(review)} >
                                        <Icon name='create-outline' style={{ color: "#6a0dad" }} size={25} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.createDeleteAlert(review.review_id)} style={{ marginHorizontal: 10 }}>
                                        <Icon name='trash-outline' style={{ color: "#6a0dad" }} size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={{ fontSize: 16, marginHorizontal: 7, marginBottom: 7 }}>{review.review_body}</Text>
                        </View>)
                    } else {
                        return (<View style={{ marginTop: 10, backgroundColor: "white", borderRadius: 7 }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 5, marginTop: 3 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>{review.user_id}</Text>
                                {this.state.language == 'j'
                                ? <Text style={{ color: "grey", fontSize: 16.5 }}>{jTimago(review.post_time)}</Text>
                                : <TimeAgo time={review.post_time} style={{color:"grey", fontSize:16.5}}/>
                                }
                            </View>
                            <StarRating
                                disabled={true}
                                containerStyle={{ width: 45, marginHorizontal: 7, marginBottom: 5, marginTop: 5 }}
                                fullStarColor="#6a0dad"
                                rating={review.overall_score}
                                maxStars={5} />
                            <Text style={{ fontSize: 16, marginHorizontal: 7, marginBottom: 7 }}>{review.review_body}</Text>
                        </View>)
                    }
                }
            );

            if (reviews.length == 0) {
                return (
                    <View style={{ flex: 1 }}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />
                        <Header style={{ backgroundColor: "white" }}>
                            <Left style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => { this.props.navi.navigate("Main") }}>
                                    <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                                </TouchableOpacity>
                            </Left>
                            <Body style={{ flex: 1 }}>
                                <Title style={{ fontSize: 22, color: "#6a0dad" }}>{currentCourseName}</Title>
                                <Text style={{ color: "#6a0dad" }}>{route.params.course_code}</Text>
                            </Body>
                            <Right style={{ flex: 0 }}>
                                <TouchableOpacity onPress={() => { navi.navigate("AddReviewScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }}>
                                    <Icon name='add-circle-outline' style={{ color: "#6a0dad" }} size={30} />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
                            <View style={styles.overallInfo}>
                                <View style={{ marginTop: 10, marginHorizontal: 5, marginBottom: 5, flexDirection: "row" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{language(this.state.language,'Professor')} </Text>
                                    <Text style={{ fontSize: 18, color: "#424949" }}>{route.params.professor}</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.course_credit + ' credits'} | {route.params.course_year} {route.params.course_start}</Text>
                                <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.school}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <StarRating
                                        disabled={true}
                                        containerStyle={{ width: 60, marginHorizontal: 7, marginBottom: 5, marginTop: 5 }}
                                        fullStarColor="#6a0dad"
                                        rating={avgrating}
                                        maxStars={5} />
                                    <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10, marginBottom: 5 }} onPress={() => { this.moreInfo() }}>
                                        {MoreClose}
                                    </TouchableOpacity>
                                </View>
                                {moreInfo}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 4.3, marginRight: 5 }}>
                                    <TouchableOpacity style={styles.addreview} onPress={() => { navi.navigate("DiscussionScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }} >
                                        <Text style={styles.addreviewtext}>{language(this.state.language,'Discussion Board')}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    {favoriteOpacity}
                                </View>
                            </View>

                            <View style={{ marginTop: 10 }}><Text style={{ alignSelf: "center", fontSize: 20, color: "gray" }}>{language(this.state.language,'Be the first one to review this course!')}</Text></View>
                        </ScrollView>
                    </View>
                )

            }

            return (

                <View style={{ flex: 1 }}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <Header style={{ backgroundColor: "white" }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { this.props.navi.navigate("Main") }}>
                                <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title style={{ fontSize: 22, color: "#6a0dad" }}>{currentCourseName}</Title>
                            <Text style={{ color: "#6a0dad" }}>{route.params.course_code}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { navi.navigate("AddReviewScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }}>
                                <Icon name='add-circle-outline' style={{ color: "#6a0dad" }} size={30} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={styles.overallInfo}>
                            <View style={{ marginTop: 10, marginHorizontal: 5, marginBottom: 5, flexDirection: "row" }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{language(this.state.language,'Professor')} </Text>
                                <Text style={{ fontSize: 18, color: "#424949" }}>{route.params.professor}</Text>
                            </View>
                            <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.course_credit + ' credits'} | {route.params.course_year} {route.params.course_start}</Text>
                            <Text style={{ fontSize: 15, marginHorizontal: 5 }}>{route.params.school}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <StarRating
                                    disabled={true}
                                    containerStyle={{ width: 60, marginHorizontal: 7, marginBottom: 5, marginTop: 5 }}
                                    fullStarColor="#6a0dad"
                                    rating={avgrating}
                                    maxStars={5} />
                                <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10, marginBottom: 5 }} onPress={() => { this.moreInfo() }}>
                                    {MoreClose}
                                </TouchableOpacity>
                            </View>
                            {moreInfo}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 4.3, marginRight: 5 }}>
                                <TouchableOpacity style={styles.addreview} onPress={() => { navi.navigate("DiscussionScreen", { course_name: currentCourseName, course_id: route.params.course_id }) }} >
                                    <Text style={styles.addreviewtext}>{language(this.state.language,'Discussion Board')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginLeft: 5 }}>
                                {favoriteOpacity}
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>{reviewList}</View>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    addreview: {
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        elevation: 8,
        borderRadius: 10,
        alignSelf: 'stretch',
        alignItems: "center",
        textAlignVertical: "center",
        backgroundColor: "#6a0dad",
        padding: 12
    },
    addreviewtext: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center"
    },
    rating: {
        marginTop: 10,
        alignSelf: "flex-start",
        marginHorizontal: 10,
        marginBottom: 13
    },
    overallInfo: {
        marginTop: 10,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: "#6a0dad",
        borderRadius: 12
    }
})