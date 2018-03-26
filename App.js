/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native';


export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY({x: 0, y: -200}),
    };
    // Add a listener for the delta value change
    this._val = {x: 0, y: 0};
    this.state.pan.addListener((value) => this._val = value);

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x}
      ]),
      // adjusting delta value
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 2
        }).start();
      }
    });
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.circle]}
      />
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