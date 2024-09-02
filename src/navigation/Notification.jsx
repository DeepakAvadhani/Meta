import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

const NotificationScreen = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestUserPermission();
    configureChannels(); 
  }, []);

  const configureChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', 
        channelName: 'Default Channel', 
        channelDescription: 'A default channel', 
        playSound: true, 
        soundName: 'default', 
        importance: 4, 
        vibrate: true,
      },
      (created) => console.log(`CreateChannel returned '${created}'`) 
    );
  };

  const handlePress = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id', 
      title: 'Hello!',
      message: 'The notification button is clicked.',
      playSound: true,
      soundName: 'default',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FF0000',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
