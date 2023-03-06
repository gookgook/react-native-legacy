import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, Button, ScrollView, Modal } from 'react-native'
import { Header, Left, Right, Title, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-community/async-storage'

import language from '../Language'

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
            ● Banning of MATE communities{'\n'}{'\n'}
</Text>
<Text style={{fontSize:20}}>Contact Information{'\n'}</Text>
    <Text>Team mate:{'\n'}</Text>
    <Text>mateverify@gmail.com{'\n'}{'\n'}</Text>
  
    </View>
)

export default class Mypage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favoriteCourseJson: [],
            maxDisplay: 10,
            isVerify: false,
            spinner: false,
            language : '',
            showContact : false
        }
    }

    

    
    getLanguage = async() => {
        this.state.language = await AsyncStorage.getItem('language')
    }

    componentDidMount() {
        this.props.navi.addListener('focus', this.load)
    }
    load = () => {
        this.setState({ spinner: true })
        this.getLanguage()
        this.favoriteCourseSearch()
        this.isVerify()
    }

    isVerify = async () => {
        const URL = "http://13.231.20.191/schoolverify/isVerify"
        try {
            this.state.favoriteCourseJson = []
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
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
            if (await response.text() == 'true') {
                this.setState({ isVerify: true })
            } else {
                this.setState({ isVerify: false })
            }

        } catch (error) {
            Alert.alert(error.message);
        }
    }

    favoriteCourseSearch = async () => {
        const URL = "http://13.231.20.191/reviewsearch/favoriteCourseSearch"
        try {
            this.state.favoriteCourseJson = []
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    token: await AsyncStorage.getItem('token'),
                    language: this.state.language
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
            const responseJson = await response.json();

            // var tmp;
            for (var i = 0; i < Object.keys(responseJson).length; i++) {
                var joined = this.state.favoriteCourseJson.concat(responseJson[i])
                // tmp=joined
                this.state.favoriteCourseJson = joined

                //this.setState({courseJson: joined})
            }


        } catch (error) {
            Alert.alert(error.message);
        } finally {

            this.setState({ spinner: false, favoriteCourseJson: this.state.favoriteCourseJson })
        }
    }

    moremore = () => {
        this.setState({ maxDisplay: (this.state.maxDisplay) + 10 })
    }

    logout = async () => {
        this.props.navi.navigate("Login")
        await AsyncStorage.removeItem('token')
    }
    createLogoutAlert() {
        Alert.alert(
            language(this.state.language,'Are you sure you want to logout?'), language(this.state.language,"Tab OK or Cancel"),
            [
                { text: "OK", onPress: () => this.logout() },
                { text: language(this.state.language,"Cancel") }
            ]
        )
    }


    render() {
        if (Platform.OS === 'android') {
            const { navi } = this.props;
            const courses = this.state.favoriteCourseJson;

            const tmpCourseList = courses.map(
                (course) => (<View key={course.course_id} style={{ marginTop: 18 }}>
                    <TouchableOpacity style={styles.courseButton} onPress={() => { navi.navigate("ReviewScreen", { course_name: course.course_name, course_id: course.course_id, professor: course.professor, school: course.school, course_credit: course.course_credit, course_code: course.course_code }) }}>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 5 }}>{course.course_name}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 17 }}>{course.course_code}</Text><Text style={{ fontSize: 17 }}>  (20/21)</Text>
                                </View>
                                <Text style={{ color: "grey" }}>{course.professor}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>)
            );
            const courseList = new Array();
            for (var i = 0; i < Math.min(courses.length, this.state.maxDisplay); i++) {
                courseList.push(tmpCourseList[i])
            }



            let verifyOpacity = null;
            if (this.state.isVerify) {
                verifyOpacity = (
                    <TouchableOpacity disabled={true} style={styles.verifiedbutton} >
                        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#f8f8ff" }}>verified</Text>
                    </TouchableOpacity>)
            } else {
                verifyOpacity = (
                    <TouchableOpacity style={styles.verifybutton} onPress={() => { this.props.navi.navigate("VerifyScreen") }}>
                        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#f8f8ff" }}>Go to Verification</Text>
                    </TouchableOpacity>
                )

            }

            return (
                <View>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <Header style={{ backgroundColor: '#6a0dad' }}>
                        <Left style={{ flex: 0 }}>
                            <TouchableOpacity onPress={() => { this.createLogoutAlert() }}>
                                <Text style={{ color: "white", fontSize: 17 }}>{language(this.state.language,'Logout')}</Text>
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1, alignItems: 'center' }}>
                            <Title style={{ fontSize: 24, color: "white" }}>{language(this.state.language,'My courses')}</Title>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <Text style={{ color: "#6a0dad", fontSize: 17 }}>Logout</Text>
                        </Right>
                    </Header>
                    <View>

                        <ScrollView onScroll={(e) => {
                            let paddingToBottom = 10;
                            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                            if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                                this.moremore()
                            }
                        }}>
                            <View style={{ marginHorizontal: 10 }}>{courseList}</View>

                        </ScrollView>
                    </View>
                </View>
            )
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
            const courses = this.state.favoriteCourseJson;

            console.log(courses)
            const tmpCourseList = courses.map(
                (course) => (<View style={{ marginTop: 18 }}>
                    <TouchableOpacity style={styles.courseButton} onPress={() => { navi.navigate("ReviewScreen", { course_name: course.course_name, course_id: course.course_id, professor: course.professor, school: course.school, course_credit: course.course_credit, course_code: course.course_code, course_year: course.course_year }) }}>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 5 }}>{course.course_name}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 17 }}>{course.course_code}</Text><Text style={{ fontSize: 17 }}>  ({course.course_year})</Text>
                                </View>
                                {course.professor.length>20
                                ?<Text style={{ color: "grey" }}>{course.professor.substring(0,18)+'...'}</Text>
                                :<Text style={{ color: "grey" }}>{course.professor}</Text>}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>)
            );
            const courseList = new Array();
            for (var i = 0; i < Math.min(courses.length, this.state.maxDisplay); i++) {
                courseList.push(tmpCourseList[i])
            }
            if(courseList.length==0){
                courseList.push(
                <View style={{marginTop:18}}>
                    <Text style={{color:"grey",fontSize:20,alignSelf:'center'}}>Empty</Text>
                </View>
                )
            }



            let verifyOpacity = null;
            if (this.state.isVerify) {
                verifyOpacity = (
                    <TouchableOpacity disabled={true} style={styles.verifiedbutton} >
                        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#f8f8ff" }}>verified</Text>
                    </TouchableOpacity>)
            } else {
                verifyOpacity = (
                    <TouchableOpacity style={styles.verifybutton} onPress={() => { this.props.navi.navigate("VerifyScreen") }}>
                        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#f8f8ff" }}>Go to Verification</Text>
                    </TouchableOpacity>
                )

            }

            return (

                <View>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                    />
                    <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.showContact}

                        >
                            <Header style={{ backgroundColor: "#6a0dad" }}>
                               
                                <Body style={{ flex: 1 }}>
                                    <View>
                                        <Text style={{color:'white', fontSize: 20}}>User Agreement{'&'}Contact Info</Text>
                                    </View>
                                </Body>
                                
                            </Header>


                            <ScrollView style={{ alignSelf: 'stretch', marginHorizontal: 10, height: 30}}>
                                <UserAgreement></UserAgreement>
                                <ContentPolicy></ContentPolicy>
                            </ScrollView>
                            <View style={{flex: 0.12,alignItems:'center',justifyContent:'center',backgroundColor:"#6a0dad"}}>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => this.setState({ showContact:false })}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Close</Text>
                            </TouchableOpacity>
                            </View>
                        </Modal>
                    <Header style={{ backgroundColor: 'white' }}>
                        <Left style={{ flex: 1.2 }}>
                            <TouchableOpacity onPress={() => { this.createLogoutAlert() }}>
                                <Text style={{ color: "#6a0dad", fontSize: 17 }}>{language(this.state.language,'Logout')}</Text>
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 3 }}>
                            <Title style={{ fontSize: 24, color: "#6a0dad" }}>{language(this.state.language,'My courses')}</Title>
                        </Body>
                        <Right style={{ flex: 1.2 }}>
                        <TouchableOpacity onPress={() => { this.setState({showContact:true})}}>
                        <Icon name='information-circle-outline' style={{ color: "#6a0dad" }} size={30} />
                        </TouchableOpacity>
                        </Right>
                    </Header>
                    <View>

                        <ScrollView onScroll={(e) => {
                            let paddingToBottom = 10;
                            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                            if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                                this.moremore()
                            }
                        }}>
                            <View style={{ marginHorizontal: 10 }}>{courseList}</View>

                        </ScrollView>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    logoutbutton: {
        width: 100,
        height: 40,
        alignItems: "center",
        borderRadius: 8,
        borderColor: "black",
        alignSelf: "center",
        borderWidth: 1.5,
        marginBottom: 10
    },
    courseButton: {
        backgroundColor: "#FDFEFE",
        borderColor: '#00adb5',
        borderRadius: 7
    },
    favoriteCourseText: {
        fontSize: 25,
        backgroundColor: "#4267B2",
        color: "#f8f8ff",
        fontWeight: "bold"
    },
    verifybutton: {
        width: 190,
        height: 40,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#FF0000",
        borderRadius: 8,
        elevation: 8
    },
    verifiedbutton: {
        width: 100,
        height: 40,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#46AF46",
        borderRadius: 8,
    },
    acceptButton: {
        backgroundColor: "#6a0dad",
        width: 80,
        height: 45,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        
        borderColor: 'white',
        borderWidth: 3
    }
})