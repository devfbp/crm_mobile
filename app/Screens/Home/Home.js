/*HOME SCREEN */

import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
  Button,
} from "react-native";
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import BannerCard from "../../components/BannerCard";
import PortfolioCard from "../../components/PortfolioCard";
import { Swipeable } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import BalanceChart from "../../components/chart/BalanceChart";
import TransferSheet from "../../components/BottomSheet/TransferSheet";
import ThemeBtn from "../../components/ThemeBtn";
import Swiper from "react-native-swiper";
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

const itemWidth = SIZES.width > SIZES.container ? (SIZES.container / 1.5) : (SIZES.width / 1.5) + 50;

const bannerData = [
  {
    id: "1",
    image: IMAGES.welcomeImg,
    title: "Welcome To FBP",
    subTitle: "Crm for everyone",
  }
  /*,
  {
    id : "2",
    image : IMAGES.welcomeImg,
    title : "Cryptocurrency Exchange",
    subTitle : "Top Most Trusted",
  },
  {
    id : "3",
    image : IMAGES.welcomeImg,
    title : "Cryptocurrency Exchange",
    subTitle : "Top Most Trusted",
  },
  {
    id : "4",
    image : IMAGES.welcomeImg,
    title : "Cryptocurrency Exchange",
    subTitle : "Top Most Trusted",
  },*/
]


// const ListData = [
//   {
//     id : "1",
//     icon : IMAGES.bitcoin,
//     coin : "Bitcoin",
//     amount : "0.154836",
//     rate : "+4.6%",
//     subTitle : 'BTC  $8,456.87',
//   },
//   {
//     id : "2",
//     icon : IMAGES.etherium,
//     coin : "Etherium",
//     amount : "0.154836",
//     rate : "+4.6%",
//     subTitle : 'BTC  $8,456.87',
//   },
//   {
//     id : "3",
//     icon : IMAGES.litherium,
//     coin : "LTC",
//     amount : "0.154836",
//     rate : "+4.6%",
//     subTitle : 'BTC  $8,456.87',
//   },
//   {
//     id : "4",
//     icon : IMAGES.bitcoin,
//     coin : "Bitcoin",
//     amount : "0.154836",
//     rate : "+4.6%",
//     subTitle : 'BTC  $8,456.87',
//   },
// ]

const CardData = [
  {
    id: '1',
    icon: IMAGES.wallet2,
    title: 'Due',
    amount: '0',
  },
  {
    id: '2',
    icon: IMAGES.trade2,
    title: 'Over Due',
    amount: '0',
  },
  {
    id: '3',
    icon: IMAGES.dollor,
    title: 'Total Balance',
    amount: '$5,770.90',
  },
]

