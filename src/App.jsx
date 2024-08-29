import { useEffect } from "react";
import Chats from "./components/chats/Chats";
import Detail from "./components/details/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notify from "./components/notify/Notify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";
import { useUserStore } from "./library/useStore";

function App() {
  const { user, isLoading, fetchUserInfo } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      fetchUserInfo(currentUser.uid);
    });

    return () => unSub();
  }, [fetchUserInfo]);

  console.log(user);

  if (isLoading) return <div className="loading">Loading.......</div>;

  return (
    <div className="opacity">
      <div className="container">
        {user ? (
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
