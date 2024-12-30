import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">NTDShop</h3>
            <ul className="space-y-2">
              <li><Link to="#" rel="nofollow">Về chúng tôi</Link></li>
              <li><Link to="#" rel="nofollow">Tuyển dụng</Link></li>
              <li><Link to="#">Tin tức</Link></li>
              <li><Link to="#" rel="nofollow">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li><Link to="#" rel="nofollow">Hướng dẫn mua hàng</Link></li>
              <li><Link to="#" rel="nofollow">Chính sách giao hàng</Link></li>
              <li><Link to="#" rel="nofollow">Chính sách bảo mật</Link></li>
              <li><Link to="#" rel="nofollow">Điều khoản và dịch vụ</Link></li>
              <li><Link to="#" rel="nofollow">Mua hàng trả góp</Link></li>
              <li><Link to="#" rel="nofollow">Chính sách bảo hành</Link></li>
              <li><Link to="#" rel="nofollow">Chính sách bán hàng</Link></li>
              <li><Link to="#" rel="nofollow">Phương thức thanh toán</Link></li>
              <li><Link to="#" rel="nofollow">Chính sách kiểm hàng</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Hệ thống cửa hàng</h3>
            <ul className="space-y-2">
              <li>114 Hàm Nghi , Đà Nẵng</li>
              <li>484 Núi Thành, Đà Nẵng</li>
              <li>603 Tôn Đức Thắng, Đà Nẵng</li>
              <li>228 Hùng Vương, P. An Cựu, TP. Huế</li>
              <li>270 Trần Nhân Tông, Quảng Nam</li>
              <li>154 Tăng Bạt Hổ, TP. Quy Nhơn</li>
              <li>Số 18 Ngõ 133 Thái Hà, Hà Nội</li>
              <li>60 Trần Phú, TP. Vinh, Nghệ An</li>
              <li>478 Lê Hồng Phong, Quận 10, TP.HCM</li>
              <li>106 Lê Văn Việt, TP. Thủ Đức, TP. HCM</li>
              <li>375 Đ. 30 Tháng 4, Ninh Kiều, Cần Thơ</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Thông tin liên hệ</h3>
            <div className="space-y-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="300"
                height="150"
                className="border-0 rounded-lg"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <Link to="tel:0898143789" className="flex items-center">
                Liên Hệ: 0898 143 789
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Phương thức thanh toán</h3>
            <div>
              <img src="https://ttcenter.com.vn/images/payment/methods.svg" alt="Payment Methods" />
            </div>
          </div>

          <div className="mt-8 w-60">
            <Link to="http://online.gov.vn/Home/WebDetails/113488">
              <img src="https://ttcenter.com.vn/images/logoSaleNoti.png" alt="Bộ Công Thương" />
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Liên kết mạng xã hội</h3>
            <ul className="flex space-x-4">
              <li>
                <Link to="" target="_blank">
                  <img src="https://ttcenter.com.vn/images/social/facebook.svg" alt="facebook" className="w-8" />
                </Link>
              </li>
              <li>
                <Link to="" target="_blank">
                  <img src="https://ttcenter.com.vn/images/social/tiktok.svg" alt="tiktok" className="w-8" />
                </Link>
              </li>
              <li>
                <Link to="" target="_blank">
                  <img src="https://ttcenter.com.vn/images/social/youtube.svg" alt="youtube" className="w-8" />
                </Link>
              </li>
              <li>
                <Link to="" target="_blank">
                  <img src="https://ttcenter.com.vn/images/social/zalo.svg" alt="zalo" className="w-8" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 py-4 mt-8">
        <div className="text-sm text-center">
          <p>CÔNG TY TNHH CÔNG NGHỆ TIẾN THẮNG - GPĐKKD: 0402168806 cấp tại Sở KH & ĐT TP. Đà Nẵng. Địa chỉ văn phòng: 114 Hàm Nghi, Phường Thạc Gián, Quận Thanh Khê, Thành Phố Đà Nẵng, Việt Nam.</p>
        </div>
      </div>
    </footer>
  );
};
