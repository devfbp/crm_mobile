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
import { COLORS, FONTS, ICONS, SIZES } from "../../Utils/theme";
import { useNavigation, useTheme } from "@react-navigation/native";
// const OrderData2 = [
//     {
//         orderDate: '02-08-2022 5:30 pm',
//         amount: '0.020000045',
//         price: '294.70',
//         orderType: 'Limit order',
//     },
//     {
//         orderDate: '02-08-2022 5:30 pm',
//         amount: '0.020000045',
//         price: '294.70',
//         orderType: 'Limit order',
//     },
//     {
//         orderDate: '02-08-2022 5:30 pm',
//         amount: '0.020000045',
//         price: '294.70',
//         orderType: 'Limit order',
//     },
//     {
//         orderDate: '02-08-2022 5:30 pm',
//         amount: '0.020000045',
//         price: '294.70',
//         orderType: 'Limit order',
//     },
//     {
//         orderDate: '02-08-2022 5:30 pm',
//         amount: '0.020000045',
//         price: '294.70',
//         orderType: 'Limit order',
//     },
// ]
export default function Due(props) {
    const { colors } = useTheme();
    const [OrderData2, setOrderData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const getLeadData = async () => {
        let url = `${process.env.EXPO_PUBLIC_API_URL}lead?view=1`;
        let filterValue = 1;
        if (props.filter==1) {
            filterValue = 0;
        } else if (props.filter==2) {
            filterValue = 2;
        }        
        url += `&filter=${filterValue}`;
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
            if (data?.data) {
                updatedListData = data.data.map((item, index) => ({
                    id: item?.lead_id,
                    customer_name: item?.customer_name, 
                    mobile_no: item?.mobile_no,
                    project_name: item?.project_name,
                    assigned_to: item?.assigned_to,
                    status: item?.status,
                    status_color: item?.status_color,
                    sub_source_name: item?.sub_source_name,
                }));
            }
            // console.log("Fetched List Data:", updatedListData);
            setOrderData2(updatedListData);
            // console.log("Updated OrderData2:", updatedListData);
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
            {loading && (
                <View style={{ padding: 20 }}>
                    <Text style={{ ...FONTS.font, color: colors.text }}>Loading...</Text>
                </View>
            )}
            {OrderData2.map((data, index) => (
                <TouchableOpacity
                    key={index}
                    style={{
                        borderWidth: 1,
                        borderColor: colors.borderColor,
                        backgroundColor: colors.bgLight,
                        paddingHorizontal: 15,
                        paddingVertical: 14,
                        borderRadius: SIZES.radiusLg,
                        marginBottom: 8,
                    }}
                    onPress={()=> navigation.navigate('TradeDetails', { leadId: data.id })}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Text style={{ ...FONTS.h5, ...FONTS.fontMedium, color: COLORS.primary }}>Lead</Text>
                        <Text style={{ ...FONTS.font, color: COLORS[data.status_color] }}>{data.status}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                        <Text style={{ ...FONTS.h6, ...FONTS.fontMedium, color: colors.title }}>{data.customer_name}</Text>
                        {/* <Text style={{ ...FONTS.fontSm, color: COLORS.primary }}>{data.orderDate}</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.font, color: colors.text, fontSize: 16 }}>{data.mobile_no}</Text>
                        {/* <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title, fontSize: 13 }}>{data.amount}</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.font, color: colors.text, fontSize: 13 }}>{data.project_name}</Text>
                        {/* <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title }}>{data.price}</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.font, color: colors.text, fontSize: 13 }}>{data.sub_source_name}</Text>
                        {/* <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title }}>{data.orderType}</Text> */}
                    </View>
                </TouchableOpacity>
            ))}
        </>
    )
}