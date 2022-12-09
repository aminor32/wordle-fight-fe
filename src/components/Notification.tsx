import { colorSet } from "@/utils/color";

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "30px",
        zIndex: 5,
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "5px",
          borderRadius: "4px",
          background: "rgba(0, 0, 0, 0.75)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontFamily: "Noto Sans",
            fontWeight: "normal",
            color: colorSet.white,
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default Notification;
