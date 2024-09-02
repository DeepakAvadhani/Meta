import React from 'react';
import { View, Image } from 'react-native';
import tw from 'twrnc';

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View
      animation={focused ? 'bounceIn' : 'rotate'}
      duration={1000}
      style={tw`items-center justify-center`}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={[tw`w-6 h-6`, { tintColor: color }]}
      />
    </View>
  );
};

export default TabIcon;
