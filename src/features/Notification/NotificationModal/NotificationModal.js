import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { queryFormat } from "../../../utils/common";
import {
  isReadNotifiesAction,
  removeAllNotifiesAction,
  updateIsReadNotifies,
} from "../notificationSlice";

const NotificationModal = ({ auth, notifications }) => {
  console.log("🚀 ~ file: NotificationModal.js:13 ~ NotificationModal ~ auth", auth)
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    const newMsg = {
      ...msg,
      isRead: true,
    };
    const indexMsg = notifications.findIndex((noti) => noti._id === newMsg._id);
    const query = queryFormat({ id: msg._id });

    dispatch(updateIsReadNotifies({ indexMsg, newMsg }));
    dispatch(isReadNotifiesAction(query));
  };

  const handleDeleteAll = () => {
    const query = queryFormat({ idUser: auth.user._id });
    dispatch(removeAllNotifiesAction(query));
  };
  return (
    <>
      <div style={{ minWidth: "300px" }}>
        {notifications.length === 0 ? (
          <div className="d-flex justify-content-between align-items-center px-3">
            <h5>No Notification</h5>
          </div>
        ) : (
          <>
            {" "}
            <div className="d-flex justify-content-between align-items-center px-3">
              <h3>Notification</h3>
            </div>
            <hr className="mt-0" />
            <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
              {notifications.length > 0 &&
                notifications.map((msg, index) => (
                  <div key={index} className="px-2 mb-3 border-bottom">
                    <Link
                      to={`${msg.url}`}
                      className="d-flex text-dark align-items-center"
                      onClick={() => handleIsRead(msg)}
                    >
                      <div className="mx-1 flex-fill">
                        <div>
                          <strong className="mr-1">
                            {msg?.user?.username}:{" "}
                          </strong>
                          <span>{msg.text}</span>
                        </div>
                        {msg.content && (
                          <p>
                            <strong>content</strong>: {msg.content.slice(0, 20)}
                            ...
                          </p>
                        )}
                      </div>
                    </Link>
                    <small className="text-muted d-flex justify-content-between px-2">
                      {moment(msg.createdAt).fromNow()}
                      {msg.isRead === true ? (
                        <i className="fas fa-circle text-primary" />
                      ) : (
                        <i className="fas fa-circle text-success" />
                      )}
                    </small>
                  </div>
                ))}
            </div>
            {/* <div
              className="text-right text-danger mr-2"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAll}
            >
              Delete All
            </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default NotificationModal;
