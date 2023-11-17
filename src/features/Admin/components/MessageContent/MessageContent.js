import React from "react";

const MessageContent = ({ messages, refDisplay }) => {
  return (
    <>
      <div
        className="chat-box scrollable position-relative"
        style={{ height: "calc(100vh - 250px)" }}
      >
        <ul className="chat-list list-style-none px-3 pt-3" ref={refDisplay}>
          {messages &&
            messages.map((message) =>
              message.category === "send" ? (
                <>
                  <li
                    className="chat-item odd list-style-none mt-3"
                    key={message.id}
                  >
                    <div className="chat-content text-right d-inline-block pl-3">
                      <div className="box msg p-2 d-inline-block mb-1">
                        You: {message.message}
                      </div>
                      <br />
                      {message.medias.length > 0 &&
                        message.medias.map((item) => (
                          <img
                            src={item.url}
                            alt="images"
                            className="img-thumbnail"
                          />
                        ))}
                    </div>
                  </li>
                </>
              ) : (
                <li className="chat-item list-style-none mt-3" key={message.id}>
                  <div className="chat-img d-inline-block">
                    <img
                      src="https://img.icons8.com/color/36/000000/administrator-male.png"
                      alt="user"
                      className="rounded-circle"
                      width="45"
                    />
                  </div>
                  <div className="chat-content d-inline-block pl-3">
                    <h6 className="font-weight-medium">{message.name}</h6>
                    <div className="msg p-2 d-inline-block mb-1">
                      {message.message}
                    </div>
                  </div>
                  <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">
                    {message.medias.length > 0 &&
                      message.medias.map((item) => (
                        <img
                          src={item.url}
                          alt="images"
                          className="img-thumbnail"
                        />
                      ))}
                  </div>
                </li>
              )
            )}
        </ul>
      </div>
    </>
  );
};

export default MessageContent;
