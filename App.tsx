import { useRef, useEffect } from 'react';
import { StatusBar, } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import { Subscription } from "expo-modules-core";
import * as Notifications from 'expo-notifications';


import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';

import "./src/services/notificationConfig";
import { getPushNotificatioToken } from "./src/services/getPushNotificationToken"


// Componet

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black
  })


  const getNoticationListener = useRef<Subscription>()
  const resNoticationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificatioToken()
  })

  useEffect(() => {
    getNoticationListener.current = Notifications.addNotificationReceivedListener(notifications => {
      console.log(notifications);

    })
    resNoticationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    })

    return () => {
      if (getNoticationListener.current && resNoticationListener.current) {
        Notifications.removeNotificationSubscription(getNoticationListener.current)
        Notifications.removeNotificationSubscription(resNoticationListener.current)
      }
    }
  }, [])


  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {
        fontsLoaded ? <Routes /> : <Loading />
      }

    </Background>
  );
}
