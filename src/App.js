import "./App.css";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "./Firebase/Firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const githubProvicer = new GithubAuthProvider();

  //--------------------------Github Sign In--------------------------

  const hendelGithubSignin = () => {
    signInWithPopup(auth, githubProvicer)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => [console.log(error.message)]);
  };

  // ----------------------------------Google Sign In----------------------------------
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="signInOpction">
        {user.uid ? (
          <button className="signInBtn" onClick={() => handleSignOut()}>
            Sign-out
          </button>
        ) : (
          <>
            <button className="signInBtn" onClick={() => handleGoogleSignIn()}>
              Signin By Google
            </button>
            <button className="signInBtn" onClick={() => hendelGithubSignin()}>
              Signin By Github
            </button>
          </>
        )}
      </div>

      {user.uid && (
        <div className="userDetails">
          <h1>User Details</h1>
          <h3>Name: {user.displayName}</h3>
          <h3>Email: {user.email}</h3>
          <img src={user.photoURL} alt={user.displayName} />
        </div>
      )}
    </div>
  );
}

export default App;
