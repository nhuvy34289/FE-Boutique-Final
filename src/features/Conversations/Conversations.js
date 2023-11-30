import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageApi from "../../api/messageApi";
import Loading from "../../assets/loading.gif";
import { ID_ADMIN } from "../../constants/Sizes";
import { queryFormat, toastError } from "../../utils/common";
import { imageUpload } from "../../utils/imageUpload";
import ChatContent from "./components/ChatContent/ChatContent";
import ChatIcon from "./components/ChatIcon/ChatIcon";
import {
  getConversations,
  updateConversationsFromUser,
} from "./conversationSlice";
import "./style.css";
const Conversations = () => {
  const [activeChat, setActiveChat] = useState(false);
  const { auth, conversation } = useSelector((state) => state);
  const { currentSocket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [textMessage, setTextMessage] = useState("");
  const [media, setMedia] = useState([]);
  const [load, setLoad] = useState(false);

  const refDisplay = useRef();

  const onChat = () => {
    setActiveChat(!activeChat);
  };

  useEffect(() => {
    if (auth.accessToken) {
      const query = queryFormat({
        id_user1: auth.user._id,
        id_user2: ID_ADMIN,
      });

      dispatch(getConversations(query));

      if (refDisplay.current) {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (refDisplay.current && activeChat && conversation) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 1000);
    }
  }, [refDisplay, activeChat, conversation]);

  const handlerSend = async (e) => {
    e.preventDefault();

    if (textMessage === "") return;

    setLoad(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const data = {
      id_user1: auth.user._id,
      id_user2: ID_ADMIN,
      id: Math.random().toString(),
      message: textMessage,
      medias: media.length > 0 ? newArr : [],
      name: auth.user.username,
      category: "send",
    };

    dispatch(updateConversationsFromUser(data));

    currentSocket.emit("send_message", data);

    await MessageApi.postMessage(data);

    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    setLoad(false);
    setTextMessage("");
    setMedia([]);
  };

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newMedia.push(file);
    });

    if (err) return toastError(err);
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  return (
    <>
      {auth?.user?.isAdmin === false && (
        <div className="wrapper_chat">
          <ChatIcon onChat={onChat} />
          {activeChat && (
            <div className="active_chat animate__animated animate__jackInTheBox">
              <div style={{ width: "100%" }}>
                <div className="card card-bordered fix_boderChat">
                  <div className="card-header">
                    <h4 className="card-title">
                      <strong>Customer Support</strong>
                    </h4>{" "}
                    <span
                      style={{ color: "blue !important" }}
                      className="btn btn-xs conversation-title"
                    >
                      Let's Chat App
                    </span>
                  </div>

                  <ChatContent
                    conversation={conversation}
                    refDisplay={refDisplay}
                  />

                  <div
                    className="show_media"
                    style={{ display: media.length > 0 ? "grid" : "none" }}
                  >
                    {media.map((item, index) => (
                      <div id="file_media" key={index}>
                        <img
                          src={URL.createObjectURL(item)}
                          alt="img"
                          className="img-thumnail"
                        />
                        <span onClick={() => handleDeleteMedia(index)}>
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>

                  <form
                    className="publisher bt-1 border-light publisher-form"
                    onSubmit={handlerSend}
                  >
                    <img
                      className="avatar avatar-xs publisher-avatar"
                      src="https://img.icons8.com/color/36/000000/administrator-male.png"
                      alt="..."
                    />
                    <input
                      type="text"
                      className="publisher-input"
                      placeholder="Enter Message!"
                      onChange={(e) => setTextMessage(e.target.value)}
                      value={textMessage}
                    />
                    <div className="publisher-actions">
                      <span className="publisher-btn file_upload">
                        <i className="fa fa-paperclip file-browser"></i>
                        <input
                          type="file"
                          name="file"
                          id="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleChangeMedia}
                          disabled={load ? true : false}
                        />
                      </span>
                      {load ? (
                        <img src={Loading} alt="Loading" width="50px" />
                      ) : (
                        <button
                          type="submit"
                          className="publisher-btn text-info"
                          data-abc="true"
                        >
                          <i className="fa fa-paper-plane"></i>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Conversations;
