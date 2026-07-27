import React, { use, useState, useRef, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import CustomSelectBox from '../CustomSelectBox';
import { COLORS, FONTS, SIZES } from '../../Utils/theme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomButton from "../../components/CustomButton";
import { getStatus, getTags } from '../../Utils/common';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AutoSuggestInput from '../../Utils/AutoSuggestInput';
const FutureTrade = (props) => {
    const { colors } = useTheme();
    const [keyword, setKeyword] = useState('');
    const [tagValue, setTagValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [rmuserId, setRmuserId] = useState('');
    const [rmUser, setRmUser] = useState('');
    const [initialValue, setInitialValue] = useState('');
    const fetchFilteredData = async () => {
        // Implement the logic to fetch filtered data based on keyword, tagValue, and statusValue
        // console.log('Fetching filtered data with:', { keyword, tagValue, statusValue });
        props.setFilter({ keyword, tagValue, statusValue, rmuserId, rmUser });
    }

    const handleTagChange = async (value) => {
        const selectedTag = getTags().find((item) => item.label === value);
        if (selectedTag) {
            setTagValue(selectedTag.value);
            await AsyncStorage.setItem("tag_title", value);
        }
    }
    const handleStatusChange = async (value) => {
        const selectedStatus = getStatus().find((item) => item.label === value);
        if (selectedStatus) {
            setStatusValue(selectedStatus.value);
            await AsyncStorage.setItem("status_title", value);
        }
    }
    const selectHandle = async (item) => {
        setRmuserId(item.id);
        setRmUser(item.label);
    }
    useEffect(() => {
        console.log("Props filter changed:", props.filter);
        setKeyword(props.filter.keyword || '');
        setTagValue(props.filter.tagValue || '');
        setStatusValue(props.filter.statusValue || '');
        setRmuserId(props.filter.rmuserId || '');
        setRmUser(props.filter.rmUser || '');
        setInitialValue(props.filter.rmUser ? { id: props.filter.rmuserId, label: props.filter.rmUser } : null);
    }, [props.filter]);
    


    const handleReset = () => {
        setKeyword('');
        setTagValue('');
        setStatusValue('');
        setRmuserId('');
        props.setFilter({ keyword: '', tagValue: '', statusValue: '', rmuserId: '' });
        try {
            AsyncStorage.removeItem("tag_title");
            AsyncStorage.removeItem("status_title");
            AsyncStorage.removeItem("lead_tag");
            AsyncStorage.removeItem("lead_search");
            AsyncStorage.removeItem("lead_assigned_to");
            AsyncStorage.removeItem("lead_status_id");
            AsyncStorage.removeItem("lead_rm_user_id");
            AsyncStorage.removeItem("selected_user");
            AsyncStorage.removeItem("lead_rmuser");
            AsyncStorage.removeItem("lead_search");

        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
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
                    <Text style={{ ...FONTS.h6, color: colors.text, marginBottom: 2 }}>Search Leads</Text>
                </View>
            </View>
            <View style={{ marginBottom: 18 }}>
                <TextInput
                    style={[{
                        ...GlobalStyleSheet.formControl,
                        backgroundColor: colors.background,
                        color: colors.title,
                        borderColor: colors.borderColor,
                    }, isFocused && styles.inputActive]}
                    placeholder="Enter Name/Phone Number"
                    placeholderTextColor={colors.text}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={keyword}
                    onChangeText={setKeyword}
                />
            </View>
            <View style={{ marginBottom: 18 }}>
                <CustomSelectBox
                    selectItems={getTags().map((item) => item.label)}
                    defaultValue="All Tags"
                    value={
                        getTags().find((item) => item.value === tagValue)?.label || "All Tags"
                    }
                    setValue={handleTagChange}
                />
            </View>
            <View style={{ marginBottom: 18 }}>
                <CustomSelectBox
                    selectItems={getStatus().map((item) => item.label)}
                    defaultValue={'All Status'}
                    value={
                        getStatus().find((item) => item.value === statusValue)?.label || "All Status"
                    }
                    setValue={handleStatusChange}
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
                    placeholder="Select RM User"
                    minChars={2}
                    debounceMs={400}
                    onSelect={selectHandle}
                    initialValue={initialValue}  // ✅
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


export default FutureTrade;