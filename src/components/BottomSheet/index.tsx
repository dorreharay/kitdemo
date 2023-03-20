import React, {useState, useMemo, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SectionList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs';

import BottomSheet from '@gorhom/bottom-sheet';

import ArrowRight from '../../../assets/images/icons/arrow.svg';

const calendarTheme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: 'black',
  textSectionTitleDisabledColor: 'black',
  selectedDayBackgroundColor: 'black',
  selectedDayTextColor: '#ffffff',
  todayTextColor: 'black',
  dayTextColor: 'black',
  textDisabledColor: '#00000033',
  arrowColor: 'black',
  disabledArrowColor: 'black',
  textDayFontFamily: 'CraftworkGrotesk-Bold',
  textMonthFontFamily: 'CraftworkGrotesk-Bold',
  textDayHeaderFontFamily: 'CraftworkGrotesk-Bold',
};

type Key = number;
type Tab = {title: string; key: Key};

type Tabs = Tab[];

type DateParam = {
  start: string;
  end: string;
};

type CalendarButtonProps = PropsWithChildren<{
  bottomSheetRef: {
    current?: BottomSheet;
  };
}>;

const tabs: Tabs = [
  {title: 'Calendar', key: 0},
  {title: 'List', key: 1},
];

export default function BottomSheetC(props: CalendarButtonProps) {
  const {bottomSheetRef} = props;

  const dispatch = useDispatch();
  const {weatherData}: any = useSelector(state => state);

  const dateParams = useRef<DateParam>({
    start: dayjs().format('YYYY-MM-DD'),
    end: dayjs().add(5, 'days').format('YYYY-MM-DD'),
  });

  const [activeTab, setActiveTab] = useState<Key>(tabs[0]?.key);

  const handleClose = () => {
    if (bottomSheetRef?.current) {
      bottomSheetRef.current.close();
    }
  };

  const handleTab = (tab: Tab) => {
    setActiveTab(tab?.key);
  };

  const handleSelect = (selectDate: string) => {
    dispatch({type: 'SET_SELECTED_DAY', payload: selectDate});
    handleClose();
  };

  const weatherDays = useMemo(() => {
    const preparedDates = weatherData?.list?.map(
      (item: {dt_txt: string | any[]}) => item?.dt_txt.slice(0, 10),
    );
    const uniqueDays = [...new Set(preparedDates)];

    return uniqueDays?.map(item => {
      return weatherData?.list?.find(
        (elem: {dt_txt: string | any[]}) => elem?.dt_txt.slice(0, 10) === item,
      );
    });
  }, [weatherData]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={styles.container}
      index={-1}
      snapPoints={['75%']}
      enablePanDownToClose>
      <View style={styles.tabs}>
        {tabs?.map(tab => (
          <TouchableOpacity
            style={[styles.tab, activeTab === tab?.key && styles.active]}
            onPress={() => handleTab(tab)}
            activeOpacity={0.7}
            key={tab?.key}>
            <Text
              style={[styles.tabText, activeTab === tab?.key && styles.active]}>
              {tab?.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === tabs?.[0]?.key && (
        <Calendar
          style={styles.calendar}
          minDate={dateParams?.current?.start}
          maxDate={dateParams?.current?.end}
          onDayPress={day => {
            dispatch({type: 'SET_SELECTED_DAY', payload: day?.dateString});
            handleClose();
          }}
          selectedDayTextColor="#FFFFFF"
          monthFormat={'MMMM'}
          theme={calendarTheme}
        />
      )}

      {activeTab === tabs?.[1]?.key && (
        <SectionList
          style={styles.sectionList}
          sections={[
            {
              title: 'Week forecast',
              data: weatherDays,
            },
          ]}
          renderItem={({item}) => {
            const dateTitle = item?.dt_txt || '';
            const formattedDate = dayjs(dateTitle).format('DD/MM/YYYY mm:HH');
            const selectDate = dayjs(dateTitle).format('YYYY-MM-DD');

            return (
              <TouchableOpacity
                style={styles.sectionItem}
                onPress={() => handleSelect(selectDate)}
                activeOpacity={0.6}>
                <View style={styles.sectionItemLeft}>
                  <Text style={styles.sectionItemTitleText}>
                    {formattedDate}
                  </Text>
                  <Text style={styles.sectionItemDescriptionText}>
                    {item?.main?.temp}°C
                  </Text>
                </View>

                <ArrowRight width={20} height={20} />
              </TouchableOpacity>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleClose}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  backgroundStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    height: 50,
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: '#00000022',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'CraftworkGrotesk-Bold',
  },
  tabs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'CraftworkGrotesk-Bold',
  },
  active: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },
  hide: {
    position: 'absolute',
    opacity: 0,
  },
  calendar: {
    minWidth: '100%',
    minHeight: '70%',
  },
  sectionList: {
    paddingHorizontal: 30,
    maxHeight: '70%',
  },
  sectionItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  sectionItemLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionItemTitleText: {
    fontSize: 14,
    fontFamily: 'CraftworkGrotesk-Semibold',
  },
  sectionItemDescriptionText: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'CraftworkGrotesk-Regular',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionHeaderText: {
    fontSize: 22,
    fontFamily: 'CraftworkGrotesk-Bold',
  },
});
