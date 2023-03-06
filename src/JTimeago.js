import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function jTimago(ptime) {
    
    var tmp=new Date().getTime()
    var tmp2=new Date(ptime).getTime()
    const dif=(tmp-tmp2)/1000
    if(dif<60)return "数秒前"
    if(dif<3600){
        var n=dif/60
        const ago=parseInt(n)+'分前'
        return ago
        
    }
    if(dif<86400){
        var n=dif/3600
        const ago=parseInt(n)+'時間前'
        return ago
       
    }
    var justDate=new Date(new Date(ptime).getTime()).toLocaleDateString("ko-KR", {timeZone: "Asia/Seoul"})
    if(justDate[5]==' ' && justDate[8]==' ')return '0'+justDate[6]+'/0'+justDate[9]
    if(justDate[5]==' ' && justDate[8]!=' ')return '0'+justDate[6]+'/'+justDate[8]+justDate[9]
    if(justDate[5]!=' ' && justDate[8]==' ')return justDate[5]+justDate[6]+'/0'+justDate[9]
    else justDate.substring(5,10)
}