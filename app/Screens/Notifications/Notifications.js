import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { FlatList } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { COLORS, FONTS, IMAGES, SIZES } from '../../Utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const notificationData = [
    {
        id:'1',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'2',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'5 Hours',
    },
    {
        id:'3',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'4',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'5',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'6',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'7',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'8',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'9',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'10',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
]


export default function Notifications() {
    
    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
            <Header leftIcon="back" primaryBg title="Notifications"/>
            <FlatList
                data={notificationData}
                contentContainerStyle={{
                    paddingTop:15,
                }}
                renderItem={({item}) => (
                    <Ripple
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:12,
                            paddingVertical:10,
                            borderWidth:1,
                            borderRadius:SIZES.radiusLg,
                            marginBottom:10,
                            marginHorizontal:15,
                            borderColor:colors.borderColor,
                            backgroundColor:colors.bgLight,
                        }}
                    >
                        <LinearGradient
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={["#6F4FEF","#4628FF"]}
                            style={{
                                height:45,
                                width:45,
                                borderRadius:45,
                                backgroundColor:COLORS.primary,
                                alignItems:'center',
                                justifyContent:'center',
                                marginRight:10,
                            }}
                        >
                            <Image
                                style={{
                                    height:25,
                                    width:25,
                                    tintColor:'#fff',
                                    resizeMode:'contain',
                                }}
                                source={IMAGES.email}
                            />
                        </LinearGradient>
                        <View
                            style={{
                                flex:1,
                            }}
                        >
                            <Text 
                                ellipsizeMode='tail'
                                numberOfLines={1}
                                style={{
                                    ...FONTS.h6,
                                    color:colors.title,
                                    marginBottom:4
                                }}
                            >{item.title}</Text>
                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={1}
                                style={{
                                    ...FONTS.fontSm,
                                    color:colors.text,
                                }}
                            >{item.desc}</Text>
                        </View>
                        <View style={{alignSelf:'flex-end',width:60,alignItems:'flex-end'}}>
                            <Text style={{...FONTS.fontSm,color:COLORS.primary}}>{item.time}</Text>
                        </View>
                    </Ripple>
                )}
            />
        </SafeAreaView>
    )
}