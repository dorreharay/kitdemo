import React, {FC} from 'react';
import type {PropsWithChildren} from 'react';
import {Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';

type Tab = {title: string; name: string; component: FC};

type Tabs = Tab[];

type TabBarProps = PropsWithChildren<{
  tabs: Tabs;
  state: any;
  navigation: any;
}>;

function TabBar(props: TabBarProps): JSX.Element {
  const {tabs, state, navigation} = props;

  const activeTab = state?.index;

  return (
    <ScrollView
      style={styles.tabList}
      horizontal
      alwaysBounceHorizontal={false}>
      {tabs?.map((tab, index) => (
        <TouchableOpacity
          style={[styles.tab, activeTab === index && styles.active]}
          onPress={() => navigation.jumpTo(tab?.name)}
          key={tab?.name}
          activeOpacity={0.8}>
          <Text style={[styles.tabText, activeTab === index && styles.active]}>
            {tab?.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabList: {
    maxHeight: 50,
    paddingLeft: 20,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 100,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'CraftworkGrotesk-Medium',
  },
  active: {
    color: '#FFFFFF',
    backgroundColor: 'black',
  },
});

export default TabBar;
