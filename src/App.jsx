import { useEffect } from "react";
import Chats from "./components/chats/Chats";
import Detail from "./components/details/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notify from "./components/notify/Notify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";

function App() {
  const authUser = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => unSub();
  }, []);

  return (
    <div className="opacity">
      <div className="container">
        {authUser ? (
          <>
            <List />
            <Chats />
            <Detail />
          </>
        ) : (
          <Login />
        )}
        <Notify />
      </div>
    </div>
  );
}

export default App;
