import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
    ImageBackground,
    Text,
    View,
    ScrollView,
} from "react-native";
import { useTheme, useNavigation } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, ICONS, IMAGES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import { showDateNa } from "../../Utils/common";
import { Linking, Platform } from 'react-native';
const OrderData = [
    {
        price: "0.6188",
        amount: "14.5k",
        length: '100%',
    },
    {
        price: "0.6109",
        amount: "8.009k",
        length: '75%',
    },
    {
        price: "0.68859",
        amount: "4.588k",
        length: '40%',
    },
    {
        price: "0.6188",
        amount: "14.5k",
        length: '50%',
    },
    {
        price: "0.6188",
        amount: "8.009k",
        length: '20%',
    },
    {
        price: "0.6188",
        amount: "4.588k",
        length: '45%',
    },
]

const LeadDetails = (props) => {

    const { colors } = useTheme();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const [dataset, setDataset] = useState([]);
    const getLeadData = async () => {
        let url = `${process.env.EXPO_PUBLIC_API_URL}lead?id=${route.params.leadId}`;
        console.log("Fetching data from URL:", url);
        setLoading(true);
        try {

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // Parse response only once
            const data = await response.json();
            let updatedListData = [];
            setDataset(data);

        } catch (error) {
            console.error('Login Error:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log(props.filter);
        getLeadData();
    }, [props.filter]);

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.ThemeBg,
                    }}
                >
                    <Header titleLeft={true} leftIcon={'back'} title="Back" />
                    <ScrollView>
                        {loading && (
                            <View style={{ padding: 20 }}>
                                <Text style={{ ...FONTS.fontLg, color: colors.text }}>Loading...</Text>
                            </View>
                        )}
                        <ImageBackground
                            source={IMAGES.pattern}
                            style={[{
                                height: null,
                                flex: 1,
                                padding: 0,
                                paddingHorizontal: 15,
                                paddingVertical: 15,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                overflow: 'hidden',
                                flexDirection: 'row',
                            }]}
                        >
                            <View>
                                <Text style={{ ...FONTS.h3, color: COLORS.white, marginBottom: 8, marginTop: 4 }}>{dataset?.customer_name}</Text>
                                <Text style={{ ...FONTS.h4, ...FONTS.fontSemiBold, color: COLORS.white, marginBottom: 1 }}>{dataset?.mobile_no}</Text>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontSemiBold, color: COLORS.white }}>{dataset?.email}</Text>
                            </View>
                            {/* <View style={{ flex: .5 }}>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: 'rgba(255,255,255,.7)' }}>24h High</Text>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontSemiBold, color: COLORS.white, marginBottom: 5 }}>22,659.9</Text>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: 'rgba(255,255,255,.7)' }}>24h Low</Text>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontSemiBold, color: COLORS.white }}>22,003.8</Text>
                            </View> */}
                            {/* <View>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: 'rgba(255,255,255,.7)' }}>24h Vol BTC</Text>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontSemiBold, color: COLORS.white, marginBottom: 5 }}>654,142.132</Text>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: 'rgba(255,255,255,.7)' }}>24h Vol USDT</Text>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontSemiBold, color: COLORS.white }}>14.59B</Text>
                            </View> */}
                        </ImageBackground>

                        <View style={{ ...GlobalStyleSheet.container }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ ...FONTS.fontLg, ...FONTS.fontMedium, color: colors.title }}>Details</Text>
                                <SvgXml style={{ marginLeft: 5 }} height={12} width={12} fill={COLORS.primary} xml={ICONS.down} />
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: -5 }}>
                                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                    <View style={{ marginBottom: 18 }}>
                                        <View
                                            key={1}
                                            style={{
                                                height: 22,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: theme.dark ? 'rgba(103,196,128,.1)' : '#CBFFD9',
                                                    height: '100%',
                                                    position: 'absolute',
                                                }}
                                            />
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: theme.dark ? COLORS.white : '#468069' }}>Project</Text>
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: colors.title }}>{dataset.project_name}</Text>                                            
                                        </View>

                                        <View
                                            key={2}
                                            style={{
                                                height: 22,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: theme.dark ? 'rgba(103,196,128,.1)' : '#CBFFD9',
                                                    height: '100%',
                                                    position: 'absolute',
                                                }}
                                            />
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: theme.dark ? COLORS.white : '#468069' }}>Contact</Text>
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: colors.title }}>{dataset.mobile_no}</Text>                                            
                                        </View>
                                        <View
                                            key={3}
                                            style={{
                                                height: 22,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: theme.dark ? 'rgba(103,196,128,.1)' : '#CBFFD9',
                                                    height: '100%',
                                                    position: 'absolute',
                                                }}
                                            />
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: theme.dark ? COLORS.white : '#468069' }}>Assigned To</Text>
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: colors.title }}>{dataset.assigned_to}</Text>                                            
                                        </View>
                                        <View
                                            key={4}
                                            style={{
                                                height: 22,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: theme.dark ? 'rgba(103,196,128,.1)' : '#CBFFD9',
                                                    height: '100%',
                                                    position: 'absolute',
                                                }}
                                            />
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: theme.dark ? COLORS.white : '#468069' }}>Source</Text>
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: colors.title }}>{dataset.sub_source_name}</Text>                                            
                                        </View>
                                        <View
                                            key={5}
                                            style={{
                                                height: 22,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: theme.dark ? 'rgba(103,196,128,.1)' : '#CBFFD9',
                                                    height: '100%',
                                                    position: 'absolute',
                                                }}
                                            />
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: theme.dark ? COLORS.white : '#468069' }}>Status</Text>
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: COLORS[dataset.status_color] || colors.title }}>{dataset.status}</Text>                                            
                                        </View>
                                        <View
                                            key={6}
                                            style={{
                                                height: 22,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: theme.dark ? 'rgba(103,196,128,.1)' : '#CBFFD9',
                                                    height: '100%',
                                                    position: 'absolute',
                                                }}
                                            />
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: theme.dark ? COLORS.white : '#468069' }}>Schedule Date</Text>
                                            <Text style={{ ...FONTS.fontSm, fontSize: 15, color: colors.title }}>{showDateNa(dataset.schedule_date)}</Text>                                            
                                        </View>
                                        
                                    </View>
                                    <CustomButton title={'Call'} 
                                    onPress={() => {
                                        let phoneNumber = dataset.mobile_no;
                                        if (Platform.OS === 'android') {
                                            phoneNumber = `tel:${phoneNumber}`;
                                        } else {
                                            phoneNumber = `telprompt:${phoneNumber}`;
                                        }
                                        Linking.openURL(phoneNumber);
                                    }}
                                    />
                                    
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};



export default LeadDetails;
