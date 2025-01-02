const API_URL = "http://localhost:5000/api/login";

// Hàm gọi API đăng nhập
export const login = async (username, password) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Lỗi khi đăng nhập");

    const data = await response.json();
    return data; // Trả về dữ liệu người dùng sau khi đăng nhập thành công
  } catch (error) {
    console.error("Lỗi khi gọi API login:", error);
    throw error; // Propagate error
  }
};
