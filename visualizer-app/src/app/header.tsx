import React from 'react';
import Link from "next/link";
import './header.css'

const Header: React.FC = () => {
  return (
    <header className="fixed-header">
      <h1>アニマルミル　獣害観測システム</h1>
      <nav>
        <ul>
          <li><Link href={"/"}>ホーム</Link></li>
          <li><Link href={"/about"}>About</Link></li>
          <li><Link href={"/contact"}>お問い合わせ</Link></li>
          <li><Link href={"/login"}>Login</Link></li>
          <li><Link href={"/signupo"}>Signup</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;