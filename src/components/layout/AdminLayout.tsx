import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <nav> Admin layout</nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
