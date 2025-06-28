'use client'

import Link from 'next/link';
import cookie from '@/../public/cookie (1).png'
import Image from "next/image";
import { MenuIcon, LogIn } from "lucide-react";
import { useState } from 'react';



export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 hidden sm:flex justify-between items-center">
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
        <div className="hidden sm:flex items-center gap-3 space-x-4">
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
        <div className="flex gap-3 justify-end">
          <Link href="">
            <span className="text-custom-black hover:text-pink-500">Contate-nos</span>
          </Link>
          <Link className='hover:text-pink-500 gap-1 flex' href="/login">
          <LogIn className='w-5'/>
            <span>entrar</span>
          </Link>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="relative flex items-center w-full h-16">
          <div className="absolute left-4">
            <MenuIcon onClick={():void => isMobileMenuOpen ? setIsMobileMenuOpen(false) : setIsMobileMenuOpen(true)}/>
          </div>
          <div className="mx-auto">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                height={0}
                width={0}
                src={cookie.src}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="font-great-vibes text-3xl text-custom-black">
                Politti&apos;s
              </span>
            </Link>
          </div>
        </div>
        {isMobileMenuOpen && (
            <div className="space-y-1 absolute w-full px-2 pt-2 pb-3 bg-white/80 backdrop-blur-md">
          <Link href="/">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-pink-500 hover:text-white">
              Inicio
            </span>
          </Link>
          <Link href="/">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-pink-500 hover:text-white">
              Pronta entrega
            </span>
          </Link>
          <Link href="/order">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-pink-500 hover:text-white">
              Encomendar
            </span>
          </Link>
          <Link href="/">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-pink-500 hover:text-white">
              Pedidos
            </span>
          </Link>
          <Link href="">
            <span className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-pink-500 hover:text-white">
              Contate-nos
            </span>
          </Link>
        </div>
        )}
        
      </div>
    </header>
  );
}