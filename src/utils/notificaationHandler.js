import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashCards:key';
const CHANNEL_ID = 'DailyReminder';

function createNotification () {
  return {
    title: 'Daily Reminder!',
    body: "Hey! Don't forget to study today!",
    ios: {
      sound: true,
    },
    _displayInForeground: true,

    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
      chhannelId: CHANNEL_ID,

    }
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );

  
  
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

export function setLocalNotification() { 
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    }
  })
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
