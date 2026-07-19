/* Login Screen */
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { COLORS, FONTS, ICONS } from "../../Utils/theme";
import CustomButton from "../../components/CustomButton";
import Header from "../../layout/header";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { BASE_URL } from "../../api";


const SignIn = (props) => {


  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);
  const { colors } = useTheme();

  const [username, setUsername] = useState('nithy.snt@gmail.com');
  const [password, setPassword] = useState('livecrm');
  const [loading, setLoading] = useState(false);
  const url = `${process.env.EXPO_PUBLIC_API_URL}login`;
  console.log('Login URL:', url);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username is required');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Password is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log('Login Response:', response);
      console.log('Login Response Status:', response.status);

      // Parse response only once
      const data = await response.json();

      console.log('Login Response Body:', data);

      if (!response.ok) {
        Alert.alert(
          'Login Failed',
          data?.message || data?.error || 'Invalid credentials'
        );
        return;
      }

      // Save token
      if (data?.token) {
        await AsyncStorage.setItem('userToken', data.token);
      }

      // Save user info
      if (data?.user) {
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify(data.user)
        );
      }

      // Navigate after successful login
      props.navigation.replace('DrawerNavigation');

    } catch (error) {
      console.error('Login Error:', error);

      Alert.alert(
        'Error',
        error?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header leftIcon="back" primaryBg title="Login" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingVertical: 25 }}>
          <View style={{ ...GlobalStyleSheet.container }}>
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <Text style={{ ...FONTS.h3, color: colors.title, marginBottom: 5 }}>Login Account</Text>
              <Text style={{ ...FONTS.fontLg, color: colors.text }}></Text>
            </View>
            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 8 }}>Email address</Text>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={[{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.inputBg,
                  color: colors.title,
                  borderColor: colors.borderColor,
                }, isFocused && styles.inputActive]}
                onFocus={() => setisFocused(true)}
                onBlur={() => setisFocused(false)}
                placeholderTextColor={colors.text}
                placeholder="Type your username"
                value={username}
                onChangeText={setUsername}

              />
            </View>
            <Text style={{ ...FONTS.font, color: colors.title, marginBottom: 8 }}>Password</Text>
            <View style={{ marginBottom: 15 }}>
              <TextInput
                style={[{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.inputBg,
                  color: colors.title,
                  borderColor: colors.borderColor,
                }, isFocused2 && styles.inputActive]}
                onFocus={() => setisFocused2(true)}
                onBlur={() => setisFocused2(false)}
                placeholderTextColor={colors.text}
                placeholder="Type your password"
                secureTextEntry={handlePassword}
                value={password}
                onChangeText={setPassword}

              />
              {(handlePassword) ?
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(false)}>
                  <SvgXml
                    height={24}
                    width={24}
                    fill={colors.text}
                    xml={ICONS.eyeOpen}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setHandlePassword(true)}>
                  <SvgXml
                    height={24}
                    width={24}
                    fill={colors.text}
                    xml={ICONS.eyeClose}
                  />
                </TouchableOpacity>
              }
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: '18%' }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ForgotPassword')}
              >
                <Text style={{ ...FONTS.font, color: COLORS.primary }}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[GlobalStyleSheet.container, {
            padding: 30,
            width: '100%',
          }]}
        >
          <CustomButton
            onPress={handleLogin}
            title={loading ? "Logging in..." : "Login"}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({

  inputActive: {
    borderColor: COLORS.primary,
  },
  eyeIcon: {
    height: 48,
    width: 48,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
  }

})


export default SignIn;
