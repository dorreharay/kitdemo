import React, {useMemo} from 'react';
import type {PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';

import CalendarIcon from '../../../assets/images/icons/calendar.svg';

type CalendarButtonProps = PropsWithChildren<{
  bottomSheetRef: {
    current?: BottomSheet;
  };
}>;

export default function CalendarButton(props: CalendarButtonProps) {
  const {bottomSheetRef} = props;

  const {selectedDay}: any = useSelector(state => state);

  const handlePress = () => {
    if (bottomSheetRef?.current) {
      bottomSheetRef.current.expand();
    }
  };

  const isCurrentDay = useMemo(() => {
    return (
      dayjs().format('YYYY-MM-DD') === dayjs(selectedDay).format('YYYY-MM-DD')
    );
  }, [selectedDay]);

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={handlePress}>
      <CalendarIcon width={20} height={20} />

      <Text style={styles.text}>
        {selectedDay && !isCurrentDay
          ? dayjs(selectedDay).format('DD.MM.YYYY')
          : 'Today'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 20,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  text: {
    marginLeft: 5,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'CraftworkGrotesk-SemiBold',
  },
});
