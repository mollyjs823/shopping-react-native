import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList, Alert, Text, TouchableOpacity } from 'react-native';
import uuid from "react-native-uuid";
import auth from '@react-native-firebase/auth';

import Header from "./components/Header";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";
import Login from "./components/Login";

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleSignout = () => {
    auth().signOut().then(() => console.log("User signed out"));
  }

  const [items, setItems] = useState([
    {
      id: uuid.v4(),
      text: 'Milk',
    },
    {
      id: uuid.v4(),
      text: 'Eggs',
    },
    {
      id: uuid.v4(),
      text: 'Bread',
    },
    {
      id: uuid.v4(),
      text: 'Juice',
    },
  ]);

  const deleteItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', [{ text: 'OK' }]);
    } else {
      setItems(prevItems => {
        return [{id: uuid.v4(), text}, ...prevItems];
      });
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>SIGN IN USER</Text>
        <Login />
      </View>
    );
  } else {
  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem = {addItem}/>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItem = {deleteItem}
            addItem = {addItem}
          />
        )}
      />
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )};
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }
});

export default App;