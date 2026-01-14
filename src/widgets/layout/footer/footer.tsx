import { Logo } from "@shared/ui";
import { fastLinks, shopLinks } from "./constants";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      url: "https://www.facebook.com",
    },
    {
      icon: <Instagram size={20} />,
      url: "https://www.instagram.com",
    },
  ];
  return (
    <footer className="bg-linear-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <Logo />
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Мы доставляем радость и красоту прямо к вашему порогу с помощью
            самых свежих и потрясающих цветочных композиций. Каждый букет создан
            с любовью и заботой нашими опытными флористами.
          </p>

          <div className="space-y-3">
            <Link
              to="tel:+992907500528"
              className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-colors group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-pink-500/20">
                <Phone size={18} />
              </div>
              <span>(+992) 907-500-528</span>
            </Link>
            <Link
              to="mailto:contact@floramarket.tj"
              className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-colors group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-pink-500/20">
                <Mail size={18} />
              </div>
              <span>contact@floramarket.tj</span>
            </Link>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <span>Душанбе, Мушфики 21 А</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-pink-400">Магазин</h3>
          <ul className="space-y-3">
            {shopLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-pink-400">
            Быстрые ссылки
          </h3>
          <ul className="space-y-3">
            {fastLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-400 font-medium">
            Подписывайтесь на нас:
          </span>
          <div className="flex gap-3">
            {socialLinks.map((link, index) => (
              <Link
                target="_blank"
                key={index}
                to={link.url}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all transform hover:scale-110"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-gray-400 font-medium">Онлайн оплата:</span>
          <div className="flex gap-2">
            <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-gray-800 shadow-md">
              DC
            </div>
            <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-gray-800 shadow-md">
              Alif
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
