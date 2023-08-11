import '../../assets/styles/client/nav.scss';
import React, {useState} from "react";
import {Icon} from 'react-icons-kit';
import {menu} from 'react-icons-kit/feather/menu';
import {x} from 'react-icons-kit/feather/x';

export default function Navbar() {
    const [toggle, setToggle]=useState(false);

    const handleToggle=()=>{
        setToggle(!toggle);
    }

    return (

        <nav className={toggle?'navbar expanded':'navbar'}>
            <div className='toggle-icon' onClick={handleToggle}>
                {toggle?<Icon icon={x} size={28}/>:<Icon icon={menu} size={28}/>}
            </div>
            <ul className='links'>
                <li><a href='/' >HOME</a></li>
                <li><a href='/about'>ABOUT</a></li>
                <li><a href='/catalog'>CATALOG</a></li>
                <li><a href='/faqs'>FAQ'S</a></li>
                <li><a href='/contact'>CONTACT US</a></li>
            </ul>
        </nav>
    )
}