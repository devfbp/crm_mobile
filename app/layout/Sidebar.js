/*Sidebar.js*/
import React, { useRef, useState, useEffect } from "react";
import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS, IMAGES } from '../Utils/theme';
import ThemeBtn from '../components/ThemeBtn';
import { getToken  } from '../Utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Sidebar() {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
    const {colors} = useTheme();

    useEffect(() => {
        const loadUser = async () => {
          const userData = await getToken();
            //// console.log("Decoded Token:", userData);
          setUser(userData);
        };
        loadUser();
      }, []);

    const LogoutUser = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            navigation.navigate('Onboarding'); // Navigate to the Onboarding screen after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
      
    return (
        <View
            style={{
                flex:1,
                backgroundColor:colors.bgLight,
            }}
        >
            {Platform.OS === 'web' ? 
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15,  
                        alignItems:'flex-start',
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            width:'100%',
                        }}
                    >
                        <View
                            style={{
                                marginBottom:15,
                                padding:4,
                                borderRadius:70,
                                backgroundColor:'rgba(255,255,255,.1)',
                            }}
                        >
                            <Image
                                source={IMAGES.pic1}
                                style={{
                                    height:70,
                                    width:70,
                                    borderRadius:70,
                                }}
                            />                    
                        </View>
                        <View style={{marginTop:5}}>
                            <ThemeBtn/>
                        </View>
                    </View>
                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:3}}>{user?.user_name || ""}</Text>
                    <Text style={{...FONTS.fontSm,color:colors.title,opacity:.7}}>{user?.email || ""}</Text>
                </View> 
                :

                <ImageBackground
                    source={IMAGES.pattern}
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15,  
                        alignItems:'flex-start',
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            width:'100%',
                        }}
                    >
                        <View
                            style={{
                                marginBottom:15,
                                padding:4,
                                borderRadius:70,
                                backgroundColor:'rgba(255,255,255,.1)',
                            }}
                        >
                            <Image
                                source={IMAGES.pic1}
                                style={{
                                    height:70,
                                    width:70,
                                    borderRadius:70,
                                }}
                            />                    
                        </View>
                        <View style={{marginTop:5}}>
                            <ThemeBtn/>
                        </View>
                    </View>
                    <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:3}}>{user?.user_name || ""}</Text>
                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.7}}>{user?.email || ""}</Text>
                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.7}}>{user?.role_name || ""}</Text>
                    
                </ImageBackground>
            }
            <View style={{flex:1,paddingVertical:15}}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('DrawerNavigation', {screen: 'BottomNavigation'})}
                >
                    <Image
                        source={IMAGES.home3}
                        style={{
                            height:18,
                            width:18,
                            tintColor:colors.text,
                            marginRight:12,
                        }}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Home</Text>
                    <Feather  size={16} color={colors.text} name={'chevron-right'}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Image
                        source={IMAGES.settings}
                        style={{
                            height:18,
                            width:18,
                            tintColor:colors.text,
                            marginRight:12,
                        }}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Settings</Text>
                    <Feather  size={16} color={colors.text} name={'chevron-right'}/>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Components')}
                >
                    <Feather  style={{marginRight:12}} color={colors.text} size={18} name='grid'/>
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Components</Text>
                    <Feather  size={16} color={colors.text} name={'chevron-right'}/>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('History')}
                >
                    <Image
                        source={IMAGES.change}
                        style={{
                            height:18,
                            width:18,
                            tintColor:colors.text,
                            marginRight:12,
                        }}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>History</Text>
                    <Feather  size={16} color={colors.text} name={'chevron-right'}/>
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={LogoutUser}
                >
                    <Image
                        source={IMAGES.logout}
                        style={{
                            height:18,
                            width:18,
                            tintColor:colors.text,
                            marginRight:12,
                        }}
                    />
                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Logout</Text>
                    <Feather  size={16} color={colors.text} name={'chevron-right'}/>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    paddingHorizontal:15,
                    paddingVertical:20,
                }}
            >
                <Text style={{...FONTS.h6,color:colors.title,marginBottom:5}}>{process.env.EXPO_PUBLIC_APP_NAME}</Text>
                <Text style={{...FONTS.font,color:colors.text}}>App Version {process.env.EXPO_PUBLIC_API_VERSION}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navItem : {
        paddingHorizontal:15,
        paddingVertical:12,
        flexDirection:'row',
        alignItems:'center',
    }
})

export default Sidebar;