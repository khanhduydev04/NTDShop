const formatCurrency = (value) => {
  if (value === undefined || value === null) {
    return "N/A"; // Hoặc một giá trị mặc định khác phù hợp
  }
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export { formatCurrency };
