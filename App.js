import { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.phoneContainer}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppNavigator />
        </NavigationContainer>
      </View>
    </View>
  );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: isWeb ? '#1a1a1a' : '#fff',
    alignItems: isWeb ? 'center' : 'stretch',
    justifyContent: isWeb ? 'center' : 'flex-start',
  },
  phoneContainer: {
    flex: 1,
    width: isWeb ? 390 : '100%',
    maxWidth: isWeb ? 390 : undefined,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
});
