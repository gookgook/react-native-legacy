import AsyncStorage from '@react-native-community/async-storage'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { Header, Left, Right, Title, Body, Button } from 'native-base';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import * as ImagePicker from 'react-native-image-picker';

import { SERVER_URL, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET, S3_VERSION, S3_BUCKET_BOARD_IMAGE,S3_END_POINT } from "@env"
import S3 from 'aws-sdk/clients/s3';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
import language from '../Language'

const KILO_BYTE = 1024
const MAX_UPLOAD_FILE_SIZE = 20000

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
    }}>
        {children}
    </TouchableWithoutFeedback>
)

const options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
};



export default class AddFreeBoardPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post_title: "",
            post_body: "",
            spinner: false,
            imageList: [],
            imageInfoList: [],
            sumFileSize: 0,
            language:''
        }
        this.getLanguage()
    }
    getLanguage = async() => {
        this.setState({language: await AsyncStorage.getItem('language')}) 
    }
    addPost = async () => {
        //Alert.alert("thank you for your review")
        const URL = `${SERVER_URL}` + "/board/addPost"
        const { route } = this.props;

        try {


            const { navi } = this.props;
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    board_type: route.params.board_type,
                    post_title: this.state.post_title,
                    post_body: this.state.post_body,
                    imageInfoList: this.state.imageInfoList,
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
            this.props.navi.navigate("FreeBoardScreen", { changing: true })
        }

    }


    setTitle = (text) => {
        this.state.post_title = text
        //this.setState({reviewbody:text})
    }
    setBody = (text) => {
        this.state.post_body = text
        //this.setState({reviewbody:text})
    }

    pickImage = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                if(!response.didCancel){
                    var tempImageList = this.state.imageList.concat({
                        uri: response.uri,
                        name: response.fileName,
                        size: response.fileSize,
                        type: 'image/jpeg'
                    })
                    this.setState({ imageList: tempImageList })
                    this.state.sumFileSize = this.state.sumFileSize + response.fileSize
                }
            }
        });
    }


    uploadImageOnS3 = async (image) => {
        const s3bucket = new S3({
            accessKeyId: S3_ACCESS_KEY,
            secretAccessKey: S3_SECRET_KEY,
            Bucket: S3_BUCKET,
            signatureVersion: S3_VERSION,
        })
        let contentType = 'image/jpeg';
        let contentDeposition = 'inline;filename="' + image.name + '"';
        const base64 = await fs.readFile(image.uri, 'base64');
        const arrayBuffer = decode(base64);
        s3bucket.createBucket(() => {
            const params = {
                Bucket: S3_BUCKET_BOARD_IMAGE,
                Key: image.name,
                Body: arrayBuffer,
                ContentDisposition: contentDeposition,
                ContentType: contentType,
            };
            s3bucket.upload(params, (err, data) => {
                if (err) {
                    console.log('error in callback');
                }
                console.log('success');
                console.log("Respomse URL : " + data.Location);
            });
        });
    };

    iterUploadImage = async () => {
        if (this.state.post_title.length < 1 || this.state.post_body.length < 1) {
            Alert.alert(language(this.state.language,'One or more questions is blank. Please check again'))
        } else {
            try {

                this.setState({ spinner: true })
                var overFlowFlag = false
                if (this.state.sumFileSize / KILO_BYTE > MAX_UPLOAD_FILE_SIZE) {
                    overFlowFlag = true
                    Alert.alert(language(this.state.language,'The file upload limit is total 20 MB'))
                } else {
                    for (var i = 0; i < this.state.imageList.length; i++) {
                        const image = this.state.imageList[i]
                        console.log(image)
                        this.uploadImageOnS3(image)
                        const uri = S3_END_POINT + image.name
                        var tempList = this.state.imageInfoList.concat({ file_link: uri, file_name: image.name, file_size: image.size })
                        this.state.imageInfoList = tempList
                    }
                }
            } catch (error) {
                Alert.alert(error)
            } finally {
                if (overFlowFlag) {
                    this.setState({ spinner: false })
                } else {
                    this.addPost()
                }
            }

        }
    }

    deleteImage = () => {
        this.state.sumFileSize = this.state.sumFileSize - this.state.imageList[this.state.imageList.length - 1].size
        this.state.imageList.pop()
        console.log(this.state.sumFileSize)
        this.setState({ imageList: this.state.imageList })
    }

    render() {

        const images = this.state.imageList
        const mapImageList = images.map(
            (image) => {
                if (image.uri != undefined) {
                    return (
                        <View>
                            <Image style={{ resizeMode: 'cover', width: 80, height: 80 }} source={{ uri: image.uri }}></Image>
                            <TouchableOpacity onPress={() => this.deleteImage()} style={{ alignSelf: 'center' }}>
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
        )

        return (

            <ScrollView>
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
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title style={{ fontSize: 22, color: "#6a0dad" }}>Community Board</Title>
                    </Body>
                    <Right style={{ flex: 0 }}>
                        <TouchableOpacity onPress={() => this.iterUploadImage()}>
                            <Icon name='checkmark-outline' style={{ color: "#6a0dad" }} size={30} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={{ marginHorizontal: 5 }}>

                    <TextInput style={styles.titleinput} placeholder={language(this.state.language,"Title")} onChangeText={this.setTitle}></TextInput>
                    <Text>{this.state.image}</Text>
                    {this.state.language == 'j'
                                ? <TextInput multiline style={styles.textinput} placeholder='自由に話してください！' onChangeText={this.setBody}></TextInput>
                                : <TextInput multiline style={styles.textinput} placeholder='Discuss freely about anything!' onChangeText={this.setBody}></TextInput>
                                }
                    
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.pickImage()}>
                            <View style={{flexDirection: 'row', marginTop:10}}>
                            <EntypoIcon name='camera' style={{ alignSelf: 'center', color: "#6a0dad", marginRight: 3 }} size={35}></EntypoIcon>
                            <AntDesignIcon name='pluscircleo' style={{ alignSelf: 'center', color: "#6a0dad" }} size={35}></AntDesignIcon>
                            </View>
                        </TouchableOpacity>
                        <ScrollView horizontal={true}>
                            {mapImageList}
                        </ScrollView>
                    </View>
                </View>

            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        height: 240,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 7,
        paddingHorizontal:10
    },
    titleinput: {
        marginTop: 5,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal:10
    }

})