import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import Notification from "@/components/Notification";
import { notificationAtom } from "@/utils/atom";

const Layout: React.FC = () => {
  const [notification] = useAtom(notificationAtom);

  return (
    <>
      {notification ? <Notification message={notification} /> : null}
      <Outlet />
    </>
  );
};

export default Layout;
