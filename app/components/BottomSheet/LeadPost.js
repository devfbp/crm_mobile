import React, { use, useState, useRef, useEffect  } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import CustomSelectBox from '../CustomSelectBox';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';
import CustomButton from "../CustomButton";
import { getStatus, getTags } from '../../Utils/common';
import AutoSuggestInput from '../../Utils/AutoSuggestInput';

const LeadPost = (props) => {
    const { colors } = useTheme();
    const [leadId, setLeadId] = useState(props.leadId || null);
    const [isFocused, setIsFocused] = useState(false);
    const [statusValue, setStatusValue] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [rmuserId, setRmuserId] = useState('');
    const handleStatusChange = async (value) => {
        const selectedStatus = getStatus().find((item) => item.label === value);
        if (selectedStatus) {
            setStatusValue(selectedStatus.value);
        }
    }
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
                    <Text style={{ ...FONTS.h6, color: colors.text, marginBottom: 2 }}>Add Leads Remarks</Text>
                </View>
            </View>
             <View style={{ marginBottom: 18 }}>
                <CustomSelectBox
                    selectItems={getStatus().map((item) => item.label)}
                    defaultValue={'Lead Status'}
                    value={
                        getStatus().find((item) => item.value === statusValue)?.label || "All Status"
                    }
                    setValue={handleStatusChange}
                />
            </View>
            <View style={{ marginBottom: 18 }}>
                <TextInput
                    style={[{
                        ...GlobalStyleSheet.formControl,
                        backgroundColor: colors.background,
                        color: colors.title,
                        borderColor: colors.borderColor,
                    }, isFocused && styles.inputActive]}
                    placeholder="Status Remarks"
                    placeholderTextColor={colors.text}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={remarks}
                    onChangeText={setRemarks}
                />
            </View>
            <View style={{ marginBottom: 18 }}>
                <TextInput
                    style={[{
                        ...GlobalStyleSheet.formControl,
                        backgroundColor: colors.background,
                        color: colors.title,
                        borderColor: colors.borderColor,
                    }, isFocused && styles.inputActive]}
                    placeholder="Schedule Date"
                    placeholderTextColor={colors.text}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={scheduleDate}
                    onChangeText={setScheduleDate}
                />
            </View>
            <View style={{ marginBottom: 18 }}>
                <AutoSuggestInput
                        fetchSuggestions={async (query) => {
                            let url = `${process.env.EXPO_PUBLIC_API_URL_WEB}user?lead_rm=1&limit=5&search=${encodeURIComponent(query)}`;
                            console.log("Fetching suggestions from URL:", url);
                            const res = await fetch(url);
                            const json = await res.json();

                            const list = Array.isArray(json) ? json : (json.results ?? []);

                            return list.map((r) => ({
                                id: String(r.user_id),   // ✅ was r.id, which doesn't exist
                                label: r.name,           // ✅ this part was correct
                            }));
                        }}
                        // onSelect={(item) => console.log('Selected:', item)}
                        placeholder="Search users..."
                        minChars={2}
                        debounceMs={400}
                        onSelect={(item) => {
                            setRmuserId(item.id);
                        }}
                />
            </View>          
           
            <View style={{ marginBottom: 18 }} flexDirection={'row'} justifyContent={'space-between'}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <CustomButton title={'Reset'} onPress={() => {
                        handleReset();
                    }} />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                    <CustomButton title={'Search'} onPress={() => {
                        fetchFilteredData();
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