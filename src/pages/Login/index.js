import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/LoginService";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(null);
  const navigate = useNavigate();

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    try {
      const data = await login(username, password); // Gọi service đăng nhập

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); // Lưu thông tin người dùng vào localStorage
        navigate("/home"); // Chuyển đến trang Home sau khi đăng nhập thành công
      } else {
        setLoginMessage(data.message); // Hiển thị lỗi nếu đăng nhập không thành công
      }
    } catch (error) {
      console.error("Lỗi khi gọi API login:", error);
      setLoginMessage("Lỗi hệ thống");
    }
  };

  return (
    <div className="login">
      <img src="/React_bachhoaxanh/bhx logo.png" alt="logo" />
      <div className="login-container">
        <header>
          <h1>Hệ Thống Quản Lý Cửa Hàng</h1>
        </header>

        <div className="login-form">
          <h2>Đăng Nhập</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Tên Đăng Nhập:</label>
            <input
              type="text"
              id="username"
              placeholder="Nhập mã nhân viên"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Mật Khẩu:</label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Đăng Nhập</button>
          </form>
          {loginMessage && <p className="error-message">{loginMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
