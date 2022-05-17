import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={ styles.header }>
      <Text style={ styles.text }>{title}</Text>
      {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={ styles.image }></Image> */}
    </View>
  );
};

Header.defaultProps = {
    title: 'Shopping List',
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
      color: 'white',
      fontSize: 23,
      textAlign: "center",
  }
});

export default Header;