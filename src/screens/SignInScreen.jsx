import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import { auth } from '../services/firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    Keyboard.dismiss();

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Invalid Password',
        'Password should be at least 6 characters long.',
      );
      return;
    }

    try {
      if (user) {
        await signOut(auth);
      }

      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
      Alert.alert(
        'Sign In Successful',
        'You have successfully signed in!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Main'),
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      console.error('Authentication error:', error.message);
      Alert.alert('Authentication Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('forgotpassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpLink}
        onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signUpLinkText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

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
    backgroundColor: '#007BFF',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 16,
  },
  signUpLink: {
    marginTop: 20,
  },
  signUpLinkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
