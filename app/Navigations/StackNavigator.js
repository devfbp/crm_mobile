import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Platform, StatusBar, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import Onboarding from "../Screens/Onboarding/Onboarding";
import SignIn from "../Screens/Auth/SignIn";
import SignUp from "../Screens/Auth/SignUp";
import ForgotPassword from "../Screens/Auth/ForgotPassword";
import ResetPasssword from "../Screens/Auth/ResetPasssword";
import Otpauthention from "../Screens/Auth/Otpauthention";
import DepositScreen from "../Screens/Wallet/Deposit";
import WithdrawScreen from "../Screens/Wallet/Withdraw";
import TwoFASettings from "../Screens/Settings/TwoFASettings";
import ChangePassword from "../Screens/Settings/ChangePassword";
import TradeDetails from "../Screens/Trade/TradeDetails";
import KYCScreen from "../Screens/Profile/KYCScreen";
import Settings from "../Screens/Settings/Settings";
import HistoryScreen from "../Screens/History/History";
import Support from "../Screens/Support/Support";
import Notifications from "../Screens/Notifications/Notifications";
import DrawerNavigation from "./DrawerNavigation";
import Components from "../Screens/Components/Components";
import AccordionScreen from "../Screens/Components/Accordion";
import ActionSheet from "../Screens/Components/ActionSheet";
import ActionModals from "../Screens/Components/ActionModals";
import Buttons from "../Screens/Components/Buttons";
import Charts from "../Screens/Components/Charts";
import Chips from "../Screens/Components/Chips";
import CollapseElements from "../Screens/Components/CollapseElements";
import DividerElements from "../Screens/Components/DividerElements";
import FileUploads from "../Screens/Components/FileUploads";
import Headers from "../Screens/Components/Headers";
import Footers from "../Screens/Components/Footers";
import TabStyle1 from "../components/Footers/FooterStyle1";
import TabStyle2 from "../components/Footers/FooterStyle2";
import TabStyle3 from "../components/Footers/FooterStyle3";
import TabStyle4 from "../components/Footers/FooterStyle4";
import Inputs from "../Screens/Components/Inputs";
import ListScreen from "../Screens/Components/Lists";
import Paginations from "../Screens/Components/Paginations";
import Pricings from "../Screens/Components/Pricings";
import Snackbars from "../Screens/Components/Snackbars";
import Socials from "../Screens/Components/Socials";
import SwipeableScreen from "../Screens/Components/Swipeable";
import Tabs from "../Screens/Components/Tabs";
import Tables from "../Screens/Components/Tables";
import Toggles from "../Screens/Components/Toggles";

const StackComponent = createStackNavigator();

const StackNavigator = () => {

  const theme = useTheme();

  const {colors} = theme;

  return (
    <View style={{width:'100%', flex: 1 }}>
      {Platform.OS === 'web' || Platform.OS === 'android' &&
        <StatusBar backgroundColor={theme.dark ? colors.background : '#fff'} barStyle={"dark-content" } />
      }
      <StackComponent.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent",flex:1 },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <StackComponent.Screen name={"Onboarding"} component={Onboarding} />
        <StackComponent.Screen name={"SignIn"} component={SignIn} />
        <StackComponent.Screen name={"SignUp"} component={SignUp} />
        <StackComponent.Screen name={"ForgotPassword"} component={ForgotPassword} />
        <StackComponent.Screen name={"Otpauthention"} component={Otpauthention} />
        <StackComponent.Screen name={"ResetPasssword"} component={ResetPasssword} />
        <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
        <StackComponent.Screen name={"Deposit"} component={DepositScreen} />
        <StackComponent.Screen name={"Withdraw"} component={WithdrawScreen} />
        <StackComponent.Screen name={"TwoFASettings"} component={TwoFASettings} />
        <StackComponent.Screen name={"ChangePassword"} component={ChangePassword} />
        <StackComponent.Screen name={"TradeDetails"} component={TradeDetails} />
        <StackComponent.Screen name={"KYCScreen"} component={KYCScreen} />
        <StackComponent.Screen name={"Settings"} component={Settings} />
        <StackComponent.Screen name={"History"} component={HistoryScreen} />
        <StackComponent.Screen name={"Support"} component={Support} />
        <StackComponent.Screen name={"Notifications"} component={Notifications} />
        <StackComponent.Screen name={"Components"} component={Components} />
        <StackComponent.Screen name={"Accordion"} component={AccordionScreen} />
        <StackComponent.Screen name={"ActionSheet"} component={ActionSheet} />
        <StackComponent.Screen name={"ActionModals"} component={ActionModals} />
        <StackComponent.Screen name={"Buttons"} component={Buttons} />
        <StackComponent.Screen name={"Charts"} component={Charts} />
        <StackComponent.Screen name={"Chips"} component={Chips} />
        <StackComponent.Screen name={"CollapseElements"} component={CollapseElements} />
        <StackComponent.Screen name={"DividerElements"} component={DividerElements} />
        <StackComponent.Screen name={"FileUploads"} component={FileUploads} />
        <StackComponent.Screen name={"Headers"} component={Headers} />
        <StackComponent.Screen name={"Footers"} component={Footers} />
        <StackComponent.Screen name={"TabStyle1"} component={TabStyle1} />
        <StackComponent.Screen name={"TabStyle2"} component={TabStyle2} />
        <StackComponent.Screen name={"TabStyle3"} component={TabStyle3} />
        <StackComponent.Screen name={"TabStyle4"} component={TabStyle4} />
        <StackComponent.Screen name={"Inputs"} component={Inputs} />
        <StackComponent.Screen name={"lists"} component={ListScreen} />
        <StackComponent.Screen name={"Paginations"} component={Paginations} />
        <StackComponent.Screen name={"Pricings"} component={Pricings} />
        <StackComponent.Screen name={"Snackbars"} component={Snackbars} />
        <StackComponent.Screen name={"Socials"} component={Socials} />
        <StackComponent.Screen name={"Swipeable"} component={SwipeableScreen} />
        <StackComponent.Screen name={"Tabs"} component={Tabs} />
        <StackComponent.Screen name={"Tables"} component={Tables} />
        <StackComponent.Screen name={"Toggles"} component={Toggles} />
      </StackComponent.Navigator>
    </View>
  );
};

export default StackNavigator;
