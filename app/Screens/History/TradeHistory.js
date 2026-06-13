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
        coin : 'BNB/USDT',
        date : '02-08-2022 5:30 pm',
        price : '279.80',
        filled : '0.536',
        role : 'Taker',
        fee : '0.000402',
        total : '149.9728',
    },
    {
        id : '2',
        coin : 'BNB/USDT',
        date : '02-08-2022 5:30 pm',
        price : '279.80',
        filled : '0.536',
        role : 'Taker',
        fee : '0.000402',
        total : '149.9728',
    },
    {
        id : '3',
        coin : 'BNB/USDT',
        date : '02-08-2022 5:30 pm',
        price : '279.80',
        filled : '0.536',
        role : 'Taker',
        fee : '0.000402',
        total : '149.9728',
    },
    {
        id : '4',
        coin : 'BNB/USDT',
        date : '02-08-2022 5:30 pm',
        price : '279.80',
        filled : '0.536',
        role : 'Taker',
        fee : '0.000402',
        total : '149.9728',
    },
    {
        id : '5',
        coin : 'BNB/USDT',
        date : '02-08-2022 5:30 pm',
        price : '279.80',
        filled : '0.536',
        role : 'Taker',
        fee : '0.000402',
        total : '149.9728',
    },
    {
        id : '6',
        coin : 'BNB/USDT',
        date : '02-08-2022 5:30 pm',
        price : '279.80',
        filled : '0.536',
        role : 'Taker',
        fee : '0.000402',
        total : '149.9728',
    },
]


function TradeHistory(){
    
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
                                <View style={styles.listrow}>
                                    <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:colors.title}}>{item.coin}</Text>
                                    <Text style={{...FONTS.fontSm,color:COLORS.primary}}>{item.date}</Text>
                                </View>
                                <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:4}}>Buy</Text>
                                <View style={styles.listrow}>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>Price (USDT)</Text>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{item.price}</Text>
                                </View>
                                <View style={styles.listrow}>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>Filled  (BNB)</Text>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{item.filled}</Text>
                                </View>
                                <View style={styles.listrow}>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>Role</Text>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{item.role}</Text>
                                </View>
                                <View style={styles.listrow}>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>Fee (BNB)</Text>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{item.fee}</Text>
                                </View>
                                <View style={styles.listrow}>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>Total (USDT)</Text>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:colors.title}}>{item.total}</Text>
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
        marginHorizontal:12,
        paddingVertical:10,
        borderRadius:SIZES.radius,
        borderWidth:1,
        marginBottom:8,
        paddingHorizontal:12,
    },
    listrow:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:1,
        justifyContent:'space-between',
    },  
    seprator:{
        height:2,
        marginHorizontal:15,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 4,
    }
})

export default React.memo(TradeHistory);