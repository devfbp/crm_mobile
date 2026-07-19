import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Animated
} from "react-native";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../Utils/theme";
import { showDateNa } from "../../Utils/common";
export default function LeadItemHistory(props) {


    const { colors } = useTheme();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [records, setDataset] = useState([]);

    const getLeadData = async () => {
        console.log(props.leadId);
        if (!props.leadId) {
            console.error('Lead ID is not provided');
            return;
        }
        let url = `${process.env.EXPO_PUBLIC_API_URL_WEB}lead-status-entry?lead_view=1&lead_id=${props.leadId}`;
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
            setDataset(data);

        } catch (error) {
            console.error('Login Error:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log(props.leadId);
        getLeadData();
    }, [props.leadId]);

    return (
        <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.timeline}>
                {/* Vertical Line */}
                <View style={styles.timelineLine} />
                

                {records.map((item, index) => (
                    <View key={index} style={styles.timelineItem}>
                        {/* Dot */}
                        <View style={styles.timelineDot} />

                        {/* Card */}
                        <View
                            style={[
                                styles.timelineContent,
                                { backgroundColor: colors.bgLight },
                            ]}
                        >
                            {/* Top Row */}
                            <View style={styles.row}>
                                <Text style={[styles.text, { color: colors.text }]}>
                                    <Text style={styles.bold}>User: </Text>
                                    {item.created_by_name}
                                </Text>

                                <Text style={[styles.text, { color: colors.text }]}>
                                    <Text style={styles.bold}>Date: </Text>
                                    {showDateNa(item.created_at)}
                                </Text>
                            </View>

                            {/* Middle Row */}
                            <View style={styles.row}>
                                <Text style={[styles.text, { color: colors.text }]}>
                                    <Text style={styles.bold}>From: </Text>
                                    {item.from_user_name}
                                </Text>

                                <Text style={[styles.text, { color: colors.text }]}>
                                    <Text style={styles.bold}>To: </Text>
                                    {item.user_name}
                                </Text>
                            </View>

                            {/* Status */}
                            <View style={{ marginTop: 5 }}>
                                <Text style={[styles.text, { color: colors.text }]}>
                                    <Text style={styles.bold}>Status: </Text>

                                    <Text
                                        style={{
                                            color:
                                                COLORS[item.from_status_color] ||
                                                item.from_status_color ||
                                                "#4CAF50",
                                        }}
                                    >
                                        {item.from_status}
                                    </Text>

                                    {"  →  "}

                                    <Text
                                        style={{
                                            color:
                                                COLORS[item.to_status_color] ||
                                                item.to_status_color ||
                                                "#2196F3",
                                        }}
                                    >
                                        {item.to_status}
                                    </Text>
                                </Text>
                            </View>

                            {/* Remarks */}
                            <View style={styles.remarks}>
                                <Text style={[styles.text, { color: colors.text }]}>
                                    <Text style={styles.bold}>Remarks: </Text>
                                    {item.remarks || "N/A"}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {props.remarks ? (
                <View
                    style={[
                        styles.footerRemarks,
                        { borderTopColor: colors.borderColor },
                    ]}
                >
                    <Text style={[styles.text, { color: colors.text }]}>
                        <Text style={styles.bold}>Lead Remarks: </Text>
                        {props.remarks}
                    </Text>
                </View>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },

    timeline: {
        position: "relative",
        paddingLeft: 20,
    },

    timelineLine: {
        position: "absolute",
        left: 18,
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: "rgba(150,150,150,0.4)",
    },

    timelineItem: {
        flexDirection: "row",
        marginBottom: 20,
        position: "relative",
    },

    timelineDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "red",
        borderWidth: 3,
        borderColor: "#1E1E1E",
        marginRight: 15,
        marginTop: 6,
        zIndex: 2,
    },

    timelineContent: {
        flex: 1,
        padding: 12,
        borderRadius: SIZES.radius,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
        flexWrap: "wrap",
    },

    text: {
        ...FONTS.font,
        fontSize: 13,
    },

    bold: {
        fontWeight: "700",
    },

    remarks: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "rgba(150,150,150,0.3)",
    },

    footerRemarks: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
    },
});