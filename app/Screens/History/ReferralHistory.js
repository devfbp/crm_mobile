import { useTheme } from "@react-navigation/native";
import React from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { COLORS, FONTS, ICONS, SIZES } from "../../Utils/theme";

const Data = [
    {
        id : '1',
        tier : '1',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '2',
        tier : '2',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '3',
        tier : '3',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '4',
        tier : '1',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '5',
        tier : '2',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '6',
        tier : '2',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '7',
        tier : '2',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '8',
        tier : '1',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '9',
        tier : '2',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '10',
        tier : '3',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '11',
        tier : '3',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '12',
        tier : '3',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '13',
        tier : '1',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
    {
        id : '14',
        tier : '2',
        refId : 'wa...@...ro.com',
        registrationTime : '02-08-2022 19:42',
    },
]


function ReferralHistory(){
    
    const { colors } = useTheme();

    return(
        <>
            <FlatList
                data={Data}
                contentContainerStyle={{
                    paddingTop:12,
                }}
                initialNumToRender={4}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return(
                        <>
                            <View style={{...styles.listItem,borderColor:colors.borderColor,backgroundColor:colors.bgLight}}>
                                <View
                                    style={{
                                        height:38,
                                        width:38,
                                        marginRight:10,
                                        backgroundColor:COLORS.primary,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        borderRadius:35,
                                    }}
                                >
                                    <SvgXml
                                        xml={ICONS.referral}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>Tier : <Text style={{color:COLORS.primary}}>{item.tier}</Text></Text>
                                    <Text style={{...FONTS.fontSm,color:colors.title}}><Text style={{color:COLORS.primary}}>ID</Text>: {item.refId}</Text>
                                </View>
                                <View style={{alignItems:'flex-end'}}>
                                    <Text style={{...FONTS.fontSm,color:colors.text,marginBottom:2}}>Registration Time</Text>
                                    <Text style={{...FONTS.font,color:COLORS.primary}}>{item.registrationTime}</Text>
                                </View>
                            </View>
                        </>
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    listItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:12,
        paddingVertical:10,
        borderRadius:SIZES.radius,
        borderWidth:1,
        marginBottom:8,
        paddingHorizontal:12,
    },
   
})

export default React.memo(ReferralHistory);