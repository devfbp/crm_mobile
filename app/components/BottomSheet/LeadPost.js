import React, { use, useState, useRef, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import CustomSelectBox from '../CustomSelectBox';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';
import CustomButton from "../CustomButton";
import { getStatus, getTags } from '../../Utils/common';
import AutoSuggestInput from '../../Utils/AutoSuggestInput';
import DateTimeInput from '../../Utils/DateTimePicker';
import RBSheet from "react-native-raw-bottom-sheet";

const LeadPost = (props) => {
    // console.log("LeadPost props:", props);
    const { colors } = useTheme();
    const [leadId, setLeadId] = useState(props.leadId || null);
    const [isFocused, setIsFocused] = useState(false);
    const [statusValue, setStatusValue] = useState("All Status");
    const [statusId, setStatusId] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [scheduleDate, setScheduleDate] = useState(null);
    const [rmuserId, setRmuserId] = useState('');
    const refRBSheet = useRef();
    const handleStatusChange = async (value) => {
        const selectedStatus = getStatus().find((item) => item.label === value);
        if (selectedStatus) {
            setStatusValue(selectedStatus.label);
            setStatusId(selectedStatus.value);
        }
    }
    const postLeads = async () => {
        if (!statusValue || statusId === null) {
            alert("Please select a status.");
            return;
        }
        if (!remarks.trim()) {
            alert("Please enter remarks.");
            return;
        }
        const payload = {
            slug: leadId,
            lead_status_id: statusId,
            status_remarks: remarks,
            schedule_date: scheduleDate ? scheduleDate.toISOString() : null,
            rm_user_id: rmuserId || null,
        };
        console.log("Payload to be sent:", payload);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}lead-status-entry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.EXPO_PUBLIC_BEARER_TOKEN,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            // // console.log("Response from server:", data);
            if (response.ok) {
                alert("Lead posted successfully!");
                // Optionally reset the form or navigate away
            } else {
                alert(`Error posting lead: ${data.message || 'Unknown error'}`);
            }
            props.setTitle2 && props.setTitle2("Lead Posted"); // Update the title to indicate the lead has been posted
            handleReset(); // Reset the form after submission
        } catch (error) {
            console.error("Error posting lead:", error);
            alert("An error occurred while posting the lead. Please try again.");
        }
    };
    const handleReset = () => {
        setStatusValue(null);
        setRemarks('');
        setScheduleDate(null);
        setRmuserId('');
        // console.log("Form has been reset.");
        // props.setRefreshing && props.setRefreshing(true); // Notify parent component to refresh data
        props.onRequestClose && props.onRequestClose(); // Close the bottom sheet if a callback is provided

    };
    useEffect(() => {
        if(props?.leads?.status) {
            // console.log("Setting initial status value from props:", props?.leads?.status);
            setStatusValue(props?.leads?.status);
        }
    }, [props]);
    return (
        <View style={{ ...GlobalStyleSheet.container }}>
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
                <View style={{ flex: 1, paddingLeft: 0 }}>
                    <Text style={{ ...FONTS.h6, color: colors.text, marginBottom: 2 }}>Update Lead Status</Text>
                </View>
            </View>
            <View style={{ marginBottom: 18 }}>
                <CustomSelectBox
                    selectItems={getStatus().map((item) => item.label)}
                    defaultValue={'Lead Status'}
                    value={statusValue}
                    setStatusValue={handleStatusChange}
                />
            </View>

            <View style={{ marginBottom: 18 }}>
                <DateTimeInput
                    label="Schedule Date & Time"
                    value={scheduleDate}
                    onChange={setScheduleDate}
                    mode="datetime"
                    placeholder="Schedule Date & Time"
                />
            </View>
            {/* <View style={{ marginBottom: 18 }}>
                <AutoSuggestInput
                    fetchSuggestions={async (query) => {
                        let url = `${process.env.EXPO_PUBLIC_API_URL_WEB}user?lead_rm=1&limit=5&search=${encodeURIComponent(query)}`;
                        // console.log("Fetching suggestions from URL:", url);
                        const res = await fetch(url);
                        const json = await res.json();
                        const list = Array.isArray(json) ? json : (json.results ?? []);
                        return list.map((r) => ({
                            id: String(r.user_id),   // ✅ was r.id, which doesn't exist
                            label: r.name,           // ✅ this part was correct
                        }));
                    }}
                    // onSelect={(item) => // console.log('Selected:', item)}
                    placeholder="Select RM User"
                    minChars={2}
                    debounceMs={400}
                    onSelect={(item) => {
                        setRmuserId(item.id);
                    }}
                />
            </View> */}

            <View style={{ marginBottom: 18 }}>
                <TextInput
                    style={[
                        {
                            ...GlobalStyleSheet.formControl,
                            backgroundColor: colors.background,
                            color: colors.title,
                            borderColor: colors.borderColor,
                            height: 120,      // Set the desired height
                            textAlignVertical: 'top', // Android: starts text at the top
                        },
                        isFocused && styles.inputActive,
                    ]}
                    placeholder="Status Remarks"
                    placeholderTextColor={colors.text}
                    multiline={true}
                    numberOfLines={5}
                    value={remarks}
                    onChangeText={setRemarks}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>


            <View style={{ marginBottom: 18 }} flexDirection={'row'} justifyContent={'space-between'}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <CustomButton title={'Reset'} btnSm color={COLORS.secondary} onPress={() => {
                        handleReset();
                    }} />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                    <CustomButton title={'Submit'} btnSm onPress={() => {
                        postLeads();
                    }} />
                </View>
            </View>
        </View>
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
    inputActive: {
        borderColor: COLORS.primary,
    },
})


export default LeadPost;