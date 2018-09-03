import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';

import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'
import { PermissionsAndroid } from 'react-native';

const origin = { latitude: 37.4220, longitude: -122.0840 }; // boston
const destination = { latitude: 42.3730591, longitude: -71.033754 }; //east boston

export default class CloudScreen extends Component {

  static navigationOptions = {

    header: null

  };

  state = {

    origin,
    destination,

    markers: [

        {
            uniqueId: 0,
            longitude: -94.60867077112196, 
            latitude: 31.148895814218694
    
        },

        {
            uniqueId: 1,
            longitude: -95.60867077112196, 
            latitude: 32.148895814218694
    
        },

    ]

  };

  async requestLocationPermission() {
    try {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'App Location Permission',
                'message': 'Maps App needs access to your map ' +
                    'so you can be navigated.'
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
            return true;

        } else {
            console.log("location permission denied");
            return false;
        }

    } catch (err) {
        console.warn(err)
    }

  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let newOrigin = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        console.log('new origin');
        console.log(newOrigin);

        this.setState({
            origin: newOrigin
        });
    }, (err) => {
        console.log('error');
        console.log(err)

    }, {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000})

  };

  async componentDidMount() {
    let isGranted = await this.requestLocationPermission();
    if (isGranted) {
        this.getLocation();
    }
  }

  handleGetGoogleMapDirections = () => {

    const data = {

        source: this.state.origin,
        destination: this.state.destination,
        params: [
            {
                key: "dirflg",
                value: "b"
            }
        ]
        
    };

    getDirections(data)

  };

  render() {

    return (

      <View style={styles.container}>

        <MapView
          
          onPress={(event) => {

            console.log(event.nativeEvent.coordinate);

            // console.log(this.marker.props.coordinate);

            // Acessar props do componente fora dele

            // this.marker.props.coordinate={coordinatenow};

            let coordinatenow = event.nativeEvent.coordinate;

            // Setar aqui o array em que cada item vai ser adicionado após cada clique

            this.setState({ markers: [... this.state.markers, coordinatenow] })

            console.log(this.state.markers);

          }}

          ref={map => this.mapView = map}
          style={styles.map}

          region={{
            latitude: (this.state.origin.latitude + this.state.destination.latitude) / 2,
            longitude: (this.state.origin.longitude + this.state.destination.longitude) / 2,
            latitudeDelta: Math.abs(this.state.origin.latitude - this.state.destination.latitude) + Math.abs(this.state.origin.latitude - this.state.destination.latitude) * .1,
            longitudeDelta: Math.abs(this.state.origin.longitude - this.state.destination.longitude) + Math.abs(this.state.origin.longitude - this.state.destination.longitude) * .1,
          }}

          loadingEnabled={true}
          zoomControlEnabled={true}
          toolbarEnabled={true}
          
        >

        {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.uniqueId}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title="This is a title"
              description="This is a description"
            >
            <MapView.Callout>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </MapView.Callout>
            </MapView.Marker>
          ))}

        </MapView>

      </View>

    );
  }
}

const styles = StyleSheet.create({

    container: {
  
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
  
    },
  
    map: {
  
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
  
    },
   
  });