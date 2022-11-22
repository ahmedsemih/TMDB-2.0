import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu, MdLogin } from 'react-icons/md';

import { navItems } from "../../../utils/constants";
import Logo from '../../../public/assets/tmdb-logo.svg'
import Searchbar from "./Searchbar";
import Dropdown from "./Dropdown";
import NavItem from "./NavItem";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex md:flex-row flex-col md:items-center justify-between md:px-3 bg-neutral-900 md:bg-none'>
      <div className="flex justify-between items-center py-5 px-3">
        <Link href="/" className="mr-5">
          <Image src={Logo} alt="TMDB" width={200} height={100} priority />
        </Link>
        {
          navItems.map((item, index) => {
            return <NavItem key={index} item={item} />
          })
        }
        <div className="flex justify-end items-center">
          <div className="hidden sm:block md:hidden mr-3">
            <Searchbar />
          </div>
          <MdOutlineMenu onClick={() => setIsOpen(prev => !prev)} className="md:hidden text-5xl block" />
        </div>
      </div>
      <Dropdown isOpen={isOpen} elements={[...navItems, { name: "Login", path: "/login", Icon: MdLogin }]} />
      <div className="flex items-center">
        <div className="hidden md:block">
          <Searchbar />
        </div>
        <NavItem item={{ name: "Login", path: "/login", Icon: MdLogin }} />
      </div>
    </div>
  )
}

export default Navbar;