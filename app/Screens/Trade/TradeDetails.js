import React, { useState, useEffect } from "react";
import {
    ImageBackground,
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Linking,
    Platform
} from "react-native";
import { useTheme, useNavigation, useRoute } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, ICONS, IMAGES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { showDateNa } from "../../Utils/common";
import LeadItemHistory from "./LeadItemHistory";

const { width } = Dimensions.get('window');

const LeadDetails = (props) => {

    const { colors } = useTheme();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const [dataset, setDataset] = useState({});
    const leadId = route.params?.leadId || null;

    const getLeadData = async () => {
        if (!leadId) {
            console.error('Lead ID is not provided');
            return;
        }
        const url = `${process.env.EXPO_PUBLIC_API_URL}lead?id=${leadId}`;
        console.log("Fetching data from URL:", url);
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Lead Data Error:', data?.message || response.status);
                setDataset({});
                return;
            }

            setDataset(data);
        } catch (error) {
            console.error('Lead Data Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(props.filter);
        getLeadData();
    }, [props.filter, leadId]);

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
                    <ScrollView style={{ height: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
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
                            <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: 'rgba(255,255,255,.7)' }}>Status</Text>
                                <Text style={{ ...FONTS.fontSm, fontSize: 18, color: COLORS[dataset.status_color] || colors.title }}>{dataset.status}</Text>
                                <Text style={{ ...FONTS.fontSm, fontSize: 12, color: theme.dark ? COLORS.white : '#468069' }}>Schedule Date</Text>
                                <Text style={{ ...FONTS.fontSm, fontSize: 12, color: colors.title }}>{showDateNa(dataset.schedule_date)}</Text>
                            </View>
                        </ImageBackground>

                        <View style={{ ...GlobalStyleSheet.container }}>
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
                                        </View>

                                    </View>
                                    <View style={{ marginBottom: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, marginLeft: 5 }}>
                                            <CustomButton title={'Email'} btnSm color="#1da1f2"
                                                onPress={() => {
                                                    // if (!dataset.email) return;
                                                    Linking.openURL(`mailto:${dataset.email}`);
                                                }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 5 }}>
                                            <CustomButton title={'Call'} btnSm color="#3d1df2"
                                                onPress={() => {
                                                    if (!dataset.mobile_no) return;
                                                    const phoneNumber = Platform.OS === 'android'
                                                        ? `tel:${dataset.mobile_no}`
                                                        : `telprompt:${dataset.mobile_no}`;
                                                    Linking.openURL(phoneNumber);
                                                }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 5 }}>
                                            <CustomButton title={'Whatsapp'} btnSm color="#25D366"
                                                onPress={() => {
                                                    if (!dataset.mobile_no) return;
                                                    const url = `whatsapp://send?phone=${dataset.mobile_no}`;
                                                    Linking.openURL(url).catch(() => {
                                                        alert('Make sure Whatsapp is installed on your device');
                                                    });
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.ThemeBg,
                    }}
                >
                    <LeadItemHistory leadId={leadId} />
                </View>
            </SafeAreaView>
        </>
    );
};
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
});

export default LeadDetails;