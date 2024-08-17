import "./chats.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function Chats() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // function for input for Emoji
  function handleEmojiInput(e) {
    setInput((prev) => prev + e.emoji);
    setOpen(false);
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="userInfo">
          <img src="https://avatar.iran.liara.run/public/43" alt="" />
          <div className="text">
            <span>UserName</span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
      <div className="center">Center</div>
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
            <EmojiPicker open={open} onEmojiClick={handleEmojiInput} />
          </div>
        </div>
        <button className="sendBtn">Send</button>
      </div>
    </div>
  );
}

export default Chats;
