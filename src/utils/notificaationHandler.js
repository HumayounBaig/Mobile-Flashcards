import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashCards:key';
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

export function clearLocalNotification() {
  AsyncStorage.removeItem(NOTIFICATION_KEY)
  
  
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
      .then(status => { 
        if (status.status === "granted") { 
          if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then(val => console.log('channel says', val))
    
          }
          Notifications.cancelAllScheduledNotificationsAsync();
    
          const NextDay = new Date(); 
          NextDay.setDate(NextDay.getDate() + 1);
          NextDay.setHours(20);
          NextDay.setMinutes(0);
          Notifications.scheduleLocalNotificationAsync(
            generateNotification(),
            {
              time: NextDay,
              repeat: 'day'
            }
          )

          
    
        }
      })
      
      setNotify()
      
    }
  })
}

const setNotify = async () => {
  await AsyncStorage.setItem(NOTIFICATION_KEY, "true")
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
