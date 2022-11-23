import { TabRouter, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import api from '../../../src/api/api';
import { Ionicons } from '@expo/vector-icons';

const ShowItem = ({ navigation }) => {
  const route = useRoute();

  const [list, setList] = useState([]);
  // const [visible, setVisible] = useState(false);  

  const [userName, setUserName] = useState("");
  const [userPrice, setUserPrice] = useState(0);
  const [userDescription, setUserDescription] = useState("");
  const [hideId, setHideId] = useState(null);


  useEffect(() => {
    setUserName(route.params.userName)
  }, []);

  useEffect(() => {
    setUserDescription(route.params.userDescription)
  }, []);

  useEffect(() => {
    setHideId(Number(route.params.id))
  }, []);

  useEffect(() => {
    setUserPrice(Number(route.params.userPrice)+"")
  }, []);


  const getList = () => {
    api.get('/course').then((Response) => {
      setList(Response.data)
    }).catch(error => console.log(error));
  }

  const editUser = () => {
    api.put('/course/' + `${hideId}`, {
      "id": hideId,
      "name": userName,
      "price": Number(userPrice) || 0,
      "description": userDescription,

    }).then((Response) => {
      getList();
      setUserName("")
      setUserPrice(0)
      setUserDescription("")
      //setVisible(false);
      navigation.goBack();
    }).catch(error => console.log(error));

  }



  return (

    <SafeAreaView style={styles.screen}>

      <View style={styles.form}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" style={styles.txt_close}/>
        </TouchableOpacity>
        <Text style={styles.font}>Name Course:  {userName}</Text>
        <Text  style={styles.font}>Description: {userDescription}</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  
 
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
    backgroundColor:"#BFD687",
    paddingTop:80
  },
  font:{
padding:10,  
fontSize:30
  },

});

export default ShowItem;
