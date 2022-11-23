import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import api from '../../../src/api/api';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

const ShowList = ({ navigation }) => {
  
  const [list, setList] = useState([]);

  useEffect(() => {
    const uploadList = setInterval(() => {
      getList();
    }, 1000);
  }, []);

  // useEffect(()=>{
  //   getList();
  // },[])


 
  const getList = () => {
    api.get('/course').then((Response) => {
      setList(Response.data)
    }).catch(error => console.log(error));
  }

  const funcDelete = (item) => {
    api.delete('/course/' + item.id).then((Response) => {
      getList();
    }).catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={styles.bck}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
        <Ionicons name="add-circle" style={styles.txt_tarefa} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {list.map((item, index) => {
          return (
            <View key={index} style={styles.item_container}>
              <ScrollView>
                <View>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('Mostrar',{
                    userName:item.name,
                    userPrice:item.price,
                    userDescription:item.description,
                    id:item.id,
                  });
                }}>
                    <Text style={styles.obj}>Name Course: {item.name}</Text>
                    <Text style={styles.obj}>Price: {item.price}</Text>
                    <Text style={styles.obj}>Description: {item.description}</Text>

                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View>
                <TouchableOpacity onPress={() =>funcDelete(item)}>
                <MaterialIcons name="delete"style={styles.txt_delete} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('Edit', {
                    userName:item.name,
                    userPrice:item.price,
                    userDescription:item.description,
                    id:item.id,
                  });
                }}>
                  <FontAwesome name="edit" size={24} color="black" style={styles.txt_edit} />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: "red",
    borderWidth: 1,
    margin: 20,
    backgroundColor: '#e2e2e2',
  },
  title: {
    padding: 15,
    backgroundColor: "#eeeeee",
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 30,
    color: 'black',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  obj: {
    fontSize: 22,
    marginTop: 5,
  },

  item_container: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#737373',
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    backgroundColor: "#cbcbcb"

  },
  txt_edit: {
    padding: 8,
    fontSize:30,
    color: "blue",
    fontWeight: "bold",

  },
  txt_delete: {
    padding: 10,
    fontSize: 35,
    color: "red",
    fontWeight: "bold",
  },
  txt_create: {
  },
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
    fontSize: 19,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right"
  },
  desc: {
    paddingTop: 8,
    textAlign: 'left',


  },
  txt_tarefa: {

    fontSize: 50,
    fontWeight: "bold",
    backgroundColor: '#5f9ea0',
    marginHorizontal: 40,
    marginEnd: 10,
    minWidth: 40,
    textAlign: "right",
    paddingTop:80,

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
  bck: {
    flex:1,
    backgroundColor: '#5f9ea0'
  }
});
export default ShowList;
