import React, {useState} from "react";
import { 
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, ICONS } from "../../Utils/theme";
import CustomButton from "../../components/CustomButton";
import { SvgXml } from "react-native-svg";
import Header from "../../layout/header";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPasssword = (props) => {
  
  const [isFocused , setisFocused] = useState(false);
  const [isFocused2 , setisFocused2] = useState(false);
  const [handlePassword,setHandlePassword] = useState(true);
  const [handlePassword2,setHandlePassword2] = useState(true);
  const { colors } = useTheme();

  return (
      <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        <Header primaryBg title={'Reset Your Password'} leftIcon="back"/>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1}}
        >
            <View
                style={{
                    flex:1,
                    paddingVertical:25,
                }}
            >
                <View style={{...GlobalStyleSheet.container,flex:1}}>
                  <View style={{flex:1,marginBottom:30}}>
                      <View style={{alignItems:'center',marginBottom:30}}>
                          <Text style={{...FONTS.h3,color:colors.title,marginBottom:5}}>Reset Your Password</Text>
                          <Text style={{...FONTS.fontLg,color:colors.text,textAlign:'center'}}>Your new paasword must be different form previously used passwords.</Text>
                      </View>
                      <Text style={{...FONTS.font,color:colors.title,marginBottom:5}}>New password</Text>
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
                          },isFocused2 && styles.inputActive]}
                          onFocus={() => setisFocused2(true)}
                          onBlur={() => setisFocused2(false)}
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
                    </View>
                    <View style={{padding:15}}>
                      <CustomButton 
                        onPress={()=> props.navigation.navigate('SignIn')}
                        title="Reset Password"
                      />
                      <View style={{flexDirection:'row',justifyContent:'center',paddingTop:15}}>
                        <Text style={{...FONTS.font,color:colors.title,marginRight:6}}>Back to</Text>
                        <TouchableOpacity
                          onPress={()=> props.navigation.navigate('SignIn')}
                        ><Text style={{...FONTS.font,color:COLORS.primary}}>Login</Text></TouchableOpacity>
                      </View>
                    </View>
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


export default ResetPasssword;
