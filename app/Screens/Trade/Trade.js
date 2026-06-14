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

import Due from "./Due";
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
    const [filter , setFilter] = useState([]);

    const refRBSheet = useRef();
    const refSettingSheet = useRef();

    const scrollX = useRef(new Animated.Value(0)).current;
    const buttons = ['Due', 'Over Due', 'All'];

    const spotScrollViewRef = useRef(null);

    const onClick = (i) => {
        if (spotScrollViewRef.current) {
            // console.log(i);
            setFilter(i)
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
                            <Due filter={filter} />
                        </View>
                    </View>

                    <View style={[styles.cardTab]} >
                        <View style={{...GlobalStyleSheet.container,paddingTop:0}}>
                            <Due filter={filter} />
                        </View>
                    </View>

                    <View style={[styles.cardTab]} >
                        <View style={{...GlobalStyleSheet.container,paddingTop:0}}>
                            <Due filter={filter} />
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