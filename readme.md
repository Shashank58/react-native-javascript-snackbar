react-native-snackbar

A cross-platform javascript based snackbar for react-native

Installation

    npm install react-native-snackbar --save

Example usage

import SnackBar,  {SnackBarTime} from "react-native-snackbar";

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
                message={"This is a simple test"}
                action={"COOL"}
                messageStyles={{color: "green"}}
                actionTextStyles={{fontSize: 16}}
                onAction={() => {console.log("Action button clicked")}}
            />
        );
    }