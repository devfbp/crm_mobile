import React, {useRef, useState} from "react";
import { 
  ImageBackground, 
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, IMAGES, ICONS } from "../../Utils/theme";
import { SvgXml } from "react-native-svg";
import { launchImageLibrary } from 'react-native-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = ["English","Ukrainian","Urdu"];

const ProfileScreen = (props) => {
  const [activeItem , setActiveItem] = useState(Language[0]);
  const [imgUrl , setImgUrl] = useState(null);
  const { colors } = useTheme();
  const refRBSheet = useRef();

  const handleProfileImage = async () => {
    if(Platform.OS === 'ios'){
      let options = {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
          if(!response.didCancel){
            setImgUrl(response.assets[0].uri)
          }
      })
    }else{
      try {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ]).then((result) => {
            if (result['android.permission.CAMERA']
            && result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
                let options = {
                    mediaType: 'photo',
                    maxWidth: 200,
                    maxHeight: 200,
                    quality: 1,
                };
                launchImageLibrary(options, (response) => {
                    if(!response.didCancel){
                      setImgUrl(response.assets[0].uri)
                    }
                })
            }
        });
      } catch (err) {
          console.warn(err);
      }
    }

  }

  return (
    <>
      <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              //backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: colors.text,
              opacity:.3,
              width:85,
              height:6,
            },
            container: {
              backgroundColor:colors.bgLight,
            }
          }}
        >
          <View
            style={[GlobalStyleSheet.container,{padding:0}]}
          >
            <Text style={{...FONTS.h6,color:colors.title,paddingHorizontal:15,paddingTop:10,paddingBottom:14}}>Select language</Text>
            
            {Language.map((data,index) => (
              <TouchableOpacity
                onPress={()=> {setActiveItem(data); refRBSheet.current.close() }}
                key={index}
                style={[{
                  flexDirection:'row',
                  justifyContent:'space-between',
                  marginHorizontal:15,
                  borderWidth:1,
                  marginBottom:5,
                  borderColor:colors.borderColor,
                  paddingVertical:14,
                  borderRadius:30,
                  paddingHorizontal:18,
                  backgroundColor:colors.background,
                },activeItem == data && {
                  backgroundColor: COLORS.primary,
                }]}
              >
                <Text style={[{...FONTS.font,...FONTS.fontMedium,color:colors.title}, activeItem == data && {color:COLORS.white}]}>{data}</Text>
                <Image
                  style={[{
                    height:18,
                    width:18,
                    tintColor:colors.text,
                    opacity:.3,
                  }, activeItem == data && {
                    tintColor:COLORS.white,
                    opacity:1,
                  }]}
                  source={IMAGES.check}
                />
              </TouchableOpacity>
            ))}
          </View>
        </RBSheet>
        <View
            style={{
                flex:1,
            }}
        >
          <Header title="Profile"/>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1,paddingBottom:0}}
          >
            <View style={[GlobalStyleSheet.container,{padding:0,paddingHorizontal:-15,paddingVertical:-15}]}>
              <ImageBackground
                source={IMAGES.pattern}
                style={[{
                  paddingHorizontal:15,
                  paddingVertical:25,
                  overflow:'hidden',
                  paddingBottom:50,
                }]}
              > 
                <View
                  style={{
                    flexDirection:'row',
                    alignItems:'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor:'rgba(255,255,255,.2)',
                      borderRadius:16,
                      padding:4,
                      marginRight:18,
                    }}
                  >
                    <Image
                      source={imgUrl ? {uri : imgUrl} : IMAGES.pic1}
                      style={{
                        height:90,
                        width:90,
                        borderRadius:14,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleProfileImage()}
                      style={{
                        height:35,
                        width:35,
                        backgroundColor:colors.bgLight,
                        borderWidth:2,
                        borderColor:COLORS.primary,
                        borderRadius:20,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        top:-8,
                        right:-10,
                      }}
                    >
                      <Image
                        source={IMAGES.edit}
                        style={{
                          height:18,
                          width:18,
                          tintColor:colors.title,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{...FONTS.h5,color:COLORS.white,marginBottom:6}}>Richard Smith</Text>
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                        marginBottom:4,
                      }}
                    >
                      <Image
                        source={IMAGES.mail}
                        style={{
                          height:14,
                          width:14,
                          marginRight:8,
                          tintColor:COLORS.white,  
                          opacity:.7,                    
                        }}
                      />
                      <Text style={{...FONTS.font,color:COLORS.white,opacity:.7}}>example@gmail.com</Text>
                    </View>
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                      }}
                    >
                      <Image
                        source={IMAGES.phone2}
                        style={{
                          height:14,
                          width:14,
                          marginRight:8,
                          tintColor:COLORS.white,  
                          opacity:.7,                    
                        }}
                      />
                      <Text style={{...FONTS.font,color:COLORS.white,opacity:.7}}>+971123231211</Text>
                    </View>
                  </View>
                </View>
              
              </ImageBackground>
            </View>
            <View
              style={{
                ...GlobalStyleSheet.container,
                flex:1,
                backgroundColor:colors.bgLight,
                borderTopLeftRadius:25,
                borderTopRightRadius:25,
                marginTop:-25,
              }}
            >
              <TouchableOpacity
                onPress={()=> props.navigation.navigate('KYCScreen')}
                style={[styles.listItem,{borderColor:colors.borderColor}]}
              >
                <Image
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.text,
                    marginRight:12,
                  }}
                  source={IMAGES.verification}
                />
                <Text style={{...FONTS.fontLg,...FONTS.fontMedium,flex:1,color:colors.title}}>Verification</Text>
                <SvgXml style={{transform:[{rotate:'180deg'}]}}
                  fill={colors.title}
                  height={14} width={14}
                  xml={ICONS.back}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> props.navigation.navigate('Settings')}
                style={[styles.listItem,{borderColor:colors.borderColor}]}
              >
                <Image
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.text,
                    marginRight:12,
                  }}
                  source={IMAGES.settings}
                />
                <Text style={{...FONTS.fontLg,...FONTS.fontMedium,flex:1,color:colors.title}}>Settings</Text>
                <SvgXml style={{transform:[{rotate:'180deg'}]}}
                  fill={colors.title}
                  height={14} width={14}
                  xml={ICONS.back}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> props.navigation.navigate('Support')}
                style={[styles.listItem,{borderColor:colors.borderColor}]}
              >
                <Image
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.text,
                    marginRight:12,
                  }}
                  source={IMAGES.support}
                />
                <Text style={{...FONTS.fontLg,...FONTS.fontMedium,flex:1,color:colors.title}}>Support</Text>
                <SvgXml style={{transform:[{rotate:'180deg'}]}}
                  fill={colors.title}
                  height={14} width={14}
                  xml={ICONS.back}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> props.navigation.navigate('History')}
                style={[styles.listItem,{borderColor:colors.borderColor}]}
              >
                <Image
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.text,
                    marginRight:12,
                  }}
                  source={IMAGES.history}
                />
                <Text style={{...FONTS.fontLg,...FONTS.fontMedium,flex:1,color:colors.title}}>History</Text>
                <SvgXml style={{transform:[{rotate:'180deg'}]}}
                  fill={colors.title}
                  height={14} width={14}
                  xml={ICONS.back}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> refRBSheet.current.open()}
                style={[styles.listItem,{borderColor:colors.borderColor}]}
              >
                <Image
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.text,
                    marginRight:12,
                  }}
                  source={IMAGES.language}
                />
                <Text style={{...FONTS.fontLg,...FONTS.fontMedium,flex:1,color:colors.title}}>Language</Text>
                <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:COLORS.primary}}>{activeItem}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> props.navigation.navigate('Onboarding')}
                style={[styles.listItem,{borderColor:colors.borderColor}]}
              >
                <Image
                  style={{
                    height:22,
                    width:22,
                    tintColor:colors.text,
                    marginRight:12,
                  }}
                  source={IMAGES.logout}
                />
                <Text style={{...FONTS.fontLg,...FONTS.fontMedium,flex:1,color:colors.title}}>Log out</Text>
                <SvgXml style={{transform:[{rotate:'180deg'}]}}
                  fill={colors.title}
                  height={14} width={14}
                  xml={ICONS.back}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({

  listItem:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:14,
    paddingHorizontal:15,
    marginHorizontal:-15,
  },

  modalContainer:{
    backgroundColor:'rgba(0,0,0,.4)',
    flex:1,
    justifyContent:'center',
    padding:15,
  },
  circleCheck:{
    height:26,
    width:26,
    borderRadius:13,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
  }
  
})


export default ProfileScreen;
