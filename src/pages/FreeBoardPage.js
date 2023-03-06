import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, StyleSheet, View, Alert, Image, TouchableOpacity, Button,RefreshControl,SafeAreaView,FlatList} from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Title, Body} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { SERVER_URL} from "@env"
import jTimago from '../JTimeago'
import language from '../Language'

export default class FreeBoardPage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {

            spinner : true,
            
            board_type : 'bulletin',
            postJson: [],
            pagingIndex:0,
            endPostId:-1,
            refreshing:false,
            language: ''
        }

       const {route}=this.props;

       this.getLanguage()

       this.renderPost()
    }
    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }

    renderPost = async () =>{
        const URL = `${SERVER_URL}`+ "/board/renderPost"
        try{

            const response = await fetch(URL,{
                method: "POST",
                body: JSON.stringify({
                    board_type: this.state.board_type,
                    pagingIndex:this.state.pagingIndex,
                    endPostId:this.state.endPostId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.status !=200){
                throw new Error("Something is wrong with bulletin board");
            }
            const responseJson = await response.json();
            for(var i=0;i<Object.keys(responseJson).length;i++){
                var joined = this.state.postJson.concat(responseJson[i])
                this.state.postJson = joined
                if(this.state.pagingIndex==0 && i==0){
                    this.state.endPostId = responseJson[i].post_id
                }
                
            }
            

        }catch(error){
            Alert.alert(error.message);
        }finally{
            this.setState({postJson: this.state.postJson,spinner:false,refreshing:false})
        }

    }

    componentDidMount(){
        this.props.navi.addListener('focus',this.load)
    }
    load = () => {

       
        

    }
    moremore = () =>{
        if(!(this.state.endPostId==-1 && this.state.pagingIndex==0)){
        this.setState({refreshing:true})
        this.state.pagingIndex=this.state.pagingIndex+1
        this.renderPost()
        }
    }

    scrollDown = async() =>{
        this.setState({refreshing:true})
        this.state.postJson=[]
       this.state.pagingIndex=0
       this.state.endPostId=-1
       await this.renderPost()
       this.setState({refreshing:false})
    }

    render() {
        try {
            if(this.props.route.params.changing){
                this.scrollDown()
                this.props.route.params.changing=false
            }
        } catch (error) {
            
        }
            
            
        const {route}=this.props;
        const { navi } = this.props;
        const posts = this.state.postJson; 

        const data = posts
        const renderItem =({item})=> (<TouchableOpacity key={item.post_id} style={styles.discussionView}  onPress={()=>{navi.navigate("ShowFreeBoardScreen",{like_count:item.like_count,post_id:item.post_id})}}>
         <View style={{flexDirection:'row'}}>
        <Text style={styles.user_id}>{item.user_id[0]}*****</Text><Text style={{fontSize:15}}> ∙ </Text>
        {this.state.language == 'j'
                                ? <Text style={{ color: "grey", fontSize: 16.5 }}>{jTimago(item.post_time)}</Text>
                                : <TimeAgo time={item.post_time} style={{color:"grey", fontSize:16.5}}/>
                                }
        </View>
        <Text style={styles.title}>{item.post_title}</Text>
       
        <View style={{flexDirection:'row', marginTop: 8, marginBottom: 5}}>
        <Text style={{fontSize : 16.5, color:"#595959"}}>{language(this.state.language,'likes')}</Text>
        <Text style={{fontSize : 16.5, color:"#595959"}}> {item.like_count}   </Text>
        <Text style={{fontSize : 16.5, color:"#595959"}}>{language(this.state.language,'comments')}</Text>
        <Text style={{fontSize : 16.5, color:"#595959"}}> {item.comment_count} </Text>
        
        </View>
        </TouchableOpacity>
        )

        
        
        return (
            <View style={{flex:1, marginBottom: 20}}>
                <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
        />
                <Header style={{backgroundColor:"white"}}>
                <Left style={{ flex: 0 }}>
                                <Icon name='checkmark-outline' style={{ color: "white" }} size={30} />

                            </Left>
                <Body style={{flex: 1,alignItems:'center'}}>
                    <Title style={{fontSize:22, color:"#6a0dad"}}>Community Board</Title>
                </Body>
                <Right style={{flex:0}}>
                <TouchableOpacity  onPress={()=>{navi.navigate("AddFreeBoardScreen",{board_type:this.state.board_type})}}>
                <Icon name='add-circle-outline' style={{color:"#6a0dad"}} size={30} />
                </TouchableOpacity>     
                </Right>
                </Header>
                <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.post_id)}
        onEndReached={()=>this.moremore()}
        refreshing={this.state.refreshing}
        onRefresh={()=>this.scrollDown()}
      />
                {/* <ScrollView
                 refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.scrollDown()}/>} onScroll={(e) => {
        let paddingToBottom = 10;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
          this.moremore()
        }}}
         style={{marginTop:10,zIndex:5}}>
            {postList}
            </ScrollView> */}
            </View>
        )
    }
    
}



const styles = StyleSheet.create({
    discussionView:{
        borderBottomWidth : 0.7,
        borderBottomColor : "gray",
        marginHorizontal : 5,
        marginTop: 5
    },
    user_id:{
        fontSize: 16.5
    },
    title:{
        fontSize: 20,
        fontWeight:"bold"
    }
})