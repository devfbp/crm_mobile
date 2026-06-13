import React, { useEffect, useRef, useState } from "react";
import { 
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomToggle from "../../components/CustomToggle";
import { SvgXml } from "react-native-svg";
import RBSheet from "react-native-raw-bottom-sheet";
import CustomButton from "../../components/CustomButton";
import themeContext from "../../Utils/themeContext";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = (props) => {
  
  const { colors } = useTheme();
  const theme = useTheme();
  const refRBSheet = useRef();
  const [settingRBSheet , setSettingRBSheet] = useState('email');
  const [isFocused , setisFocused] = useState(false);
  const [toggleBox , setToggleBox] = useState(false);

  const {setDarkTheme,setLightTheme} = React.useContext(themeContext);
  
  useEffect(()=> {
    if(theme.dark == true){
      setToggleBox(true);
    }else{
      setToggleBox(false);
    }
  },[theme])


  return (
    <>
      <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={220}
          openDuration={300}
          customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,.6)',
              },
              container:{
                  backgroundColor: colors.bgLight,
              },
              draggableIcon: {
                  width:85,
                  height:6,
                  backgroundColor:colors.text,
                  opacity:.3,
              }
          }}
        >
          {
            (settingRBSheet === 'email') ? 
              <>
                <View style={{...GlobalStyleSheet.container,paddingTop:10}}>
                  <Text style={{...FONTS.font,color:colors.title,...FONTS.fontMedium,marginBottom:8}}>Change email address</Text>
                  
                  <View style={{marginBottom:18}}>
                    <TextInput
                      style={[{
                          ...GlobalStyleSheet.formControl,
                          backgroundColor:colors.background,
                          color:colors.title,
                          borderColor:colors.borderColor,
                      },isFocused && styles.inputActive]}
                      onFocus={() => setisFocused(true)}
                      onBlur={() => setisFocused(false)}
                      placeholder="Type your email"
                      placeholderTextColor={colors.text}
                    />  
                  </View>

                  <CustomButton title="Change Email"/>
                </View>
              </>
            :
            (settingRBSheet === 'phone') ? 
              <>
                <View style={{...GlobalStyleSheet.container,paddingTop:10}}>
                  <Text style={{...FONTS.font,color:colors.title,...FONTS.fontMedium,marginBottom:8}}>Phone number</Text>
                  
                  <View style={{marginBottom:18}}>
                    <TextInput
                      style={[{
                        ...GlobalStyleSheet.formControl,
                        backgroundColor:colors.background,
                        color:colors.title,
                        borderColor:colors.borderColor,
                      },isFocused && styles.inputActive]}
                      onFocus={() => setisFocused(true)}
                      onBlur={() => setisFocused(false)}
                      placeholder="Type your phone"
                      placeholderTextColor={colors.text}
                    />  
                  </View>
                  <CustomButton title="Send OTP"/>
                </View>
              </> 
            
            : <></>
          }
          
        </RBSheet>


          <View
              style={{
                  flex:1,
                  backgroundColor:colors.ThemeBg,
              }}
          >
              <Header leftIcon="back" title="Settings"/>

              <ScrollView>
                <View style={{...GlobalStyleSheet.container}}>
                 
                  <TouchableOpacity
                    style={{...styles.settingItem,backgroundColor:colors.bgLight,borderColor:colors.borderColor}}
                    onPress={() => {
                        setToggleBox(!toggleBox);
                        if(toggleBox){
                          setLightTheme()
                        }else{
                          setDarkTheme()
                        }
                      }
                    }
                  >
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      colors={["#6F4FEF","#4628FF"]}
                      style={{
                        ...styles.settingIcon,
                      }}
                    >
                      <Image style={{tintColor:COLORS.white,height:22,width:22}} source={IMAGES.sun2} />
                    </LinearGradient>
                    <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title,flex:1}}>Dark Mode</Text>
                    <CustomToggle value={toggleBox}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{...styles.settingItem,backgroundColor:colors.bgLight,borderColor:colors.borderColor}}
                  >
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      colors={["#6F4FEF","#4628FF"]}
                      style={{
                        ...styles.settingIcon,
                      }}
                    >
                      <Image style={{tintColor:COLORS.white,height:20,width:20}} source={IMAGES.home3} />
                    </LinearGradient>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                      <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title}}>Dashboard</Text>
                    </View>
                    <SvgXml fill={colors.title} xml={ICONS.right}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{...styles.settingItem,backgroundColor:colors.bgLight,borderColor:colors.borderColor}}
                    onPress={() => {setSettingRBSheet('email');refRBSheet.current.open()}}
                  >
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      colors={["#6F4FEF","#4628FF"]}
                      style={{
                        ...styles.settingIcon,
                      }}
                    >
                      <Image style={{tintColor:COLORS.white,height:20,width:20}} source={IMAGES.mail} />
                    </LinearGradient>
                    <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title,flex:1}}>Email Address</Text>
                    <SvgXml fill={colors.title} xml={ICONS.right}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{...styles.settingItem,backgroundColor:colors.bgLight,borderColor:colors.borderColor}}
                    onPress={() => {setSettingRBSheet('phone');refRBSheet.current.open()}}
                  >
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      colors={["#6F4FEF","#4628FF"]}
                      style={{
                        ...styles.settingIcon,
                      }}
                    >
                      <Image style={{tintColor:COLORS.white,height:22,width:22}} source={IMAGES.phone} />
                    </LinearGradient>
                    <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title,flex:1}}>Phone Number</Text>
                    <SvgXml fill={colors.title} xml={ICONS.right}/>
                  </TouchableOpacity>
                  
                 
                  <TouchableOpacity
                    style={{...styles.settingItem,backgroundColor:colors.bgLight,borderColor:colors.borderColor}}
                    onPress={() => props.navigation.navigate('ChangePassword')}
                  >
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      colors={["#6F4FEF","#4628FF"]}
                      style={{
                        ...styles.settingIcon,
                      }}
                    >
                      <Image style={{tintColor:COLORS.white,height:22,width:22}} source={IMAGES.lock} />
                    </LinearGradient>
                    <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title,flex:1}}>Change Password</Text>
                    <SvgXml fill={colors.title} xml={ICONS.right}/>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{...styles.settingItem,backgroundColor:colors.bgLight,borderColor:colors.borderColor}}
                    onPress={() => props.navigation.navigate('TwoFASettings')}
                  >
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      colors={["#6F4FEF","#4628FF"]}
                      style={{
                        ...styles.settingIcon,
                      }}
                    >
                      <Image style={{tintColor:COLORS.white,height:22,width:22}} source={IMAGES.qr} />
                    </LinearGradient>
                    <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title,flex:1}}>Scan QR Code</Text>
                    <SvgXml fill={colors.title} xml={ICONS.right}/>
                  </TouchableOpacity>

                </View>

              </ScrollView>

          </View>
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({
  settingItem:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:8,
    paddingHorizontal:10,
    borderRadius:SIZES.radius,
    borderWidth:1,
    marginBottom:8,
  },  
  settingIcon:{
    height:38,
    width:38,
    borderRadius:35,
    alignItems:'center',
    justifyContent:'center',
    marginRight:10,
  },
  inputActive:{
    borderColor:COLORS.primary,
  },
})


export default Settings;
