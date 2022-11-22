import { NavItem } from "../types";
import {MdHome, MdTv, MdMovie, MdBolt} from 'react-icons/md';

export const navItems:NavItem[]=[
    {
        name:"Home",
        path:"/",
        Icon:MdHome
    },
    {
        name:"Movies",
        path:"/movies",
        Icon:MdMovie
    },
    {
        name:"TV Series",
        path:"/series",
        Icon:MdTv
    },
    {
        name:"Trending",
        path:"/trending",
        Icon:MdBolt
    }
];