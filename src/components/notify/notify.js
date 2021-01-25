const Notify = ({ message }) => {
  return (
    <div className="notifications-component">
      <div className="notification-container--top-right">
        <div className="notification">
          <div className="notification__item notification__item--default">
            <div className="notification__content">
              <div className="notification__message">{message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notify;
