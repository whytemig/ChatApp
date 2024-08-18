import "./chats.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

function Chats() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // function for input for Emoji
  function handleEmojiInput(e) {
    setInput((prev) => prev + e.emoji);
    setOpen(false);
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
        <div className="message">
          <img src="https://avatar.iran.liara.run/public/43" alt="" />
          <div className="text-message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad ut
              officia sint neque ducimus omnis.
            </p>
            <span>1 hr ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text-message">
            <img src="https://picsum.photos/id/237/200" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad ut
              officia sint neque ducimus omnis.
            </p>
            <span>1 hr ago</span>
          </div>
        </div>
        <div className="message">
          <img src="https://avatar.iran.liara.run/public/43" alt="" />
          <div className="text-message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad ut
              officia sint neque ducimus omnis.
            </p>
            <span>1 hr ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text-message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad ut
              officia sint neque ducimus omnis.
            </p>
            <span>1 hr ago</span>
          </div>
        </div>
        <div className="message">
          <img src="https://avatar.iran.liara.run/public/43" alt="" />
          <div className="text-message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad ut
              officia sint neque ducimus omnis.
            </p>
            <span>1 hr ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text-message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad ut
              officia sint neque ducimus omnis.
            </p>
            <span>1 hr ago</span>
          </div>
        </div>
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
          <button className="sendBtn">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
