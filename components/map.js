import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Alert, AsyncStorage, Linking } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation'
import { LinearGradient } from 'expo-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';




const { width, height } = Dimensions.get("window");
const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      location: null,
      index: 0,
      markers: global.markers,
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.02864195044303443,
        longitudeDelta: 0.020142817690068,
      },

    };
  }

  call = () => {
    Alert.alert(
      "Call",
      "Are you sure you want to call someone?",
      [
        {
          text: "Cancel"
        },
        {
          text: "Insurance", onPress:  () => {
            Linking.openURL("tel:"+global.phone)
          }
        },
        {
          text: "Emergency", onPress:  () => {
            Linking.openURL("tel:911")
          }
        }
      ],
      { cancelable: false }
    );  
  }

  chat = (senior) => {
    global.volname = global.uname;
    global.senname = senior.name;
    console.log(global.volname + " " + global.senname)
    this.props.navigation.navigate('Chat')
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  componentDidMount() {
    console.log('mount')
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      this.setState({ count: 0, markers: global.markers});
      console.log('move')
    });
    this.getLocationAsync();
    this.index = 0;

  }
  details = (senior, index, distance, store, marker, verify) => {
    global.accept = [senior, index, distance, store, marker, verify];
    this.props.navigation.navigate('Info')
  }

  handleMapRegionChange = (map) => {
    //console.log(map);
    this.setState({ mapRegion: map });
  }
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }


  async getLocationAsync() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
    this.setState({ locationResult: JSON.stringify(location) });
    this.setState({ location: { latitude: location.coords.latitude, longitude: location.coords.longitude } });

    // Center the map on the location we just fetched.

  }

  render() {
    if (this.state.markers.length != 0) {
      return (
        <View style={styles.container}>

          <MapView
            ref={map => this.map = map}
            initialRegion={this.state.mapRegion}
            style={styles.container}
          >
            {this.state.location != null ? <MapView.Marker key={this.state.markers.length} coordinate={this.state.location} title="Your Location" pinColor='blue' isPreselected={true}></MapView.Marker> : null}


            {this.state.markers.map((marker, index) => {
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate} title = "Reported Crash" pinColor='red'>

                </MapView.Marker>
              );
            })}
          </MapView>

            <View style={{ height: height * 0.07, width: width, alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginTop: height * 0.005 }} onPress={() => this.props.navigation.navigate('Add')}>
                  <Text style={{ fontSize: Math.min(rem * 15, wid * 27), fontFamily: 'play' }}>Add Report</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginTop: height * 0.005 }} onPress={this.call}>
                  <Text style={{ fontSize: Math.min(rem * 15, wid * 27), fontFamily: 'play' }}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>


        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <MapView
            ref={map => this.map = map}
            initialRegion={this.state.mapRegion}
            style={styles.container}
          >
            {this.state.location != null ? <MapView.Marker key={this.state.markers.length} coordinate={this.state.location} title="Your Location" pinColor='blue' isPreselected={true}></MapView.Marker> : null}


            {this.state.markers.map((marker, index) => {
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate} pinColor={this.state.index == index ? 'green' : 'red'}>

                </MapView.Marker>
              );
            })}
          </MapView>


            <View style={[styles.card, { backgroundColor: 'white' }]}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 4 }}>
                  <Text style={{ fontFamily: 'playB', fontSize: Math.min(15 * rem, 27 * wid) }}>No Crashes</Text>
                </View>
              </View>
              <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'playB', fontSize: Math.min(15 * rem, 27 * wid), }}>Sorry, there is no crash data available right now. Please try again later.</Text>
              </View>
              <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}></View>
            </View>

            <View style={{ height: height * 0.07, width: width, alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginTop: height * 0.005 }} onPress={() => this.props.navigation.navigate('Add')}>
                  <Text style={{ fontSize: Math.min(rem * 15, wid * 27), fontFamily: 'play' }}>Add Report</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginTop: height * 0.005 }} onPress={this.call}>
                  <Text style={{ fontSize: Math.min(rem * 15, wid * 27), fontFamily: 'play' }}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>


        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    bottom: height * 0.07,
    paddingVertical: 0,

  },
  endPadding: {
    paddingRight: 0,
  },


  textContent: {
    flex: 1,
  },

  spinnerTextStyle: {
    color: '#FFF',
    top: 60
  },
});