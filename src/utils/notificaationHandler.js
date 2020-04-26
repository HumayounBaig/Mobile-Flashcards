import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'NOTIFICATION_KEY';
const CHANNEL_ID = 'DailyReminder';

function generateNotification(){
    return {
        to: getToken(),
        title: 'Daily Reminder',
        body: `Don't forget to study today!`,
        _displayInForeground: true,

        ios: {
            sound: true
        },
        android: {
            chhannelId: CHANNEL_ID,
            sticky: false,
        }
    }
}

export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    )
}

function createChannel (){
    return {
        name: 'Daily Reminder',
        description: 'This is a daily reminder for you to study',
        sound: true,
        priority: "high"
    }
}
let token = ""
export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === "granted"){
                    Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
                    .then(val => console.log('channel says', val))
                    .then(()=> {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        const NextDay = new Date();
                        
                        NextDay.setDate(NextDay.getDate() + 1);
                        NextDay.setHours(13);
                        NextDay.setMinutes(46);
                        NextDay.setMonth(0);

                        Notifications.scheduleLocalNotificationAsync(
                            generateNotification(),
                            {
                                time: NextDay,
                                repeat: 'day'
                            }
                        );
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }).catch(err => {
                        console.log(err);
                        
                    })
                }
                Notifications.getExpoPushTokenAsync()
                .then(tok => token = tok)
            })
        }
    })
}

const getToken = async() => {
    token = await Notifications.getExpoPushTokenAsync();
    return token
} 

export function sendPushNotification () {
console.log("token",getToken())

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
    }).then(res => console.log("res",res))
    .catch(err => console.log(err))
    
  };
