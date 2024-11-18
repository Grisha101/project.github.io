// App.tsx
import React, { useState } from 'react';
import CouplesPlanner from './components/CouplesPlanner';
import GoogleSignIn from './GoogleSignIn';
import { shareFileBetweenUsers } from './main'; // Ensure this is correct

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const user1UID = "user1UID"; // Replace with actual user UID from Google Sign-In
  const user2UID = "user2UID"; // Replace with actual user UID of the other user

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleShareFile = async () => {
    if (file) {
      await shareFileBetweenUsers(user1UID, user2UID, file);
      alert('File shared successfully!');
    } else {
      alert('Please select a file to share.');
    }
  };

  return (
    <div>
      {/* <h1>File Sharing App</h1> */}
      {/* <input type="file" onChange={handleFileChange} /> */}
      {/* <button onClick={handleShareFile}>Share File</button> */}
      <CouplesPlanner />
      <GoogleSignIn />
    </div>
  );
};

export default App;