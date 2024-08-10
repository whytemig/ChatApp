import Chats from "./components/chats/Chats";
import Detail from "./components/details/Detail";
import List from "./components/list/List";

function App() {
  return (
    <div className="opacity">
      <div className="container">
        <List />
        <Chats />
        <Detail />
      </div>
    </div>
  );
}

export default App;
