import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../../components/ui/navigation-menu'; // Điều chỉnh đường dẫn import

export const Header = () => {
  return (
    <header className="bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-6">
        {/* Logo */}
        <div className="logo">
          <Link to="#" title="T&T Center">
            <img src="https://ttcenter.com.vn/images/logo.svg" alt="T&T Center" title="T&T Center" className="w-32 md:w-48" />
          </Link>
        </div>
         
        {/* Search */}
        <div className="menu_search flex items-center">
          <form className="flex">
            <input
              type="text"
              name="ten"
              onKeyUp={() => {}}
              id="search_product"
              value=""
              placeholder="Nhập tên sản phẩm cần tìm ..."
              className="border p-2 rounded-l-md w-40 md:w-80"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>

        {/* Hotline */}
        <div className="menu_hotline flex items-center cursor-pointer">
          <a href="tel:0898.143.789" title="Hotline CSKH" className="flex items-center">
            <img src="https://ttcenter.com.vn/images/hotline.svg" alt="hotline" title="hotline" className="w-6 h-6 mr-2" />
            <div>
              <p className="text-sm">Hotline CSKH</p>
              <p><strong>0898.143.789</strong></p>
            </div>
          </a>
        </div>

        {/* Cart */}
        <div className="menu_cart flex items-center">
          <Link to="https://ttcenter.com.vn/gio-hang" title="Giỏ hàng" className="flex items-center">
            <img src="https://ttcenter.com.vn/images/cart.svg" alt="Giỏ hàng" title="Giỏ hàng" className="w-6 h-6 mr-2" />
            <span>Giỏ hàng <strong className="number_cart">0</strong></span>
          </Link>
        </div>

        {/* Account */}
        <div className="menu_account flex items-center">
          <Link to="https://ttcenter.com.vn/dang-nhap" title="Đăng nhập" className="flex items-center">
            <img src="https://ttcenter.com.vn/images/user.svg" alt="user" title="user" className="w-6 h-6 mr-2" />
            <span>Đăng nhập</span>
          </Link>
        </div>
      </div>
      
      <div className="w-full bg-white">
        <nav className="mx-auto flex items-center justify-between py-2">
          <ul className="w-full flex justify-center gap-4 items-center">
          <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                      <img className="w-[40px] object-contain" src="https://cdnv2.tgdd.vn/mwg-static/common/Category/c9/ea/c9eac61be9530e9c6c4404ba573086c4.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
            <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                        <img className="w-[40px] object-contain" src="https://cdnv2.tgdd.vn/mwg-static/common/Category/0b/90/0b907e4551b7ad8857426905ae627cad.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
            <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                        <img className="w-[40px] object-contain" src="https://cdnv2.tgdd.vn/mwg-static/common/Category/f9/bf/f9bf13ff9843115d6edacf7ba01af389.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
            <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                        <img className="w-[40px] object-contain" src="https://cdnv2.tgdd.vn/mwg-static/common/Category/6d/8d/6d8d72c5a0a115eff8005f41df8dbe27.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
            <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                        <img className="w-[40px] object-contain" src="https://ttcenter.com.vn/uploads/product_menu/gigabyte-1688183166.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
            <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                        <img className="w-[40px] object-contain" src="https://cdnv2.tgdd.vn/mwg-static/common/Category/6a/6f/6a6f7e4792cdbc7946e58e539d1f05f1.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
            <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                        <img className="w-[40px] object-contain" src="https://cdnv2.tgdd.vn/mwg-static/common/Category/44/af/44af0b82dd48675388be5cf873c49393.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
            <li className="w-20 h-8 py-2 px-4 flex justify-center items-center bg-gray-200 rounded-lg">
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="w-[90px] h-8 items-center bg-gray-200 text-black rounded-lg">              
                        <img className="w-[40px] object-contain" src="https://ttcenter.com.vn/uploads/product_menu/gigabyte-1688183166.png" alt="" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>
                        <div className="bg-white p-4">
                            <h3 className='mb-3 font-bold text-primary'>Loại máy</h3>
                            <div className=" flex justify-center items-center gap-2 ">
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                              <ul className="col-span-1 flex flex-col gap-2 w-[220px]">
                                <li><Link to="">Laptop Dell V02a9 gamming</Link></li>
                                <li><Link to="">Laptop Dell V02s8 gamming</Link></li>
                                <li><Link to="">Laptop Dell V09x8 gamming</Link></li>
                              </ul>
                            </div>
                        </div>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};