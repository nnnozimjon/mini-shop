import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 cursor-pointer group">
      <p className="text-5xl transform group-hover:scale-110 transition-transform">
        🌸
      </p>
      <div className="hidden sm:block">
        <h1 className="text-2xl font-bold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          FloraMarket
        </h1>
        <p className="text-xs text-gray-500">Доставка свежих цветов</p>
      </div>
    </Link>
  );
};
