import { FaMinus, FaSearch, FaPlus } from "react-icons/fa";
import "./chatlist.css";
import { useEffect, useState } from "react";
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "../../../library/useStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "../../../library/firebase";
import { useChatStore } from "../../../library/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(true);
  const [chats, setChats] = useState([]);

  const { user } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(database, "userchats", user?.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(database, "users", item.receiverId);
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
  }, [user.id]);

  async function handleSelect(chat) {
    const userChats = chats?.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(database, "userchats", user?.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
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
          style={{
            backgroundColor: `${chat.isSeen ? "transparent" : "#f1f1f1"}`,
          }}
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
