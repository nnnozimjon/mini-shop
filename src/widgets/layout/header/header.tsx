import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Heart,
} from "lucide-react";
import { Logo } from "@shared/ui";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "@entities/cart";
import { useCategoriesQuery } from "@entities/category";
import { useDebounce } from "@shared/lib";
import { useProductsQuery } from "@entities/product";
import { logout, selectIsAdmin, selectIsAuthenticated } from "@entities/user";

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useCategoriesQuery();
  const cartItems = useSelector(selectCartItems);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const cartCount = cartItems ? cartItems.length : 0;

  const isAdmin = useSelector(selectIsAdmin);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const searchDropdownRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = useSelector(selectIsAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      dispatch(logout());
      setIsDropdownOpen(false);
      location.reload();
    } else {
      location.replace("/login");
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      categoriesRef.current &&
      !categoriesRef.current.contains(event.target as Node) &&
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
      setIsCategoriesOpen(false);
      setIsSearchDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      setIsSearchDropdownOpen(true);
    } else {
      setIsSearchDropdownOpen(false);
    }
  }, [debouncedSearch]);

  const {
    data: products,
    loading,
    error,
  } = useProductsQuery({
    search: debouncedSearch,
  });

  const navLinks = [
    { name: "Бестселлеры", url: "/catalog?search=" },
    { name: "Новинки", url: "#" },
    { name: "Свадебные цветы", url: "#" },
    { name: "Подарочные корзины", url: "#" },
  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full" ref={searchDropdownRef}>
              <input
                type="text"
                placeholder="Search for flowers, bouquets, occasions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-pink-400 focus:outline-none transition-colors"
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              {isSearchDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-scroll scrollbar-hide">
                  {loading && (
                    <div className="p-3 text-gray-500">Loading...</div>
                  )}
                  {error && <div className="p-3 text-red-500">{error}</div>}
                  {!loading && products?.length === 0 && (
                    <div className="p-3 text-gray-500">No results found</div>
                  )}
                  {!loading &&
                    products?.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="block px-4 py-2 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        onClick={() => setIsSearchDropdownOpen(false)}
                      >
                        {product.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to={"/wishlist"}
              className="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <Heart size={22} />
              <span className="text-sm font-medium">Избранное</span>
            </Link>
            <div className="relative">
              <button
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User size={22} />
                <span className="text-sm font-medium">Профиль</span>
              </button>

              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-full -left-16 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                  {isAdmin && (
                    <button
                      className="flex items-center cursor-pointer justify-center w-full px-6 py-3 text-gray-700 text-sm hover:bg-gray-100 rounded-lg"
                      onClick={() => location.replace("/admin/products")}
                    >
                      Админ панель
                    </button>
                  )}
                  <button
                    className="flex items-center cursor-pointer justify-center w-full px-6 py-3 text-gray-700 text-sm hover:bg-gray-100 rounded-lg"
                    onClick={handleLoginLogout}
                  >
                    {isLoggedIn ? "Выйти" : "Войти"}
                  </button>
                </div>
              )}
            </div>

            <Link
              to={"/cart"}
              className="relative flex flex-col items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <ShoppingCart size={22} />
              <span className="text-sm font-medium">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div className="md:hidden pb-4">
          <div className="relative w-full" ref={searchDropdownRef}>
            <input
              type="text"
              placeholder="Search flowers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full focus:border-pink-400 focus:outline-none transition-colors text-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />

            {/* Dropdown for mobile */}
            {isSearchDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-scroll scrollbar-hide">
                {loading && <div className="p-3 text-gray-500">Loading...</div>}
                {!loading && products?.length === 0 && (
                  <div className="p-3 text-gray-500">No results found</div>
                )}
                {!loading &&
                  products?.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="block px-4 py-2 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      onClick={() => setIsSearchDropdownOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden lg:flex items-center justify-between py-3">
          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Menu size={18} />
              <span className="font-medium">Все категории</span>
              <ChevronDown
                size={18}
                className={`transform transition-transform ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-scroll h-56 scrollbar-hide">
                {categories?.map((category, index) => (
                  <Link
                    to={`/catalog?categoryId=${category.id}`}
                    key={index}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left"
                  >
                    <span className="font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <nav className="flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                target="_blank"
                to={`/catalog?search=${link.name}`}
                key={index}
                className="hover:text-pink-200 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center justify-around pb-4 border-b border-gray-200">
              <Link
                to={"/wishlist"}
                className="flex flex-col items-center gap-1 text-gray-700"
              >
                <Heart size={24} />
                <span className="text-xs">Избранное</span>
              </Link>
              <div className="relative">
                <button
                  className="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User size={22} />
                  <span className="text-sm font-medium">Профиль</span>
                </button>

                {isDropdownOpen && (
                  <div ref={dropdownRef} className="absolute top-full -left-16 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                    <button
                      className="flex items-center cursor-pointer justify-center w-full px-6 py-3 text-gray-700 text-sm hover:bg-gray-100 rounded-lg"
                      onClick={handleLoginLogout}
                    >
                      {isLoggedIn ? "Выйти" : "Войти"}
                    </button>
                  </div>
                )}
              </div>
              <Link
                to={"/cart"}
                className="flex flex-col items-center gap-1 text-gray-700 relative"
              >
                <ShoppingCart size={24} />
                <span className="text-xs">Корзина</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Categories */}
            <div ref={categoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-lg"
              >
                <span className="font-medium">Browse Categories</span>
                <ChevronDown
                  className={`transform transition-transform ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>

              {isCategoriesOpen && (
                <div className="mt-2 space-y-1 h-56 overflow-scroll scrollbar-hide">
                  {categories?.map((category, index) => (
                    <Link
                      to={`/catalog?categoryId=${category.id}`}
                      key={index}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors text-left"
                    >
                      <span className="font-medium">{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <nav className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  to={`/catalog?search=${link.name}`}
                  key={index}
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
