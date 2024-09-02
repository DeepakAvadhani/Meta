import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  Alert,
  Clipboard,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebase.js'; 

const PhotoUploadScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(''); 

  const handleUploadPhoto = async () => {
    if (imageUri) {
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

      const storageRef = ref(storage, filename);

      setUploading(true);
      setTransferred(0);

      try {
        const task = uploadBytesResumable(storageRef, uploadUri);

        task.on('state_changed', snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          if (!isNaN(progress) && progress >= 0 && progress <= 100) {
            setTransferred(progress);
          } else {
            setTransferred(0); 
          }
        });

        await task;

        const url = await getDownloadURL(storageRef);
        setDownloadUrl(url); 

        Alert.alert(
          'Upload Successful',
          'Your photo has been uploaded successfully!',
          [{ text: 'OK' }]
        );
      } catch (e) {
        console.error('Upload Error:', e);
        Alert.alert('Upload Error', 'An error occurred while uploading your photo.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSelectFromGallery = () => {
    launchImageLibrary({}, response => {
      if (
        !response.didCancel &&
        !response.error &&
        response.assets.length > 0
      ) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({}, response => {
      if (
        !response.didCancel &&
        !response.error &&
        response.assets.length > 0
      ) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleCopyUrl = () => {
    Clipboard.setString(downloadUrl);
    Alert.alert('URL Copied', 'The image URL has been copied to your clipboard.');
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <View style={styles.imageContainerTop}>
          <Image style={styles.image} source={{ uri: imageUri }} />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSelectFromGallery}>
        <Text style={styles.buttonText}>Select from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>

      {!imageUri && (
        <View style={styles.imageContainer}>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      {uploading && (
        <View style={styles.progressBarContainer}>
          {Platform.OS === 'android' ? (
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={transferred / 100} 
            />
          ) : (
            <ProgressViewIOS progress={transferred / 100} /> 
          )}
          <Text style={styles.progressText}>{transferred}% Completed</Text>
        </View>
      )}

      {downloadUrl && (
        <View style={styles.urlContainer}>
          <Text style={styles.urlText}>{downloadUrl}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyUrl}>
            <Text style={styles.copyButtonText}>Copy URL</Text>
          </TouchableOpacity>
        </View>
      )}
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
  imageContainerTop: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  progressBarContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  urlContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  urlText: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  copyButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PhotoUploadScreen;
