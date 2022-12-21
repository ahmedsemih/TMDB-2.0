import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu, MdLogin, MdFavorite, MdBookmark } from 'react-icons/md';

import { navItems } from "../../../utils/constants";
import { useAuthContext } from "../../../contexts/authContext";
import Logo from '../../../public/assets/tmdb-logo.svg'
import Searchbar from "./Searchbar";
import Menu from "./Menu";
import NavItem from "./NavItem";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`
        align-middle
        flex 
        md:flex-row 
        flex-col
        md:items-center
        justify-between
        md:px-3
        bg-neutral-900
        sm:bg-transparent
        hover:bg-[rgba(17,17,17,.8)]
        fixed
        top-0
        w-full
        duration-300
        ${!show && 'opacity-0'}
      `}
    >
      <div className="flex justify-between items-center py-5 px-3">
        <Link href="/" className="mr-5" rel="preload" as="image">
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
      <Menu
        isOpen={isOpen}
        isAuth={user ? true : false}
        elements={
          user
            ?
            [...navItems, { name: "Watchlist", path: "/watchlist", Icon: MdBookmark }, { name: "Favorites", path: "/favorites", Icon: MdFavorite }]
            :
            [...navItems, { name: "Login", path: "/login", Icon: MdLogin }]
        }
      />
      <div className="flex items-center">
        <div className="hidden md:block">
          <Searchbar />
        </div>
        {
            user
            ?
            <Dropdown />
            :
            <NavItem item={{ name: "Login", path: "/login", Icon: MdLogin }} />
        }
      </div>
    </nav>
  )
}

export default Navbar;