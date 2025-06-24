import Link from 'next/link';
import cookie from '@/../public/cookie (1).png'
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={cookie.src}
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
          <span className="font-parisienne text-3xl text-custom-black">
            Politti&apos;s
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-custom-black hover:text-gray-700">
            <span className="material-icons">search</span>
          </button>
          <button className="text-custom-black hover:text-gray-700 relative">
            <span className="material-icons">shopping_cart</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="text-custom-black hover:text-gray-700">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}