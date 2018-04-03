import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class SnackBar extends Component {

  constructor() {
    super();
    this.state = {
      transform: new Animated.ValueXY({x: 0, y: 800}),
      active: false
    };

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, {dx: this.state.transform.x}
      ]),
      onPanResponderRelease: (e, gesture) => {
        let position = {x: 0, y: 0};
        let shouldDismiss = gesture.moveX > Screen.width / 1.5;
        if (shouldDismiss) {
          position.x = Screen.width + 100;
        }

        Animated.spring(this.state.transform, {
          toValue: position,
          friction: 4
        }).start(() => {
          if (shouldDismiss) this.dismiss();
        });
      }
    });
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  isActive = () => this.state.active;

  componentWillUnmount() {
    this.props.onRef(undefined);
    this.state.transform.removeAllListeners();
  }

  show({ duration }) {
    if (this.state.active) return;

    this.setState({active: true});
    Animated.timing(
      this.state.transform, {
        toValue: {x: 0, y: 0},
        duration: 400,
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
      this.state.transform, {
        toValue: {x: 0, y: 800},
        duration: 300,
      }
    ).start(() => this.setState({active: false}));
  }

  render() {
    let {message, action, onAction, messageStyles, actionTextStyles} = this.props;
    let actionLayout = null;
    if (action) {
      actionLayout = (
        <TouchableWithoutFeedback onPress={() => {
          this.dismiss();
          if (onAction) onAction();
        }}>
          <View style={styles.actionContainer}>
            <Text style={[styles.action, actionTextStyles]}>{action}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[{transform: this.state.transform.getTranslateTransform()}, styles.snackBarContainer]}
      >
        <Text style={[styles.message, messageStyles]}>{message}</Text>
        {actionLayout}
      </Animated.View>
    );
  }
}

SnackBar.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.string,
  onAction: PropTypes.func
};

const styles = StyleSheet.create({
  message: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 14,
    marginBottom: 14,
    color: 'white',
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  actionContainer: {
    justifyContent: 'center'
  },
  action: {
    color: '#1f7ae0',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    marginRight: 24,
  },
  snackBarContainer: {
    flexDirection: 'row',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#323232',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    position: 'absolute',
    shadowRadius: 4,
    shadowOpacity: 0.2,
  }
});

const SnackBarTime = {
  LONG: 4000,
  SHORT: 2000,
  INDEFINITE: -1
};

module.exports = {
  SnackBar,
  SnackBarTime
};;