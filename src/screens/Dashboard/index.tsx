import React, {useMemo} from 'react';
import type {PropsWithChildren} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

type DashboardProps = PropsWithChildren;

function Dashboard(props: DashboardProps): JSX.Element {
  const {} = props;

  const {weatherData, selectedDay}: any = useSelector(state => state);

  const currentDateInfo = useMemo(() => {
    if (!weatherData) {
      return null;
    }

    if (!selectedDay) {
      return weatherData?.list?.[0];
    }

    return weatherData?.list?.find((item: {dt_txt: string | any[]}) => {
      const formatted = item?.dt_txt.slice(0, 10);

      return formatted === selectedDay;
    });
  }, [weatherData, selectedDay]);

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Text style={styles.colTitle}>Temperature</Text>
        <Text style={styles.colDescription}>
          {Math.ceil(currentDateInfo?.main?.temp || 0)}°C
        </Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.colTitle}>Feels like</Text>
        <Text style={styles.colDescription}>
          {Math.ceil(currentDateInfo?.main?.feels_like || 0)}°C
        </Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.colTitle}>Humidity</Text>
        <Text style={styles.colDescription}>
          {currentDateInfo?.main?.humidity}%
        </Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.colTitle}>Wind</Text>
        <Text style={styles.colDescription}>
          {currentDateInfo?.wind?.speed} m/s
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontFamily: 'CraftworkGrotesk-Bold',
  },
  col: {
    marginBottom: 10,
  },
  colTitle: {
    fontSize: 20,
    fontFamily: 'CraftworkGrotesk-Bold',
  },
  colDescription: {
    fontSize: 20,
    fontFamily: 'CraftworkGrotesk-Regular',
  },
});

export default Dashboard;
