import * as React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, Image, ImageBackground, TouchableOpacity, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Login extends React.Component {

  state = {
    date: moment().format("MM-DD-YYYY"),
    weather: "",
    severity: '',
    loading: false,
    size: 50,
    narrative: '',
    latitude: '',
    longitude: ''
  };

  constructor() {
    super();
    Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false;

  }
  static navigationOptions = { headerMode: 'none', gestureEnabled: false };
  render() {


    const entireScreenHeight = Dimensions.get('window').height;
    const rem = entireScreenHeight / 380;
    const entireScreenWidth = Dimensions.get('window').width;
    const wid = entireScreenWidth / 380;
    var ree;
    // console.log(global.uname);
    // console.log(global.minutes);

    if (entireScreenWidth >= entireScreenHeight * 3 / 4 * 1360 / 2360 * 0.9) {
      ree = rem;
    }
    else {
      ree = 1.75 * wid;
    }

    const onPress = () => {
      var weather = String(this.state.weather);
      var date = moment(String(this.state.date), 'MM-DD-YYYY')
      var dateobj = date.format('x')


      var severity = String(this.state.severity);
      var narrative = String(this.state.narrative);
      var lat = String(this.state.latitude)
      var lng = String(this.state.longitude)
      console.log(dateobj)

      if (weather != '' && severity != '' && lat != 'Select an event...' && !isNaN(severity)) {

        if (severity == '0') {
          alert("Can't log 0 severity")
        }
        else {




          this.setState({ loading: true });
          const Http = new XMLHttpRequest();
          const url = 'https://script.google.com/macros/s/AKfycbyfXaLXhc6QTnOmKjKY1A7Ly8iw4_1DKrYsT9SYzvZxJILh5-KO/exec';
          var data = "?time=" + date + "&lat=" + lat + "&lng=" + lng + "&sev=" + severity + "&nar=" + narrative + "&weather=" + weather + "&action=add";
          console.log(url+data);
          Http.open("GET", String(url + data));
          Http.send();
          var ok;
          Http.onreadystatechange = (e) => {
            ok = Http.responseText;
            if (Http.readyState == 4) {
              if (ok.substring(0,4) == "true") {
                
                console.log(ok.substring(4,ok.length))
                ok = ok.substring(4,ok.length)
                global.data = global.cmtdata.concat(JSON.parse(ok))
                
                /*var markers = [];
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
                global.markers = markers*/
                setTimeout(() => { alert("Success!"); this.props.navigation.replace('List'); }, 100);


              }
              else {
                console.log(ok);
                this.setState({ loading: false });
                setTimeout(() => { alert("Server error"); }, 100);

              }

            }
          }
        }
      }
      else {
        alert("Please fill all fields");
      }
    }
    const onPress2 = () => {
      this.props.navigation.navigate('Map')
    }
    const pickerStyle = {
      inputIOS: {
        color: 'black',
        alignSelf: 'center',
        fontSize: Math.min(this.state.size, rem * 15),
        height: '100%',
        width: '100%',
        textAlign: 'center'
      },
      inputAndroid: {
        color: 'black',
        alignSelf: 'center',
        fontSize: Math.min(this.state.size, rem * 15),
        height: '100%',
        width: '95%',
        textAlign: 'center'

      },
      placeholder: {
        color: 'white',
        fontSize: Math.min(32 * wid, rem * 15),
      },

    };
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <View style={styles.container}>
              
            <Spinner
              visible={this.state.loading}
              textContent={'Adding Report...'}
              textStyle={styles.spinnerTextStyle}
            />
            


                <View style={{ width: '100%', height: '75%', alignItems: 'center', marginTop: "15%" }}>
                  <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'play', color: '#3C5984', fontSize: rem * 15 }}>Weather</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 1,
                    borderColor: '#3C5984',
                    borderWidth: 2,
                    borderRadius: 15
                  }}>
                    <TextInput
                    style={{ fontSize: Math.min(32 * wid, rem * 15), width: '100%', height: '100%' }}
                    textAlign={'center'}
                    onChangeText={(value) => this.setState({ weather: value })}
                    value={this.state.weather}


                  />
                  </View>

                  <View style={{ width: '100%', flex: 0.1 }}></View>
                  <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'play', color: '#3C5984', fontSize: rem * 15 }}>Date</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 1,
                    borderColor: '#3C5984',
                    borderWidth: 2,
                    borderRadius: 15,
                    justifyContent: 'center'
                  }}>
                    <DatePicker
                      style={{ height: '100%', width: '100%', justifyContent: 'center' }}
                      date={this.state.date}
                      mode="date"
                      maxDate={moment().format("MM-DD-YYYY")}

                      format="MM-DD-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"

                      showIcon={false}
                      customStyles={{

                        dateInput: { borderWidth: 0 },
                        dateText: {
                          fontSize: Math.min(32 * wid, rem * 15),
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => { this.setState({ date: date }) }}
                    /></View>
                  <View style={{ width: '100%', flex: 0.1 }}></View>
                  <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'play', color: '#3C5984', fontSize: rem * 15 }}>Severity</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 1,
                    borderColor: '#3C5984',
                    borderWidth: 2,
                    borderRadius: 15
                  }}>
                    <TextInput
                      style={{ fontSize: Math.min(32 * wid, rem * 15), width: '100%', height: '100%' }}
                      textAlign={'center'}
                      onChangeText={(value) => this.setState({ severity: value })}
                      keyboardType='number-pad'
                      value={this.state.severity}
                      maxLength={3}

                    /></View>
                  <View style={{ width: '100%', flex: 0.1 }}></View>
                  <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'play', color: '#3C5984', fontSize: rem * 15 }}>Latitude</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 1,
                    borderColor: '#3C5984',
                    borderWidth: 2,
                    borderRadius: 15,
                    justifyContent: 'flex-start'
                  }}>
                    <TextInput
                      style={{ fontSize: Math.min(32 * wid, rem * 15), width: '100%', height: '100%' }}
                      textAlign={'center'}
                      maxLength={150}
                      onChangeText={(value) => { this.setState({ latitude: value }) }}
                      value={this.state.latitude}
                      multiline={true}
                    /></View>
                                <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'play', color: '#3C5984', fontSize: rem * 15 }}>Longitude</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 1,
                    borderColor: '#3C5984',
                    borderWidth: 2,
                    borderRadius: 15,
                    justifyContent: 'flex-start'
                  }}>
                    <TextInput
                      style={{ fontSize: Math.min(32 * wid, rem * 15), width: '100%', height: '100%' }}
                      textAlign={'center'}
                      maxLength={150}
                      onChangeText={(value) => { this.setState({ longitude: value }) }}
                      value={this.state.longitude}
                      multiline={true}
                    /></View>
                                      <View style={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'play', color: '#3C5984', fontSize: rem * 15 }}>Narrative</Text>
                  </View>
                  <View style={{
                    width: '90%',
                    flex: 2,
                    borderColor: '#3C5984',
                    borderWidth: 2,
                    borderRadius: 15,
                    justifyContent: 'flex-start'
                  }}>
                    <TextInput
                      style={{ fontSize: Math.min(32 * wid, rem * 15), width: '100%', height: '100%' }}
                      textAlign={'center'}
                      maxLength={150}
                      onChangeText={(value) => { this.setState({ narrative: value }) }}
                      value={this.state.narrative}
                      multiline={true}
                    /></View>

              </View>
              <View style={{
                width: '95%',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row'
              }}>
                <TouchableOpacity
                  style={{
                    height: entireScreenWidth * 0.73 * 276 / 1096,
                    width: '100%', flex: 1
                  }}
                  onPress={onPress2}
                  disabled={this.state.loading}


                >
                  <Image source={require('../assets/cancelbut.png')} style={{
                    height: '100%',
                    width: '100%',
                    flex: 1


                  }} resizeMode="contain"></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: entireScreenWidth * 0.73 * 276 / 1096,
                    width: '100%', flex: 1
                  }}
                  onPress={onPress}
                  disabled={this.state.loading}

                >
                  <Image source={require('../assets/savebut.png')} style={{
                    height: '100%',
                    width: '100%',
                    flex: 1


                  }} resizeMode="contain"></Image>
                </TouchableOpacity>
                </View>
                </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3DFF6'

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