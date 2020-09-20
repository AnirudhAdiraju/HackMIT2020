import * as React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TextInput, Image, ImageBackground, TouchableOpacity, Dimensions, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Login extends React.Component {
  state = {
    name: '',
    company: '',
    companynumber: '',
    loading: false,
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

    const onPress = () => {
      this.setState({ loading: true });
      var name = this.state.name;
      var ins = this.state.company;
      var phone = this.state.companynumber;
      if (name != "" && ins != "" && phone!=""){
        var cmtdata_ori = [{"crash_lng": -70.541129,
        "crash_lat": 41.78223,
        "severity": 15.97,
        "start_time": 1596216241996.0,
        "weather": "Sunny, with some clouds",
        "narrative": "The driver was stationary at  sample street at 17:24:01 on 2020/07/31. At 17:24:02 a collision occurred on the rear side of the vehicle while the vehicle was traveling at 12.0 km/h. The collision event ended at 17:24:04 when the vehicle reached a speed of 23 km/h. The driver did not continue on their trip after the crash event."},
        {"crash_lng": -70.541129,
        "crash_lat": 41.78223,
        "severity": 72.34,
        "start_time": 1596216241996.0,
        "weather": "Heavy Rain",
        "narrative": "The driver was driving at john street at 17:24:01 on 2020/07/31. Driver sped through a red light and got into a collision"},
        {"crash_lng": 87.9597,
        "crash_lat": 42.2452,
        "severity": 80,
        "start_time": 1596216241996.0,
        "weather": "Snowstorm",
        "narrative": "Driver was looking at phone and caused a multi car crash."},
        {"crash_lng": 104.1954,
        "crash_lat": 35.8617,
        "severity": 12.34,
        "start_time": 1596216241996.0,
        "weather": null,
        "narrative": "SAMPLE DATA"}];

        
        const Http = new XMLHttpRequest();
        const url = 'https://script.google.com/macros/s/AKfycbyfXaLXhc6QTnOmKjKY1A7Ly8iw4_1DKrYsT9SYzvZxJILh5-KO/exec';
        var data = "?action=yaya";
        Http.open("GET", String(url + data));
        Http.send();
        var ok;
        Http.onreadystatechange = (e) => {
            ok = Http.responseText;
            if (Http.readyState == 4) {
            console.log(String(ok));

            if (ok.length != 0) {


                var data = JSON.parse(String(ok))



                console.log("poo")



                

                // console.log(JSON.stringify(data))
                AsyncStorage.setItem('name', name);
                AsyncStorage.setItem('compname', ins);
                AsyncStorage.setItem('phonenum', phone);            
                global.phone = phone;

                global.cmtdata = cmtdata_ori
                for(var x = 0; x<data.length; x++){
                    cmtdata_ori.push(data[x])
                }

                console.log(cmtdata_ori)
                global.data = cmtdata_ori
                global.options = "poo,pee"
                this.setState({ loading: false }); 
                this.props.navigation.replace('List')
            }
            else {

                setTimeout(() => { alert("Server Error"); }, 100);
            }

            }
        }

        }
    else{
        alert("Please fill all fields")
        this.setState({ loading: false });
    }
  }
    return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>

          <View style={styles.container}>
            <Spinner
              visible={this.state.loading}
              textContent={'Updating data...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={{ flex: 0.35 }}></View>
            <View style={{ flex: 2.5, width: '100%', alignItems: 'center', padding: 0, }}><Image source={require('../assets/car.png')} style={styles.imagefront} resizeMode="contain"></Image></View>
            <View style={{ flex: 2.5, width: '100%', alignItems: 'center', padding: 0, }}><Image source={require('../assets/welcome.png')} style={styles.imageback} resizeMode="contain"></Image></View>
            <View style={{
              flex: 4, width: '90%', alignItems: 'flex-end'
            }}>
              <View style={{ width: '100%', height: '80%', alignItems: 'flex-end' }}>
                <View style={{
                  width: '100%',
                  flex: 50,
                  borderColor: '#FFF',
                  borderWidth: 2,
                  borderRadius: 20,
                }}>
                  <TextInput
                    style={{ fontSize: 12 * rem, width: '95%', height: '100%', marginLeft: '5%', fontFamily: 'play' }}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    placeholder="Name"
                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    onChangeText={(value) => this.setState({ name: value })}
                    value={this.state.name}

                  />
                  </View>
                <View style={{ width: '100%', flex: 10 }}></View>
                <View style={{
                  width: '100%',
                  flex: 50,
                  borderColor: '#FFF',
                  borderWidth: 2,
                  borderRadius: 20
                }}>
                  <TextInput
                    style={{ fontSize: 12 * rem, width: '95%', height: '100%', marginLeft: '5%', fontFamily: 'play' }}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    placeholder="Insurance Company"
                    onChangeText={(value) => this.setState({ company: value })}
                    value={this.state.company}


                  />
                </View>
                <View style={{ width: '100%', flex: 10 }}></View>
                <View style={{
                  width: '100%',
                  flex: 50,
                  borderColor: '#FFF',
                  borderWidth: 2,
                  borderRadius: 20
                }}>
                  <TextInput
                    style={{ fontSize: 12 * rem, width: '95%', height: '100%', marginLeft: '5%', fontFamily: 'play' }}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    placeholder="Company Number"
                    onChangeText={(value) => this.setState({ companynumber: value })}
                    value={this.state.companynumber}


                  />
                </View>
              </View>

            </View>
            <View style={{
              width: '73%',
              flex: 1.75,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <View style={{ flex: 1, marginTop: '0%', width: '100%', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    shadowColor: 'rgba(0,0,0, .4)', // IOS
                    shadowOffset: { height: 2, width: 2 }, // IOS
                    shadowOpacity: 1, // IOS
                    shadowRadius: 2, //IOS
                    backgroundColor: '#fff',
                    elevation: 2, // Android
                    height: '45%',
                    width: '70%',
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => onPress()}
                  disabled={this.state.loading}

                >
                  <Text style={{ color: '#D3DFF6', fontFamily: 'playB', fontSize: Math.min(25 * rem, 45 * wid) }}>Submit</Text>
                </TouchableOpacity>

              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#D3DFF6'
   // left: 0, top: 0, position: 'absolute'

  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  imagefront: {
    marginTop: '12%',
    paddingTop: '5%',
    height: '25%',
    width: '80%',
    flex: 3,

  },
  imagefront: {
    marginTop: '12%',
    paddingTop: '5%',
    height: '25%',
    width: '80%',
    flex: 3,

  },
  spinnerTextStyle: {
    color: '#FFF',
    top: 60
  },

});