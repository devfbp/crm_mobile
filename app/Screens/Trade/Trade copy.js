import React, { useState, useRef, useEffect } from "react";
import { 
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import CustomButton from "../../components/CustomButton";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, ICONS, SIZES } from "../../Utils/theme";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RBSheet from "react-native-raw-bottom-sheet";
import FutureTrade from "../../components/BottomSheet/FutureTrade";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { SafeAreaView } from "react-native-safe-area-context";

import Due from "./LeadItem";
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

const OrderData2 = [
    {
        orderDate : '02-08-2022 5:30 pm',
        amount : '0.020000045',
        price : '294.70',
        orderType : 'Limit order',
    },
    {
        orderDate : '02-08-2022 5:30 pm',
        amount : '0.020000045',
        price : '294.70',
        orderType : 'Limit order',
    },
    {
        orderDate : '02-08-2022 5:30 pm',
        amount : '0.020000045',
        price : '294.70',
        orderType : 'Limit order',
    },
    {
        orderDate : '02-08-2022 5:30 pm',
        amount : '0.020000045',
        price : '294.70',
        orderType : 'Limit order',
    },
    {
        orderDate : '02-08-2022 5:30 pm',
        amount : '0.020000045',
        price : '294.70',
        orderType : 'Limit order',
    },
]

var radio_props = [
    {label: 'GTC', value: 0 },
    {label: 'IOC', value: 1 },
    {label: 'FOK', value: 2 }
];

const { width } = Dimensions.get('window');

