import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'
import { PermissionsAndroid } from 'react-native';

const origin = { latitude: 42.3616132, longitude: -71.0672576 }; // boston
const destination = { latitude: 42.3730591, longitude: -71.033754 }; //east boston
const GOOGLE_MAPS_APIKEY = 'AIzaSyBoGdzt-mVtwdClWhXG0d6mAbhAGIP43lU';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 9;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {

  static navigationOptions = {

    header: null

  };

  state = {

    origin,
    destination,

    coordinateCallout: {longitude: -99.22463279217482, latitude: 33.730078033238264}

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

            console.log(this.marker.props.coordinate);

            // Acessar props do componente fora dele

            // this.marker.props.coordinate={coordinatenow};

            let coordinatenow = event.nativeEvent.coordinate;

            this.setState({ coordinateCallout: coordinatenow });

            // this.marker.showCallout();

          }}

          ref={map => this.mapView = map}
          style={styles.map}

          region={{
            latitude: this.state.coordinateCallout.latitude,
            longitude: this.state.coordinateCallout.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}

          loadingEnabled={true}
          zoomControlEnabled={true}
          toolbarEnabled={true}
          
        >

        <MapView.Marker
          coordinate={this.state.coordinateCallout}
          ref={marker => this.marker = marker}
        >
          <MapView.Callout>
            <Text>Eae</Text>
          </MapView.Callout>
        </MapView.Marker>

        <MapView.Marker
          coordinate={this.state.destination}
        >
          <MapView.Callout onPress={this.handleGetGoogleMapDirections}>
            <Text>Press to Get Direction</Text>
          </MapView.Callout>
        </MapView.Marker>
        <MapView.Marker
          coordinate={this.state.origin}
        >
        <MapView.Callout>
          <Text>This is where you are</Text>
        </MapView.Callout>
        </MapView.Marker>
        <MapViewDirections
          origin={this.state.origin}
          destination={this.state.destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />

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