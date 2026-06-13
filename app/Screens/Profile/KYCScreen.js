import React from "react";
import { 
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";


const KYCScreen = () => {
 
  const { colors } = useTheme();


  return (
    <>
      <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
        
          <View
              style={{
                  flex:1,
              }}
          >
            <Header leftIcon="back" title="Verification"/>
            <View style={{flex:1}}>

              <ScrollView
                contentContainerStyle={{paddingBottom:100,paddingTop:15}}
                >
                <View style={GlobalStyleSheet.container}>
                  <View
                    style={{
                      borderRadius:SIZES.radius,
                      borderWidth:1,
                      borderColor:colors.borderColor,
                      paddingHorizontal:15,
                      backgroundColor:colors.bgLight,
                    }}
                  >
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                        borderBottomWidth:1,
                        borderColor:colors.borderColor,
                        paddingVertical:14,
                      }}
                    >
                      <View style={{flex:1}}>
                        <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:4}}>ID Document</Text>
                        <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:COLORS.danger}}>Not Verified</Text>
                      </View>
                      <Image
                        style={{
                          height:20,
                          width:20,
                        }}
                        source={IMAGES.closeCircle}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingVertical:14,
                      }}
                    >
                      <View style={{flex:1}}>
                        <View style={{marginBottom:4,flexDirection:'row'}}>
                          <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title}}>Address Proof</Text>
                          <Text style={{...FONTS.fontSm,color:colors.text}}> (optional)</Text>
                        </View>
                        <Text style={{...FONTS.fontLg,...FONTS.fontMedium,color:COLORS.success}}>Verified</Text>
                      </View>
                      <Image
                        style={{
                          height:20,
                          width:20,
                        }}
                        source={IMAGES.verified}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={GlobalStyleSheet.container}>
              <CustomButton title="Start Verification"/>
            </View>
          </View>
      </SafeAreaView>
    </>
  );
};



export default KYCScreen;
