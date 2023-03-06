import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//language(japan,pwWarning)

export default function language(lan,what) {
    const jap ={
    'Add Review' : 'レビュ㆒を追加',
    'Touch Here' : 'タッチしてください',
    'Discussion Board' : 'ディスカッションボ㆒ド',
    'Add Discussion' : 'ディスカッションを追加',
    'My courses' : 'マイコ㆒ス',
    'Are you sure you want to logout?' : 'ロ㆒グアウトしますか?',
    'ID' : 'ID',
    'Password' : 'パスワード',
    'Password Check' : 'パスワ㆒ド確認',
    'Verify' : '確認',
    'Submit' : '送信',
    'Verification code' : '確認コ㆒ド',
    'School Email' : 'メ㆒ルアドレス',
    'Fail' : '失敗',
    'Success' : '成功',
    'Next' : '次へ',
    'This app is specifically restricted for the members of the university. We have sent the verification code to your university email so that you can enter our community' : 'このアプリの使用は大学のメンバーに制限されています。アプリを使用するには大学のメールアドレスに送信した確認コードをご確認ください。',
    'Please enter your valid Waseda school email' : '認証した早稲田のメールアドレスを記入してください。',
    'Please type your ID and Password' : 'IDとパスワ㆒ドを入力してください',
    'Wrong ID! Please try again' : 'IDを再入力してください',
    'Wrong Password! Please try again' : 'パスワ㆒ドを再入力してください',
    'Your ID must be shorter than 18 characters' : 'IDの長さは最大18文字です',
    'Your password must be at least 8 characters long' : 'パスワ㆒ドの長さは最低8文字です',
    'Your password must contain at least one number digit and one alphabet' : 'パスワ㆒ドは半角英字、数字を組み合わせて入力してください',
    'Please verify your school Email' : '学校のメールアドレスを認証してくだ さい',
    'This project was created in order to create a database of the best courses/ instructors for the students.' : 'このプロジェクトは、学生に最適な科目/教員のデ㆒タベ㆒スを作成するために作られました。',
    'The more course reviews you provide, the better help we can give' : '提供するコ㆒スレビュ㆒が多いほど、私たちはより有益な情報を提供できます。',
    'The more you help us, the more you can help yourself' : 'あなたが私たちを手伝ってくれるほど、あなたは自分自身を手伝うことができます。',
    'that is why we are asking for 3+1 reviews of your taken courses' : 'なので、私たちはあなたが受講した科目の 3+1レビュ㆒を求めています。',
    'Press “Next” at the top right' : '右上に“次へ”を押してください',
    'Swipe Left' : '左とじ',
    'Swipe Right' : '右とじ',
    'Nickname' : 'ニックネーム',
    'This nickname already exists. Please try other nickname' : 'このニックネームは使用中です。他のニックネームを選択してください。',
    'Professor' : '教授',
    'Thanks! n/4' : 'ありがとうございます!', //
    'No repetition, mate' : '繰り返さないでください！', //
    'Welcome to Rudder!' : 'Welcome to Rudder!', //
    'LOGIN' : 'ログイン', //
    'SIGN UP' : '登録',//
    'Forgot ID/Password?' : 'ID・パスワードを忘れた',//
    'SKIP' : 'スキップ',
    'LOGOUT' : 'ログアウト',
    'Logout' : 'ログアウト',
    'comments' : 'コメント',
    'likes' : 'いいね！',
    'Do you want to delete this Comment?' : 'このコメントを削除しますか？',
    'You already liked this discussion' : 'このディスカッションはもう「いいね！」しました。',
    'Search for credit':'単位を探す',
    'Search for school':'学校を探す',
    'Search course or professor' : '科目名・教員を検索',
    'Advanced Search' : '詳細検索',
    'Select department' : '学部を選択してください。',
    'Select credit' : '単位の選択',
    'Amount of Assignment' : '課題の量',
    'Difficulty of Lecture' : '講義の難易度',
    'Difficulty of Exam' : '試験の難易度',
    'Difficulty of Good Grade' : '単位の成績の難易度',
    'Overall' : '総点',
    'None' : '少ない',
    'Tons' : '多い',
    'Almost None' : '非常に少ない',
    'Average' : '平均',
    'A Lot' : '非常に多い',
    'Easy' : '簡単',
    'Hard' : '難しい',
    'Regret' : '最低',
    'Great' : '最高',
    'Choose your Nickname' : 'ニックネームを設定してください',
    'Title':'タイトル',
    'Impossible to get A' : 'Aは絶対に無理',
    'Share your thoughts about the Course. More detailed, better help your mates can get!' : '科目についてあなたの感想を公有してくださ い。具体的であるほど、コミュニティ㆒のよ り多くの友達を助けることができます!',
    'One or more questions is blank. Please check again' : 'タイトルと本文が空欄です。',
    'Ok' : 'Ok',
    'Cancel': '取り消し',
    'Tab OK or Cancel' : ' ',
    'Do you want to delete this Review?' : 'このレビュ㆒を削除しますか?',
    'Do you want to delete this discussion?' : 'このディスカッションを削除しますか?',
    'Do you want to edit this Review?' : 'このレビュ㆒を編集しますか?',
    'Do you want to edit this Discussion?' : 'このディスカッションを編集しますか?',
    'Be the first one to review this course!' : 'このコ㆒スを最初にレビュ㆒する人になりま しょう!',
    '0 discussions yet' : 'まだディスカッションがありません。',
    'Discussion Board' : 'ディスカッションボ㆒ド',
    'Added to My Courses' : 'お気に入りに追加',
    'Removed from My Courses' : 'お気に入りから削除',
    'More' : 'もっと見る',
    'Close' : '閉じる',
    'No reviews yet' : 'まだレビュ㆒がありません。',
    'Forgot Your PASSWORD?' : 'パスワードを忘れた',
    'Forgot Your ID?' : 'IDを忘れた',
    'Tell us your school email. Then we will send your ID to your email.' : '学校のメールアドレスを記入したら、IDを送ります。',
    'Tell us your school email. Then we will send you a Verification code.': '学校のメールアドレスを記入したら、認証コードを送ります。',
    'We have sent the verification code to your university email' : '学校のメールアドレスに認証コードを送りました。',
    'Correct Code! We will send new password to your email.':'学校のメールアドレスで新しいパスワードを送ります。',
    'FIND ID' : 'IDを探す。',
    'FIND PASSWORD' : 'パスワードを探す。',
    'Discuss freely about this course!' : 'この授業について自由に話してください！',
    'Discuss freely about anything!' : '自由に話してください！',
    'Please enter at least three letters' : '長さは最低３文字です。',
    'We have sent your ID to your school email' : 'IDを学校のメールに送りました。',
    'Recommendation Code':'推薦コード',
    '* required':'* 必要',
    'SWIPE': "スワイプしてください。",
    "complete" : "完了",
    "No results found" : "検索結果は0件です。",
    "Report" : '報告',
    "Do you want to Report this Discussion?" : 'この投稿を報告しますか？',
    "Do you want to Report this Comment?" : "このコメントを報告しますか？",
    "Accept": "同意",
    "Sign up is NOT done yet... Search Course you took and tell us about it":"登録がまだ終っておりません。受けた授業を検索して、レビューを書いてください！",
    "Sign Up...Last Step" : "登録の最終手続きです。"

    }

    if(lan == 'j')return jap[what]
    else if(lan == 'e')return what
}
export function checkCharacter(checkC){
    const REGEX_HIRAKATA = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]/;
    const REGEX_KANJI =  /[\u4e00-\u9faf]|[\u3400-\u4dbf]/;
    
    const hirakata = (ch) => REGEX_HIRAKATA.test(ch);
    const kanji = (ch) => REGEX_KANJI.test(ch);

    if(hirakata(checkC)==true)return 'japan'
    else if(kanji(checkC) == true)return 'kanji'
    else return 'alpha'   
}



const styles = StyleSheet.create({})