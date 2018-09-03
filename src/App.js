import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback, FlatList, SafeAreaView} from 'react-native';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import MapScreen from './screens/MapScreen';
import MapScreenCallout from './screens/MapScreenCallout';
import MapScreenRoutes from './screens/MapScreenRoutes';
import MapScreenPlaces from './screens/MapScreenPlaces';
import SettingsScreen from './screens/SettingsScreen';

import Icon from "react-native-vector-icons/Feather";
import { metrics, colors } from './styles';

const remote = 'http://accountech.com.pk/wp-content/uploads/2016/08/blur-map.png';

const resizeMode = 'center';
const text = 'This is some text inlaid in an <Image />';

class HomeScreen extends Component {

    static navigationOptions = {

        headerTitle: 'Maps Example' ,
    
    };

    constructor(props) {
        super(props);

        this.state = {

            data: [

                { id: "0", name: "MapScreen with a Callout" },
                { id: "1", name: "MapScreen with many Callouts" },
                { id: "2", name: "MapScreen that List Places" },
                { id: "3", name: "MapScreen with Routes" }

              ]

        };

    }

    actionOnRow = (item) => {

        if (item.id == 0) {

            this.props.navigation.navigate('MapScreen');

        }

        else if (item.id == 1) {

            this.props.navigation.navigate('MapScreenCallout');

        }

        else if (item.id == 2) {

            this.props.navigation.navigate('MapScreenPlaces');

        }

        else if (item.id == 3) {

            this.props.navigation.navigate('MapScreenRoutes');

        }

        console.log('Selected Item : ' + item.id)
        
    }

  render() {
    return (

        <ImageBackground
            style={styles.image}
            source={{ uri: remote }}
        >
        
        <SafeAreaView>

        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (

              <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>  

                <View style={styles.item}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>

              </TouchableWithoutFeedback>

            );
          }}
        />
        
      </SafeAreaView>

      </ImageBackground>

    );

  }

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    image: {

        backgroundColor: '#ccc',
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',

    },

    item: {

        alignItems: "center",
        backgroundColor: "#FFF",
        flexGrow: 1,
        elevation: 1,
        margin: 5,
        marginRight: 31,
        marginLeft: 31,
        padding: 20
        
    },

    text: {

        color: "#000"

    }

});

const MainScreenNavigator = createStackNavigator(
  
  {

    HomeScreen: HomeScreen,
    MapScreen: MapScreen,
    MapScreenCallout: MapScreenCallout,
    MapScreenRoutes: MapScreenRoutes,
    MapScreenPlaces: MapScreenPlaces,
    Settings: SettingsScreen

  },

  {

    initialRouteName: 'HomeScreen',
    swipeEnabled: true,

  }

);

export default MainScreenNavigator
