import { Outlet } from "react-router-dom";

function ProtectLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectLayout;
