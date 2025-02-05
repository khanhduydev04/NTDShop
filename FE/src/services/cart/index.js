export const addToCart = (productId, quantity) => {
    // Lấy dữ liệu giỏ hàng hiện tại từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
  
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới
      cart.push({ id: productId, quantity });
    }
  
    // Lưu dữ liệu giỏ hàng mới vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  