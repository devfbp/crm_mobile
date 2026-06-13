import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import ListStyle1 from '../../components/list/ListStyle1';
import { SafeAreaView } from 'react-native-safe-area-context';

const Footers = (props) => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.bgColor}}>
                <Header title={'Footer styles'} titleLeft leftIcon={'back'}/>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View style={[GlobalStyleSheet.card,{
                            backgroundColor:colors.bgLight,
                            ...GlobalStyleSheet.shadow,
                        }]}>
                            <ListStyle1 onPress={() => props.navigation.navigate('TabStyle1')} arrowRight title={'Footer Style 1'}/>
                            <ListStyle1 onPress={() => props.navigation.navigate('TabStyle2')} arrowRight title={'Footer Style 2'}/>
                            <ListStyle1 onPress={() => props.navigation.navigate('TabStyle3')} arrowRight title={'Footer Style 3'}/>
                            <ListStyle1 onPress={() => props.navigation.navigate('TabStyle4')} arrowRight title={'Footer Style 4'}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};



export default Footers;