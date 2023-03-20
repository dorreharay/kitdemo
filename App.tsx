/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useEffect, FC, Fragment} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Dashboard from 'screens/Dashboard';
import TabBar from 'components/TabBar';
import CalendarButton from 'components/CalendarButton';
import BottomSheetC from 'components/BottomSheet';

type MaterialTabParamList = {
  Dashboard: {component: JSX.Element};
};

type Tab = {title: string; name: string; component: FC};

type Tabs = Tab[];

const Tab = createMaterialTopTabNavigator<MaterialTabParamList>();

const tabs: Tabs = [
  {title: 'Day', name: 'Dashboard', component: Dashboard},
  {title: 'Night', name: 'List', component: Dashboard},
];

function App(): JSX.Element {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>();

  const data: any = useSelector(state => state);

  useEffect(() => {
    dispatch({type: 'FETCH_WEATHER_DATA'});
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.twoSections}>
        <View style={styles.textContent}>
          <Text style={styles.title}>Kit Weather</Text>
          <Text style={styles.description}>
            {data?.weatherData?.city?.name} {data?.weatherData?.city?.country}
          </Text>
        </View>

        <CalendarButton bottomSheetRef={bottomSheetRef} />
      </View>

      <NavigationContainer>
        <Tab.Navigator tabBar={props => <TabBar tabs={tabs} {...props} />}>
          {tabs?.map(tab => (
            <Fragment key={tab?.name}>
              <Tab.Screen name={tab?.name} component={tab?.component} />
            </Fragment>
          ))}
        </Tab.Navigator>
      </NavigationContainer>

      <BottomSheetC bottomSheetRef={bottomSheetRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  twoSections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textContent: {
    padding: 25,
    paddingBottom: 15,
  },
  title: {
    fontSize: 25,
    fontFamily: 'CraftworkGrotesk-SemiBold',
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'CraftworkGrotesk-Regular',
  },
});

export default App;
