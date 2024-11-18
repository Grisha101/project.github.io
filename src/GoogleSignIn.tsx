// GoogleSignIn.tsx
import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { auth, provider, signInWithPopup } from './firebaseConfig';

const GoogleSignIn: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      {user ? (
        <div>
          {/* <h3>Привіт, {user.displayName}</h3> */}
          {/* {user.photoURL && <img src={user.photoURL} alt="User Avatar" width="50" />} */}
          {/* <p>Пошта: {user.email}</p> */}
        </div>
      ) : (
        <button onClick={handleGoogleSignIn} style={styles.button}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  } as React.CSSProperties,
  img: {
    borderRadius: '100px',
  } as React.CSSProperties,
};

export default GoogleSignIn;
