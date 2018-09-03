import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';

const backgroundColor = '#e97600';

export default class SettingsScreen extends Component {
  
  static navigationOptions = ({ navigation }) => {



  }

  render() {
    return (
      
      <View style={styles.container}>

      <View style={styles.container1}>
      
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white'}}>

              This is SettingsScreen

          </Text>   

      </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    flexDirection: 'column',

  },

  container1: {

    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',


  },

  btnNavigate: {

    margin: 20,
    width: 200,
    height: 45,
    backgroundColor: 'darkviolet',
    padding: 10,
    alignItems: 'center'

  },

  txtButton: {

      fontWeight: 'bold',
      color: 'white',
      fontSize:  22,

  }

});