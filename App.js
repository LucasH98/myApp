import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import showItem from './Screens/showItem/index';
import showList from './Screens/showList/index';
import addItem from './Screens/addItem/index'
import editItem from './Screens/editItem/index';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={screenOptions}>
      <Stack.Screen name="My Courses" component={showList}
      options={{
        headerTransparent:true
      }} />
     <Stack.Screen name="Add" component={addItem}
      options={{
        headerTransparent:true
      }} />
     <Stack.Screen name="Edit" component={editItem}
     options={{
      headerTransparent:true
    }} />  
     <Stack.Screen name="Mostrar" component={showItem}
     options={{
      headerTransparent:true
    }} />
      </Stack.Navigator> 
    </NavigationContainer>
  ); 
};

const screenOptions={
  headerStyle:{
    backgroundColor:"#5f9ea0",
    fontSize:20
  }
}

export default App;
