import React, { Component } from 'react'
import { Text, TextInput, StyleSheet, View, TouchableOpacity, Alert, Dimensions, TouchableWithoutFeedback, Keyboard, Image, Platform , Modal, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/Ionicons'
import { Header, Left, Right, Body } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SERVER_URL} from "@env"

import language from '../Language'


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
    }}>
        {children}
    </TouchableWithoutFeedback>
)
var UserAgreement = () => (
    <View>
    <Text style={{fontWeight:'bold',fontSize:30}}>
            Mate User Agreement{'\n'}
    </Text>
    <Text>
    Hello, students! Mate User Agreement applies to your access to and use of websites, mobile applications, widgets, APIs, emails, and other online products and services provided by Mate, Inc.{'\n'}
    </Text>

    <Text style={{fontWeight:'bold'}}>
    Mate powers hundreds of thousands of distinct college communities.This is only possible through the Mate User Agreement and your conduct.{'\n'}
    </Text>

    <Text>
    Mate is for fun and intended to be a place for your entertainment. However, Mate still need rules. By accessing or using Mate’s Services, you agree to be bound by the Mate User Agreement. If you do not agree to the Mate User Agreement, you may not access or use Mate’s Services.{'\n'}
    </Text>
    <Text style={{fontWeight:'bold',fontSize:25}}>1. Terms</Text>
    <Text>
    <Text style={{fontWeight:'bold'}}>“Agreement”</Text> means Mate User Agreement;{'\n'}
    <Text style={{fontWeight:'bold'}}>“Mate”</Text> means Mate, Inc.;{'\n'}
    <Text style={{fontWeight:'bold'}}>“Services”</Text>  means your access to and use of websites, mobile applications, widgets, APIs,; emails, and other online products and services;{'\n'}
    <Text style={{fontWeight:'bold'}}>“Content”</Text>  means information, text, links, graphics, photos, videos, or other materials;{'\n'}
    <Text style={{fontWeight:'bold'}}>“Third-Party Content”</Text>  means contain links to third-party websites, products, or services, which may be posted by advertisers, Mate’s affiliates, Mate’s partners, or other users;{'\n'}
    <Text style={{fontWeight:'bold'}}>“Promotion”</Text>  means promotion, including a contest or sweepstakes;{'\n'}
    <Text style={{fontWeight:'bold'}}>“Mate Entities”</Text>  mean Mate’s directors, officers, employees, affiliates, agents, contractors, third-party service providers, and licensors;{'\n'}
    </Text>

    <Text style={{fontWeight:'bold',fontSize:25}}>2. Your Use of the Services</Text>
    <Text>Mate grants you a personal, non-transferable, non-exclusive, revocable, limited license to use and access the Services solely as permitted by the Agreement. Mate reserves all rights not expressly granted to you by the Agreement.{'\n'}</Text>

    <Text>Except as permitted by the Services or as by Mate in writing, your do not have the right to:{'\n'}</Text>
    <Text>· license, sell, transfer, assign, distribute, host, or otherwise commercially exploit the Services or the content of the Services; or</Text>
    <Text>· modify, prepare derivative works of, disassemble, decompile, or reverse engineer any part of the Services or content of the Services.</Text>
    <Text>Mate reserves the right to modify, suspend, or discontinue the Services in whole or in part at any time, with or without notice. Any future release, update, or addition to the functionality of the Services will be subject to this Agreement, which may be updated. You agree that Mate will not be liable to you or any third party for modification, suspension, or discontinuation of the Services or any part thereof.{'\n'}</Text>
    
    <Text style={{fontWeight:'bold',fontSize:25}}>3. Your Account and Account Security</Text>
    <Text>To use certain features of the Services, you may be required to create a Mate account and provide us with a username, password, and certain information about yourself.{'\n'}</Text>
    <Text>You are solely responsible for the information associated with your account and anything that happens related to your account. You must maintain the security of your account and immediately notify Mate if you discover or suspect that your account has been breached or hacked. We recommend that you use a strong password that is only used for your Mate account.{'\n'}</Text>
    <Text>You can not license, sell, or transfer your account without Mate’s prior written approval.{'\n'}</Text>

    <Text style={{fontWeight:'bold',fontSize:25}}>4. Your Content</Text>
    <Text>The Content includes information, text, links, graphics, photos, videos, or other materials created or submitted to the Services by you or through your account. Mate takes no responsibility for and does not expressly or implicitly endorse, support, or guarantee the completeness, truthfulness, accuracy, or reliability of any of the Content.{'\n'}</Text>
    <Text>By submitting Content to the Services, you represent and warrant that you have all rights, power, and authority necessary to grant the rights to the Content contained in the Agreement. Therefore, you may expose yourself to liability if you post or share Content without all necessary rights.{'\n'}</Text>
    <Text>You retain any ownership rights you have when you submit Content to or create Content through the Services. However, you grant Mate the following:</Text>
    <Text>· A worldwide, royalty-free, perpetual, irrevocable, non-exclusive, transferable, and sublicensable license to use, copy, modify, adapt, prepare derivative works of, distribute, store, perform, and display the Content and any name, username, voice, or likeness provided in connection with the Content in all media formats and channels now known or later developed anywhere in the world; </Text>
    <Text>· the right for Mate to make the Content available for syndication, broadcast, distribution, or publication by other companies, organizations, or individuals who partner with Mate; and</Text>
    <Text>· the right for Mate to remove metadata associated with the Content.{'\n'}</Text>
    <Text>When you submit Content to the Services, you waive any claims and assertions of moral rights or attribution with respect to the Content.{'\n'}</Text>
    <Text>Any ideas, suggestions, and feedback about Mate or Services that you provide to Mate are entirely voluntary. You agree that Mate may use such ideas, suggestions, and feedback without compensation or obligation to you.{'\n'}</Text>
    <Text>Although Mate has no obligation to screen, edit, or monitor the Content, Mate may, in its sole discretion, delete or remove the Content at any time and for any reason, including violation of the Agreement, violation Mate’s Content Policy, or if you otherwise create or are likely to create liability for Mate.{'\n'}</Text>
    
    <Text style={{fontWeight:'bold',fontSize:25}}>5. Third-Party Content, Advertisements, and Promotions</Text>
    <Text>Third-Party Content is not under Mate’s control, and Mate is not responsible for any third party’s websites, products, or services. Your use of Third-Party Content is at your own risk and you should make any investigation you feel necessary before proceeding with any transaction in connection with Third-Party Content.{'\n'}</Text>
    <Text>The Services may also contain sponsored Third-Party Content or advertisements. The type, degree, and targeting of advertisements are subject to change. You acknowledge and agree that Mate may place advertisements in connection with the display of any Content or information on the Services, including the Content.{'\n'}</Text>
    <Text>If you choose to use the Services to conduct a Promotion, you alone are responsible for conducting the Promotion in compliance with all applicable laws and regulations at your own risk. Your Promotion must state that the Promotion is not sponsored by, endorsed by, or associated with Mate, and the rules for your Promotion must require each entrant or participant to release Mate from any liability related to the Promotion.{'\n'}</Text>
    
    <Text style={{fontWeight:'bold',fontSize:25}}>6. Things You Cannot Do</Text>
    <Text>When using or accessing Mate, you must comply with the Agreement and all applicable laws, rules, and regulations. Please review the Content Policy, which is part of this Agreement and contain Mate’s rules about prohibited content and conduct. In addition to what is prohibited in the Content Policy, you may not do any of the following:{'\n'}</Text>
    <Text>· Use the Services in any manner that could interfere with, disable, disrupt, overburden, or otherwise impair the Services;</Text>
    <Text>· Gain access to (or attempt to gain access to) another user’s Mate account or any non-public portions of the Services, including the computer systems or networks connected to or used together with the Services; </Text>
    <Text>· Upload, transmit, or distribute to or through the Services any viruses, worms, malicious code, or other software intended to interfere with the Services, including its security-related features; </Text>
    <Text>· Use the Services to violate applicable law or infringe any person’s or entity's intellectual property rights or any other proprietary rights;</Text>
    <Text>· Access, search, or collect data from the Services by any means (automated or otherwise) except as permitted in this Agreement or in a separate agreement with Mate. Mate conditionally grants permission to crawl the Services in accordance with the parameters set forth in Mate’s robots.txt file, but scraping the Services without Mate’s prior consent is prohibited; and</Text>
    <Text>· Use the Services in any manner that Mate reasonably believes to be an abuse of or fraud on Mate or any payment system.</Text>
    <Text>Mate encourages you to report content or conduct that you believe violates this Agreement or our Content Policy. Mate also supports the responsible reporting of security vulnerabilities. To report a security issue, please email mateverify@gmail.com.{'\n'}</Text>

    <Text style={{fontWeight:'bold',fontSize:25}}>7. Copyright, Trademark, the DMCA, and Takedowns</Text>
    <Text>Mate respects the intellectual property of others and requires that users of the Services do the same. Mate has a policy that includes the removal of any infringing material from the Services and for the termination, in appropriate circumstances, of users of the Services who repeat infringements.{'\n'} </Text>
    <Text>Mate, Inc.</Text>
    <Text>mateverify@gmail.com{'\n'}</Text>
    <Text>If you want to report security issues, please send email to the email address written above.{'\n'}</Text>
    <Text>Please note that if you knowingly misrepresent that any activity or material on our Service is infringing, you may be liable to Mate for certain costs and damages.{'\n'}</Text>
    <Text>If Mate removes the Content you submitted in response to a copyright or trademark notice, Mate will notify you via Mate’s private messaging system. {'\n'}</Text>

    <Text style={{fontWeight:'bold',fontSize:25}}>8. Indemnity</Text>
    <Text>Except to the extent prohibited by law, you agree to defend, indemnify, and hold Mate and Mate Entities harmless from any claim or demand, including costs and attorneys’ fees, made by any third party due to or arising out of (a) your use of the Services, (b) your violation of the Agreement, (c) your violation of applicable laws or regulations, or (d) the Content. Mate reserves the right to control the defense of any matter for which you are required to indemnify Mate, and you agree to cooperate with Mate’s defense of these claims.{'\n'}</Text>

    <Text style={{fontWeight:'bold',fontSize:25}}>9. Disclaimers</Text>
    <Text>The services are provided “as is” and “as available” without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, title, fitness for a particular purpose, and non-infringement. Mate entities do not warrant that the services are accurate, complete, reliable, current, or error free. Mate does not control, endorse, or take responsibility for any content available on or linked to the services or the actions of any third party or user, including moderators. While Mate attempts to make your access to and use of the services safe, Mate does not represent or warrant that Mat’s services or servers are free of viruses or other harmful components.{'\n'}</Text>
    
    <Text style={{fontWeight:'bold',fontSize:25}}>10. Limitation of Liability</Text>
    <Text>In no event and under no theory of liability, including contract, tort, negligence, strict liability, warranty, or otherwise, will Mate entities be liable to you for any indirect, consequential, exemplary, incidental, special, or punitive damages, or lost profits arising from or relating to these terms or the services, including those arising from or relating to content made available on the services that is alleged to be defamatory, offensive, or illegal. Access to, and use of, the services is at your own discretion and risk, and you will be solely responsible for any damage to your device or computer system, or loss of data resulting therefrom. In no event will the aggregate liability of mate entities exceed the greater of one hundred US dollars ($100) or any amount you paid Mate in the previous six months for the services giving rise to the claim. The limitations of this section will apply to any theory of liability, including those based on warranty, contract, statute, tort (including negligence) or otherwise, and even if Mate entities have been advised of the possibility of any such damage, and even if any remedy set forth herein is found to have failed its essential purpose. The foregoing limitation of liability will apply to the fullest extent permitted by law of Japan.{'\n'}</Text>

    <Text style={{fontWeight:'bold',fontSize:25}}>11. Changes to these Terms</Text>
    <Text>Mate may make changes to these Terms from time to time. If Mate makes changes, Mate will post the revised Terms and update the Effective Date above. If the changes, in Mate’s sole discretion, are material, Mate may also notify you by sending an email to the address associated with your account (if you have chosen to provide an email address) or by otherwise providing notice through the Services. By continuing to access or use the Services on or after the Effective Date of the revised Terms, you agree to be bound by the revised Terms. If you do not agree to the revised Terms, you must stop accessing and using the Services before the changes become effective.{'\n'}</Text>
    
    <Text style={{fontWeight:'bold',fontSize:25}}>12. Termination</Text>
    <Text>You may terminate these Terms at any time and for any reason by deleting your Account and discontinuing use of all Services. If you stop using the Services without deactivating your Account, your Account may be deactivated due to prolonged inactivity.</Text>
    <Text>Mate may suspend or terminate your Account, moderator status, or ability to access or use the Services at any time for any or no reason, including for violating these Terms or the Content Policy.{'n'}</Text>
    
    <Text style={{fontWeight:'bold',fontSize:25}}>13. Miscellaneous</Text>
    <Text>This Agreement constitute the entire agreement between you and Mate regarding your access to and use of the Services. Mate’s failure to exercise or enforce any right or provision of these Terms will not operate as a waiver of such right or provision. If any provision of these Terms is, for any reason, held to be illegal, invalid, or unenforceable, the rest of the Terms will remain in effect. You may not assign or transfer any of your rights or obligations under these Terms without Mate’s consent. Mate may freely assign any of Mate’s rights and obligations under these Terms.{'\n'}{'\n'}</Text>
    
    <Text style={{fontSize:20}}>Contact Information{'\n'}</Text>
    <Text>Team mate:{'\n'}</Text>
    <Text>mateverify@gmail.com{'\n'}{'\n'}</Text>
    </View>

    
)
var ContentPolicy = () => (
    <View>
        <Text style={{fontWeight:'bold',fontSize:30}}>
            MATE Content Policy{'\n'}
        </Text>
        <Text>
            MATE is a university network of communities that are created, run, and populated by you, the
            MATE users.
            Users of MATE are from a variety of backgrounds and therefore the information gathered will be
            diverse. In the process, team MATE will try our best to keep the content appropriate.
            As the students are the owners of the community, you will monitor each other for the community.
            Team Mate will help on the process.
            Following rules will help what is right and wrong. HELP YOURSELF!{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:25}}>
            Rules{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 1
                </Text>
                <Text>
            MATE is for the university students just like you. MATE is a place for creating community, not for
            attacking vulnerable groups of students. Everyone has a right to use MATE free of harassment,
            bullying, and threats of violence, and everyone should respect the rights of the others.
            Communities and users that incite violence or that promote hate based on identity or vulnerability
            will be banned without warning.{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 2
                </Text>
                <Text>
            Post authentic content and do not cheat or engage in content manipulation (including spamming,
            vote manipulation, ban evasion, or subscriber fraud).{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 3
                </Text>
                <Text>
            Respect the privacy of others. Do not reveal other students’ personal or confidential information.
            Users who post sexually-explicit media of someone without their consent will be banned and
            possibly be punished by the law within the jurisdiction.{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 4
                </Text>
                <Text>
            Do not post or induce the posting of sexual or suggestive content involving minorities.{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 5
                </Text>
                <Text>
            You do not need to use your real name to use this application, but do not impersonate an
            individual or an entity in a misleading or deceptive manner.{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 6
                </Text>
                <Text>
            Do not post illegal content or soliciting or facilitating illegal or prohibited transactions.{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 7
                </Text>
                <Text>
            Do not break the site or do anything that interferes with normal use of MATE.{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 8
                </Text>
                <Text>
            Do not post or induce the posting of violence and cruelty{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 9
                </Text>
                <Text>
            Other community members can report the inappropriate contents that are discussed above.
            Team MATE will review the reports in 24hours and delete if needed.
            Enforcement
            We have a variety of ways of enforcing our rules, including, but not limited to{'\n'}
            ● Warning you nicely to stop the act of violation mentioned above.{'\n'}
            ● Temporary or permanent suspension of accounts{'\n'}
            ● Removal of privileges from, or adding restrictions to, accounts{'\n'}
            ● Removal of content{'\n'}
            ● Banning of MATE communities{'\n'}
</Text>
<Text style={{fontSize:20}}>Contact Information{'\n'}</Text>
    <Text>Team mate:{'\n'}</Text>
    <Text>mateverify@gmail.com{'\n'}{'\n'}</Text>
    
    </View>
)


export default class Signinpage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: "Click to SignUp",
            user_id: "",
            user_password: "",
            checkPassword: "",
            email: "",
            emailTail: "",
            verifyClick: false,
            verifyCode: "",
            emailVerified: false,
            confirmEmail: "",
            language:'',
            tmp: false,
            recommendationCode : '',
            isContentPolicyAccept: false
        }
        
        this.getLanguage();
        if(Platform.OS=="android"){
            StatusBar.setBackgroundColor("#6a0dad",true) 
        }
    }
    getLanguage = async() => {
        this.state.language = await AsyncStorage.getItem('language')
        this.setState({tmp:true})
    }
    checkBannedWord = (id) => {
        if (id.includes("rudder") || id.includes("Rudder") || id.includes("admin") || id.includes("nazi") || id.includes("nigger") || id.includes("fuck") || id.includes("shit") || id.includes("asshole")) {
            return true;
        }
        else false;
    }
    beforeconnect = () => {
        if (this.state.user_password != this.state.checkPassword) {
            Alert.alert("Please check the password!")
        } else {

            var numCount = 0, charCount = 0

            for (var i = 0; i < this.state.user_password.length; i++) {

                if (48 <= this.state.user_password[i].charCodeAt([0]) && this.state.user_password[i].charCodeAt([0]) <= 57) numCount++;
                else charCount++;
            }

            if (this.checkBannedWord(this.state.user_id) == true) {
                Alert.alert("Your ID contains restricted word(s)")
            } else {
                if (this.state.user_id.length > 18) {
                    Alert.alert(language(this.state.language,"Your ID must be shorter than 18 characters"))
                } else {
                    if (this.state.user_password.length < 8) {
                        Alert.alert(language(this.state.language,"Your password must be at least 8 characters long"))
                    } else if (numCount == 0 || charCount == 0) {
                        Alert.alert(language(this.state.language,"Your password must contain at least one number digit and one alphabet"))
                    } else {

                        if (this.state.emailVerified) {
                            this.connect()
                        } else {
                            Alert.alert(language(this.state.language,"Please verify your school Email"))
                        }

                    }
                }
            }

        }
    }
    connect = async () => {
        const URL = `${SERVER_URL}`+"/signupin/signup";
        try {
            if (this.state.user_id == "" || this.state.user_password == "") {
                Alert.alert(language(this.state.language,"Please type your ID and password"));
                return
            }
            //const response = await fetch(URL + "/" + this.state.user_id); 주소방식
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    user_password: this.state.user_password
                }),//서버랑 user_id이라는거 같아야함
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            const responseText = await response.text();

            if (responseText == 'Welcome ' + this.state.user_id) {
                // this.props.navi.navigate("SignUpSearch", { email: this.state.email, count: 1, review: new Array, user_id: this.state.user_id, user_password: this.state.user_password })
                this.props.navi.navigate("DescriptionScreen", { email: this.state.email, count: 1, review: new Array, user_id: this.state.user_id, user_password: this.state.user_password, language:this.state.language, recommendationCode:this.state.recommendationCode })
            }
            if (responseText == 'This ID already exists. Please try other ID') {
                Alert.alert(responseText)
            }


        } catch (error) {
            Alert.alert(error.message);
        }

    }

    verifyEmail = async () => {
        const URL = `${SERVER_URL}`+"/schoolverify/verifyEmail";
        try {
            this.state.confirmEmail = this.state.email+'@'+this.state.emailTail+'.waseda.jp'
            //const response = await fetch(URL + "/" + this.state.user_id); 주소방식
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.confirmEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            var responseText = await response.text()
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }

            if (responseText == "") {
                Alert.alert(language(this.state.language,"This app is specifically restricted for the members of the university. We have sent the verification code to your university email so that you can enter our community"))
                this.setState({ verifyClick: true })
            } else {
                Alert.alert(language(this.state.language,responseText))
            }

        } catch (error) {
            Alert.alert(error.message);
        }

    }

    checkCode = async () => {
        const URL = `${SERVER_URL}`+"/schoolverify/checkCode";
        try {

            //const response = await fetch(URL + "/" + this.state.user_id); 주소방식
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    verifyCode: this.state.verifyCode,
                    email: this.state.confirmEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            var responseText = await response.text()
            if (response.status != 200) {
                throw new Error("Something is wrong");
            }
            Alert.alert(responseText)
            if (responseText == 'Success') {
                this.state.emailVerified = true
            }
            this.setState({ response: responseText })


        } catch (error) {
            Alert.alert(error.message);
        }

    }

    setText = (text) => {
        this.setState({ user_id: text });
    }
    setPassword = (text) => {
        this.setState({ user_password: text });
    }
    setPasswordcheck = (text) => {
        this.setState({ checkPassword: text });
    }
    setEmail = (text) => {
        this.setState({ email: text });
    }
    setEmailTail = (text) => {
        this.setState({ emailTail : text});
    }
    setVerifyCode = (text) => {
        this.setState({ verifyCode: text });
    }
    setRecommendationCode = (text) => {
        this.setState({ recommendationCode: text });
    }
    setVerifyClick = async () => {

        await this.verifyEmail()

    }
    render() {

        if (Platform.OS === 'android') {
            console.log(this.props.route.params)
            const { navi } = this.props;
            var isVerifyClick = (<View></View>)

            if (this.state.verifyClick) {
                isVerifyClick = (

                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                        <View style={{ flex: 1, }}>
                            <TextInput style={androidStyles.codeTextInput} placeholder="Verify code" onChangeText={this.setVerifyCode}></TextInput>
                        </View>
                        <TouchableOpacity style={androidStyles.submitButton} onPress={() => this.checkCode()}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15}}>Submit</Text>
                        </TouchableOpacity>



                    </View>
                )
            }
            StatusBar.setBackgroundColor("#6a0dad", true)

            if (this.props.route.params.googleSignUp) {
                return (
                    <DismissKeyboard>
                        <View style={{ flex: 1 }}>

                            <Header style={{ backgroundColor: "#6a0dad" }}>
                                <Left style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                        <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ flex: 1 }}>
                                    <View>
                                        <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/MateLogo.png')}></Image>
                                    </View>
                                </Body>
                                <Right style={{ flex: 1 }}>

                                </Right>
                            </Header>

                            <View style={{ marginHorizontal: 15, flex: 5 }}>
                                <View style={{ flex: 1.5 }}></View>

                                <View style={{ flex: 8 }}>
                                    <View style={{ flex: 0.9, justifyContent: "center" }}>
                                    </View>
                                    <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <TextInput style={androidStyles.emailTextInput} placeholder="School Email" onChangeText={this.setEmail}></TextInput>
                                                <Text style={{ alignSelf: 'center' }}>@ed.ac.uk</Text>
                                            </View>
                                            <TouchableOpacity style={androidStyles.verifyButton} onPress={() => this.setVerifyClick()}>
                                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Verify</Text>
                                            </TouchableOpacity>



                                        </View>
                                        {isVerifyClick}
                                    </View>
                                    <View style={{ flex: 0.5, }}>
                                        <TouchableOpacity style={androidStyles.button} onPress={this.connect}>
                                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>SIGN UP</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                    </View>



                                </View>
                            </View>
                        </View>
                    </DismissKeyboard>
                )
            } else {
                return (
                    <DismissKeyboard>
                        <View style={{ flex: 1 }}>

                            <Header style={{ backgroundColor: "#6a0dad" }}>
                                <Left style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                        <Icon name='arrow-back-outline' style={{ color: "white" }} size={30} />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ flex: 1 }}>
                                    <View>
                                        <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/MateLogo.png')}></Image>
                                    </View>
                                </Body>
                                <Right style={{ flex: 1 }}>

                                </Right>
                            </Header>

                            <View style={{ marginHorizontal: 15, flex: 5 }}>
                                <View style={{ flex: 1.5 }}></View>

                                <View style={{ flex: 8 }}>
                                    <View style={{ flex: 0.9, justifyContent: "center" }}>
                                        <TextInput style={androidStyles.textinput} placeholder="ID" onChangeText={this.setText}></TextInput>
                                        <TextInput style={androidStyles.textinput} placeholder="Password" secureTextEntry={true} onChangeText={this.setPassword}></TextInput>
                                        <TextInput style={androidStyles.textinput} placeholder="Password Check" secureTextEntry={true} onChangeText={this.setPasswordcheck}></TextInput>
                                    </View>
                                    <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <TextInput style={androidStyles.emailTextInput} placeholder="School Email" onChangeText={this.setEmail}></TextInput>
                                                <Text style={{ alignSelf: 'center', color:"white" }}>@ed.ac.uk</Text>
                                            </View>
                                            <TouchableOpacity style={androidStyles.verifyButton} onPress={() => this.setVerifyClick()}>
                                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>{language(this.state.language,'Verify')}</Text>
                                            </TouchableOpacity>



                                        </View>
                                        {isVerifyClick}
                                    </View>
                                    <View style={{ flex: 0.5, }}>
                                        <TouchableOpacity style={androidStyles.button} onPress={this.beforeconnect}>
                                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>{language(this.state.language,'SIGN UP')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                    </View>



                                </View>
                            </View>
                        </View>
                    </DismissKeyboard>
                )
            }
        } else {
            if(this.state.language=='j')
ContentPolicy = () => (
    <View>
        <Text style={{fontWeight:'bold',fontSize:30}}>
        MATE情報利用約款{'\n'}
        </Text>
        <Text>
        MATEとは、ユーザーにより作成され運営されるネットワークコミュニティです。

MATEユーザは様々なバックグラウンドを持っていますので、収集される情報も異なります。この過程で、Team Mateは、良質なコンテンツを維持するために最善を尽くします。

学生たちはコミュニティの所有者なので、コミュニティのためにお互いをモニタリングします。Team Mateはそのプロセスをサポートします。

以下がアプリ内での規則についての説明です。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:25}}>
            Rules{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 1
                </Text>
                <Text>
                MATEは全ての大学生のためのものです。全てのユーザーはいじめ、暴力の脅威なくMATEを使用する権利があり、すべての人は他人の権利を尊重する必要があります。暴力を助長したり身元や性別を理由に憎悪を助長するコミュニティとユーザーは警告なしに利用禁止されます。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 2
                </Text>
                <Text>
                コンテンツの操作(スパム、投票操作、禁止面、またはサブスクライバー詐欺を含む)に関与するような内容を投稿してはなりません。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 3
                </Text>
                <Text>
                他の人のプライバシーを尊重してください。他の学生の個人情報や機密情報を公開してはいけません。同意なく誰かの性に関する情報を公開する行為は禁止されており、違反時は管轄権内の法律により処罰されることがあります。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 4
                </Text>
                <Text>
                性的に猥褻なコンテンツを掲示しないでください。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 5
                </Text>
                <Text>
                サービスを使用する際、実名を使用する必要はありません。また、誤解を招き、又は騙す目的で個人又は法人を詐称する行為は禁止です。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 6
                </Text>
                <Text>
                不法コンテンツを掲載し、または禁止された取引を勧誘し、または助長することはできません。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 7
                </Text>
                <Text>
                サイトを停止するなど、MATEの運営を妨害するような行為はしないでください。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 8
                </Text>
                <Text>
                暴力や虐待などに関する投稿、もしくはそれらに誘引する内容の投稿をしてはいけません。{'\n'}
            </Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>
            Rule 9
                </Text>
                <Text>
                他のコミュニティメンバーは、上記に述べた不適切なコンテンツを申告することができます。Team Mateは、24時間以内に申告を検討した後、必要に応じて削除します。

実施

私たちは、以下の事項を含む様々な処罰を実行する権利があります。{'\n'}
            ● 上記のような違反行為を停止するよう警告します。{'\n'}
            ● 一時的または永続的なアカウント停止{'\n'}
            ● アカウントのアクセス許可削除または制限追加{'\n'}
            ● コンテンツの削除{'\n'}
            ● MATEコミュニティ利用禁止{'\n'}
</Text>
<Text style={{fontSize:20}}>Contact Information{'\n'}</Text>
    <Text>Team mate:{'\n'}</Text>
    <Text>mateverify@gmail.com{'\n'}{'\n'}</Text>
    </View>
)
            const { navi } = this.props;
            var isVerifyClick = (<View></View>)
            const { height } = Dimensions.get('window')

            if (this.state.verifyClick) {
                isVerifyClick = (
                    <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: 20 }}>
                        <View style={{ flex: 4 }}>
                            <TextInput style={iosStyles.verificationTextInput} placeholder={language(this.state.language,"Verification code")} onChangeText={this.setVerifyCode}></TextInput>
                        </View>
                        <View style={{ flex: 1.7}}>
                            <TouchableOpacity style={iosStyles.verifyButton} onPress={() => this.checkCode()}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, alignSelf: "center" }}>{language(this.state.language,'Submit')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                )
            }
            return (
                <DismissKeyboard>
                    <View>
                        <Header style={{ backgroundColor: "white" }}>
                            <Left style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                    <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                                </TouchableOpacity>
                            </Left>
                            <Body style={{ flex: 1 }}>
                                <View>
                                    <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/RudderPurple.png')}></Image>
                                </View>
                            </Body>
                            <Right style={{ flex: 1 }}>

                            </Right>
                        </Header>
                        <KeyboardAwareScrollView extraHeight={150} >
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={!this.state.isContentPolicyAccept}

                        >
                            <Header style={{ backgroundColor: "white" }}>
                                <Left style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.props.navi.goBack()}>
                                        <Icon name='arrow-back-outline' style={{ color: "#6a0dad" }} size={30} />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ flex: 1 }}>
                                    <View>
                                        <Image style={{ width: 140, height: 140, flex: 1, resizeMode: 'contain' }} source={require('../../assets/RudderPurple.png')}></Image>
                                    </View>
                                </Body>
                                <Right style={{ flex: 1 }}>

                                </Right>
                            </Header>


                            <ScrollView style={{ alignSelf: 'stretch', marginHorizontal: 10, height: 30}}>
                                <UserAgreement></UserAgreement>
                                <ContentPolicy></ContentPolicy>
                            </ScrollView>
                            <View style={{flex: 0.12,alignItems:'center',justifyContent:'center',backgroundColor:"white"}}>
                            <TouchableOpacity style={iosStyles.acceptButton} onPress={() => this.setState({ isContentPolicyAccept: true })}>
                                <Text style={{ color: "#6a0dad", fontWeight: "bold", fontSize: 15 }}>{language(this.state.language,'Accept')}</Text>
                            </TouchableOpacity>
                            </View>
                        </Modal>
                            <View >
                                <View style={{ marginTop: height / 10, alignContent: "center",height: (height - height / 6)}}>
                                    
                                    <View style={{flexDirection:"row",marginHorizontal: 60,marginTop:25}}><Text style={{color:"#6a0dad",fontSize:30}}>*</Text><TextInput style={iosStyles.textinput} placeholder={language(this.state.language,"ID")} onChangeText={this.setText}></TextInput></View>
                                    <View style={{flexDirection:"row",marginHorizontal: 60,marginTop:25}}><Text style={{color:"#6a0dad",fontSize:30}}>*</Text><TextInput style={iosStyles.textinput} placeholder={language(this.state.language,"Password")} secureTextEntry={true} onChangeText={this.setPassword}></TextInput></View>
                                    <View style={{flexDirection:"row",marginHorizontal: 60,marginTop:25}}><Text style={{color:"#6a0dad",fontSize:30}}>*</Text><TextInput style={iosStyles.textinput} placeholder={language(this.state.language,"Password Check")} secureTextEntry={true} onChangeText={this.setPasswordcheck}></TextInput></View>
                                    <View style={{flexDirection:"row",marginHorizontal: 60,marginTop:25}}><TextInput style={iosStyles.textinput2} placeholder={language(this.state.language,"Recommendation Code")} onChangeText={this.setRecommendationCode}></TextInput></View>
                                    <Text style={{alignSelf:"center", marginTop:15, color:"#6a0dad", fontSize:20}}>{language(this.state.language,'* required')}</Text>
                                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                                        <View style={{ marginLeft:10 ,flex: 3.5, flexDirection: "row" }}>
                                            <TextInput style={iosStyles.emailTextInput} placeholder={language(this.state.language,"School Email")} onChangeText={this.setEmail}></TextInput>
                                            <View style={{ justifyContent: "center" }}><Text style={{ fontSize: 15, color:"#6a0dad", marginHorizontal: 3 }}>@</Text></View>
                                            <TextInput style={iosStyles.emailTailInput}  onChangeText={this.setEmailTail}></TextInput>
                                            <View style={{ justifyContent: "center" }}><Text style={{ fontSize: 15, color:"#6a0dad" }}>.waseda.jp</Text></View>
                                        </View>
                                        <View style={{ flex: 1.2 }}>
                                            <TouchableOpacity style={iosStyles.verifyButton} onPress={() => this.setVerifyClick()}>
                                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 17, alignSelf: "center" }}>{language(this.state.language,'Verify')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {isVerifyClick}
                                    <TouchableOpacity style={iosStyles.button} onPress={this.beforeconnect}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>{language(this.state.language,'SIGN UP')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </DismissKeyboard>
            )
        }
    }
}
const androidStyles = StyleSheet.create({
    bodytext: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center'
    },
    title: {
        marginTop: 50,
        marginBottom: 50,
        alignSelf: "center",
        width: 400,
        height: 100,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#00ff00",
        color: "#20232a",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    textinput: {
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 25,
        height: 35,
        alignSelf: "stretch",
        borderWidth: 2,
        borderColor: "#6a0dad",
        marginRight:5
    },
    emailTextInput:{
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        borderWidth: 2,
        alignSelf: "stretch",
        borderColor: "#6a0dad",
        marginRight:5,
        marginLeft:10,
        justifyContent:"center"
        
    },
    codeTextInput:{
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        borderWidth: 2,
        alignSelf: "stretch",
        borderColor: "#6a0dad",
        marginRight:30,
        marginLeft:30,
        marginTop:20,
        justifyContent:"center"
        
    },
    button: {
        backgroundColor: "#6a0dad",
        width: 160,
        height: 35,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    verifyButton:{
        backgroundColor: "#6a0dad",
        width: 50,
        height: 35,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginRight:20,
        borderColor:"white",
        flex:0.3
    },
   submitButton:{
        backgroundColor: "#6a0dad",
        width: 50,
        height: 35,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginRight:20,
        marginTop:20,
        flex:0.3,
        borderWidth : 3,
        borderColor:"white"
    }

})

const iosStyles = StyleSheet.create({
    bodytext: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center'
    },
    title: {
        marginTop: 50,
        marginBottom: 50,
        alignSelf: "center",
        width: 400,
        height: 100,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#00ff00",
        color: "#20232a",
        fontSize: 30,
        fontWeight: "bold"
    },
    textinput: {
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        alignSelf: "stretch",
        borderWidth: 2,
        borderColor: "#6a0dad",
        paddingLeft:15,
        flex:1,
        marginRight:5
    },
    textinput2: {
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        alignSelf: "stretch",
        borderWidth: 2,
        borderColor: "#6a0dad",
        paddingLeft:15,
        flex:1,
        marginRight:5,
        marginLeft:12
    },
    emailTextInput: {
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        borderWidth: 2,
        marginLeft: 20,
        alignSelf: "stretch",
        borderColor: "#6a0dad",
        justifyContent: "center",
        width: 110,
        paddingLeft : 10

    },
    emailTailInput: {
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        borderWidth: 2,
        alignSelf: "stretch",
        borderColor: "#6a0dad",
        justifyContent: "center",
        width: 45,
        paddingLeft : 5

    },
    verificationTextInput: {
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        borderWidth: 2,
        marginLeft: 20,
        alignSelf: "stretch",
        borderColor: "#6a0dad",
        justifyContent: "center",
        width: 160,
        paddingLeft:15
    },
    codeTextInput: {
        backgroundColor: "white",
        borderRadius: 10,
        height: 35,
        borderWidth: 2,
        alignSelf: "stretch",
        borderColor: "#6a0dad",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 20,
        paddingLeft:15

    },
    button: {
        backgroundColor: "#6a0dad",
        width: 160,
        height: 35,
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        marginTop: 50,
        justifyContent: "center",
        borderWidth : 3,
        borderColor:"white"
    },
    verifyButton: {
        backgroundColor: "#6a0dad",
        height: 35,
        borderRadius: 10,
        marginRight: 20,
        justifyContent: "center",
        borderWidth : 3,
        borderColor:"white",
        marginLeft : 10
    },
    submitButton: {
        backgroundColor: "#6a0dad",
        height: 35,
        borderRadius: 10,
        marginRight: 20,
        marginLeft: -8,
        justifyContent: "center",
        alignContent:"center",
        alignSelf:"center"
    },
    acceptButton: {
        backgroundColor: "white",
        width: 80,
        height: 45,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        
        borderColor: '#6a0dad',
        borderWidth: 3
    }
})