import React, { useState } from "react";
import { 
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const WithdrawScreen = () => {
    
    const [isFocused2 , setisFocused2] = useState(false);
    
    const { colors } = useTheme();


  return (
    <>
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        
            <View
                style={{
                    flex:1,
                }}
            >
                <Header leftIcon="back" title="Withdraw"/>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    
                
                    <View style={{...GlobalStyleSheet.container,flex:1}}>
                        <View
                            style={{
                                paddingHorizontal:20,
                                paddingVertical:20,
                                backgroundColor:colors.bgLight,
                                borderRadius:SIZES.radius,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginBottom:25,
                                }}
                            >
                                <Image
                                    style={{
                                        height:50,
                                        width:50,
                                        borderRadius:25,
                                        borderWidth:3,
                                        borderColor:colors.borderColor,
                                        marginRight:12,
                                    }}
                                    source={IMAGES.bitcoin}
                                />
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.h5,color:colors.title,marginBottom:3}}>Bitcoin <Text style={{color:colors.text}}>(BTC)</Text></Text>
                                    <Text style={{...FONTS.font,color:colors.text}}>0.123456 BTC</Text>
                                </View>
                            </View>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary,marginBottom:5}}>Withdraw Address</Text>
                            <View>
                                <TextInput
                                    style={[{
                                        ...GlobalStyleSheet.formControl,
                                        backgroundColor:colors.inputBg,
                                        color:colors.title,
                                        borderColor:colors.borderColor,
                                    },isFocused2 && styles.inputActive]}
                                    onFocus={() => setisFocused2(true)}
                                    onBlur={() => setisFocused2(false)}
                                    placeholderTextColor={colors.text}
                                    placeholder="Withdraw address"
                                />
                                <TouchableOpacity
                                    style={{
                                        position:'absolute',
                                        right:0,
                                        top:0,
                                        height:48,
                                        width:48,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <SvgXml
                                        fill={COLORS.primary}
                                        xml={ICONS.qr}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                alignItems:"center",
                                paddingHorizontal:20,
                                paddingVertical:30,
                            }}
                        >
                            <Text style={{...FONTS.font,color:colors.text,marginBottom:2}}>Enter Amount</Text>
                            <TextInput
                                style={{
                                    ...FONTS.font,
                                    ...FONTS.fontMedium,
                                    fontSize:38,
                                    lineHeight:40,
                                    color:colors.title,
                                }}
                                defaultValue="$15,210.56"
                            />
                        </View>
                    </View>
                    <View style={GlobalStyleSheet.container}>
                        <CustomButton title="Withdraw"/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    </>
  );
};





const styles = StyleSheet.create({

    btn:{
        height:35,
        borderRadius:4,
        borderWidth:1,
        borderColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },
  
})


export default WithdrawScreen;
