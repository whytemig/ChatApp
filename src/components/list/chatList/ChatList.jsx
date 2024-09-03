import { FaMinus, FaSearch, FaPlus } from "react-icons/fa";
import "./chatlist.css";
import { useEffect, useState } from "react";
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "../../../library/useStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "../../../library/firebase";
import { useChatStore } from "../../../library/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(true);
  const [chats, setChats] = useState([]);

  const { user } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  console.log(chatId);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(database, "userchats", user?.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(database, "users", item.recieverId);
          const userDocSnap = await getDoc(userDocRef);

          let user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedat - a.updatedat));
      }
    );

    return () => {
      unSub();
    };
  }, [user?.id]);

  async function handleSelect(chat) {
    changeChat(chat?.chatId, chat.user);
  }

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
      {chats?.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
        >
          <img
            src="https://avatar.iran.liara.run/public/43"
            alt="Avatar Image"
          />
          <div className="text">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {!addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
