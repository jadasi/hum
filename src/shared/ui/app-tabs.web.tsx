import {
  Tabs,
  TabList,
  TabSlot,
  TabTrigger,
  type TabListProps,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/(driver)/(tabs)" asChild>
            <TabButton>Today</TabButton>
          </TabTrigger>
          <TabTrigger name="clients" href="./clients" asChild>
            <TabButton>Clients</TabButton>
          </TabTrigger>
          <TabTrigger name="earnings" href="./earnings" asChild>
            <TabButton>Earnings</TabButton>
          </TabTrigger>
          <TabTrigger name="posse" href="./posse" asChild>
            <TabButton>Posse</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} className="active:opacity-70">
      <View className={`rounded-md px-3 py-0.5 ${isFocused ? 'bg-accent' : 'bg-muted'}`}>
        <Text
          className={`font-sans text-hum-sm font-hum-medium ${isFocused ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View
      {...props}
      className="absolute w-full flex-row items-center justify-center px-4 py-2">
      <View className="max-w-[800px] flex-1 flex-row items-center gap-2 rounded-full bg-muted px-4 py-1">
        {props.children}
      </View>
    </View>
  );
}
