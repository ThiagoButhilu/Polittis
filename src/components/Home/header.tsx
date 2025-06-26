import Link from 'next/link';
import cookie from '@/../public/cookie (1).png'
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            height={0}
            width={0}
            src={cookie.src}
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
          <span className={`font-great-vibes text-3xl text-custom-black`}>
            Politti&apos;s
          </span>
        </Link>
        <div className="flex items-center gap-3 space-x-4">
          <Link href="/">
          <span className="text-custom-black hover:text-pink-500">
            Inicio
          </span>
          </Link>
          <Link href="/">
          <span className="text-custom-black hover:text-pink-500">
            Pronta entrega
          </span>
          </Link>
          <Link href="/order">
          <span className="text-custom-black hover:text-pink-500 relative">
            Encomendar
          </span>
          </Link>
          <Link href="/">
          <span className="text-custom-black hover:text-pink-500">
            Pedidos
          </span>
          </Link>
        </div>
        <div>
          <Link href="">
            <span className="text-custom-black hover:text-pink-500">Contate-nos</span>
          </Link>
          <Link href="">
            <span></span>
          </Link>
        </div>
      </div>
    </header>
  );
}