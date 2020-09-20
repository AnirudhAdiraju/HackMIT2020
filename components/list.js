import React from "react";
import { FlatList, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, View, Image} from "react-native";
import { Text, ListItem, Body} from "native-base";
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';


const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;

export default class App extends React.Component {
  constructor() {
    super();
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false;
    this.state = {
      data: global.data,
      spinner: false
    };
  }




  _renderItem = ({ item }) => {

      var date = moment(parseInt(item.start_time)).format("MMM DD YYYY")
        console.log(date)
      return (

          <ListItem style={{ marginLeft: 0, backgroundColor: 'transparent' }}>
            <Body>
            <Text style={{ flex: 1, fontFamily: 'playB', color: 'white' }}>Date: {date}</Text>
              <Text style={{ flex: 1, fontFamily: 'play', color: 'white' }}>Weather: {item.weather} {item.weather == null ? "No Weather" : ""}</Text>
              <Text style={{ flex: 1, fontFamily: 'play', color: 'white' }}>Crash Severity: {item.severity}</Text>
              <Text style={{ flex: 1, fontFamily: 'play', color: 'white' }}>Narrative: {item.narrative}</Text>
            </Body>
          </ListItem>


      );
    
  };
  static navigationOptions = { headerMode: 'none', gestureEnabled: false, };
  render() {
    //// console.log(global.logs)
    const onPress = () => {
      var markers = [];
      for(var i = 0; i<global.data.length; i++){
          var marker = {
            coordinate:{
            latitude: global.data[i].crash_lat,
            longitude: global.data[i].crash_lng,
            },
            latitudeDelta: 0.02864195044303443,
            longitudeDelta: 0.020142817690068,
            
          }
          markers.push(marker)
      }
      global.markers = markers
      this.props.navigation.navigate('Map')
    }

    const onPress2 = (item) => {
      alert(item.narrative)
    }

    
    // console.log(JSON.stringify(global.logs))

    if (global.data.length == 0) {
      return (

        <View style={styles.container}>

          <View style={{ flex: 1, width: '90%', alignItems: 'center' }}>
              <Image source={require('../assets/crashes.png')} style={{
                height: '75%',
                width: '90%',
                marginTop: '8%',
                flex: 1,
              }} resizeMode="contain"></Image></View>
            <View style={{ width: '100%', flex: 6, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 25 * wid, color: 'white', fontFamily: 'playB' }}>There is no crash data available</Text>
            </View>
            <View style={{
              width: '73%',
              flex: 1,
              justifyContent: 'center'
            }}>
              <TouchableOpacity
                style={{
                  height: entireScreenWidth * 0.73 * 276 / 1096,
                  width: '100%',
                }}
                onPress={onPress}
                disabled={this.state.loading}

              >
                <Image source={require('../assets/location.png')} style={{
                  height: '100%',
                  width: '100%',
                  flex: 1


                }} resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>

        </View>
      );
    }
    else {
      return (

        <View style={styles.container}>
            <Spinner
                visible={this.state.spinner}
                textContent={'Checking for crashes...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ flex: 1, width: '90%', alignItems: 'center' }}>
              <Image source={require('../assets/crashes.png')} style={{
                height: '75%',
                width: '90%',
                marginTop: '8%',
                flex: 1,
              }} resizeMode="contain"></Image></View>


            <View style={{ width: '100%', flex: 6 }}>
              <FlatList style={{ width: '100%' }}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={item => item.id}
                scrollEnabled={!this.state.isSwiping}
              // stickyHeaderIndices={this.state.stickyHeaderIndices}
              />
            </View>
            <View style={{
              width: '73%',
              flex: 1,
              paddingBottom: '2%',
              paddingTop: '2%',
              justifyContent: 'center',
              alignItems: 'center'

            }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: entireScreenHeight / 8 * 0.96,
                }}
                onPress={onPress}
                disabled={this.state.loading}

              >
                <Image source={require('../assets/location.png')} style={{
                  height: '100%',
                  width: '100%',
                  flex: 1


                }} resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>

        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0, top: 0, position: 'absolute',
    backgroundColor:'#D3DFF6'

  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  imagefront: {
    marginTop: '8%',
    height: '25%',
    width: '80%',
    flex: 2,

  },
  spinnerTextStyle: {
    color: '#FFF',
    top: 60
  },

});