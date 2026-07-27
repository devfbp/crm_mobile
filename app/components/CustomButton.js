import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES } from "../Utils/theme";


const CustomButton = (props) => {

  return (
    <TouchableOpacity
      activeOpacity={.75}
      onPress={() => props.onPress ? props.onPress() : ""}
    >
      {props.color ?
        <View
          style={[{ ...styles.button, backgroundColor: props.color },
          props.btnSm && { height: 40 },
          props.btnH && { height: props.btnH },
          props.btnRounded && { borderRadius: 30 },

          ]}
        >
          <Text style={[{ ...FONTS.h5, color: COLORS.white },
          props.fontSize && { fontSize: 16 }
          ]}>{props.title}</Text>
        </View>
        :
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={["#6F4FEF", "#4628FF"]}
          style={[{ ...styles.button }, props.btnSm && { height: 40 }, props.btnRounded && { borderRadius: 30 }]}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.white }}>{props.title}</Text>
        </LinearGradient>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  button: {
    height: 48,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  }

})

export default CustomButton;
