import React, {useState} from "react";
import {  
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, ICONS } from "../../Utils/theme";
import CustomButton from "../../components/CustomButton";
import Header from "../../layout/header";
import { SvgXml } from "react-native-svg";
import { Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = (props) => {
  
  const [isFocused , setisFocused] = useState(false);
  const [isFocused2 , setisFocused2] = useState(false);
  const [isFocused4 , setisFocused4] = useState(false);
  const [isFocused5 , setisFocused5] = useState(false);
  const [handlePassword,setHandlePassword] = useState(true);
  const [handlePassword2,setHandlePassword2] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { colors } = useTheme();


  return (
      <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        <Header leftIcon="back" primaryBg title="Register"/>
        <ScrollView contentContainerStyle={{flexGrow:1}} showsHorizontalScrollIndicator={false}>
            <View
                style={{
                    flex:1,
                    paddingVertical:25,
                }}
            >
                <View style={{...GlobalStyleSheet.container}}>
                    <View style={{alignItems:'center',marginBottom:30}}>
                        <Text style={{...FONTS.h3,color:colors.title}}>Getting Started</Text>
                        <Text style={{...FONTS.fontLg,color:colors.text}}>Create an account to continue!</Text>
                    </View>
                    <Text style={{...FONTS.font,color:colors.title,marginBottom:5}}>Email address</Text>
                    <View style={{marginBottom:20}}>
                      <TextInput 
                        style={[{
                          ...GlobalStyleSheet.formControl,
                          backgroundColor:colors.inputBg,
                          color:colors.title,
                          borderColor:colors.borderColor,
                        },isFocused && styles.inputActive]}
                        onFocus={() => setisFocused(true)}
                        onBlur={() => setisFocused(false)}
                        placeholderTextColor={colors.text}
                        placeholder="Type your email"
                      />  
                    </View>
                    <Text style={{...FONTS.font,color:colors.title,marginBottom:5}}>New Password</Text>
                    <View style={{marginBottom:20}}>
                      <TextInput 
                        style={[{
                          ...GlobalStyleSheet.formControl,
                          backgroundColor:colors.inputBg,
                          color:colors.title,
                          borderColor:colors.borderColor,
                        },isFocused4 && styles.inputActive]}
                        onFocus={() => setisFocused4(true)}
                        onBlur={() => setisFocused4(false)}
                        placeholderTextColor={colors.text}
                        placeholder="Type your password"
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
                    <Text style={{...FONTS.font,color:colors.title,marginBottom:5}}>Confirm password</Text>
                    <View style={{marginBottom:20}}>
                      <TextInput 
                        style={[{
                          ...GlobalStyleSheet.formControl,
                          backgroundColor:colors.inputBg,
                          color:colors.title,
                          borderColor:colors.borderColor,
                        },isFocused5 && styles.inputActive]}
                        onFocus={() => setisFocused5(true)}
                        onBlur={() => setisFocused5(false)}
                        placeholderTextColor={colors.text}
                        placeholder="Confirm password"
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
                    <Text style={{...FONTS.font,color:colors.title,marginBottom:5}}>Referral code (Optional)</Text>
                    <View style={{marginBottom:10}}>
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
                        placeholder="Type code"
                      />  
                    </View>

                    <View
                      style={{
                        flexDirection:'row',
                      }}
                    >
                      <View
                        style={[Platform.OS === 'ios' && {
                            transform:[{
                                scale:.8
                            }],
                            marginRight:5,
                        }]}
                    >
                        <Checkbox
                            status={toggleCheckBox ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setToggleCheckBox(!toggleCheckBox);
                            }}
                            color={COLORS.primary}
                        />
                      </View>
                      <View style={{
                        marginLeft:4,
                        marginTop:7,
                        flex:1,
                      }}>
                        <Text style={{...FONTS.font,color:colors.title}}>I accept and agree to ther Terms and Conditions</Text>
                      </View>
                    </View>
                </View>
            </View>
            <View
              style={[GlobalStyleSheet.container,{
                padding:30,
                width:'100%',
              }]}
            >
                <CustomButton 
                  onPress={()=> props.navigation.navigate('SignIn')}
                  title="Register"
                />
                <View style={{justifyContent:'center',flexDirection:'row',marginTop:15}}>
                  <Text style={{...FONTS.font,color:colors.title,marginBottom:2}}>Already have an account?  </Text>
                  <TouchableOpacity
                    onPress={()=> props.navigation.navigate('SignIn')}
                  >
                    <Text style={{...FONTS.font,color:COLORS.primary}}>Login</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
      </SafeAreaView>
  );
};



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


export default SignUp;
