import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { FaUserCircle } from "react-icons/fa";


export const SidebarData = [
  {
    title: 'Perfil',
    path: '/perfil',
    icon: <FaUserCircle/>,
    cName: 'nav-text'
  },
  {
    title: 'Productos',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  }
];
