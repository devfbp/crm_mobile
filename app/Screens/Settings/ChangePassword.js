import React, { useState } from "react";
import { 
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, ICONS, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import {SvgXml} from "react-native-svg";
import CustomButton from "../../components/CustomButton";
import Header from "../../layout/header";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {

    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [isFocused3 , setisFocused3] = useState(false);
    const [handlePassword,setHandlePassword] = useState(true);
    const [handlePassword2,setHandlePassword2] = useState(true);
    const [handlePassword3,setHandlePassword3] = useState(true);
    const { colors } = useTheme();

    return(
        <>  
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
               
                <Header leftIcon={'back'} title="Change Password"/>
                <ScrollView
                    contentContainerStyle={{flexGrow:1}}
                >
                    <View style={{...GlobalStyleSheet.container,flex:1}}>
                        <View
                            style={{
                                backgroundColor:colors.bgLight,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                                borderRadius:SIZES.radius,
                                paddingHorizontal:15,
                                paddingTop:18,
                            }}
                        >
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary,marginBottom:6}}>Current password</Text>
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
                                placeholderTextColor={colors.text}
                                placeholder="Current password"
                                secureTextEntry={handlePassword}
                                />  
                                { (handlePassword) ?
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(false)}>
                                    <SvgXml 
                                        height={24}
                                        width={24}
                                        fill={colors.text}
                                        xml={ICONS.eyeOpen}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(true)}>
                                    <SvgXml 
                                        height={24}
                                        width={24}
                                        fill={colors.text}
                                        xml={ICONS.eyeClose}
                                    />
                                </TouchableOpacity>
                                }
                            </View>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary,marginBottom:6}}>New password</Text>
                            <View style={{marginBottom:20}}>
                                <TextInput 
                                style={[{
                                    ...GlobalStyleSheet.formControl,
                                    backgroundColor:colors.background,
                                    color:colors.title,
                                    borderColor:colors.borderColor,
                                },isFocused2 && styles.inputActive]}
                                onFocus={() => setisFocused2(true)}
                                onBlur={() => setisFocused2(false)}
                                placeholderTextColor={colors.text}
                                placeholder="New password"
                                secureTextEntry={handlePassword2}
                                /> 
                                { (handlePassword2) ?
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword2(false)}>
                                    <SvgXml 
                                        height={24}
                                        width={24}
                                        fill={colors.text}
                                        xml={ICONS.eyeOpen}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword2(true)}>
                                    <SvgXml 
                                        height={24}
                                        width={24}
                                        fill={colors.text}
                                        xml={ICONS.eyeClose}
                                    />
                                </TouchableOpacity>
                                } 
                            </View>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary,marginBottom:6}}>Confirm password</Text>
                            <View style={{marginBottom:20}}>
                                <TextInput 
                                style={[{
                                    ...GlobalStyleSheet.formControl,
                                    backgroundColor:colors.background,
                                    color:colors.title,
                                    borderColor:colors.borderColor,
                                },isFocused3 && styles.inputActive]}
                                onFocus={() => setisFocused3(true)}
                                onBlur={() => setisFocused3(false)}
                                placeholderTextColor={colors.text}
                                placeholder="Confirm password"
                                secureTextEntry={handlePassword3}
                                /> 
                                { (handlePassword3) ?
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword3(false)}>
                                    <SvgXml 
                                        height={24}
                                        width={24}
                                        fill={colors.text}
                                        xml={ICONS.eyeOpen}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword3(true)}>
                                    <SvgXml 
                                        height={24}
                                        width={24}
                                        fill={colors.text}
                                        xml={ICONS.eyeClose}
                                    />
                                </TouchableOpacity>
                                } 
                            </View>
                        </View>
                    </View> 
                    <View style={GlobalStyleSheet.container}>
                        <CustomButton title="Save"/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </> 
    )
}

const styles = StyleSheet.create({

    inputActive:{
      borderColor:COLORS.primary,
    },
    eyeIcon : {
      height:48,
      width:48,
      position:'absolute',
      alignItems:'center',
      justifyContent:'center',
      top:0,
      right:0,
    }
    
  })

export default ChangePassword;