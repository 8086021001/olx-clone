import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId:process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: "G-T024LSDREF",
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader",
    exclude: /node_modules\/@firebase\/auth/
  };
  
 export default firebase.initializeApp(firebaseConfig);