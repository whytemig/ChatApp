import { FaMinus, FaSearch, FaPlus } from "react-icons/fa";
import "./chatlist.css";
import { useState } from "react";
import AddUser from "../../addUser/AddUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(true);
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <FaSearch size={20} />
          <input type="text" placeholder="Look up friends" />
        </div>
        <div className="plus" onClick={() => setAddMode((prev) => !prev)}>
          {addMode ? (
            <FaPlus size={20} color="#fff" />
          ) : (
            <FaMinus size={20} color="#fff" />
          )}
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      <div className="item">
        <img src="https://avatar.iran.liara.run/public/43" alt="Avatar Image" />
        <div className="text">
          <span>John Doe</span>
          <p>Hello Chat App!</p>
        </div>
      </div>
      {!addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
