import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';

import MapView from 'react-native-maps';

const { height, width } = Dimensions.get('window');

export default class MapScreen extends Component {

  static navigationOptions = {

    header: null

  };

  state = {

    places: [

      {

        id: 1,
        title: 'Casa do café',
        description: '15 Reviews',
        latitude: -27.2106710,
        longitude: -49.6362700,

      },

      {

        id: 2,
        title: 'Padaria do tio',
        description: '29 Reviews',
        latitude: -27.2006710,
        longitude: -49.6362700,

      },

      {

        id: 3,
        title: 'Casa do José',
        description: '31 Reviews',
        latitude: -27.2006710,
        longitude: -49.6262700,

      }

    ],

  };

  _mapReady = () => {

    this.state.places[0].mark.showCallout();

  };

  render() {

    const { latitude, longitude } = this.state.places[0];

    return (

      <View style={styles.container}>

        <MapView

          ref={map => this.mapView = map}
          style={styles.map}

          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231,
          }}

          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          loadingEnabled={true}
          showsPointsOfInterest={false}
          showBuildings={false}
          toolbarEnabled={false}
          onMapReady={this._mapReady}
          
        >
          { this.state.places.map(place => (
            <MapView.Marker

              // Acrescentando um MapMarker em cada item
              // do array de places
              
              ref={mark => place.mark = mark}
              title={place.title}
              description={place.description}
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}

            />

          ))}

        </MapView>

        <ScrollView

        style={styles.placesContainer} 
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled

        onMomentumScrollEnd={e => {

          const scrolled = e.nativeEvent.contentOffset.x;

          const place = (scrolled > 0)
            ? scrolled / Dimensions.get('window').width
            : 0;

          const { latitude, longitude, mark } = this.state.places[place];

          this.mapView.animateToCoordinate ({

            latitude,
            longitude

          }, 1000);

          setTimeout(() => {

            mark.showCallout();

          }, 1000);

        }}

        >

        { this.state.places.map(place => (

          <View key={place.id} style={styles.place}>
          
            <Image
              style={styles.image}
              source={{uri: 'https://i.ytimg.com/vi/jvPLe_64meU/maxresdefault.jpg'}}
            />

            <View style={styles.textContainer}>
            
            <Text style={styles.title}>{place.title}</Text>

            <View style={{ flexDirection: 'row' }}>

            <Text style={styles.description}>{place.description}</Text>
            <Text style={styles.housePrice}>$490</Text>

            </View>

            </View>
          
          </View>

        ))}

        </ScrollView>

      </View>

    );
  }
}

const styles = StyleSheet.create({

    container: {
  
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
  
    },
  
    map: {
  
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
  
    },

    image: {

      width: 130,
      height: 90,
      alignSelf: 'center',
      maxHeight: 150

    },

    textContainer: {

      flexDirection: 'column',

    },

    title: {

      fontSize: 16,
      color: '#000',
      paddingTop: 5,
      paddingLeft: 5,
      alignSelf: 'flex-start',

    },

    description: {

      fontSize: 15,
      paddingLeft: 5,
      alignSelf: 'flex-start',
      paddingTop: 31,

    },

    housePrice: {

      fontSize: 19,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      paddingTop: 27,
      paddingLeft: 50,
      paddingRight: 5,
      color: '#E6666C',

    },
    
    placesContainer: {

      width: '100%',
      maxHeight: 200,

    },

    place: {

      width: width - 40,
      maxHeight: 150,
      alignSelf: 'flex-end',
      flexDirection: 'row',
      backgroundColor: '#FFF',
      marginHorizontal: 20,

    }
   
  });