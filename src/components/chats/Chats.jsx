import "./chats.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { FaImage } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import upload from "../../library/upload";

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
  const [inputImg, setInputImg] = useState({ file: null, url: "" });
  const [chat, setChat] = useState();

  const messageRef = useRef(null);
  const { chatId, aUser, isReceiverBlocked, isCurrentUserBlocked } =
    useChatStore();
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

  //Upload Image
  function handleImg(e) {
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      setInputImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  // function for input for Emoji
  function handleEmojiInput(e) {
    setInput((prev) => prev + e.emoji);
    setOpen(false);
  }

  //Send Messaes
  async function handleSend() {
    if (input === "") return;

    try {
      let imgUrl = null;
      //upload image
      if (inputImg.file) {
        imgUrl = await upload(inputImg.file);
      }

      console.log(imgUrl);

      await updateDoc(doc(database, "chats", chatId), {
        messages: arrayUnion({
          senderId: user.id,
          text: input,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
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

    setInputImg({
      file: null,
      url: "",
    });
    setInput("");
  }
  //Send Random Joke
  async function handleRandomJK() {
    const res = await fetch("https://icanhazdadjoke.com/slack");
    const data = await res.json();
    setInput(data.attachments[0].text);
  }

  return (
    <div className="chat">
      {/* TOP */}
      <div className="top">
        <div className="userInfo">
          <img
            src={aUser?.avatar || "https://avatar.iran.liara.run/public/43"}
            alt=""
          />
          <div className="text">
            <span>{aUser?.username}</span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
      {/* CENTER */}
      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div
            className={
              message.senderId === user?.id ? "message own" : "message"
            }
            key={index}
          >
            {message.img && (
              <img src={message.img} alt="" className="message img" />
            )}
            <div className="text-message">
              <p>{message.text}</p>
              <span>1 hr ago</span>
            </div>
          </div>
        ))}
        {inputImg.url && (
          <div className="message own">
            <img src={inputImg?.url} alt="" />
          </div>
        )}

        <div ref={messageRef}></div>
      </div>

      {/* BOTTOM */}
      <div className="bottom">
        <div className="icons">
          <button className="randomJoke" onClick={handleRandomJK}>
            Random Joke
          </button>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <label htmlFor="file">
            <FaImage size={28} fill="#fff" />
          </label>
        </div>
        <textarea
          value={input}
          type="text"
          placeholder={
            isReceiverBlocked || isCurrentUserBlocked
              ? "YOU ARE BLOCKED"
              : "Type a Joke...."
          }
          onChange={(e) => setInput(e.target.value)}
          disabled={isReceiverBlocked || isCurrentUserBlocked}
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
          <button
            className="sendBtn"
            onClick={handleSend}
            disabled={isReceiverBlocked || isCurrentUserBlocked}
          >
            {isReceiverBlocked || isCurrentUserBlocked ? "BLOCKED" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
