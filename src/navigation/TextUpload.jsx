import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { db } from '../services/firebase.js'; 
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

const TextUploadScreen = () => {
  const [text, setText] = useState('');
  const [fetchedText, setFetchedText] = useState('');

  const handleSendText = async () => {
    Keyboard.dismiss();
    if (text.trim()) {
      try {
        await addDoc(collection(db, 'texts'), {
          text: text.trim(),
          createdAt: new Date(),
        });
        Alert.alert('Success', 'Text has been sent and saved!');
        setText(''); 
        fetchText();
      } catch (error) {
        console.error('Error saving text: ', error);
        Alert.alert('Error', 'There was an issue saving your text. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Text field cannot be empty.');
    }
  };

  const fetchText = async () => {
    try {
      const q = query(collection(db, 'texts'), orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestText = querySnapshot.docs[0].data().text;
        console.log('Fetched text:', latestText); 
        setFetchedText(latestText);
      } else {
        setFetchedText('No text has been uploaded yet.');
      }
    } catch (error) {
      console.error('Error fetching text: ', error);
      Alert.alert('Error', 'There was an issue fetching the text.');
    }
  };

  useEffect(() => {
    fetchText();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Text</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Write your text here..."
        value={text}
        onChangeText={setText}
        multiline
        cursorColor={"black"}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSendText}>
        <Text style={styles.buttonText}>Send Text</Text>
      </TouchableOpacity>

      <View style={styles.savedTextContainer}>
        <Text style={styles.savedText}>{fetchedText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 150,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    color: 'black'
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  savedTextContainer: {
    marginTop: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  savedText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TextUploadScreen;
