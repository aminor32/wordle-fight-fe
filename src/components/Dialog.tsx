import { outcomeAtom } from "@/utils/atom";
import { colorSet } from "@/utils/color";
import { useAtom } from "jotai";

interface DialogProps {
  id: string;
  message: string;
}

const Dialog: React.FC<DialogProps> = ({ id, message }) => {
  return (
    <dialog
      id={id}
      style={{
        position: "absolute",
        padding: "30px",
        border: "none",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0px 0px 30px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <p
        style={{
          margin: "0px 0px 25px 0px",
          fontFamily: "Noto Sans",
          fontWeight: "bold",
          fontSize: "20px",
          letterSpacing: "1px",
        }}
      >
        {message}
      </p>

      <button
        onClick={() => {
          location.reload();
        }}
        style={{
          padding: "15px",
          border: "none",
          borderRadius: "8px",
          background: colorSet.green,
        }}
      >
        <p
          style={{
            margin: "0px",
            fontFamily: "Noto Sans",
            fontWeight: "bold",
            color: colorSet.white,
          }}
        >
          Go to the main page
        </p>
      </button>
    </dialog>
  );
};

export default Dialog;
