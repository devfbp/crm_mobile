import React from "react";
import { 
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONTS, IMAGES, SIZES } from "../Utils/theme";
import { LinearGradient } from 'expo-linear-gradient';

const BannerCard = (props) => {

  return (
    <View>
        <LinearGradient 
            start={{x: 0.25, y: 0}} end={{x: .5, y: 0}}
            colors={["#6F4FEF","#4628FF"]}
            style={styles.card}
        >
            <Image
                source={props.image}
                style={{
                    height:100,
                    width:100,
                    resizeMode:'contain',
                    marginRight:30,
                    marginLeft:10,
                }}
            />
            <View style={{
                alignItems:'flex-start',
                flex:1,
            }}>
                <Text style={{...FONTS.fontSm,color:'#fff',opacity:.7,marginBottom:4}}>{props.subTitle}</Text>
                <Text style={{...FONTS.h5,color:COLORS.white,marginBottom:10}}>{props.title}</Text>
                {/* <TouchableOpacity
                    style={{
                        backgroundColor:COLORS.white,
                        borderRadius:6,
                        paddingHorizontal:15,
                        paddingVertical:6,
                    }}
                >
                    <Text style={{...FONTS.fontSm,...FONTS.fontMedium,color:COLORS.primary}}>Trade Now</Text>
                </TouchableOpacity> */}
            </View>
        </LinearGradient>
    </View>
  );
};



const styles = StyleSheet.create({
    card:{
        borderRadius:SIZES.radius,
        paddingVertical:12,
        zIndex:1,
        paddingHorizontal:20,
        height:150,
        flexDirection:'row',
        alignItems:'center',
    }
})


export default BannerCard;
