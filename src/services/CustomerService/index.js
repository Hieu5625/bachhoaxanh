const API_URL = "http://localhost:5000/api/customers";

export const getCustomers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách khách hàng");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getCustomers:", error);
    throw error;
  }
};

export const addCustomer = async (customer) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm khách hàng");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addCustomer:", error);
    throw error;
  }
};

export const updateCustomer = async (id, updatedCustomer) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    });
    if (!response.ok) throw new Error("Lỗi khi cập nhật khách hàng");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API updateCustomer:", error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Lỗi khi xóa khách hàng");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API deleteCustomer:", error);
    throw error;
  }
};
