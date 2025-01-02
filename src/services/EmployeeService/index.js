const API_URL = "http://localhost:5000/api/employees";

export const getEmployees = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách nhân viên");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getEmployees:", error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm nhân viên");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addEmployee:", error);
    throw error;
  }
};

export const updateEmployee = async (id, updatedEmployee) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmployee),
    });
    if (!response.ok) throw new Error("Lỗi khi cập nhật nhân viên");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API updateEmployee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Lỗi khi xóa nhân viên");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API deleteEmployee:", error);
    throw error;
  }
};
