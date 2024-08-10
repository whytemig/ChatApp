import { FaMinus, FaSearch, FaPlus } from "react-icons/fa";
import "./chatlist.css";
import { useState } from "react";

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
        {/* <FaMinus /> */}
      </div>
      {/* Adding My Chats */}
    </div>
  );
};

export default ChatList;
