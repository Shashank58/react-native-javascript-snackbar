import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet
} from 'react-native';
import {SnackBarTime} from './util';

export default class SnackBar extends Component {

  constructor() {
    super();
    this.state = {
      offsetY: new Animated.Value(800),
      active: false
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  show({ duration, title, action, onAction }) {
    if (this.state.active) return;

    this.setState({title, action, onAction, active: true});
    Animated.timing(
      this.state.offsetY, {
        toValue: 0,
        duration: 300,
      }
    ).start(({finished}) => {
      if (finished && duration !== SnackBarTime.INDEFINITE) {
        setTimeout(() => this.dismiss(), duration);
      }
    });
  }

  dismiss() {
    if (!this.props.onRef) return;

    Animated.timing(
      this.state.offsetY, {
        toValue: 800,
        duration: 300,
      }
    ).start(() => this.setState({active: false}));
  }

  render() {
    let {title, action, onAction} = this.state;
    let actionLayout = null;
    if (action) {
      actionLayout = (
        <TouchableWithoutFeedback onPress={() => {
          this.dismiss();
          onAction();
        }}>
          <View style={styles.actionContainer}>
            <Text style={styles.action}>{action}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <Animated.View style={[styles.snackBar, {transform: [{translateY: this.state.offsetY}]}]}>
        <Text style={[styles.title, {marginBottom: action? 0 : 16}]}>{title}</Text>
        {actionLayout}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  snackBar: {
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
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
    borderTopColor: 'red'
  },
  title: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    color: '#2f363f',
    fontSize: 14,
    lineHeight: 14 * 1.4
  },
  actionContainer: {
    padding: 12,
    marginLeft: 4,
    marginBottom: 4
  },
  action: {
    color: '#1f7ae0',
    fontWeight: 'bold',
    fontSize: 14
  }
});