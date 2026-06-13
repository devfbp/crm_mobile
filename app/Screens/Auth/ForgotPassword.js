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
import { COLORS, FONTS } from "../../Utils/theme";
import CustomButton from "../../components/CustomButton";
import Header from "../../layout/header";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = (props) => {
  
  const [isFocused , setisFocused] = useState(false);
  const { colors } = useTheme();

  return (
      <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        <Header primaryBg title={'Reset password'} leftIcon="back"/>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View
                style={{
                  flex:1,
                  paddingVertical:25,
                }}
            >
                <View style={{...GlobalStyleSheet.container}}>
                    <View style={{alignItems:'center',marginBottom:30}}>
                        <Text style={{...FONTS.h3,color:colors.title,marginBottom:5}}>Reset password</Text>
                        <Text style={{...FONTS.fontLg,color:colors.text,textAlign:'center'}}>Enter your Email address to recover {"\n"} your password</Text>
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
                    
                </View>
            </View>
            <View
              style={[GlobalStyleSheet.container,{
                padding:30,
                width:'100%',
              }]}
            >
              <CustomButton 
                onPress={()=> props.navigation.navigate('Otpauthention')}
                title="Send code"
              />
              <View style={{flexDirection:'row',justifyContent:'center',paddingTop:15}}>
                <Text style={{...FONTS.font,color:colors.title,marginRight:6}}>Back to</Text>
                <TouchableOpacity
                  onPress={()=> props.navigation.navigate('SignIn')}
                ><Text style={{...FONTS.font,color:COLORS.primary}}>Login</Text></TouchableOpacity>
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
  
})


export default ForgotPassword;
