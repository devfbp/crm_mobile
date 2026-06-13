import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Routes from './app/Navigations/Route';
import Constants from 'expo-constants';


const App = () =>{

		const [loaded] = useFonts({
        PoppinsRegular: require('./app/assets/fonts/Poppins-Regular.ttf'),
        CabinSemiBold : require('./app/assets/fonts/Cabin-SemiBold.ttf'),
        CabinMedium : require('./app/assets/fonts/Cabin-Medium.ttf'),
        CabinBold : require('./app/assets/fonts/Cabin-Bold.ttf'),
		});  

		if(!loaded){
		  return null;
		}

    const API_URL = Constants.expoConfig.extra.API_URL;

    return (
        <SafeAreaProvider>
          <SafeAreaView
            style={{
                flex: 1
              }}
            >
              <Routes/>
          </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
