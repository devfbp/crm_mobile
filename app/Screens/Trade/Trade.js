/* LEAD LISTING SCREEN */
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

import LeadItem from "./LeadItem";

const { width } = Dimensions.get('window');

function Trade() {

    const navigation = useNavigation();
    const { colors } = useTheme();
    const theme = useTheme();
    const [filter, setFilter] = useState([]);
    const [buttons, setButtons] = useState(['All']);

    const refRBSheet = useRef();
    const refSettingSheet = useRef();

    const scrollX = useRef(new Animated.Value(0)).current;
    // const buttons = ['All'];

    const spotScrollViewRef = useRef(null);

    useEffect(() => {
        // console.log('Filter updated:', filter);
        refRBSheet.current.close()
    }, [filter]);

    const onClick = (i) => {
        if (spotScrollViewRef.current) {
            // console.log(i);
            setFilter(i)
            spotScrollViewRef.current.scrollTo({ x: i * width, animated: true });
        }
    };

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={460}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.6)',
                    },
                    container: {
                        backgroundColor: colors.bgLight,
                    },
                    draggableIcon: {
                        width: 85,
                        height: 6,
                        backgroundColor: colors.text,
                        opacity: .3,
                    }
                }}
            >
                <FutureTrade filter={filter} setFilter={setFilter}  />
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
                    container: {
                        backgroundColor: colors.bgLight,
                    },
                    draggableIcon: {
                        width: 85,
                        height: 6,
                        backgroundColor: colors.text,
                        opacity: .3,
                    }
                }}
            >
                
                {/* <FutureTrade/> */}
            </RBSheet>
            <View
                style={[GlobalStyleSheet.container, {
                    padding: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.bgLight,
                    paddingVertical: 8,
                    paddingRight: 10,
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
                <View style={{ flex: 1, paddingLeft: 15 }}>
                    <Text style={{ ...FONTS.h2, color: colors.title, marginBottom: 2 }}>Leads</Text>
                </View>
                {/* <TouchableOpacity 
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
                    </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => refRBSheet.current.open()}
                    style={{
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 5,
                    }}>
                    <SvgXml xml={ICONS.search} />
                </TouchableOpacity>
            </View>
            <View style={GlobalStyleSheet.container}>
                <ButtonContainer buttons={buttons} onClick={onClick} scrollX={scrollX} />
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>


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
                        <View style={{ ...GlobalStyleSheet.container, paddingTop: 0 }}>
                            <LeadItem filter={filter} buttons={buttons} setButtons={setButtons} />
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
            style={{ ...styles.btnContainer, backgroundColor: colors.bgLight }}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={() => onClick(i)}>
                    <Text style={{ ...FONTS.font, color: colors.text }}>{`${btn} (0)`}</Text>
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
                        <Text style={{ ...FONTS.font, color: COLORS.white }}>{`${btn}`}</Text>
                        <View
                            style={{
                                height: 45,
                                width: btnWidth,
                                backgroundColor: COLORS.primary,
                                position: 'absolute',
                                zIndex: -1,
                                bottom: 0,
                            }}
                        />
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    tabBtn: {
        height: 48,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    btnTabSmall: {
        height: 30,
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    inputActive: {
        borderColor: COLORS.primary,
    },
    inputLabelRight: {
        ...FONTS.font,
        position: 'absolute',
        ...FONTS.fontMedium,
        right: 15,
        top: 12,
    },
    btnContainer: {
        height: 45,
        //overflow: 'hidden',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 30,
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
        borderRadius: 30,
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
    bglayer: {
        position: 'absolute',
        height: '100%',
        zIndex: -1,
    }
})

export default Trade;