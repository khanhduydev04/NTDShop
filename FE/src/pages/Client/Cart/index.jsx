import { Button } from '@/components/common/Button';
import { getProductsFilterCart } from '@/services/product';
import { faShoppingCart, faTrash, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCart, addToCart } from '@/store/cartSlice';

export const CartPage = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.items);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const productIds = cartProducts.map(item => item.id);
            if (productIds.length === 0) {
                setLoading(false);
                return;
            }
            const products = await getProductsFilterCart({ ids: productIds });
            const productsWithQuantity = products.map(product => {
                const cartItem = cartProducts.find(item => item.id === product.id);
                if (cartItem) {
                    return { ...product, quantity: cartItem.quantity, variantId: cartItem.variantId };
                }
                return null;
            }).filter(product => product !== null);            
            setProducts(productsWithQuantity);
            setLoading(false);
            calculateTotalPrice(productsWithQuantity);
        };
        fetchCartProducts();
    }, [cartProducts]);

    const calculateTotalPrice = (products) => {
        const total = products.reduce((sum, product) => {
            const variant = product.productVariants?.find(v => v.id === product.variantId);
            const price = variant ? variant.price : 0;
            return sum + (price * product.quantity);
        }, 0);
        setTotalPrice(total);
    };

    const handleQuantityChange = (productId, variantId, delta) => {
        const updatedCartProducts = cartProducts.map(product => {
            if (product.id === productId && product.variantId === variantId) {
                const newQuantity = product.quantity + delta;
                return newQuantity > 0 ? { ...product, quantity: newQuantity } : null;
            }
            return product;
        }).filter(product => product !== null);

        const updatedProduct = updatedCartProducts.find(product => product.id === productId && product.variantId === variantId);
        if (updatedProduct) {
            dispatch(addToCart({ id: productId, variantId, quantity: updatedProduct.quantity }));
        }
        calculateTotalPrice(updatedCartProducts);
    };

    const handleRemoveProduct = (productId, variantId) => {
        const updatedCartProducts = cartProducts.filter(product => !(product.id === productId && product.variantId === variantId));
        dispatch(removeFromCart({ id: productId, variantId }));
        calculateTotalPrice(updatedCartProducts);
    };

    const handleCheckout = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/thong-tin-dat-hang', { state: cartProducts });
        }
    }; 
    return (
        <div className="w-3/4 box-ordering-steps p-4 max-w-screen-lg mx-auto">
            <Link to="/" className="button-comeback flex items-center cursor-pointer mb-4">
                <span className="flex items-center text-primary">
                    <i className="icon-back mr-2"></i> Quay lại
                </span>
            </Link>

            <div className="title-shopping-cart mb-8 text-center">
                <h1 className="text-2xl font-bold text-primary">Chọn sản phẩm</h1>
            </div>

            <ul className="flex justify-center items-center md:gap-20 mb-8">
                <li className="flex flex-col items-center text-center relative step-item">
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-primary">
                        <FontAwesomeIcon icon={faShoppingCart} className="w-6 text-primary" />
                    </span>
                    <span className="mt-2 text-sm md:text-base text-primary">Chọn sản phẩm</span>
                </li>
                <li className="flex flex-col items-center text-center relative step-item">
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-gray-400">
                        <FontAwesomeIcon icon={faUser} className="w-6 text-gray-400" />
                    </span>
                    <span className="mt-2 text-sm md:text-base">Thông tin đặt hàng</span>
                </li>
                <li className="flex flex-col items-center text-center relative step-item">
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-gray-400">
                        <FontAwesomeIcon icon={faTruck} className="w-6 text-gray-400" />
                    </span>
                    <span className="mt-2 text-sm md:text-base">Hoàn tất đặt hàng</span>
                </li>
            </ul>

            {loading ? (
                <div className="text-center">Đang tải sản phẩm...</div>
            ) : products.length === 0 ? (
                <div className="text-center text-gray-600">Chưa có sản phẩm nào trong giỏ hàng.</div>
            ) : (
                <div className="w-full flex justify-center items-center py-6">
                    <div className="grid justify-center items-center gap-6 w-full lg:w-3/4">
                        {products.map((product) => {
                            console.log(product);
                            const variant = product.productVariants?.find(v => v.id === product.variantId);                            
                            const price = variant ? variant.price : 0;                            
                            const image = product.thumbnail;
                            return (
                                <div key={`${product.id}-${variant?.id}`} className="border rounded-lg p-4 shadow-md flex flex-col sm:flex-row gap-4">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img src={image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="info-product-shopping flex-grow">
                                        <div className="name-product-shopping font-semibold text-lg">{product.name}</div>
                                        <div className="price-product-shopping my-2 text-gray-700">Giá: <strong className="text-red-500">{price.toLocaleString()} ₫</strong></div>
                                        <div className="total-product-shopping my-2 text-gray-700">Tổng tiền: <strong className="text-red-500 ml-2">{(price * product.quantity).toLocaleString()} ₫</strong></div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                                        <button className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => handleQuantityChange(product.id, variant?.id, -1)}>-</button>
                                        <strong className="mx-4 sm:mx-2">{product.quantity}</strong>
                                        <button className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => handleQuantityChange(product.id, variant?.id, 1)}>+</button>
                                    </div>
                                    <div className="flex justify-end items-center sm:justify-start">
                                        <button className="flex justify-center items-center text-red-500 w-10 h-10 p-4 border rounded-lg hover:text-red-700" onClick={() => handleRemoveProduct(product.id, variant?.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {cartProducts.length > 0 && (
                <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-6">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <p className="text-lg font-medium text-gray-600">Tổng tiền:</p>
                        <p className="text-xl font-bold text-red-500">{totalPrice.toLocaleString()} ₫</p>
                    </div>
                    <Link to="/thong-tin-dat-hang" state={cartProducts} className="button-primary w-full sm:w-auto px-6 py-2">
                        <Button bg="primary" className="w-full sm:w-auto px-6 py-2">Tiến hành đặt hàng</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;