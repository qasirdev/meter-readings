'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface INavDropdown {
  label: string;
  items: { label: string; href: string }[];
}
interface IDropdown {
  [key: string]: boolean;
}

const Navbar = () => { 
  const [dropdownOpen, setDropdownOpen] = useState<IDropdown>({ tariffs: false, energy: false });

  const navLinks: INavDropdown[] = [
    {
      label: 'Tariffs',
      items: [
        { label: 'Our tariffs', href: '#' },
        { label: 'Tariff renewals', href: '#' },
        { label: 'Prepayment meters', href: '#' },
        { label: 'Smart Pay As You Go', href: '#' }        
      ]
    },
    {
      label: 'Your home',
      items: [
        { label: 'Smart meters', href: '#' },
        { label: 'Electric vehicles', href: '#' },
        { label: 'EV chargers', href: '#' },
        { label: 'Solar panels', href: '#' }
      ]
    },
    {
      label: 'About',
      items: [
        { label: 'About E.ON Next', href: '#' },
        { label: 'News', href: '#' }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Help and support', href: '#' },
        { label: 'Our community', href: '#' },
        { label: 'Contact us', href: '#' },
        { label: 'Energy Price Guarantee (EPG)', href: '#' }
      ]
    }
  ];

  return (
    <nav className="bg-white w-full shadow-md"> 
      <div className="container mx-auto px-4 py-3 flex items-center justify-between"> 

        <Link href="/" passHref className="flex items-center">
            <Image src="/favicon.ico" alt="Your Company" width={40} height={40} />

        </Link>

        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              <button
                className="link-module--link--2rJEy link-module--hoverUnderlined--27yv9 font-medium" 
                onClick={() => setDropdownOpen((prev:IDropdown) => ({ ...prev, [(link.label as string)]: !prev[(link.label as string)]}))} 
              >
                {link.label}
              </button>

              {dropdownOpen[link.label] && (
                <ul className="absolute top-full left-0 bg-white shadow-md rounded p-4 min-w-[200px] z-1000">
                  {link.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} passHref className="block px-4 py-2 hover:bg-gray-100">{item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li><Link href="#" passHref className="link-module--link--2rJEy link-module--hoverUnderlined--27yv9 font-medium">Offers</Link></li>
          <li>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium  py-2 px-4 rounded">Get a quote</button> 
          </li> 
        </ul>

      </div>
    </nav>
  );

}

export default Navbar