import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefault.css";

function Layout() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    } else {
      navigate("/"); // Điều hướng về trang login nếu chưa đăng nhập
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
    navigate("/"); // Chuyển về trang login
  };

  return (
    <div className="container">
      <header>
        <h1>Quản Lý Cửa Hàng Bách Hóa Xanh</h1>
        <div className="user-info">
          <span>
            Xin chào, <Link to="/home">{userName}</Link>
          </span>
          <button onClick={handleLogout} className="logout-button">
            Đăng Xuất
          </button>
        </div>
      </header>
      <div className="main-container">
        <nav className="sidebar">
          <ul>
            <li>
              <NavLink to="/home">Trang Chủ</NavLink>
            </li>
            <li>
              <NavLink to="/products">Sản Phẩm</NavLink>
            </li>
            <li>
              <NavLink to="/customer">Khách Hàng</NavLink>
            </li>
            <li>
              <NavLink to="/employees">Nhân Viên</NavLink>
            </li>
            <li>
              <NavLink to="/receipt">Lập Phiếu Nhập</NavLink>
            </li>
            <li>
              <NavLink to="/receipts">Danh Sách Phiếu Nhập</NavLink>
            </li>
            <li>
              <NavLink to="/invoice">Lập Hóa Đơn</NavLink>
            </li>
            <li>
              <NavLink to="/invoices">Danh Sách Hóa Đơn</NavLink>
            </li>
          </ul>
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
