import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  updateFromReceipt,
} from "../../services/ProductService";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [receiptId, setReceiptId] = useState("");
  const [newProduct, setNewProduct] = useState({
    MAVACH: "",
    TENHANG: "",
    MOTAHANG: "",
    SOLUONGHIENCO: "",
    DANHMUCHANG: "",
    DONGIA: "",
  });
  const [editedProduct, setEditedProduct] = useState({});
  const [nonExistentProducts, setNonExistentProducts] = useState([]);

  // Lấy vai trò người dùng từ localStorage
  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role || "guest";
  };

  const userRole = getUserRole();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục sản phẩm:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const handleUpdateFromReceipt = async () => {
    try {
      const result = await updateFromReceipt(receiptId);
      alert(result.message);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi cập nhật từ phiếu nhập:", error.message || error);
      alert("Không thể cập nhật từ phiếu nhập!");
    }
  };

  const handleAddClick = async () => {
    await fetchCategories();
    setIsAdding(true);
  };

  const handleCancelAddClick = () => {
    setNewProduct({
      MAVACH: "",
      TENHANG: "",
      MOTAHANG: "",
      SOLUONGHIENCO: "",
      DANHMUCHANG: "",
      DONGIA: "",
    });
    setIsAdding(false);
  };

  const handleSaveClick = async () => {
    try {
      await addProduct(newProduct);
      setNewProduct({
        MAVACH: "",
        TENHANG: "",
        MOTAHANG: "",
        SOLUONGHIENCO: "",
        DANHMUCHANG: "",
        DONGIA: "",
      });
      setIsAdding(false);
      alert("Sản phẩm đã được thêm thành công!");
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Không thể thêm sản phẩm!");
    }
  };

  const handleEditClick = async (product) => {
    await fetchCategories();
    setEditingProductId(product.MAVACH);
    setEditedProduct(product);
  };

  const handleSaveEditClick = async () => {
    try {
      await updateProduct(editingProductId, editedProduct);
      setProducts(
        products.map((product) =>
          product.MAVACH === editingProductId ? editedProduct : product
        )
      );
      setEditingProductId(null);
      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Không thể cập nhật sản phẩm!");
    }
  };

  const handleDeleteClick = async (MAVACH) => {
    try {
      const result = await deleteProduct(MAVACH);
      if (result.message === "Xóa sản phẩm thành công!") {
        setProducts(products.filter((product) => product.MAVACH !== MAVACH));
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Không thể xóa sản phẩm!");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.TENHANG?.toLowerCase().includes(searchKeyword) ||
      product.MAVACH?.toLowerCase().includes(searchKeyword)
  );

  return (
    <div>
      <h3>Danh Sách Sản Phẩm</h3>
      <div>
        {userRole === "Quản lý" && (
          <button onClick={handleAddClick}>Thêm Sản Phẩm</button>
        )}
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchKeyword}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Nhập mã phiếu nhập"
          value={receiptId}
          onChange={(e) => setReceiptId(e.target.value)}
        />
        <button onClick={handleUpdateFromReceipt}>
          Cập nhật từ Phiếu Nhập
        </button>
      </div>
      {nonExistentProducts.length > 0 && (
        <div>
          <h4>Sản phẩm không tồn tại:</h4>
          <ul>
            {nonExistentProducts.map((product) => (
              <li key={product}>{product}</li>
            ))}
          </ul>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Mã Sản Phẩm</th>
            <th>Tên Sản Phẩm</th>
            <th>Mô Tả</th>
            <th>Số Lượng</th>
            <th>Danh Mục</th>
            <th>Đơn Giá</th>
            {userRole === "Quản lý" && <th>Thao Tác</th>}
          </tr>
        </thead>
        <tbody>
          {isAdding && userRole === "Quản lý" && (
            <tr>
              <td>
                <input
                  type="text"
                  value={newProduct.MAVACH}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, MAVACH: e.target.value })
                  }
                  placeholder="Mã sản phẩm"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newProduct.TENHANG}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, TENHANG: e.target.value })
                  }
                  placeholder="Tên sản phẩm"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newProduct.MOTAHANG}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, MOTAHANG: e.target.value })
                  }
                  placeholder="Mô tả"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newProduct.SOLUONGHIENCO}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      SOLUONGHIENCO: e.target.value,
                    })
                  }
                  placeholder="Số lượng"
                />
              </td>
              <td>
                <select
                  value={newProduct.DANHMUCHANG}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      DANHMUCHANG: e.target.value,
                    })
                  }
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={newProduct.DONGIA}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, DONGIA: e.target.value })
                  }
                  placeholder="Đơn giá"
                />
              </td>
              <td>
                <button onClick={handleSaveClick}>Lưu</button>
                <button onClick={handleCancelAddClick}>Hủy</button>
              </td>
            </tr>
          )}
          {filteredProducts.map((product) =>
            editingProductId === product.MAVACH ? (
              <tr key={product.MAVACH}>
                <td>{product.MAVACH}</td>
                <td>
                  <input
                    type="text"
                    value={editedProduct.TENHANG}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        TENHANG: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editedProduct.MOTAHANG}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        MOTAHANG: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editedProduct.SOLUONGHIENCO}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        SOLUONGHIENCO: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <select
                    value={editedProduct.DANHMUCHANG}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        DANHMUCHANG: e.target.value,
                      })
                    }
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={editedProduct.DONGIA}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        DONGIA: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button onClick={handleSaveEditClick}>Lưu</button>
                  <button onClick={() => setEditingProductId(null)}>Hủy</button>
                </td>
              </tr>
            ) : (
              <tr key={product.MAVACH}>
                <td>{product.MAVACH}</td>
                <td>{product.TENHANG}</td>
                <td>{product.MOTAHANG}</td>
                <td>{product.SOLUONGHIENCO}</td>
                <td>{product.DANHMUCHANG}</td>
                <td>{product.DONGIA}</td>
                {userRole === "Quản lý" && (
                  <td>
                    <button onClick={() => handleEditClick(product)}>
                      Sửa
                    </button>
                    <button onClick={() => handleDeleteClick(product.MAVACH)}>
                      Xóa
                    </button>
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
