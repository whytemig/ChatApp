import "./chats.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { database } from "../../library/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/useStore";

function Chats() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState();

  const messageRef = useRef(null);
  const { chatId, aUser } = useChatStore();
  const { user } = useUserStore();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(database, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => unSub();
  }, [chatId]);

  // function for input for Emoji
  function handleEmojiInput(e) {
    setInput((prev) => prev + e.emoji);
    setOpen(false);
  }

  //Send Messaes
  async function handleSend() {
    if (input === "") return;

    try {
      await updateDoc(doc(database, "chats", chatId), {
        messages: arrayUnion({
          senderId: user.id,
          text: input,
          createdAt: new Date(),
        }),
      });

      const userIds = [user.id, aUser.id];

      userIds.forEach(async (id) => {
        const userChatRefs = doc(database, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRefs);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = input;
          userChatData.chats[chatIndex].isSeen = id === user.id ? true : false;
          userChatData.chats[chatIndex].updatedat = Date.now();

          await updateDoc(userChatRefs, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chat">
      {/* TOP */}
      <div className="top">
        <div className="userInfo">
          <img src="https://avatar.iran.liara.run/public/43" alt="" />
          <div className="text">
            <span>UserName</span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
      {/* CENTER */}
      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div className="message own" key={index}>
            {message.img && <img src={message.img} alt="" />}
            <div className="text-message">
              <p>{message.text}</p>
              <span>1 hr ago</span>
            </div>
          </div>
        ))}

        <div ref={messageRef}></div>
      </div>

      {/* BOTTOM */}
      <div className="bottom">
        <div className="icons">
          <button className="randomJoke">Random Joke</button>
        </div>
        <input
          value={input}
          type="text"
          placeholder="Type a Joke...."
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="emoji">
          <BsEmojiSmile
            size={20}
            cursor={"pointer"}
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker
              open={open}
              onEmojiClick={handleEmojiInput}
              height={400}
              width={300}
              theme="auto"
            />
          </div>
        </div>
        <div>
          <button className="sendBtn" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
