import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../Firebase'
import axios from "axios"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const saveUser = (user) => {
    if (user && user.accessToken) {
      const headers = {
        'Authorization': `Bearer ${user.accessToken}`,
      };

      axios.post(`http://localhost:8080/user/upsertUser`, {}, { headers: headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(`Error upserting user: ${error}`);
        })
    }
  }


  /*
   const headers = {
            'Authorization': `Bearer ${props.user.accessToken}`,
        };

        axios.post('http://localhost:8080/review/submitReview', reviewData, { headers: headers })
            .then((response) => {
                setHasReview(true);
                setCanEdit(false);
                console.log('Review saved!');
            })
            .catch((error) => {
                console.error('Error saving: ', error);
            })
  */

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider)
  };

  const logOut = () => {
      signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      saveUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};