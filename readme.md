react-native-javascript-snackbar

A cross-platform javascript based snackbar for react-native

Installation

    npm install react-native-snackbar --save

Example usage

    import {SnackBar, SnackBarTime} from "react-native-javascript-snackbar";

    toggleSnackBar = () => {
      if (this.ele.isActive()) {
        this.ele.dismiss();
      } else {
        this.ele.show({duration: SnackBarTime.LONG});
      }
    };

    render() {
      return (
        <SnackBar
          onRef={ele => this.ele = ele}
          message="This is a simple test"
          action="COOL"
          messageStyles={{color: "green"}}
          actionTextStyles={{fontSize: 16}}
          onAction={() => {console.log("Action button clicked")}}
        />
      );
    }

Make sure you keep snackbar in the bottom of your parent view container

Available props

    message: Message to be displayed in snackbar
    action: Action text, if needed
    messageStyles: Styling for message text
    actionTextStyles: Styling for action text
    onAction: Function that is called when action is clicked

Methods

    show({duration: Number}): Duration options are SnackBarTime.LONG, SnackBarTime.SHORT, SnackBarTime.INDEFINITE
                              (You need to call dismiss() on your own if INDEFINITE)

    dismiss(): For dismissing the snackbar