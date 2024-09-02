import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Button, Keyboard } from 'react-native';

const CalculatorScreen = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCalculate = () => {
    Keyboard.dismiss();
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers.');
      return;
    }

    let calcResult;
    switch (operation) {
      case 'add':
        calcResult = number1 + number2;
        break;
      case 'subtract':
        calcResult = number1 - number2;
        break;
      case 'multiply':
        calcResult = number1 * number2;
        break;
      default:
        calcResult = 0;
    }

    setResult(calcResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Number 1"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Number 2"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Select Operation</Text>
      </TouchableOpacity>

      <Text style={styles.operationText}>Selected Operation: {operation}</Text>

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result !== null && (
        <Text style={styles.result}>Result: {result}</Text>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Add" onPress={() => { setOperation('add'); setModalVisible(false); }} />
            <Button title="Subtract" onPress={() => { setOperation('subtract'); setModalVisible(false); }} />
            <Button title="Multiply" onPress={() => { setOperation('multiply'); setModalVisible(false); }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    color: 'black',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#28A745',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  operationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default CalculatorScreen;