function Trade() {

    const navigation = useNavigation();
    const {colors} = useTheme();
    const theme = useTheme();

    const refRBSheet = useRef();
    const refSettingSheet = useRef();

    const scrollX = useRef(new Animated.Value(0)).current;
    const buttons = ['Due', 'Over Due', 'All'];

    const spotScrollViewRef = useRef(null);

    const onClick = (i) => {
        if (spotScrollViewRef.current) {
            spotScrollViewRef.current.scrollTo({ x: i * width, animated: true });
        }
    };
    
    const [activeTab , setActiveTab] = useState('Buy');
    const [orderTab , setOrderTab] = useState('limit');
    const [isFocused , setisFocused] = useState(false);
    const [isFocused2 , setisFocused2] = useState(false);
    const [isFocused3 , setisFocused3] = useState(false);
    
    const [radioActive , setRadioActive ] = useState(0);

    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={460}
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
                <FutureTrade/>
            </RBSheet>

            <RBSheet
                ref={refSettingSheet}
                closeOnDragDown={true}
                height={190}
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
                <View style={{...GlobalStyleSheet.container}}>
                    <Text style={{...FONTS.font,color:colors.text,marginBottom:4,borderBottomWidth:1,borderStyle:'dashed',borderColor:colors.borderColor,marginRight:'auto'}}>Funding / Countdown</Text>
                    <Text style={{...FONTS.fontLg,color:COLORS.primary,...FONTS.fontMedium,marginBottom:18}}>0.0071%/02:13:08</Text>

                    <RadioForm
                        animation={true}
                        formHorizontal={true}
                    >
                        {
                            radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} 
                            style={{
                                marginRight:20
                            }}
                            >
                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={radioActive === i}
                                onPress={(value) => setRadioActive(value)}
                                borderWidth={1}
                                buttonInnerColor={COLORS.primary}
                                buttonOuterColor={COLORS.primary}
                                buttonSize={12}
                                buttonOuterSize={20}
                                />
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                onPress={(value) => setRadioActive(value)}
                                labelStyle={{...FONTS.font,color:colors.title,...FONTS.fontMedium}}
                                labelWrapStyle={{}}
                                />
                            </RadioButton>
                            ))
                        }  
                    </RadioForm>

                </View>
            {/* <FutureTrade/> */}
            </RBSheet>

            <ScrollView  showsHorizontalScrollIndicator={false}  contentContainerStyle={{paddingBottom:80}}>
                <View
                    style={[GlobalStyleSheet.container,{
                        padding:0,
                        flexDirection:'row',
                        alignItems:'center',
                        backgroundColor:colors.bgLight,
                        paddingVertical:8,
                        paddingRight:10,
                        shadowColor: "rgba(0,0,0,.6)",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,

                        elevation: 10,
                    }]}
                > 
                    <View style={{flex:1,paddingLeft:15}}>
                        <Text style={{...FONTS.h2,color:colors.title,marginBottom:2}}>Leads</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => refSettingSheet.current.open()}
                        style={{
                            height:40,
                            width:40,
                            alignItems:'center',
                            justifyContent:'center',
                        }}>
                        <SvgXml xml={ICONS.setting}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('TradeDetails')}
                        style={{
                            height:40,
                            width:40,
                            alignItems:'center',
                            justifyContent:'center',
                        }}>
                        <SvgXml xml={ICONS.trade}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=> refRBSheet.current.open()}
                        style={{
                            height:40,
                            width:40,
                            alignItems:'center',
                            justifyContent:'center',
                            marginLeft:5,
                        }}>
                        <SvgXml xml={ICONS.calculator}/>
                    </TouchableOpacity>
                </View>
                
                
                {/* <View style={{...GlobalStyleSheet.container}}>
                    <View
                        style={{
                            backgroundColor:colors.bgLight,
                            borderWidth:1,
                            borderColor:colors.borderColor,
                            borderRadius:SIZES.radiusLg,
                            paddingHorizontal:15,
                            paddingVertical:18,
                        }}
                    >
                    
                        <View style={{flexDirection:'row',marginHorizontal:-5}}>
                            <View style={{flex:1,paddingHorizontal:5,marginBottom:15}}>
                                <TouchableOpacity
                                    onPress={()=> setActiveTab('Buy')}
                                    style={[styles.tabBtn,{backgroundColor:'rgba(111,79,239,.2)'},activeTab === "Buy" && {backgroundColor:COLORS.primary}]}
                                >
                                    <Text style={[{...FONTS.fontLg,...FONTS.fontMedium,color:COLORS.primary},activeTab === "Buy" && {color:COLORS.white}]}>BUY</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1,paddingHorizontal:5}}>
                                <TouchableOpacity
                                    onPress={()=> setActiveTab('Sell')}
                                    style={[styles.tabBtn,{backgroundColor:'rgba(235,87,87,.1)'},activeTab === "Sell" && {backgroundColor:COLORS.danger}]}
                                    >
                                    <Text style={[{...FONTS.fontLg,...FONTS.fontMedium,color:COLORS.danger},activeTab === "Sell" && {color:COLORS.white}]}>SELL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {activeTab === "Buy" ?
                            <>
                                
                                <View>
                                    
                                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                                        <Text style={{...FONTS.font,color:COLORS.primary,flex:1}}>Price</Text>
                                        <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>BALANCE: <Text style={{...FONTS.fontBold,color:COLORS.primary}}>$3,123.9</Text></Text>
                                    </View>
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
                                            placeholder="0.00"
                                            placeholderTextColor={colors.text}
                                        />  
                                        <Text style={{...styles.inputLabelRight,color:colors.text}}>USDT</Text>
                                    </View>
                                    
                                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:5}}>Amount</Text>
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
                                            placeholder="Amount"
                                            placeholderTextColor={colors.text}
                                        />  
                                        <Text style={{...styles.inputLabelRight,color:colors.text}}>BTC</Text>
                                    </View>

                                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:5}}>Total</Text>
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
                                            placeholder="Total"
                                            placeholderTextColor={colors.text}
                                        />  
                                        <Text style={{...styles.inputLabelRight,color:colors.text}}>USDT</Text>
                                    </View>

                                    <View style={{marginBottom:20,marginTop:-10}}>
                                        <MultiSlider
                                            enableLabel
                                            customLabel={() => 
                                                <View style={{
                                                    flexDirection:'row',
                                                    justifyContent:'space-between',
                                                    position:'absolute',
                                                    bottom:-4,
                                                    width:'100%',
                                                }}>
                                                    <Text style={{...FONTS.fontSm,color:colors.text}}>0%</Text>
                                                    <Text style={{...FONTS.fontSm,color:colors.text}}>25%</Text>
                                                    <Text style={{...FONTS.fontSm,color:colors.text}}>50%</Text>
                                                    <Text style={{...FONTS.fontSm,color:colors.text}}>75%</Text>
                                                    <Text style={{...FONTS.fontSm,color:colors.text}}>100%</Text>
                                                </View>
                                            }
                                            trackStyle={{height:4,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                                            selectedStyle={{
                                                backgroundColor:COLORS.primary,
                                            }}
                                            markerStyle={{
                                                backgroundColor:COLORS.primary,
                                                top:1,
                                                height:16,
                                                width:16,
                                                borderWidth:3,
                                                borderColor:COLORS.primary,
                                            }}
                                            sliderLength={SIZES.width - 60 > SIZES.container ? SIZES.container - 60 : SIZES.width - 60}
                                            max={100}
                                        />
                                    </View>

                                    <CustomButton btnRounded title="BUY BTC"/>

                                </View>

                            </>

                        :
                        activeTab === "Sell" ?
                            <>
                                
                                <View>
                               
                                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                                        <Text style={{...FONTS.font,color:COLORS.primary,flex:1}}>Price</Text>
                                        <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>BALANCE: <Text style={{...FONTS.fontBold,color:COLORS.primary}}>$3,123.9</Text></Text>
                                    </View>
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
                                            placeholder="0.00"
                                            placeholderTextColor={colors.text}
                                        />  
                                        <Text style={{...styles.inputLabelRight,color:colors.text}}>USDT</Text>
                                    </View>
                                    
                                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:5}}>Amount</Text>
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
                                            placeholder="Amount"
                                            placeholderTextColor={colors.text}
                                        />  
                                        <Text style={{...styles.inputLabelRight,color:colors.text}}>BTC</Text>
                                    </View>

                                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:5}}>Total</Text>
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
                                            placeholder="Total"
                                            placeholderTextColor={colors.text}
                                        />  
                                        <Text style={{...styles.inputLabelRight,color:colors.text}}>USDT</Text>
                                    </View>
                                   

                                <View style={{marginBottom:20,marginTop:-10}}>
                                    <MultiSlider
                                        enableLabel
                                        customLabel={() => 
                                            <View style={{
                                                flexDirection:'row',
                                                justifyContent:'space-between',
                                                position:'absolute',
                                                bottom:-4,
                                                width:'100%',
                                            }}>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>0%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>25%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>50%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>75%</Text>
                                                <Text style={{...FONTS.fontSm,color:colors.text}}>100%</Text>
                                            </View>
                                        }
                                        trackStyle={{height:4,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                                        selectedStyle={{
                                            backgroundColor:COLORS.primary,
                                        }}
                                        markerStyle={{
                                            backgroundColor:COLORS.primary,
                                            top:1,
                                            height:16,
                                            width:16,
                                            borderWidth:3,
                                            borderColor:COLORS.primary,
                                        }}
                                        sliderLength={SIZES.width - 60 > SIZES.container ? SIZES.container - 60 : SIZES.width - 60}
                                        max={100}
                                    />
                                </View>

                                <CustomButton color={COLORS.danger} btnRounded title="SELL BTC"/>

                            </View>

                            </>

                        :
                            null        
                        }       
                    </View>
                </View> */}
                
                
                {/* <View style={{...GlobalStyleSheet.container,borderBottomWidth:1,borderColor:colors.borderColor}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                        <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title}}>Order Book</Text>
                        <SvgXml style={{marginLeft:5}} height={12} width={12} fill={COLORS.primary} xml={ICONS.down}/>
                    </View>
                
                    <View style={{flexDirection:'row',marginHorizontal:-5}}>
                        <View style={{flex:1,paddingHorizontal:5}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                                <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Price</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Amount</Text>
                            </View>
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
                        <View style={{flex:1,paddingHorizontal:5}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                                <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Amount</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text,...FONTS.fontMedium}}>Price</Text>
                            </View>
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
                    </View>   

                    <View
                        style={{
                            borderTopWidth:1,
                            borderColor:colors.borderColor,
                            marginTop:10,
                            flexDirection:'row',
                            paddingTop:6,
                            paddingBottom:6,
                        }}
                    >
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.success}}>0.6137</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.text}}>  0.6137 USD</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',paddingLeft:10,justifyContent:'space-between'}}>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.text}}>0.000</Text>
                            <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>0.0000</Text>
                        </View>
                    </View>

                </View> */}

                
                <View style={GlobalStyleSheet.container}>
                    <ButtonContainer buttons={buttons} onClick={onClick} scrollX={scrollX} />
                </View>
                
                
                <ScrollView
                    ref={spotScrollViewRef}
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    scrollEnabled={false}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}>

                    <View style={[styles.cardTab]} >
                        <View style={{...GlobalStyleSheet.container,paddingTop:0}}>
                            {OrderData2.map((data,index) => (
                                <View 
                                    key={index}
                                    style={{
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        backgroundColor:colors.bgLight,
                                        paddingHorizontal:15,
                                        paddingVertical:14,
                                        borderRadius:SIZES.radiusLg,
                                        marginBottom:8,
                                    }}
                                >
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:3}}>
                                        <Text style={{...FONTS.h5,...FONTS.fontMedium,color:COLORS.primary}}>Buy</Text>
                                        <Text style={{...FONTS.font,color:COLORS.danger}}>Cancel</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                                        <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title}}>Order Date</Text>
                                        <Text style={{...FONTS.fontSm,color:COLORS.primary}}>{data.orderDate}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Amount</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title,fontSize:13}}>{data.amount}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Price</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{data.price}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Order type</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{data.orderType}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={[styles.cardTab]} >
                        <View style={{...GlobalStyleSheet.container,paddingTop:0}}>
                            {OrderData2.map((data,index) => (
                                <View 
                                    key={index}
                                    style={{
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        backgroundColor:colors.bgLight,
                                        paddingHorizontal:15,
                                        paddingVertical:14,
                                        borderRadius:SIZES.radiusLg,
                                        marginBottom:8,
                                    }}
                                >
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:3}}>
                                        <Text style={{...FONTS.h5,...FONTS.fontMedium,color:COLORS.primary}}>Buy</Text>
                                        <Text style={{...FONTS.font,color:COLORS.danger}}>Cancel</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                                        <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title}}>Order Date</Text>
                                        <Text style={{...FONTS.fontSm,color:COLORS.primary}}>{data.orderDate}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Amount</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title,fontSize:13}}>{data.amount}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Price</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{data.price}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Order type</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{data.orderType}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={[styles.cardTab]} >
                        <View style={{...GlobalStyleSheet.container,paddingTop:0}}>
                            {OrderData2.map((data,index) => (
                                <View 
                                    key={index}
                                    style={{
                                        borderWidth:1,
                                        borderColor:colors.borderColor,
                                        backgroundColor:colors.bgLight,
                                        paddingHorizontal:15,
                                        paddingVertical:14,
                                        borderRadius:SIZES.radiusLg,
                                        marginBottom:8,
                                    }}
                                >
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:3}}>
                                        <Text style={{...FONTS.h5,...FONTS.fontMedium,color:COLORS.primary}}>Buy</Text>
                                        <Text style={{...FONTS.font,color:COLORS.danger}}>Cancel</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                                        <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title}}>Order Date</Text>
                                        <Text style={{...FONTS.fontSm,color:COLORS.primary}}>{data.orderDate}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Amount</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title,fontSize:13}}>{data.amount}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Price</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{data.price}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{...FONTS.font,color:colors.text,fontSize:13}}>Order type</Text>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{data.orderType}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                </ScrollView>


            </ScrollView>
        </SafeAreaView>
    )
}


