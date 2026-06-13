import React, { useState } from "react";
import { 
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { SafeAreaView } from "react-native-safe-area-context";

const DepositScreen = () => {
    
    const [isFocused , setisFocused] = useState(false);
    const [activeTab , setActiveTab] = useState('erc');
    const { colors } = useTheme();
    

  return (
    <>
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
            <View
                style={{
                    flex:1,
                }}
            >
                <Header leftIcon="back" title="Deposit"/>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={{...GlobalStyleSheet.container,flex:1}}>
                        <View
                            style={{
                                alignItems:'center',
                                paddingVertical:50,
                                justifyContent:'center',
                                flex:1,
                            }}
                        >
                            <View
                                style={{
                                    height:280,
                                    width:280,
                                    borderRadius:15,
                                    borderWidth:1,
                                    borderColor:colors.borderColor,
                                    alignItems:'center',
                                    backgroundColor:colors.bgLight,
                                    justifyContent:'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height:285,
                                        width:285,
                                        resizeMode:'contain',
                                        position:'absolute',
                                        tintColor:COLORS.primary,
                                    }}
                                    source={IMAGES.qrarea}
                                />
                                <View
                                    style={{
                                        backgroundColor:COLORS.white,
                                        padding:8,
                                        borderRadius:SIZES.radiusLg,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:200,
                                            width:200,
                                            resizeMode:'contain',
                                        }}
                                        source={IMAGES.qrCode}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[GlobalStyleSheet.container,{
                            paddingHorizontal:15,
                            paddingVertical:15,
                            backgroundColor:colors.bgLight,
                            borderTopLeftRadius:25,
                            borderTopRightRadius:25,
                            paddingTop:25,
                        }]}
                    >
                        <View style={{marginBottom:15}}>
                            <Text style={{...FONTS.font,color:colors.title,marginBottom:6}}>Scan Code</Text>
                            <View style={{marginBottom:20}}>
                                <TextInput 
                                style={[{
                                    ...GlobalStyleSheet.formControl,
                                    backgroundColor:colors.background,
                                    color:colors.title,
                                    borderColor:colors.borderColor,
                                },isFocused && styles.inputActive]}
                                onFocus={() => setisFocused(true)}
                                onBlur={() => setisFocused(false)}
                                defaultValue="DSTR4814SD487R"
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
                        <Text style={{...FONTS.h6,color:COLORS.primary,marginBottom:8}}>Details</Text>
                        <View style={{flexDirection:'row'}}>
                            <Image  
                                style={{
                                    height:14,
                                    width:14,
                                    marginRight:6,
                                    marginTop:1,
                                    resizeMode:'contain',
                                    tintColor:COLORS.primary,
                                }}
                                source={IMAGES.star}
                            />
                            <Text style={{...FONTS.fontSm,color:colors.title,marginBottom:4}}>Send only ETH to this deposit address</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image  
                                style={{
                                    height:14,
                                    width:14,
                                    marginRight:6,
                                    marginTop:1,
                                    resizeMode:'contain',
                                    tintColor:COLORS.primary,
                                }}
                                source={IMAGES.star}
                            />
                            <Text style={{...FONTS.fontSm,color:colors.title,marginBottom:4}}>Sending coin or token other than ETH to this address may result in loss of your deposit</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    </>
  );
};





const styles = StyleSheet.create({
    inputActive:{
        borderColor:COLORS.primary,
    },
    btn:{
        height:30,
        flex:1,
        borderRadius:8,
        borderWidth:1,
        borderColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
    }
  
})


export default DepositScreen;
