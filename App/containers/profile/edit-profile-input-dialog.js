import React from 'react';
import {View, Text, TextInput, StyleSheet, Animated, Dimensions} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get("window");

var styles = StyleSheet.create({
  container: {
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:"transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default class extends React.Component {
  constructor(props){
    super (props);

    this.state = {
      offset: new Animated.Value(-deviceHeight)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -deviceHeight
    }).start(Actions.pop);
  }

  render() {
    const {
      isMultiline,
      placeholder,
      saveAction,
    } = this.props;

    return (
      <Animated.View style={[styles.container, {backgroundColor:"rgba(52,52,52,0.5)"},
        {transform: [{translateY: this.state.offset}]}]}>
        <View style={{
          width: deviceWidth * 0.75,
          height: deviceHeight * 0.3,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"white" }}>
          <TextInput
            multiline={isMultiline}
            returnKeyType={'next'}
            style={[{height: 90,
              borderColor: 'gray',
              borderTopWidth: 1,fontSize:14,padding:10,justifyContent:'center'},
              ]}
            placeholder={placeholder}
            ref="textInput"
            onSubmitEditing={saveAction}
            blurOnSubmit={true}/>
          <Button onPress={this.closeModal.bind(this)}>
            Cancel
          </Button>
        </View>
      </Animated.View>
    );
  }
}