import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, TouchableOpacity, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Modal, TouchableWithoutFeedback, Platform,Button } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import language from '../Language'
import jTimago from '../JTimeago'
import { SERVER_URL} from "@env"
import YoutubePlayer from 'react-native-youtube-iframe'


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
    }}>
        {children}
    </TouchableWithoutFeedback>
)

export default class ShowDiscussionpage extends Component {
    constructor(props) {
        super(props)
        const { route } = this.props;
        this.state = {
            discussionJson: [],
            commentJson: [],
            like_count: route.params.like_count,
            isLiked: false,
            addComment: "",
            spinner: false,
            playing: false,
            setPlaying: false,
            language : '',
            reportVisible : false,
            reportBody : '',
            whatreport : '',
            report_post_id: ''
        }
        this.getLanguage()
    }
    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }
    discussionRender = async (discussion_id) => {
        const URL = "http://13.231.20.191/discussion/showdiscussion"
        this.state.commentJson = []

        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    discussion_id: discussion_id,
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
            this.setState({ discussionJson: responseJson[0] })

            for (var i = 0; i < Object.keys(responseJson[1]).length; i++) {
                var joined = this.state.commentJson.concat(responseJson[1][i])
                this.state.commentJson = joined

            }
            this.setState({ commentJson: this.state.commentJson, spinner: false })

        } catch (error) {
            Alert.alert(error.message);
        }

    }
    likeFlow = async (discussion_id) => {
        if (this.state.isLiked == true) {
            Alert.alert(language(this.state.language,"You already liked this discussion"))
        } else {
            this.setState({ like_count: this.state.like_count + 1 })
            this.setState({ isLiked: true })
            const URL = "http://13.231.20.191/discussion/addlike"
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        discussion_id: discussion_id,
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
            } catch (error) {
                Alert.alert(error.message);
            }
        }

    }
    isLiked = async (discussion_id) => {
        const URL = "http://13.231.20.191/discussion/isLiked"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    discussion_id: discussion_id,
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
                this.setState({ isLiked: true })
            } else {
                this.setState({ isLiked: false })
            }

        } catch (error) {
            Alert.alert(error.message);
        }

    }
    addCommentFlow = async (discussion_id) => {
        this.setState({ spinner: true })
        const URL = "http://13.231.20.191/discussion/addComment"
        try {
            const { route } = this.props;
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    discussion_id: discussion_id,
                    comment_body: this.state.addComment,
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
            this.discussionRender(this.props.route.params.discussion_id)
        }



    }
    componentDidMount() {
        this.props.navi.addListener('focus', this.load)
    }
    load = () => {
        this.setState({ discussionJson: [], spinner: true })
        const { route } = this.props;
        this.discussionRender(route.params.discussion_id)
        this.isLiked(route.params.discussion_id)
    }
    setComment = (text) => {
        this.state.addComment = text
        //this.setState({reviewbody:text})
    }
    deleteDiscussionFlow = async (discussion_id) => {
        const URL = "http://13.231.20.191/discussion/deleteDiscussion"
        const { navi } = this.props
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    discussion_id: discussion_id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(navi.navigate("DiscussionScreen"))
        } catch (error) {
            Alert.alert(error.message);
        }
    }
    createDeleteAlert(discussion_id) {
        Alert.alert(
            language(this.state.language,"Do you want to delete this discussion?"), language(this.state.language,"Tab OK or Cancel"),
            [
                { text: "OK", onPress: () => this.deleteDiscussionFlow(discussion_id) },
                { text: language(this.state.language,"Cancel") }
            ]
        )
    }
    createEditAlert(discussion_id) {
        Alert.alert(
            language(this.state.language,"Do you want to edit this Discussion?"), language(this.state.language,"Tab OK or Cancel"),
            [
                { text: "OK", onPress: () => this.editDiscussionFlow(discussion_id) },
                { text: language(this.state.language,"Cancel") }
            ]
        )
    }

    createCommentDeleteAlert(comment_id, discussion_id) {
        Alert.alert(
            language(this.state.language,"Do you want to delete this Comment?"), language(this.state.language,"Tab OK or Cancel"),
            [
                { text: "OK", onPress: () => this.deleteCommentFlow(comment_id, discussion_id) },
                { text: language(this.state.language,"Cancel") }
            ]
        )
    }

    deleteCommentFlow = async (comment_id, discussion_id) => {
        const URL = "http://13.231.20.191/discussion/deleteComment"
        this.setState({ spinner: true })
        try {
            const { route } = this.props;
            await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    comment_id: comment_id,
                    discussion_id: discussion_id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

        } catch (error) {
            Alert.alert(error.message);
        } finally {
            this.state.commentJson = []
            this.discussionRender(this.props.route.params.discussion_id)
        }
    }
    editDiscussionFlow = () => {
        const { navi } = this.props
        const { route } = this.props
        const discussion = this.state.discussionJson;
        navi.navigate("EditDiscussionScreen", { discussion_id: discussion.discussion_id, discussion_title: discussion.discussion_title, discussion_body: discussion.discussion_body, like_count: route.params.like_count, course_name: route.params.course_name })
    }
    reportPostFlow = () => {
        this.setState({reportVisible : true})

    }
    createReportAlert(post_id){
        this.state.whatreport='discussion_post'
        this.state.report_post_id=post_id
        Alert.alert(
            language(this.state.language,"Do you want to Report this Discussion?"), language(this.state.language,"Tab OK or Cancel"),
            [
                {text: "OK",  onPress: ()=> this.reportPostFlow(post_id)},
                {text: language(this.state.language,"Cancel")}
            ]
        )
    }

    createReportAlertComment(post_id){
        this.state.whatreport='discussion_comment'
        this.state.report_post_id=post_id
        Alert.alert(
            language(this.state.language,"Do you want to Report this Comment?"), language(this.state.language,"Tab OK or Cancel"),
            [
                {text: "OK",  onPress: ()=> this.reportPostFlow(post_id)},
                {text: language(this.state.language,"Cancel")}
            ]
        )
    }
    sendReport = async () => {
        const URL = `${SERVER_URL}` + "/reviewsearch/sendReport"
        const discussion = this.state.discussionJson




        if (this.state.reportBody.length < 1) {
            Alert.alert(language(this.state.language,'Empty'))
        } else {
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        token: await AsyncStorage.getItem('token'),
                        report_body: this.state.reportBody,
                        post_id : this.state.report_post_id,
                        post_type : this.state.whatreport

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
                
                



            } catch (error) {
                Alert.alert(error.message);

                this.setState({reportVisible:false})
            } finally {
                this.setState({reportVisible:false})
            }
        }

    }
    setReportBody = (text) => {
        this.state.reportBody = text
    }
    render() {
        if (Platform.OS === 'android') {
            const discussion = this.state.discussionJson;
            const { route } = this.props;
            const { navi } = this.props;
            const comments = this.state.commentJson;

            var commentList = comments.map(
                (comment) => {
                    var deleteComment
                    if (comment.isMine) {
                        deleteComment = (
                            <TouchableOpacity key={comment.comment_id} onPress={() => { this.createCommentDeleteAlert(comment.comment_id, route.params.discussion_id) }}>
                                <Icon name='trash-outline' size={20} />
                            </TouchableOpacity>
                        )
                    } else {
                        deleteComment = (
                            <View key={comment.comment_id}></View>
                        )
                    }
                    return (
                        <View style={styles.eachComment}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontWeight: "bold" }}>{comment.user_id} | </Text>
                                <TimeAgo time={comment.post_time} style={{ color: "grey" }} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>{comment.comment_body}</Text>
                                {deleteComment}
                            </View>
                            <View style={{ marginTop: 10 }}></View>
                        </View>
                    )
                });

            var deleteModifyButton
            if (discussion.isMine) {
                deleteModifyButton = (
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { this.createDeleteAlert(route.params.discussion_id) }}>
                            <Icon name='trash-outline' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { /*this.editDiscussionFlow(route.params.discussion_id)*/this.createEditAlert(route.params.discussion_id) }}>
                            <Icon name='create-outline' size={25} />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                deleteModifyButton = (<View></View>)
            }

            time = ""
            if (discussion.post_time != undefined) {
                var time = discussion.post_time.toString()
                time = time.substring(0, 10) + "  " + time.substring(11, 16)
            }

            return (


                <View>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <Header style={{ backgroundColor: "#6a0dad" }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { navi.navigate("DiscussionScreen", { course_name: route.params.course_name, course_id: route.params.course_id, changing: this.state.changing }) }}>
                                <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1, alignItems: 'center' }}>
                            <Title style={{ fontSize: 22, color: "white" }}>Discussion Board</Title>
                            <Text style={{ color: "white" }}>{this.props.route.params.course_name}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                        </Right>
                    </Header>
                    <ScrollView style={{ marginHorizontal: 10}}>
                        <Text style={styles.user_id}>{discussion.user_id}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.post_time}>{time}</Text>
                            {deleteModifyButton}
                        </View>
                        <View style={styles.contentView}>
                            <Text style={styles.title}>{discussion.discussion_title}</Text>
                            <Text></Text>
                            <Text style={styles.body}>{discussion.discussion_body}</Text>
                        </View>
                        <TouchableOpacity style={styles.likeButton} onPress={() => { this.likeFlow(route.params.discussion_id) }}>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name='thumbs-up-outline' style={{ color: "white" }} size={20} /><Text style={{ fontWeight: "bold", color: "white", fontSize: 16.5 }}>  {this.state.like_count}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.comment}>{commentList}</View>
                        <View style={{ flexDirection: "row", marginHorizontal: 10, marginBottom: 20 }}>
                            <View style={{ flex: 5 }}>
                                <TextInput style={styles.commentInput} placeholder=" add comments" onChangeText={this.setComment}></TextInput>
                            </View>
                            <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { this.addCommentFlow(route.params.discussion_id) }}><Icon name='add-circle-outline' size={30} /></TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 50 }}></View>
                    </ScrollView>

                </View>

            )

        } else {
            const discussion = this.state.discussionJson;
            const { route } = this.props;
            const { navi } = this.props;
            const comments = this.state.commentJson;
            
            onStateChange = (state) => {
                if (state === "ended") {
                    this.setState({ setPlaying: false });
                    Alert.alert("video has finished playing!");
                }
            }, [];
/*<YoutubePlayer
        height={300}
        play={this.state.playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />*/

//      <Button title={this.state.playing ? "pause" : "play"} onPress={togglePlaying} />
            togglePlaying = () => {
                if (this.state.setPlaying == false) this.setState({ setPlaying: true })
                else this.setState({ setPlaying: true })
            }, [];

            var commentList = comments.map(
                (comment) => {
                    var deleteComment
                    if (comment.isMine) {
                        deleteComment = (
                            <TouchableOpacity  style={{alignSelf:"center"}} onPress={() => { this.createCommentDeleteAlert(comment.comment_id, route.params.discussion_id) }}>
                                <Icon name='trash-outline' size={20} />
                            </TouchableOpacity>
                        )
                    } else {
                        deleteComment = (
                            <TouchableOpacity key={comment.comment_id} style={{marginLeft:10,alignSelf:"center"}} onPress={() => { /*this.editDiscussionFlow(route.params.post_id)*/this.createReportAlertComment(comment.comment_id) }}>
                            <Icon name='alert-circle-outline' size={25} />
                            </TouchableOpacity>
                        )
                    }
                    return (
                        <View style={styles.eachComment}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{flex:5}}>
                                <View style={{ flexDirection: "row", marginTop: 4 }}>
                                <Text style={{ fontWeight: "bold" }}>{comment.user_id[0]}***** | </Text>
                                {this.state.language == 'j'
                                ? <Text style={{ color: "grey", fontSize: 16.5 }}>{jTimago(comment.post_time)}</Text>
                                : <TimeAgo time={comment.post_time} style={{color:"grey", fontSize:16.5}}/>
                                }
                            </View>
                            <Text>{comment.comment_body}</Text>
                            </View>
                            <View style={{ marginLeft:5, flexDirection: "row", alignContent:"center"}}>
                               
                                {deleteComment}
                            </View>
                            </View>
                            <View style={{ marginTop: 10 }}></View>
                        </View>
                    )
                });

            var deleteModifyButton
            if (discussion.isMine) {
                deleteModifyButton = (
                    <View style={{ flexDirection: "row", alignSelf:"center" }}>
                        <TouchableOpacity onPress={() => { this.createDeleteAlert(route.params.discussion_id) }}>
                            <Icon name='trash-outline' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { /*this.editDiscussionFlow(route.params.discussion_id)*/this.createEditAlert(route.params.discussion_id) }}>
                            <Icon name='create-outline' size={25} />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                deleteModifyButton = (<View style={{ flexDirection: "row", alignSelf:"center" }}>
                <TouchableOpacity style={{marginLeft:10}} onPress={() => { /*this.editDiscussionFlow(route.params.post_id)*/this.createReportAlert(route.params.discussion_id) }}>
                            <Icon name='alert-circle-outline' size={25} />
                            </TouchableOpacity>
                            </View>)
            }

            time = ""
            if (discussion.post_time != undefined) {
                var time = discussion.post_time.toString()
                time = time.substring(0, 10) + "  " + time.substring(11, 16)
            }

            return (
                <DismissKeyboard>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                        />
                        <View>
                            <Header style={{ backgroundColor: "white" }}>
                                <Left style={{ flex: 0 }}>
                                    <TouchableOpacity onPress={() => { navi.navigate("DiscussionScreen", { course_name: route.params.course_name, course_id: route.params.course_id }) }}>
                                        <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ flex: 1 }}>
                                    <Title style={{ fontSize: 22, color: "#6a0dad" }}>{language(this.state.language,'Discussion Board')}</Title>
                                    <Text style={{ color: "#6a0dad" }}>{this.props.route.params.course_name}</Text>
                                </Body>
                                <Right style={{ flex: 0 }}>
                                    <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                                </Right>
                            </Header>
                            <ScrollView style={{ marginHorizontal: 10, marginTop:8 }}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.reportVisible}
                            >
                                <View style={{
                                    flex: 1,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    margin: 50,
                                }}>
                                    <Text style={{fontSize:20}}>{language(this.state.language,'Report')}</Text>
                                    <View style={{ borderWidth:1, borderRadius:5, alignSelf: 'stretch', marginHorizontal: 10, marginTop:20, height:65 }}>
                                    {this.state.language == 'j'
                                ? <TextInput multiline style={{paddingHorizontal:5}} onChangeText={(text) => this.setReportBody(text)}  placeholder="報告した理由を記入してください。（攻撃的な発言、プライバシー侵害など）"></TextInput>
                                : <TextInput multiline style={{paddingHorizontal:5}} onChangeText={(text) => this.setReportBody(text)}  placeholder="Please help us understand what's going on. (Offensive content, Privacy concerns, etc.,)"></TextInput>
                                }
                                        
                                        
                                    </View>
                                    <TouchableOpacity style={{marginTop: 10}} onPress={() => this.sendReport()}>
                                        <Text>{language(this.state.language,'Submit')}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{marginTop:10}} onPress={()=>this.setState({reportVisible:false})}>
                                    <Text style={{fontSize:23}}>x</Text>
                                </TouchableOpacity>
                                </View>
                            </Modal>
                            
     
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                             <View>

                            <Text style={styles.user_id}>{discussion.user_id==undefined ? '' : discussion.user_id[0]+'*****'}</Text>
                            <Text style={styles.post_time}>{time}</Text>
                            </View>
                                <View style={{ flexDirection: "row" }}>
                                    
                                    {deleteModifyButton}
                                </View>
                                </View>
                                <View style={styles.contentView}>
                                    <Text style={styles.title}>{discussion.discussion_title}</Text>
                                    <Text></Text>
                                    <Text style={styles.body}>{discussion.discussion_body}</Text>
                                </View>
                                <TouchableOpacity style={styles.likeButton} onPress={() => { this.likeFlow(route.params.discussion_id) }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name='thumbs-up-outline' style={{ color: "white" }} size={20} /><Text style={{ fontWeight: "bold", color: "white", fontSize: 16.5 }}>  {this.state.like_count}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.comment}>{commentList}</View>
                                <View style={{ flexDirection: "row", marginHorizontal: 10, marginBottom: 20 }}>
                                    <View style={{ flex: 5 }}>
                                        <TextInput style={styles.commentInput} placeholder={language(this.state.language,"comments")} onChangeText={this.setComment}></TextInput>
                                    </View>
                                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { this.addCommentFlow(route.params.discussion_id) }}><Icon name='add-circle-outline' size={30} /></TouchableOpacity>
                                </View>
                            </ScrollView>

                        </View>
                    </KeyboardAwareScrollView>
                </DismissKeyboard>
            )
        }
    }
}

const styles = StyleSheet.create({
    body: {
        fontSize: 20
    },
    user_id: {
        fontSize: 18
    },
    title: {
        fontSize: 23,
        fontWeight: "bold"
    },
    post_time: {
        fontSize: 16,
        color: "grey"
    },
    contentView: {
        marginTop: 10
    },
    likeButton: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#6a0dad",
        width: 150,
        height: 50,
        padding: 10,
        alignSelf: "center",
        borderRadius: 20
    },
    comment: {
        marginTop: 15,
        borderTopColor: 'grey',
        borderTopWidth: 1.5
    },
    eachComment: {
        borderTopColor: 'grey',
        borderTopWidth: 1
    },
    commentInput: {
        marginTop: 5,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        alignSelf: "stretch",
        borderRadius: 7,
        paddingHorizontal: 10
    }
})