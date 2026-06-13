import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeScreen from "../Screens/Home/Home";
import TradeScreen from "../Screens/Trade/Trade";
import ProfileScreen from "../Screens/Profile/Profile";
import WalletScreen from "../Screens/Wallet/Wallet";
import ReferralScreen from "../Screens/Referral/Referral";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>
      
      <Tab.Navigator 
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          //lazy:false,
        }}
      
      >
        <Tab.Screen 
          name="Trade"
          component={TradeScreen}
        />
        <Tab.Screen
          name="Referral"
          component={ReferralScreen} 
        />
        <Tab.Screen 
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen 
          name="Wallet" 
          component={WalletScreen} 
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen} 
        />
      </Tab.Navigator>
    </>
  );
};



export default BottomNavigation;
