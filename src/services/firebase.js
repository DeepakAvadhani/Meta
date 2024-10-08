import {initializeApp} from '@firebase/app';
import {getAuth} from '@firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyB7lKBJiyxqKTKQD2stXvmPH2yVXjBvKIU',
  authDomain: 'reactnativemeta-4b3b1.firebaseapp.com',
  projectId: 'reactnativemeta-4b3b1',
  storageBucket: 'reactnativemeta-4b3b1.appspot.com',
  messagingSenderId: '695775596457',
  appId: '1:695775596457:web:312879093701819fef3eb8',
  measurementId: 'G-T3P36PQBSW',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {app, auth, storage, db};
