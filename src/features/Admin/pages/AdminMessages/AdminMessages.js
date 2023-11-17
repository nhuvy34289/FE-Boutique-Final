import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthAPI from "../../../../api/authApi";
import MessageApi from "../../../../api/messageApi";
import Loading from "../../../../assets/loading.gif";
import Emoji from "../../../../components/Emoji/Emoji";
import { ID_ADMIN } from "../../../../constants/Sizes";
import { queryFormat, toastError } from "../../../../utils/common";
import { imageUpload } from "../../../../utils/imageUpload";
import {
  getUserMessageAction,
  updateMessagesFromAdmin,
} from "../../adminSlice";
import InputSearch from "../../components/InputSearch/InputSearch";
import MessageContent from "../../components/MessageContent/MessageContent";
import "./style.css";
const AdminMessages = () => {
  const dispatch = useDispatch();
  const { auth, global } = useSelector((state) => state);
  const { messages } = useSelector((state) => state.admin);
  const { currentSocket } = useSelector((state) => state.socket);
  const [media, setMedia] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [load, setLoad] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const refDisplay = useRef();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await AuthAPI.getAllUsers();
        const newUsers = res.users.filter((user) => user._id !== ID_ADMIN);

        const AllUsers = newUsers.map((user) =>
          global?.online?.includes(user._id)
            ? { ...user, online: true }
            : { ...user, online: false }
        );
        setAllUsers(AllUsers);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllUsers();
  }, [global]);

  useEffect(() => {
    if (idUser) {
      const params = {
        id_user1: ID_ADMIN,
        id_user2: idUser,
      };
      const query = queryFormat(params);
      dispatch(getUserMessageAction(query));
    }
  }, [idUser, dispatch]);

  useEffect(() => {
    if (refDisplay.current && messages.content) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 700);
    }
  }, [refDisplay, messages]);

  const handlerSend = async () => {
    if (textMessage === "") return;

    setLoad(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const data = {
      id_user1: ID_ADMIN,
      id_user2: idUser,
      id: Math.random().toString(),
      message: textMessage,
      medias: media.length > 0 ? newArr : [],
      name: auth.user.username,
      category: "send",
    };

    dispatch(updateMessagesFromAdmin(data));

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
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-lg-3 col-xl-2 border-right">
                    <InputSearch />
                    <div
                      className="scrollable position-relative"
                      style={{ height: "calc(100vh - 250px)" }}
                    >
                      <ul className="mailbox list-style-none">
                        <li>
                          <div className="message-center">
                            {allUsers &&
                              allUsers.map((user) => (
                                <span
                                  key={user._id}
                                  onClick={() => setIdUser(user._id)}
                                  className="message-item d-flex align-items-center border-bottom px-3 py-2 active_user"
                                >
                                  <div className="user-img">
                                    <img
                                      src={user.avatar}
                                      alt="user"
                                      className="img-fluid "
                                      width="40px"
                                    />
                                    <span className="profile-status away float-right"></span>
                                  </div>
                                  <div className="w-75 d-inline-block v-middle pl-2">
                                    <h6 className="message-title mb-0 mt-1">
                                      {user.username}
                                    </h6>
                                    <span className="font-12 text-nowrap d-block text-muted text-truncate">
                                      {user?.online ? "Online" : "Offline"}
                                    </span>
                                    <span className="font-12 text-nowrap d-block text-muted">
                                      9:08AM
                                    </span>
                                  </div>
                                </span>
                              ))}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-9  col-xl-10">
                    <MessageContent
                      messages={messages.content}
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

                    <div className="card-body border-top">
                      {idUser && (
                        <div className="row">
                          <div className="col-9">
                            <div className="input-field mt-0 mb-0">
                              <input
                                id="textarea1"
                                placeholder="Type and enter"
                                className="form-control border-0"
                                type="text"
                                value={textMessage}
                                onChange={(e) => setTextMessage(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="publisher-actions float-right">
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
                              <Emoji
                                setContent={setTextMessage}
                                content={textMessage}
                              />
                              {load ? (
                                <img src={Loading} alt="Loading" width="50px" />
                              ) : (
                                <button
                                  onClick={handlerSend}
                                  className="publisher-btn text-info"
                                >
                                  <i className="fa fa-paper-plane"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMessages;
