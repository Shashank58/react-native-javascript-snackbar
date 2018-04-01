/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';
import SnackBar from "./app/SnackBar";
import {SnackBarTime} from "./app/util";


export default class App extends Component<Props> {

  toggleSnackBar = () => {
    if (this.ele.isActive()) {
      this.ele.dismiss();
    } else {
      this.ele.show({duration: SnackBarTime.INDEFINITE});
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Button title={"Click"} style={{bottom: 0}} onPress={this.toggleSnackBar}/>
        <SnackBar onRef={ele => this.ele = ele}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    position: 'absolute',
    shadowRadius: 4,
    shadowOpacity: 0.2,
    borderTopWidth: 2,
    borderTopColor: 'red',
    height: 100
  }
});