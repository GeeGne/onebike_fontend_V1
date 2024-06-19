import React, {useState, useRef, useEffect} from 'react';
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword} from "firebase/auth";

function Account () {
  const [user, setUser] = useState(null);
//   updateProfile(auth.currentUser, {
//     displayName: 'Geegne Bab'
//   })
  console.log(auth.currentUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await auth.currentUser;
        if (!user) throw new Error('Error: unable to fetch user data')
        setUser(user);
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  console.log(user);
  return (
    <div>
      welcome {user.displayName}
    </div>
  )
}

export default Account;