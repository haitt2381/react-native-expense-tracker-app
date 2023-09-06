import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
let BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  
  function headerRightHandler(tintColor, navigation) {
    return <IconButton icon={'add'} size={24} color={tintColor} onPress={() => { navigation.navigate('ManageExpense') }} />
  }
  
  function tabBarIconHandler(icon, { color, size }) {
    return <Ionicons name={icon} size={size} color={color}/>
  }
  
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: '#fff',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => headerRightHandler(tintColor, navigation)
    })}>
      <BottomTabs.Screen
        name={'RecentExpenses'}
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => tabBarIconHandler('hourglass', { color, size })
        }}
      />
      <BottomTabs.Screen 
        name={'AllExpenses'} 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => tabBarIconHandler('calendar', { color, size })
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light"/>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: '#fff'
          }}>
            <Stack.Screen name={'ExpensesOverview'} component={ExpensesOverview} options={{ headerShown: false }}/>
            <Stack.Screen name={'ManageExpense'} component={ManageExpense} options={{presentation: 'modal'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
