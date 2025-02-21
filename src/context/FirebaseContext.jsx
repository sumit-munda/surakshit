import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp, firebaseAuth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// * create context
const FirebaseContext = createContext(null);

// * use context (hook to access the state of the context)
const useFirebase = () => useContext(FirebaseContext);

const googleProvider = new GoogleAuthProvider();

// * context provider
const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log("User", user);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const isLoggedIn = user ? true : false;
  
  const logoutUser = () => {
    return signOut(firebaseAuth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
        logoutUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { useFirebase, FirebaseProvider };
