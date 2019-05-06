import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class CalculatorButton extends React.Component {
  constructor(props){
    super(props);
    this.onPress = props.onPress;
  }

  render(){
    return (
      <TouchableOpacity style={styles.button} onPress = {this.onPress}>
        <Text style = {styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default CalculatorButton;
