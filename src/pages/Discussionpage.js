import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, Image, TouchableOpacity, Button, Platform } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage'

import language from '../Language'
import jTimago from '../JTimeago'

export default class Discussionpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            discussionJson: [],
            maxDisplay: 10,
            spinner: true,
            language : ''
        }
        this.getLanguage()

    }
    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }

    discussionrender = async (course_id) => {
        const URL = "http://13.231.20.191/discussion/discussionrender"
        try {
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({ course_id: course_id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong with discussion");
            }
            const responseJson = await response.json();
            for (var i = 0; i < Object.keys(responseJson).length; i++) {
                var joined = this.state.discussionJson.concat(responseJson[i])
                this.state.discussionJson = joined


            }
            //            this.setState({discussionJson: this.state.discussionJson})
            this.setState({ spinner: false })

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    componentDidMount() {
        this.props.navi.addListener('focus', this.load)
    }
    load = () => {
        this.setState({ discussionJson: [], spinner: true })
        const { route } = this.props;
        const currentCourseId = route.params.course_id
        this.discussionrender(currentCourseId)
    }
    moremore = () => {
        this.setState({ maxDisplay: (this.state.maxDisplay) + 10 })
    }

    render() {
        if (Platform.OS === 'android') {
            const {route}=this.props;
        const { navi } = this.props;
        const currentCourseId = route.params.course_id
        const discussions = this.state.discussionJson; 

        var tmpDiscussionList = discussions.map(
            (discussion)=>(
                <TouchableOpacity key={discussion.course_id} style={styles.discussionView}  onPress={()=>{navi.navigate("ShowDiscussionScreen",{discussion_id: discussion.discussion_id, like_count: discussion.like_count,course_id:currentCourseId,course_name:route.params.course_name})}}>
                <Text style={styles.title}>{discussion.discussion_title}</Text>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.user_id}>{discussion.user_id}</Text><Text style={{fontSize:15}}> | </Text>
                <TimeAgo time={discussion.post_time} style={{color:"grey", fontSize:16.5}}/>
               
                </View>
                <View style={{flexDirection:'row', marginTop: 8}}>
                <Text style={{fontSize : 16.5, color:"#595959"}}>comments</Text>
                <Text style={{fontSize : 16.5, color:"#595959"}}> {discussion.comment_count}   </Text>
                <Text style={{fontSize : 16.5, color:"#595959"}}>likes</Text>
                <Text style={{fontSize : 16.5, color:"#595959"}}> {discussion.like_count} </Text>
                </View>
                </TouchableOpacity>
            ));
        
        const discussionList=new Array();
        for(var i=0;i<Math.min(discussions.length,this.state.maxDisplay);i++){
            discussionList.push(tmpDiscussionList[i])
        }
        /*for(var i=discussions.length;i<10;i++){
            discussionList.push(<View style={styles.discussionView}></View>)
        }*/
        if(discussions.length==0){
            discussionList.push(
                <Text key={discussions.length} style={{fontSize:20, marginHorizontal:20, alignSelf:"center"}}>0 discussions yet</Text>
            )
        }
        
        return (
            <View style={{flex:1, marginBottom: 20}}>
                <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
        />
                <Header style={{backgroundColor:"#6a0dad"}}>
                <Left style={{flex: 0}}>
                <TouchableOpacity onPress={() => { this.props.navi.navigate("ReviewScreen",{changing:false}) }}>
                <Icon name='arrow-back-outline' style={{color:"white"}} size={30} />
                </TouchableOpacity>
                </Left>
                <Body style={{flex: 1,alignItems:'center'}}>
                    <Title style={{fontSize:22, color:"white"}}>Discussion Board</Title>
                    <Text style={{color:"white"}}>{this.props.route.params.course_name}</Text>
                </Body>
                <Right style={{flex:0}}>
                <TouchableOpacity  onPress={()=>{navi.navigate("AddDiscussionScreen",{course_id: currentCourseId,course_name: this.props.route.params.course_name})}}>
                <Icon name='add-circle-outline' style={{color:"white"}} size={30} />
                </TouchableOpacity>     
                </Right>
                </Header>
                <ScrollView onScroll={(e) => {
        let paddingToBottom = 10;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
          this.moremore()
        }}}
         style={{marginTop:10,zIndex:5}}>
            {discussionList}
            </ScrollView>
            </View>
        )

        } else {

            const { route } = this.props;
            const { navi } = this.props;
            const currentCourseId = route.params.course_id
            const discussions = this.state.discussionJson;

            var tmpDiscussionList = discussions.map(
                (discussion) => (
                    <TouchableOpacity style={styles.discussionView} onPress={() => { navi.navigate("ShowDiscussionScreen", { discussion_id: discussion.discussion_id, like_count: discussion.like_count, course_id: currentCourseId, course_name: route.params.course_name }) }}>
                        
                        <View style={{ flexDirection: 'row', marginTop:5 }}>
                            <Text style={styles.user_id}>{discussion.user_id[0]}*****</Text><Text style={{ fontSize: 15 }}> ∙ </Text>
                            {this.state.language == 'j'
                                ? <Text style={{ color: "grey", fontSize: 16.5 }}>{jTimago(discussion.post_time)}</Text>
                                : <TimeAgo time={discussion.post_time} style={{ color: "grey", fontSize: 16.5 }} />
                                }
                            
                        </View>
                        <Text style={styles.title}>{discussion.discussion_title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom:5 }}>
                        <Text style={{ fontSize: 16.5, color: "#595959" }}>{language(this.state.language,'likes')}</Text>
                            <Text style={{ fontSize: 16.5, color: "#595959" }}> {discussion.like_count}   </Text>
                            <Text style={{ fontSize: 16.5, color: "#595959" }}>{language(this.state.language,'comments')}</Text>
                            <Text style={{ fontSize: 16.5, color: "#595959" }}> {discussion.comment_count} </Text>
                            
                        </View>
                    </TouchableOpacity>
                ));

            const discussionList = new Array();
            for (var i = 0; i < Math.min(discussions.length, this.state.maxDisplay); i++) {
                discussionList.push(tmpDiscussionList[i])
            }
            /*for(var i=discussions.length;i<10;i++){
                discussionList.push(<View style={styles.discussionView}></View>)
            }*/
            if (discussions.length == 0) {
                discussionList.push(
                    <Text style={{ fontSize: 20, marginHorizontal: 20, alignSelf: "center" }}>{language(this.state.language,'0 discussions yet')}</Text>
                )
            }

            return (

                <View style={{ flex: 1, marginBottom: 20 }}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <Header style={{ backgroundColor: "white" }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { this.props.navi.navigate("ReviewScreen") }}>
                                <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title style={{ fontSize: 22, color: "#6a0dad" }}>{language(this.state.language,'Discussion Board')}</Title>
                            <Text style={{ color: "#6a0dad" }}>{this.props.route.params.course_name}</Text>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { navi.navigate("AddDiscussionScreen", { course_id: currentCourseId, course_name: this.props.route.params.course_name }) }}>
                                <Icon name='add-circle-outline' style={{ color: "#6a0dad" }} size={30} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <ScrollView onScroll={(e) => {
                        let paddingToBottom = 10;
                        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                            this.moremore()
                        }
                    }}
                        style={{ marginTop: 5, zIndex: 5 }}>
                        {discussionList}
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    discussionView: {

        borderBottomWidth: 0.7,
        borderBottomColor: "gray",
        marginHorizontal: 5
    },
    user_id: {
        fontSize: 20
    },
    title: {
        fontSize: 22,
        fontWeight:"bold"
    }
})