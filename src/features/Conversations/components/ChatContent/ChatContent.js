import React from "react";

const ChatContent = ({ conversation, refDisplay }) => {
  return (
    <>
      <div className="ps-container ps-theme-default ps-active-y fix_scoll">
        {conversation?.conversations?.content?.length > 0 &&
          conversation?.conversations?.content?.map((cov) =>
            cov?.category === "send" ? (
              <>
                <div
                  className="media media-chat media-chat-reverse"
                  key={cov.id}
                  ref={refDisplay}
                >
                  <div className="media-body">
                    <p>{cov.message}</p>
                    <br />
                    {cov.medias.length > 0 &&
                      cov.medias.map((item) => (
                        <img
                          src={item.url}
                          alt="images"
                          className="img-thumbnail"
                        />
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="media media-chat" key={cov.id}>
                  <img
                    className="avatar"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <div className="media-body">
                    <p>ADMIN: {cov.message}</p>
                    {cov.medias.length > 0 &&
                      cov.medias.map((item) => (
                        <img
                          src={item.url}
                          alt="images"
                          className="img-thumbnail"
                        />
                      ))}
                  </div>
                </div>
              </>
            )
          )}
      </div>
    </>
  );
};

export default ChatContent;
