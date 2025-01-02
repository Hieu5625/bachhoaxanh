import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [userInfo, setUserInfo] = useState(null); // Thông tin người dùng
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser)); // Parse thông tin từ localStorage
    } else {
      navigate("/"); // Nếu chưa đăng nhập, chuyển về trang login
    }
  }, [navigate]);

  if (!userInfo) {
    return null; // Nếu không có thông tin người dùng, không render gì
  }

  return (
    <div className="user-home">
      <h2>Xin chào, {userInfo.name}!</h2>
      <p>Chào mừng bạn đến với hệ thống quản lý cửa hàng.</p>

      <h3>Thông tin cá nhân</h3>
      <ul>
        <li>
          <strong>Mã nhân viên:</strong> {userInfo.id}
        </li>
        <li>
          <strong>Họ tên:</strong> {userInfo.name}
        </li>
        <li>
          <strong>Ngày sinh:</strong> {userInfo.dateOfBirth || "Chưa cập nhật"}
        </li>
        <li>
          <strong>Chức vụ:</strong> {userInfo.role}
        </li>
        <li>
          <strong>Địa chỉ:</strong> {userInfo.address || "Chưa cập nhật"}
        </li>
        <li>
          <strong>Số điện thoại:</strong> {userInfo.phone || "Chưa cập nhật"}
        </li>
        <li>
          <strong>Email:</strong> {userInfo.email}
        </li>
      </ul>
    </div>
  );
}

export default Home;
