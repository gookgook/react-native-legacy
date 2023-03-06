import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback,Keyboard,Alert } from 'react-native'
import { Header, Left, Right, Body,Title} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { SERVER_URL} from "@env"
import language from '../Language'
const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>   
)

export default class EditFreeBoardPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            post_title : "",
            post_body : "",
            spinner:false,
            language:''
        }
        this.getLanguage()
    }
    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }

    editPostFlow = async () => {
        //Alert.alert("thank you for your review")
        const URL = `${SERVER_URL}`+ "/board/editPost"
        const {route}=this.props;
        
        this.setState({spinner:true})
        if(this.state.post_title.length<1 || this.state.post_body.length<1){
            Alert.alert(language(this.state.language,"One or more questions is blank. Please check again"))
            this.setState({spinner:false})
        }else {
        try{
            
            const {navi}=this.props;
            const response = await fetch(URL,{
                method: "POST",
                body: JSON.stringify({
                    post_id : route.params.post_id,
                    post_title: this.state.post_title,
                    post_body: this.state.post_body,
                    token: await AsyncStorage.getItem('token')
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
             if(response.status !=200){
                throw new Error("Something is wrong");
            }
            if(response.text=='error'){
                throw new Error("Token doesn't exist");
            } 
            
        }catch(error){
            Alert.alert(error.message);
        }finally{
            this.props.navi.navigate("ShowFreeBoardScreen",{post_id: route.params.post_id, like_count: route.params.like_count,changing:true})
            
        }
    }
    }
    setTitle = (text) =>{
        this.state.post_title=text
        //this.setState({reviewbody:text})
    }
    setBody = (text) =>{
        this.state.post_body=text
        //this.setState({reviewbody:text})
    }
    componentDidMount(){
        this.props.navi.addListener('focus',this.load)
    }
    load = () => {
       this.setState({postJson : []})
       const {route}=this.props;
       this.setState({post_title : route.params.post_title})
       this.setState({post_body : route.params.post_body})
    }
    render() {
        return (
            
            <ScrollView>
                <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
        />
            <Header style={{backgroundColor:"white"}}>
                <Left style={{flex:0}}> 
                <TouchableOpacity onPress={()=>this.props.navi.goBack()}>
                <Icon name='arrow-back-outline' style={{color:"#6a0dad"}} size={30} />
                </TouchableOpacity>
                </Left>
                <Body style={{flex: 1,alignItems:'center'}}>
                    <Title style={{fontSize:22, color:"#6a0dad"}}>Community Board</Title>
                </Body>
                <Right style={{flex:0}}>
                <TouchableOpacity onPress={()=>this.editPostFlow()}>
                <Icon name='checkmark-outline' style={{color:"#6a0dad"}} size={30} />
                </TouchableOpacity>
                </Right>
                </Header>
                <View style={{marginHorizontal:5}}>
                <TextInput style={styles.titleinput} defaultValue={this.state.post_title} onChangeText={this.setTitle}></TextInput>
                <TextInput multiline style={styles.textinput} defaultValue={this.state.post_body}  onChangeText={this.setBody}></TextInput>
                </View>
                </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    textinput:{
        height:240,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 5,
        borderRadius : 7,
        paddingHorizontal:5
    },
    titleinput:{
        marginTop: 5,
        height:40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius : 7,
        paddingHorizontal:5
    }

})