const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const scrollX = useRef(new Animated.Value(0)).current;
  const buttons = ['FAVOURITES', 'TOP GAINERS', 'TOP LOSERS'];

  const scrollViewRef = useRef(null);

  const onClick = (i) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: i * width, animated: true });
    }
  };

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [600], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [loading, setLoading] = useState(false);
  const [ListData, setListData] = useState([]);
  const listDate = [
    IMAGES.htrade,
    IMAGES.hmobile,
    IMAGES.hfile,
    IMAGES.htelegram,
    IMAGES.htransfer,
    IMAGES.hthumbsUp,
    IMAGES.hstar,
  ]

  const getListData = async () => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}dashboard/`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      // Parse response only once
      const data = await response.json();
      let updatedListData = [];
      if (data?.ListData) {
        updatedListData = data.ListData.map((item, index) => ({
          id: item.id,
          icon: listDate[index % listDate.length], // Fallback to listDate if icon is missing
          coin: item.coin,
          amount: item.amount,
          rate: item.rate,
          subTitle: item.subTitle,
        }));
      }
      console.log("Fetched List Data:", updatedListData);
      setListData(updatedListData);
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
  );

  // Open Bottom Sheet
  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
    
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={[{
            flex: 1,
            backgroundColor: colors.background,
          }]}
        >
          <View
            style={[GlobalStyleSheet.container, {
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingTop: 15,
              paddingBottom: 15,
            }]}
          >

            <View style={{ flex: 1 }}>
              <ThemeBtn />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}
            >
              <Image
                style={{
                  height: 22,
                  width: 22,
                  tintColor: colors.title,
                }}
                source={IMAGES.bell2}
              />
              <View
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 8,
                  backgroundColor: "#c62b33",
                  position: 'absolute',
                  borderWidth: 2,
                  right: 8,
                  top: 10,
                  borderColor: colors.background,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Feather size={20} color={colors.title} name="grid" />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
          >
            <Swiper
              style={{
                height: Platform.OS === 'web' ? 330 : 190,
              }}
              dotColor={colors.borderColor}
              activeDotColor={COLORS.primary}
              paginationStyle={{
                bottom: 0,
              }}
            >
              {bannerData.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={[GlobalStyleSheet.container, {
                      paddingHorizontal: 15,
                      padding: 0
                    }]}
                  >
                    <BannerCard
                      image={data.image}
                      title={data.title}
                      subTitle={data.subTitle}
                    />
                  </View>
                )
              })}
            </Swiper>
            {/* <View style={[GlobalStyleSheet.container,{padding:0,paddingHorizontal:-15,paddingVertical:-15}]}>
                <BalanceChart home={true}/>
              </View> */}

            {/* <View 
                style={[GlobalStyleSheet.container,{
                  flexDirection:'row',
                  marginBottom:25,
                  marginTop:-30,
                  padding:0,
                  paddingHorizontal:-10,
                  paddingVertical:-15
                }]}
              >
                {CardData.map((data,index) => {
                  return(
                    <View key={index}
                      style={{
                        flex:1,
                        marginHorizontal:3,
                      }}
                    >
                      <PortfolioCard 
                        title={data.title}
                        icon={data.icon}
                        rate={data.rate}
                        amount={data.amount}
                      />
                    </View>
                  )
                })}
              </View> */}
            {/* <View style={[GlobalStyleSheet.container,{paddingTop:0,}]}>
                  <ButtonContainer buttons={buttons} onClick={onClick} scrollX={scrollX} />
              </View> */}
              {loading && (
                <View style={{ padding: 20 }}>
                    <Text style={{ ...FONTS.font, color: colors.text }}>Loading...</Text>
                </View>
            )}
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              scrollEnabled={false}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },
              )}
            >
              {/* Favourite */}
              <View style={[styles.card]} >
                {ListData.map((data, index) => (
                  <ListItem
                    key={index}
                    icon={data.icon}
                    coin={data.coin}
                    rate={data.rate}
                    amount={data.amount}
                    subTitle={data.subTitle}
                    handleOpenPress={handleOpenPress}
                  />
                ))}
              </View>

              {/* Top Gainers */}
              <View style={[styles.card]} >
                {ListData.map((data, index) => (
                  <ListItem
                    key={index}
                    icon={data.icon}
                    coin={data.coin}
                    rate={data.rate}
                    amount={data.amount}
                    subTitle={data.subTitle}
                    handleOpenPress={handleOpenPress}
                  />
                ))}
              </View>

              {/* Top Losers */}
              <View style={[styles.card]} >
                {ListData.map((data, index) => (
                  <ListItem
                    key={index}
                    icon={data.icon}
                    coin={data.coin}
                    rate={data.rate}
                    amount={data.amount}
                    subTitle={data.subTitle}
                    handleOpenPress={handleOpenPress}
                  />
                ))}
              </View>

            </ScrollView>
          </ScrollView>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          enablePanDownToClose={true}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          handleStyle={{ top: 0 }}
          handleIndicatorStyle={{ backgroundColor: colors.text, width: 92, height: 6, opacity: .3, }}
          backgroundStyle={{ backgroundColor: colors.bgLight }}
        >
          <BottomSheetView style={{ backgroundColor: colors.bgLight, }}>
            <TransferSheet />
          </BottomSheetView >
        </BottomSheet>
      </SafeAreaView>
    </>
  );
};



const ListItem = ({ icon, coin, rate, amount, subTitle, handleOpenPress }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const renderLeftActions = (progress, dragX) => {

    return (
      <Animated.View style={[
        {
          flexDirection: 'row',
          opacity: 1,
          left: -260,
          marginBottom: 8,
          transform: [
            {
              translateX: dragX,
            }
          ]
        },
      ]}>
        {/* <LinearGradient
          start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.5 }}
          colors={['#6F4FEF', '#4628FF']}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderTopRightRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Deposit')}
            style={styles.swipeBtn}
          >
            <Text style={{ ...FONTS.font, color: COLORS.white, ...FONTS.fontMedium }}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Withdraw')}
            style={styles.swipeBtn}
          >
            <Text style={{ ...FONTS.font, color: COLORS.white, ...FONTS.fontMedium }}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOpenPress}
            style={styles.swipeBtn}
          >
            <Text style={{ ...FONTS.font, color: COLORS.white, ...FONTS.fontMedium }}>Transfer</Text>
          </TouchableOpacity>
        </LinearGradient> */}
      </Animated.View>
    );
  };


  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View
        style={{ ...styles.listItem, borderColor: colors.borderColor, backgroundColor: colors.bgLight }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              height: 35,
              width: 35,
              marginRight: 10,
              resizeMode: 'contain',
            }}
            source={icon} />
          <View>
            <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 4 }}>{coin}</Text>
            <Text style={{ ...FONTS.fontSm, color: colors.text }}>{subTitle}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 2 }}>{amount}</Text>
          <Text style={{ ...FONTS.fontSm, color: COLORS.success }}>{rate}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

function ButtonContainer({ buttons, onClick, scrollX }) {
  const [btnContainerWidth, setWidth] = useState(0);
  const btnWidth = btnContainerWidth / buttons.length;
  const translateX = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, btnWidth],
  });
  const translateXOpposit = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, -btnWidth],
  });
  const { colors } = useTheme();

  return (
    <View
      style={{ ...styles.btnContainer, backgroundColor: colors.bgLight }}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}>

      {buttons.map((btn, i) => (
        <TouchableOpacity
          key={btn}
          style={styles.btn}
          onPress={() => onClick(i)}>
          <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.text }}>{btn}</Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[
          styles.animatedBtnContainer,
          { width: btnWidth, transform: [{ translateX }] },
        ]}>
        {buttons.map(btn => (
          <Animated.View
            key={btn}
            style={[
              styles.animatedBtn,
              { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
            ]}>
            <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: COLORS.white }}>{btn}</Text>
            <View
              style={{
                height: 45,
                width: btnWidth,
                backgroundColor: COLORS.primary,
                position: 'absolute',
                zIndex: -1,
                bottom: 0,
              }}
            />
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
}



const styles = StyleSheet.create({

  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 30,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBtnContainer: {
    height: 45,
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
  },
  animatedBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    width: width,
  },
  inputBox: {
    borderRadius: SIZES.radius,
    width: SIZES.width > SIZES.container ? SIZES.width - 110 : SIZES.width - 110,
    height: 45,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBoxInner: {
    position: 'absolute',
    zIndex: -1,
  },
  listItem: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: SIZES.radiusLg,
    marginBottom: 8,
    paddingHorizontal: 14,
  },

  modalContainer: {
    backgroundColor: 'rgba(0,0,0,.4)',
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },

  swipeBtn: {
    backgroundColor: 'rgba(255,255,255,.1)',
    height: 40,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 5,
  },

  scrollView: {
    paddingLeft: SIZES.width > SIZES.container ? (SIZES.container - itemWidth) / 2 : (SIZES.width - itemWidth) / 2,
    paddingRight: SIZES.width > SIZES.container ? ((SIZES.width - itemWidth) / 2) - 10 : ((SIZES.width - itemWidth) / 2) - 10,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },

})


export default HomeScreen;
