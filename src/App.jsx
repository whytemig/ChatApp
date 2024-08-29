import Chats from "./components/chats/Chats";
import Detail from "./components/details/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notify from "./components/notify/Notify";

function App() {
  const authUser = true;
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
