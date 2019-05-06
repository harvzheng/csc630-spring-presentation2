import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity } from 'react-native';
import math from "mathjs";

class CalculatorButton extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
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

export default class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: ""
    };
  }

  updateDisplay(symbol){
    this.setState(previousState => (
      {
        input: previousState.input + symbol,
        answer: ""
      }
    ))
  }

  deleteChar(){
    this.setState(previousState => (
      {
        input: previousState.input.substring(0, previousState.input.length - 1),
        answer: ""
      }
    ))
  }

  runCalculation(){
    let newAnswer = "";

    try{ newAnswer = math.eval(this.state.input.replace(/÷/g, "/").replace(/×/g, "*"));}
    catch(e){ newAnswer = "ERROR";}
    this.setState(previousState => (
      {
        answer: newAnswer
      }
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex: 1, backgroundColor: "white", justifyContent: "center", padding: 30}}>
          <Text style = {{fontSize: 30, fontWeight: "bold"}}>{this.state.input}</Text>
          <Text style = {{fontSize: 20}}>{this.state.answer}</Text>
        </View>
        <View style = {{flex: 4, backgroundColor: "#2e3131", flexDirection: "row"}}>
          <View style = {{flex: 3}}>
            <View style = {styles.row}>
              <CalculatorButton text = "7" onPress = {() => {this.updateDisplay("7")}}></CalculatorButton>
              <CalculatorButton text = "8" onPress = {() => {this.updateDisplay("8")}}></CalculatorButton>
              <CalculatorButton text = "9" onPress = {() => {this.updateDisplay("9")}}></CalculatorButton>
            </View>
            <View style = {styles.row}>
              <CalculatorButton text = "4" onPress = {() => {this.updateDisplay("4")}}></CalculatorButton>
              <CalculatorButton text = "5" onPress = {() => {this.updateDisplay("5")}}></CalculatorButton>
              <CalculatorButton text = "6" onPress = {() => {this.updateDisplay("6")}}></CalculatorButton>
            </View>
            <View style = {styles.row}>
              <CalculatorButton text = "1" onPress = {() => {this.updateDisplay("1")}}></CalculatorButton>
              <CalculatorButton text = "2" onPress = {() => {this.updateDisplay("2")}}></CalculatorButton>
              <CalculatorButton text = "3" onPress = {() => {this.updateDisplay("3")}}></CalculatorButton>
            </View>
            <View style = {styles.row}>
              <CalculatorButton text = "." onPress = {() => {this.updateDisplay(".")}}></CalculatorButton>
              <CalculatorButton text = "0" onPress = {() => {this.updateDisplay("0")}}></CalculatorButton>
              <CalculatorButton text = "DEL" onPress = {() => {this.deleteChar()}}></CalculatorButton>
            </View>
          </View>
          <View style = {{flex: 1, backgroundColor: "#736598", flexDirection: "column"}}>
            <CalculatorButton text = "÷" onPress = {() => {this.updateDisplay("÷")}}></CalculatorButton>
            <CalculatorButton text = "×" onPress = {() => {this.updateDisplay("×")}}></CalculatorButton>
            <CalculatorButton text = "-" onPress = {() => {this.updateDisplay("-")}}></CalculatorButton>
            <CalculatorButton text = "+" onPress = {() => {this.updateDisplay("+")}}></CalculatorButton>
            <CalculatorButton text = "=" onPress = {() => {this.runCalculation()}}></CalculatorButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
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
