import { useTheme } from "@react-navigation/native";
import React from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../Utils/theme";

const Data = [
    {
        id : '1',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '2',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '3',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '4',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '5',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '6',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '7',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '8',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '9',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
    {
        id : '10',
        coin : 'USDT',
        date : '02-08-2022',
        amount : '2,000',
        status : 'Completed',
        total : '1,000 AED',
    },
]


function OrderHistory(){
    
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
                                <View>
                                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:3}}>{item.coin}</Text>
                                    <Text  style={{...FONTS.fontSm,color:colors.text}}>Total</Text>
                                    <Text  style={{...FONTS.fontSm,color:colors.text}}>{item.date}</Text>
                                </View>
                                <View style={{alignItems:'flex-end'}}>
                                    <Text style={{...FONTS.h6,color:colors.title,marginBottom:3}}>{item.amount}</Text>
                                    <Text  style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{item.total}</Text>
                                    <Text style={{...FONTS.fontSm,color:item.status === "Completed" ? COLORS.primary : item.status === "Failed" ? COLORS.danger : COLORS.primary}}>{item.status}</Text>
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

export default React.memo(OrderHistory);