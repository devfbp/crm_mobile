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
import LeadPost from "../../components/BottomSheet/LeadPost";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
export default function LeadItemHistory(props) {
    // console.log("LeadItemHistory props:", props);
    const { colors } = useTheme();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [records, setDataset] = useState([]);
    const refRBSheet = useRef();
    let leadId = props.leadId || null;
    const [title2, setTitle2] = useState(props.title || "Lead History");
    const getLeadData = async () => {
        console.log(leadId);
        if (!leadId) {
            console.error('Lead ID is not provided');
            return;
        }
        let url = `${process.env.EXPO_PUBLIC_API_URL_WEB}lead-status-entry?lead_view=1&lead_id=${leadId}`;
        // console.log("Fetching data from URL:", url);
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
        // console.log(props.leadId);
        leadId = props.leadId;
        getLeadData();
    }, [props.leadId]);

    useEffect(() => {
        if (title2) {
            // console.log("Refreshing lead data...");
            getLeadData();
            setTitle2("Lead History"); // Reset the title after fetching data
            props.setTitle && props.setTitle(title2); // Notify parent component to update title
        }
    }, [title2]);


    return (
        <>
            {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.text }}>Loading...</Text>
                </View>
            )}
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h4,
                            ...FONTS.fontMedium,
                            color: COLORS.white,
                        }}
                    >

                        {props.title || "Lead History" + props.leadId}
                        {props.title2 && ` - ${props.title2}`}
                    </Text>

                    <View style={{ width: 120 }}>
                        <CustomButton
                            fontSize={4}
                            btnH={40}
                            title="Update Status"
                            btnSm
                            color={COLORS.secondary}
                            onPress={() => refRBSheet.current.open()}
                        />
                    </View>
                </View>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
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
                        <LeadPost
                            leadId={leadId}
                            leads={props.leads || []}
                            onRequestClose={() => refRBSheet.current.close()}
                            title2={title2}
                            setTitle2={setTitle2}
                        />
                    </RBSheet>
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
            </SafeAreaView>
        </>
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