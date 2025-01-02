const API_URL = "http://localhost:5000/api/receipts";
const API_URL_DETAIL = "http://localhost:5000/api/receipt-details";
const API_URL_SUPPLIERS = "http://localhost:5000/api/suppliers";

// Lấy danh sách nhà cung cấp
export const getSuppliers = async () => {
  try {
    const response = await fetch(API_URL_SUPPLIERS);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách nhà cung cấp");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getSuppliers:", error);
    throw error;
  }
};

// Lấy danh sách phiếu nhập
export const getReceipts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách phiếu nhập");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getReceipts:", error);
    throw error;
  }
};

// Lấy chi tiết một phiếu nhập
export const getReceiptDetails = async (SOPHIEUNHAPHANG) => {
  try {
    const response = await fetch(`${API_URL}/${SOPHIEUNHAPHANG}`);
    if (!response.ok) throw new Error("Lỗi khi lấy chi tiết phiếu nhập");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getReceiptDetails:", error);
    throw error;
  }
};

// Thêm phiếu nhập hàng
export const addReceipt = async (receipt) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receipt),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm phiếu nhập hàng");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addReceipt:", error);
    throw error;
  }
};

// Thêm chi tiết phiếu nhập hàng
export const addReceiptDetail = async (detail) => {
  try {
    const response = await fetch(API_URL_DETAIL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detail),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm chi tiết phiếu nhập hàng");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addReceiptDetail:", error);
    throw error;
  }
};
