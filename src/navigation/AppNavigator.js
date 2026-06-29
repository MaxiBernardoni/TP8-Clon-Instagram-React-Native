import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.logoText}>Instagram</Text>
          ),
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          title: 'Publicación',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: '600', fontSize: 16 },
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Profile: focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#777',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: '#dbdbdb',
          borderTopWidth: 0.5,
          backgroundColor: '#fff',
          height: 50,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: () => 'meow_lover',
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { fontWeight: '700', fontSize: 16 },
          headerShadowVisible: true,
          headerRight: () => (
            <Ionicons name="add-square-outline" size={24} color="#000" style={{ marginRight: 12 }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
});
