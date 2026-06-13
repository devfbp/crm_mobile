import React from "react";
import { 
  View,
  ActivityIndicator,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import Header from "../../layout/header";
import { TabView, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS, SIZES } from "../../Utils/theme";
import ReferralHistory from "./ReferralHistory";
import DepositHistory from "./DepositHistory";
import WithdrawHistory from "./WithdrawHistory";
import TradeHistory from "./TradeHistory";
import OrderHistory from "./OrderHistory";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { SafeAreaView } from "react-native-safe-area-context";



const HistoryScreen = (props) => {
  
  const { colors } = useTheme();
  const renderScene = ({ route }) => {
    switch (route.key) {
        case 'Referral':
            return <ReferralHistory/>;
        case 'Deposit':
            return <DepositHistory/>;
        case 'Withdraw':
            return <WithdrawHistory/>;
        case 'Trade':
            return <TradeHistory/>;
        case 'Order':
            return <OrderHistory/>;
        default:
         return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Referral', title: 'Referral' },
    { key: 'Deposit', title: 'Deposit' },
    { key: 'Withdraw', title: 'Withdraw' },
    { key: 'Trade', title: 'Trade' },
    { key: 'Order', title: 'Order' },
  ]);
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        
        style={{
            backgroundColor:colors.bgLight,
            borderBottomWidth:1,
            borderBottomColor:colors.borderColor,
            //elevation:0,
            //marginRight:15,
        }}
        scrollEnabled={true}
        tabStyle={{
           width:120,
           height:45,
        }}
        inactiveColor={colors.text}
        activeColor={COLORS.primary}
        indicatorStyle={{
            height:2,
            backgroundColor:COLORS.primary,
        }}
        pressColor={"transparent"}
        labelStyle={{
            ...FONTS.font,
            ...FONTS.fontMedium,
            top:-1,
            textTransform:'uppercase',
        }}
      />
    );
  };

  const  renderLazyPlaceholder = ({ route }) => (
    <ActivityIndicator color={COLORS.primary}/>
  );

  return (
    <SafeAreaView style={[{flex:1,backgroundColor:colors.background}]}>
        <Header leftIcon="back" primaryBg title="History"/>
        <View style={[GlobalStyleSheet.container,{flex:1,paddingHorizontal:-15,paddingTop:-15}]}>
          <TabView
            lazy
            renderLazyPlaceholder={renderLazyPlaceholder}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width:SIZES.width > SIZES.container ? SIZES.container : SIZES.width , height:0}}
            renderTabBar={renderTabBar}
          />
        </View>
    </SafeAreaView>
  );
};




export default HistoryScreen;
