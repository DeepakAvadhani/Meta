import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { storage } from '../services/firebase';
const PhotoUploadScreen = () => {
  const handleUploadPhoto = () => {
    // Handle photo upload logic here
  };

  const handleSelectFromGallery = () => {
    // Handle selecting photo from gallery logic here
  };

  const handleTakePhoto = () => {
    // Handle taking photo with camera logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSelectFromGallery}>
        <Text style={styles.buttonText}>Select from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {/* Replace with uploaded photo */}
        <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/150' }} />
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
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
});

export default PhotoUploadScreen;
