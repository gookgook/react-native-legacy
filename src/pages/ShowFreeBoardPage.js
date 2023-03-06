import AsyncStorage from '@react-native-community/async-storage'
import React, { Component,useState, useCallback, useRef } from 'react'
import { Text, StyleSheet, View, Alert, TouchableOpacity, Keyboard, ScrollView, TextInput,TouchableWithoutFeedback ,LogBox,Image,Modal,ImageBackground, Button} from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { SERVER_URL} from "@env"
import ImageView from 'react-native-image-view'
import YoutubePlayer from "react-native-youtube-iframe-2";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import language from '../Language'
import jTimago from '../JTimeago'
LogBox.ignoreLogs(["unique"])

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
    }}>
        {children}
    </TouchableWithoutFeedback>
)

 function App({videoId}) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

 

  return (
    <View>
      <YoutubePlayer
      webViewProps={{
        source: { baseUrl: "https://youtube.com" },
      }}
        height={300}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        
      />
    </View>
  );
}

export default class ShowFreeBoardPage extends Component {
    constructor(props) {
        super(props)
        const { route } = this.props;
        console.log(route.params)
        this.state = {
            postJson: [],
            commentJson: [],
            like_count: route.params.like_count,
            isLiked: false,
            addComment: "",
            spinner:true,
            changing:false,
            isImageViewVisible:false,
            imageViewIndex:0,
            reportVisible : false,
            reportBody : '',
            whatreport : '',
            report_post_id: ''

        }
        this.getLanguage()
        this.showPost()
        this.isLiked(route.params.post_id)
    }
    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }
    showPost = async () => {
        const URL = `${SERVER_URL}`+ "/board/showPost"
        this.state.commentJson = []
        
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    post_id: this.props.route.params.post_id,
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
            this.setState({ postJson: responseJson[0] })

            for (var i = 0; i < Object.keys(responseJson[1]).length; i++) {
                var joined = this.state.commentJson.concat(responseJson[1][i])
                this.state.commentJson = joined

            }
            this.setState({ commentJson: this.state.commentJson,spinner:false })

        } catch (error) {
            Alert.alert(error.message);
        }

    }
    likeFlow = async () => {
        if (this.state.isLiked == true) {
            Alert.alert(language(this.state.language,"You already liked this discussion"))
        } else {
            this.state.changing=true
            this.setState({ like_count: this.state.like_count + 1,isLiked : true })
            const URL = `${SERVER_URL}`+ "/board/addlike"
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        post_id: this.props.route.params.post_id,
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
    isLiked = async (post_id) => {
        const URL = `${SERVER_URL}`+ "/board/isLiked"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    post_id:post_id,
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
    addCommentFlow = async (post_id) => {
        
        const URL = `${SERVER_URL}`+ "/board/addComment"
        try {
            this.state.changing=true
            this.setState({spinner:true})
            const {route}=this.props;
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    post_id: post_id,
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
        }finally{
            this.showPost()
        }



    }
    componentDidMount() {
        this.props.navi.addListener('focus', this.load)
    }
    load = () => {
        
        if(this.props.route.params.changing==true){
        this.setState({ postJson: [],spinner:true })
        const { route } = this.props;
        this.showPost()
        this.isLiked(route.params.post_id)
    }
    }
    setComment = (text) => {
        this.state.addComment = text
    }
    reportPostFlow = () => {
        this.setState({reportVisible : true})

    }
    deletePostFlow = async (post_id) => {
        const URL = `${SERVER_URL}`+ "/board/deletePost"
        const { navi } = this.props
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    post_id: post_id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            Alert.alert(error.message);
        }finally{
            this.props.navi.navigate("FreeBoardScreen",{changing:true})
        }
    }
    createDeleteAlert(post_id) {
        Alert.alert(
            language(this.state.language,"Do you want to delete this discussion?"), language(this.state.language,"Tab OK or Cancel"),
            [
                {text: "OK",  onPress: ()=> this.deletePostFlow(post_id) },
                {text: language(this.state.language,"Cancel")}
            ]
        )
    }
    createEditAlert(post_id){
        Alert.alert(
            language(this.state.language,"Do you want to edit this Discussion?"), language(this.state.language,"Tab OK or Cancel"),
            [
                {text: "OK",  onPress: ()=> this.editPostFlow(post_id)},
                {text: language(this.state.language,"Cancel")}
            ]
        )
    }

    createReportAlert(post_id){
        this.state.whatreport='free_board_post'
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
        this.state.whatreport='free_board_comment'
        this.state.report_post_id=post_id
        Alert.alert(
            language(this.state.language,"Do you want to Report this Comment?"), language(this.state.language,"Tab OK or Cancel"),
            [
                {text: "OK",  onPress: ()=> this.reportPostFlow(post_id)},
                {text: language(this.state.language,"Cancel")}
            ]
        )
    }

    createCommentDeleteAlert(comment_id, post_id) {
        Alert.alert(
            language(this.state.language,"Do you want to delete this Comment?"), language(this.state.language,"Tab OK or Cancel"),
            [
                {text: "OK",  onPress: ()=> this.deleteCommentFlow(comment_id, post_id) },
                {text: language(this.state.language,"Cancel")}
            ]
        )
    }

    deleteCommentFlow = async (comment_id, post_id) => {
        const URL = `${SERVER_URL}`+ "/board/deleteComment"
        try {
            this.state.changing=true
            this.setState({spinner:true})
            const { route } = this.props;
            await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    comment_id: comment_id,
                    post_id : post_id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            

        } catch (error) {
            Alert.alert(error.message);
        }finally{
            this.setState({commentJson : []})
            this.showPost()
        }
    }
    editPostFlow = () => {
        const { navi } = this.props
        const { route } = this.props
        const post = this.state.postJson;
        navi.navigate("EditFreeBoardScreen", { post_id: post.post_id, post_title: post.post_title, post_body: post.post_body, like_count: this.state.like_count})
    }
    touchImage = (imageViewIndex) =>{
        this.setState({isImageViewVisible:true,imageViewIndex:imageViewIndex})
    }

    sendReport = async () => {
        const URL = `${SERVER_URL}` + "/reviewsearch/sendReport"
        const post = this.state.postJson
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

    closeImageView = () =>{
        this.setState({isImageViewVisible:false})
    }

    setReportBody = (text) => {
        this.state.reportBody = text
    }

    render() {
        

        const post = this.state.postJson;
        const { route } = this.props;
        const {navi}=this.props;
        const comments = this.state.commentJson;

        const file_link_list = post.file_link_list
        if(file_link_list!=[] && file_link_list!=undefined){
        var images = []
        for(var i=0;i<file_link_list.length;i++){
            images.push({source:{uri:file_link_list[i]}})
        }
        var imageList = file_link_list.map(
            (file_link,index) =>{
                return (<View style={{alignItems:"center", marginTop:15}}>
                    <TouchableOpacity onPress={()=>this.touchImage(index)}>
                    <Image style={{resizeMode:'contain',aspectRatio: 1, width: '95%', height:undefined}} source={{ uri: file_link }} ></Image>
                    </TouchableOpacity>
                </View>
                )
            }
        )}else{
            var imageList =(<View></View>)
        }
        //{resizeMode:'contain',aspectRatio: 1, width: '95%', height:undefined}
        const video_id_list = post.video_id_list
        
        if(video_id_list!=[] && video_id_list!=undefined){
            var videoList=video_id_list.map(
                (video_id,index)=>{
                    return(
                        <App videoId={video_id}></App>
                    )
                }
            )
        }else{
            var videoList=(<View></View>)
        }
        
        var commentList = comments.map(
            (comment) => {
                var deleteComment
                if(comment.isMine){
                    deleteComment = (
                        <TouchableOpacity key={comment.comment_id} style={{alignSelf:"center"}} onPress={() => { this.createCommentDeleteAlert(comment.comment_id,route.params.post_id) }}>
                            <Icon name='trash-outline' size={20} />
                        </TouchableOpacity>
                    )
                }else{
                    deleteComment = (
                        <TouchableOpacity key={comment.comment_id} style={{marginLeft:10, alignSelf:"center"}} onPress={() => { /*this.editDiscussionFlow(route.params.post_id)*/this.createReportAlertComment(comment.comment_id) }}>
                        <Icon name='alert-circle-outline' size={25} />
                        </TouchableOpacity>
                    )
                }
                return (                
                <View style={styles.eachComment}>
                    <View style={{flexDirection : 'row'}}>
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
                        <View style={{marginLeft:5,flexDirection:"row" ,alignContent:"center"}}>
                        {deleteComment}
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}></View>
                </View>
            )});

        var deleteModifyButton
        if (post.isMine) {
            deleteModifyButton = (
                <View style={{ flexDirection: "row", alignSelf:"center" }}>
                    <TouchableOpacity onPress={() => { this.createDeleteAlert(route.params.post_id)}}>
                    <Icon name='trash-outline' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:10}} onPress={() => { /*this.editDiscussionFlow(route.params.post_id)*/this.createEditAlert(route.params.post_id) }}>
                    <Icon name='create-outline' size={25} />
                    </TouchableOpacity>
                </View>
            )
        }else{
            deleteModifyButton =(<View style={{ flexDirection: "row", alignSelf:"center" }}>
            <TouchableOpacity style={{marginLeft:10}} onPress={() => { /*this.editDiscussionFlow(route.params.post_id)*/this.createReportAlert(route.params.post_id) }}>
                        <Icon name='alert-circle-outline' size={25} />
                        </TouchableOpacity>
                        </View>)
        }


        time =""  
        if(post.post_time!=undefined){
            var time  = new Date(new Date(post.post_time).getTime())
            console.log(post.post_time)
            time = time.toLocaleDateString("ja-JP", {timeZone: "Asia/Seoul"})+"  "+time.toLocaleTimeString("ja-JP", {timeZone: "Asia/Seoul"})
        }

        return (
            
            <KeyboardAwareScrollView extraScrollHeight={20} >
            <View>
                <ScrollView>
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
                        </ScrollView>
                        
                <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
        />
                <Header style={{backgroundColor:"white"}}>
                <Left style={{flex:0}}>
                <TouchableOpacity onPress={() => { navi.goBack()}}>
                <Icon name='arrow-back-outline' style={{color:"#6a0dad"}} size={30} />
                </TouchableOpacity>
                </Left>
                <Body style={{flex: 1,alignItems:'center'}}>
                    <Title style={{fontSize:22, color:"#6a0dad"}}>Community Board</Title>
                </Body>
                <Right style={{flex:0}}>
                <Icon name='arrow-back-outline' style={{color:"white"}} size={30} />
                </Right>
                </Header>
                <View style={{marginHorizontal:10, marginTop:8,}}>
                    
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                    <Text style={styles.user_id}>{post.user_id==undefined ? '' : post.user_id[0]+'*****'}</Text>
                    <Text style={styles.post_time}>{time}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        {deleteModifyButton}
                        </View>
                    </View>
                    
                    <View style={styles.contentView}>
                        
                        <ImageView images={images} isVisible={this.state.isImageViewVisible} imageIndex={this.state.imageViewIndex} onClose={()=>this.closeImageView()}></ImageView>
                        <Text style={styles.title}>{post.post_title}</Text>
                        {imageList}
                        {videoList}
                        <Text></Text>
                        <Text style={styles.body}>{post.post_body}</Text>
                    </View>
                    <TouchableOpacity style={styles.likeButton} onPress={() => { this.likeFlow() }}>
                        <View style={{ flexDirection: "row" }}>
                        <Icon name='thumbs-up-outline'  style={{color:"white"}} size={20} /><Text style={{fontWeight:"bold", color:"white",fontSize:16.5}}>  {this.state.like_count}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.comment}>{commentList}</View>
                    <View style={{ flexDirection: "row", marginHorizontal : 10,marginBottom:20, marginTop: 6}}>
                    <View style={{flex:5}}>
                    <TextInput style={styles.commentInput} placeholder={language(this.state.language,"comments")} onChangeText={this.setComment}></TextInput>
                    </View>
                    <View style={{flexDirection:"row",marginLeft:5, flex:0.5}}>
                    <TouchableOpacity style={{alignSelf :"center"}} onPress={() => { this.addCommentFlow(route.params.post_id) }}><Icon name='add-circle-outline' size={30} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{marginBottom:20}}></View>
               
                    
                </View>
            </View>
            </KeyboardAwareScrollView>
           
        )
    }
}

const styles = StyleSheet.create({
    body: {
        fontSize: 20
    },
    user_id: {
        fontSize: 16,
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
        marginTop: 15
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
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        alignSelf : "stretch",
        borderRadius : 7,
        paddingHorizontal:10
    }
})