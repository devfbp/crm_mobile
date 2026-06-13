import { useTheme } from "@react-navigation/native";
import React from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { COLORS, FONTS, ICONS, SIZES } from "../../Utils/theme";

const Data = [
    {
        id : '1',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '2',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '3',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '4',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '5',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '6',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '7',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '8',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '9',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
    {
        id : '10',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed'
    },
]


function WithdrawHistory(){
    
    const { colors } = useTheme();

    return(
        <>
            <FlatList
                data={Data}
                contentContainerStyle={{
                    paddingTop:12,
                }}
                initialNumToRender={4}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return(
                        <>
                            <View style={{...styles.listItem,borderColor:colors.borderColor,backgroundColor:colors.bgLight}}>
                                <View
                                    style={{
                                        height:38,
                                        width:38,
                                        marginRight:10,
                                        backgroundColor:COLORS.danger,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        borderRadius:38,
                                    }}
                                >
                                    <SvgXml
                                        height={22}
                                        width={22}
                                        stroke={COLORS.white}
                                        xml={ICONS.upload}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>{item.coin}</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.title}}>{item.date}</Text>
                                </View>
                                <View style={{alignItems:'flex-end'}}>
                                    <Text style={{...FONTS.h6,color:colors.title}}>{item.amount}</Text>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary}}>{item.status}</Text>
                                </View>
                            </View>
                        </>
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    listItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:12,
        paddingVertical:10,
        borderRadius:SIZES.radius,
        borderWidth:1,
        marginBottom:8,
        paddingHorizontal:12,
    },
})

export default React.memo(WithdrawHistory);