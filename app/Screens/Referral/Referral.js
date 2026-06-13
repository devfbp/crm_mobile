import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../layout/header";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import BalanceChart from "../../components/chart/BalanceChart";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";


const Data = [
    {
        tier : '#1',
        Rewardsplit : '20%',
        Referralmembers : '0',
        amountearned : '$0.00',
    },
    {
        tier : '#2',
        Rewardsplit : '15%',
        Referralmembers : '0',
        amountearned : '$0.00',
    },
    {
        tier : '#3',
        Rewardsplit : '10%',
        Referralmembers : '0',
        amountearned : '$0.00',
    },
    {
        tier : '#4',
        Rewardsplit : '7%',
        Referralmembers : '0',
        amountearned : '$0.00',
    },
    {
        tier : '#5',
        Rewardsplit : '3%',
        Referralmembers : '0',
        amountearned : '$0.00',
    },
]

function ReferralScreen(){

    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);

    const {colors} = useTheme();

    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
           
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.ThemeBg,
                }}
            >
                <Header title="Referral" primaryBg/>
                <ScrollView
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{paddingBottom:80}}
                >
                    <View
                        style={[GlobalStyleSheet.container,{
                            flexDirection:'row',
                            paddingHorizontal:15,
                            marginTop:40,
                            marginBottom:10,
                        }]}
                    >
                        <View
                            style={{
                                backgroundColor:colors.bgLight,
                                flex:1,
                                paddingHorizontal:15,
                                alignItems:'center',
                                paddingVertical:15,
                                borderRadius:SIZES.radius,
                                marginRight:5,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            <LinearGradient
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={["#6F4FEF","#4628FF"]}
                                style={{
                                    height:45,
                                    width:45,
                                    borderRadius:45,
                                    borderRadius:45,
                                    marginTop:-35,
                                    marginBottom:12,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height:18,
                                        width:18,
                                        tintColor:COLORS.white,
                                    }}
                                    source={IMAGES.wallet2}
                                />
                            </LinearGradient>
                            <Text style={{...FONTS.h6,color:colors.title,marginBottom:2}}>158.95USD</Text>
                            <Text style={{...FONTS.font,color:colors.text}}>Total Income</Text>
                        </View>
                        <View
                            style={{
                                backgroundColor:colors.bgLight,
                                flex:1,
                                paddingHorizontal:15,
                                alignItems:'center',
                                paddingVertical:15,
                                borderRadius:SIZES.radius,
                                marginLeft:5,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            <LinearGradient
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={["#6F4FEF","#4628FF"]}
                                style={{
                                    height:45,
                                    width:45,
                                    borderRadius:45,
                                    borderRadius:45,
                                    marginTop:-35,
                                    marginBottom:12,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height:22,
                                        width:22,
                                        tintColor:COLORS.white,
                                    }}
                                    source={IMAGES.referral}
                                />
                            </LinearGradient>
                            <Text style={{...FONTS.h6,color:colors.title,marginBottom:2}}>15</Text>
                            <Text style={{...FONTS.font,color:colors.text}}>Total Referral</Text>
                        </View>
                    </View>
                    <View
                        style={[GlobalStyleSheet.container,{padding:0}]}
                    >
                        <BalanceChart/>
                    </View>
                    <View
                        style={{
                            ...GlobalStyleSheet.container,
                            marginTop:5,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor:colors.bgLight,
                                borderRadius:SIZES.radius,
                                paddingHorizontal:15,
                                paddingTop:18,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            <Text style={{...FONTS.h6,color:colors.title,marginBottom:15,lineHeight:24}}>Share your referral and earn crypto with other trader.</Text>
                            <Text style={{...FONTS.fontSm,color:colors.text,marginBottom:6}}>Your Referral ID</Text>
                            <View style={{marginBottom:20}}>
                                <TextInput 
                                style={[{
                                    ...GlobalStyleSheet.formControl,
                                    backgroundColor:colors.background,
                                    color:colors.title,
                                    ...FONTS.fontMedium,
                                    borderColor:colors.borderColor,
                                },isFocused && styles.inputActive]}
                                onFocus={() => setisFocused(true)}
                                onBlur={() => setisFocused(false)}
                                defaultValue="#175RKYRS_TYS506"
                                />  
                                <TouchableOpacity
                                    style={{
                                        height:36,
                                        width:36,
                                        borderRadius:36,
                                        backgroundColor:"rgba(255,255,255,.02)",
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        position:'absolute',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        right:6,
                                        top:6,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:18,
                                            width:18,
                                            tintColor:COLORS.primary
                                        }}
                                        source={IMAGES.copy}
                                    />
                                </TouchableOpacity>
                            </View>
                            

                            <Text style={{...FONTS.fontSm,color:colors.text,marginBottom:6}}>Your Referral Link</Text>
                            <View style={{marginBottom:20}}>
                                <TextInput 
                                style={[{
                                    ...GlobalStyleSheet.formControl,
                                    backgroundColor:colors.background,
                                    color:COLORS.primary,
                                    ...FONTS.fontMedium,
                                    borderColor:colors.borderColor,
                                },isFocused2 && styles.inputActive]}
                                onFocus={() => setisFocused2(true)}
                                onBlur={() => setisFocused2(false)}
                                defaultValue="https://referral.FBP"
                                />  
                                <TouchableOpacity
                                    style={{
                                        height:36,
                                        width:36,
                                        borderRadius:36,
                                        backgroundColor:"rgba(255,255,255,.02)",
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        position:'absolute',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        right:6,
                                        top:6,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:18,
                                            width:18,
                                            tintColor:COLORS.primary
                                        }}
                                        source={IMAGES.copy}
                                    />
                                </TouchableOpacity>
                            </View>
                        
                        </View>

                    </View>


                    <View style={GlobalStyleSheet.container}>
                        <Text style={{...FONTS.h6,color:colors.title,marginBottom:12}}>Find your income with five-tier system</Text>
                        
                        <View
                            style={{
                                backgroundColor:colors.bgLight,
                                height:40,
                                borderRadius:SIZES.radius,
                                flexDirection:'row',
                                alignItems:'center',
                                borderWidth:1,
                                borderColor:colors.borderColor,
                                marginBottom:3,
                            }}
                        >
                            <Text style={{...styles.thItem,width:50,color:colors.title}}>Tier</Text>
                            <Text style={{...styles.thItem,flex:1,color:colors.title}}>Reward Split</Text>
                            <Text style={{...styles.thItem,flex:1,color:colors.title}}>Ref. Mem.</Text>
                            <Text style={{...styles.thItem,flex:1,textAlign:'right',color:colors.title}}>Amo. Earned</Text>
                        </View>

                        {Data.map((data,index) => {
                            return(
                                <View
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                    }}
                                >
                                    <Text style={{...styles.tbItem,width:50,color:colors.title}}>{data.tier}</Text>
                                    <Text style={{...styles.tbItem,color:colors.title,flex:1}}>{data.Rewardsplit}</Text>
                                    <Text style={{...styles.tbItem,color:colors.title,flex:1}}>{data.Referralmembers}</Text>
                                    <Text style={{...styles.tbItem,color:colors.title,flex:1,textAlign:'right'}}>{data.amountearned}</Text>
                                </View>
                            )
                        })}

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputActive:{
        borderColor:COLORS.primary,
    },
    card:{
        padding:12,
        borderRadius:SIZES.radius,
        marginBottom:10,
        borderWidth:1,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },  
    listView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:1,
    },
    tbItem:{
        ...FONTS.font,
        paddingHorizontal:8,
        paddingVertical:8,
    },
    thItem:{
        ...FONTS.fontSm,
        ...FONTS.fontSemiBold,
        paddingHorizontal:8,
    }
  
})

export default ReferralScreen;