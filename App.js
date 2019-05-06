import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import math from "mathjs";
import CalculatorButton from './components/CalculatorButton';

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

  generateCalculator(){
    let calculator = []
    let labels = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0", "DEL"]

    for (let i = 0; i < 4; i++) {
      let buttons = [];

      for (let j = 0; j < 3; j++) {
        let label = labels[i * 3 + j];
        if(label == "DEL") buttons.push(<CalculatorButton key = {i * 3 + j} text = "DEL" onPress = {() => {this.deleteChar()}}></CalculatorButton>)
        else buttons.push(<CalculatorButton key = {i * 3 + j} text = {label} onPress = {() => {this.updateDisplay(label)}}></CalculatorButton>)
      }

      calculator.push(<View key = {"row-" + i} style = {styles.row}>{buttons}</View>)
    }

    return calculator
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
            {this.generateCalculator()}
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
    marginTop: StatusBar.currentHeight
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
