import React from "react";
import { 
  ImageBackground, 
  Text,
  View,
  ScrollView,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, ICONS, IMAGES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderData = [
    {
        price : "0.6188",
        amount : "14.5k",
        length : '100%',
    },
    {
        price : "0.6109",
        amount : "8.009k",
        length : '75%',
    },
    {
        price : "0.68859",
        amount : "4.588k",
        length : '40%',
    },
    {
        price : "0.6188",
        amount : "14.5k",
        length : '50%',
    },
    {
        price : "0.6188",
        amount : "8.009k",
        length : '20%',
    },
    {
        price : "0.6188",
        amount : "4.588k",
        length : '45%',
    },
]

const TradeDetails = (props) => {
  
  const { colors } = useTheme();
  const theme = useTheme();
  
  return (
    <>
        <SafeAreaView
            style={{
            flex:1,
            backgroundColor:colors.background,
            }}
        >
            <View
                style={{
                    flex:1,
                    backgroundColor:colors.ThemeBg,
                }}
            >
                <Header titleLeft={true} leftIcon={'back'} title="BTC/USD"/>
                <ScrollView>

                    <ImageBackground
                        source={IMAGES.pattern}
                        style={[{
                            height:null,
                            flex:1,
                            padding:0,
                            paddingHorizontal:15,
                            paddingVertical:15,
                            borderBottomLeftRadius:20,
                            borderBottomRightRadius:20,
                            overflow:'hidden',
                            flexDirection:'row',
                        }]}
                    >
                        <View style={{flex:1}}>
                            <Text style={{...FONTS.h3,color:COLORS.white,marginBottom:8,marginTop:4}}>0.6234</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontSemiBold,color:COLORS.white,marginBottom:1}}>= 0.6137 USD</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontSemiBold,color:COLORS.white}}>New Asset Value: 0.6145</Text>
                        </View>
                        <View style={{flex:.5}}>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:'rgba(255,255,255,.7)'}}>24h High</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontSemiBold,color:COLORS.white,marginBottom:5}}>22,659.9</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:'rgba(255,255,255,.7)'}}>24h Low</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontSemiBold,color:COLORS.white}}>22,003.8</Text>
                        </View>
                        <View>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:'rgba(255,255,255,.7)'}}>24h Vol BTC</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontSemiBold,color:COLORS.white,marginBottom:5}}>654,142.132</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:'rgba(255,255,255,.7)'}}>24h Vol USDT</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontSemiBold,color:COLORS.white}}>14.59B</Text>
                        </View>
                    </ImageBackground>

                    <View style={{...GlobalStyleSheet.container}}>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                            <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title}}>Order Book</Text>
                            <SvgXml style={{marginLeft:5}} height={12} width={12} fill={COLORS.primary} xml={ICONS.down}/>
                        </View>
                    
                        <View style={{flexDirection:'row',marginHorizontal:-5}}>
                            <View style={{flex:1,paddingHorizontal:5}}>
                                <View style={{marginBottom:18}}>
                                    {OrderData.map((data,index) => (
                                        <View
                                            key={index}
                                            style={{
                                                height:22,
                                                flexDirection:'row',
                                                justifyContent:'space-between',
                                                alignItems:'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: data.length,
                                                    backgroundColor:theme.dark ? 'rgba(103,196,128,.1)' : '#CBFFD9',
                                                    height:'100%',
                                                    position:'absolute',
                                                }}
                                            />
                                            <Text style={{...FONTS.fontSm,fontSize:11,color:theme.dark ? COLORS.success : '#468069'}}>{data.price}</Text>
                                            <Text style={{...FONTS.fontSm,fontSize:11,color:colors.title}}>{data.amount}</Text>
                                        </View>
                                    ))}
                                </View>
                                <CustomButton title={'BUY'}/>
                            </View>
                            <View style={{flex:1,paddingHorizontal:5}}>
                                <View style={{marginBottom:18}}>
                                    {OrderData.map((data,index) => (
                                        <View
                                            key={index}
                                            style={{
                                                height:22,
                                                flexDirection:'row',
                                                justifyContent:'space-between',
                                                alignItems:'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    right:0,
                                                    width: data.length,
                                                    backgroundColor:theme.dark ? 'rgba(235,87,87,.15)' : '#FFE3E3',
                                                    height:'100%',
                                                    position:'absolute',
                                                }}
                                            />
                                            <Text style={{...FONTS.fontSm,fontSize:11,color:colors.title}}>{data.amount}</Text>
                                            <Text style={{...FONTS.fontSm,fontSize:11,color:theme.dark ? COLORS.danger : '#8F3939'}}>{data.price}</Text>
                                        </View>
                                    ))}
                                </View>
                                <CustomButton color={COLORS.danger} title={'SELL'}/>
                            </View>
                        </View>   

                        

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    </>
  );
};



export default TradeDetails;
