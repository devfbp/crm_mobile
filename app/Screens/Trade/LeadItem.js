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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showDateNa } from "../../Utils/common";
export default function Due(props) {
    const { colors } = useTheme();
    const [OrderData2, setOrderData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataPerPage, setDataPerPage] = useState(100);
    const [totalRecords, setTotalRecords] = useState(0);
    const pageSizeOptions = [10, 50, 100, 250, 500, 1000];

    const totalPages = Math.ceil(totalRecords / dataPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchFilteredData(filters, pageNumber, dataPerPage);
    };
    const navigation = useNavigation();
    const getLeadData = async (filters, pageNumber, dataPerPage=100) => {
        try {
            console.log("Filters", filters);
            setLoading(true);
            const searchTerm = await AsyncStorage.getItem("lead_search");
            const url = `${process.env.EXPO_PUBLIC_API_URL_WEB}lead/view`;

            await AsyncStorage.setItem("lead_page", "1");
            await AsyncStorage.setItem("lead_limit", dataPerPage.toString());

            const body = {
                page: pageNumber,
                limit: dataPerPage,
                view: 1,
            };

            if (filters.tagValue) {
                body.due_filter = filters.tagValue;
                await AsyncStorage.setItem("lead_tag", filters.tagValue.toString());
            }

            if (filters.keyword) {
                body.search = filters.keyword;
                await AsyncStorage.setItem("lead_search", filters.keyword.toString());
            } else if (searchTerm) {
                body.search = searchTerm;
                await AsyncStorage.setItem("lead_search", searchTerm.toString());
            }

            if (filters.assigned_to) {
                body.assigned_to = filters.assigned_to;
                await AsyncStorage.setItem("lead_assigned_to", filters.assigned_to.toString());
            }

            if (filters.statusValue && filters.statusValue > 0) {
                body.lead_status_id = filters.statusValue;
                await AsyncStorage.setItem("lead_status_id", filters.statusValue.toString());
            }
            if (loading) return;
            console.log("Fetching data with filters:", url, "-", body);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            // console.log("Fetched Data:", data?.data);
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
            setTotalRecords(data.total);
            let title = [`All (${data.total})`];
            let updateTitle = [];
            if(await AsyncStorage.getItem("tag_title")) {
                // updateTitle.push(`${await AsyncStorage.getItem("tag_title")}`);
            } 
            if(await AsyncStorage.getItem("status_title")) {
                // updateTitle.push(`${await AsyncStorage.getItem("status_title")}`);
            }
            if(updateTitle.length > 0) {
                title = [updateTitle.join(" - ") + ` (${data.total})`];
            }
            props.setButtons(title);

        } catch (error) {
            console.error(error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        // console.log(props.filter);
        getLeadData(props.filter, 1, dataPerPage);
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
                    onPress={() => navigation.navigate('TradeDetails', { leadId: data.id })}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                        
                        <Text style={{ ...FONTS.h6, ...FONTS.fontMedium, color: colors.title }}>{data.customer_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                        <Text style={{ ...FONTS.h5, ...FONTS.fontMedium, color: COLORS.primary }}>{showDateNa(data.schedule_date)}</Text>
                        <Text style={{ ...FONTS.font, color: COLORS[data.status_color] }}>{data.status}</Text>
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