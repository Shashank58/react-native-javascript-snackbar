/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, Button} from 'react-native';
import SnackBar from "./app/SnackBar";
import {SnackBarTime} from "./app/util";


export default class App extends Component<Props> {

  toggleSnackBar = () => {
    if (this.ele.isActive()) {
      this.ele.dismiss();
    } else {
      this.ele.show({duration: SnackBarTime.LONG});
    }
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 72}}>
        <Button title={"Click"} onPress={this.toggleSnackBar}/>
        <SnackBar
          onRef={ele => this.ele = ele}
          message={"This is a simple test"}
          action={"COOL"}
        />
      </View>
    );
  }
}
