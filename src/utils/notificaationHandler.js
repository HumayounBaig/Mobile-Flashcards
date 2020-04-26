import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'NOTIFICATION_KEY';
const CHANNEL_ID = 'DailyReminder';

function generateNotification() {
  return {
    to: getToken(),
    title: 'Daily Reminder',
    body: `Don't forget to study today!`,
    _displayInForeground: true,
    sound: 'default',

    android: {
      chhannelId: CHANNEL_ID,
      sticky: false,
    }
  }
}

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY)
  Notifications.cancelAllScheduledNotificationsAsync
  
}

function createChannel() {
  return {
    name: 'Daily Reminder',
    description: 'This is a daily reminder for you to study',
    sound: true,
    priority: "high"
  }
}
let token = ""
export async function setLocalNotification() {
  const data = await AsyncStorage.getItem(NOTIFICATION_KEY)
  if (data === null) {
    const status = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (status === "granted") {
      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
          .then(val => console.log('channel says', val))

      }
      Notifications.cancelAllScheduledNotificationsAsync();

      const NextDay = new Date();

      // NextDay.setDate(NextDay.getDate());
      // NextDay.setHours(18);
      // NextDay.setMinutes(5);
      // NextDay.setMonth()
      NextDay.setSeconds(t.getSeconds() + 10);

      Notifications.scheduleLocalNotificationAsync(
        generateNotification(),
        {
          time: NextDay,
          repeat: 'day'
        }
      )
      sendPushNotification()
      await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

    }
    const tok = await Notifications.getExpoPushTokenAsync()
    token = tok
  }
}

const getToken = async () => {
  token = await Notifications.getExpoPushTokenAsync();
  return token
}

export function sendPushNotification() { 

  const message = {
    to: getToken(),
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' },
    _displayInForeground: true,
  };
  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(res => console.log("res", res))
    .catch(err => console.log(err))

};