function ButtonContainer({ buttons, onClick, scrollX }) {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, btnWidth],
    });
    const translateXOpposit = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, -btnWidth],
    });
    const { colors } = useTheme();

  
    return (
        <View
            style={{...styles.btnContainer,backgroundColor:colors.bgLight}}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={() => onClick(i)}>
                    <Text style={{...FONTS.font,color:colors.text}}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    { width: btnWidth, transform: [{ translateX }] },
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                        ]}>
                        <Text style={{...FONTS.font,color:COLORS.white}}>{btn}</Text>
                        <View
                          style={{
                            height:45,
                            width:btnWidth,
                            backgroundColor:COLORS.primary,
                            position:'absolute',
                            zIndex:-1,
                            bottom:0,
                          }}
                        />
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    tabBtn:{
        height:48,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
        paddingVertical:8,
    },
    btnTabSmall:{
        height:30,
        flex:1,
        borderRadius:8,
        borderWidth:1,
        borderColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
    },
    inputActive:{
        borderColor:COLORS.primary,
    },
    inputLabelRight:{
        ...FONTS.font,
        position:'absolute',
        ...FONTS.fontMedium,
        right:15,
        top:12,
    },
    btnContainer: {
        height: 45,
        //overflow: 'hidden',
        flexDirection: 'row',
        width: '100%',
        borderRadius:30,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedBtnContainer: {
        height: 45,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        borderRadius:30,
    },
    animatedBtn: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cardTab: {
        width: width,
    },
    bglayer:{
        position:'absolute',
        height:'100%',
        zIndex:-1,
    }
})

export default Trade;