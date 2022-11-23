import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import api from '../../../src/api/api';
import { Ionicons } from '@expo/vector-icons';


const AddItem = ({navigation}) => {

  const [list, setList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPrice, setUserPrice] = useState(0);
  const [userDescription, setUserDescription] = useState("");
  
  const getList = () => {
    api.get('/course').then((Response) => {
      setList(Response.data)
    }).catch(error => console.log(error));
  }

  const funcSaveNew = () => {
    
      api.post('/course', {
        "name": userName,
        "price": Number(userPrice) || 0,
        "description": userDescription,

      }).then((Response) => {
        getList();
        setUserName("")
        setUserPrice(0)
        setUserDescription("")
       // setVisible(false);  
       navigation.navigate('My Courses')
      }).catch(error => console.log(error));
  }
  
  const onChangeName = (value) => {
    setUserName(value)
  }
  const onChangePrice= (value) => {
    setUserPrice(value)
  }
  const onChangeDescription = (value) => {
    setUserDescription(value)
  }

  return (

    <SafeAreaView style={styles.screen}>
     <View style={styles.form}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
    <Ionicons name="arrow-back" style={styles.txt_close} />
    </TouchableOpacity>
    <Text style={styles.desc}>Name</Text>
    <TextInput
      defaultValue={userName}
      placeholder='Name'
      style={styles.txt_input}
      onChangeText={onChangeName}></TextInput>

    <Text style={styles.desc}>Price</Text>
    <TextInput placeholder='price'
      defaultValue={userPrice}
      keyboardType="numeric"
      style={styles.txt_input}
      onChangeText={onChangePrice}></TextInput>

    <Text style={styles.desc}>Description</Text>
    <TextInput placeholder='Description'
      defaultValue={userDescription}
      style={styles.txt_input}
      onChangeText={onChangeDescription}></TextInput>
    <TouchableOpacity 
    onPress={funcSaveNew}>
      <Text style={styles.newbtn}>Save</Text>
    </TouchableOpacity>
  </View>
</SafeAreaView>
  );  
};
const styles = StyleSheet.create({

  form: {
    marginVertical: 10,
    padding: 15,
    marginTop: 15,
   
  },
  txt_input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 12,
    borderColor: 'grey',


  },
  txt_close: {
    fontSize: 35,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right"
  },
  desc: {
    paddingTop: 8,
    textAlign: 'left',
  },
  txt_tarefa: {
    fontSize: 19,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "left",
    marginHorizontal: 2,
    marginEnd: 10,
    minWidth: "48%",
    textAlign: "left",
    paddingTop: 8,

  },
  newbtn: {
    marginVertical: 15,
    paddingTop: 8,
    paddingVertical: 8,
    color: "white",
    backgroundColor: "black", 
    alignSelf: "center",
    marginHorizontal: 2,
    marginEnd: 10,
    minWidth: "100%",
    textAlign: "center",
  },

  screen:{
flex:1,
backgroundColor:"#BFD687"
}

});

export default AddItem;
