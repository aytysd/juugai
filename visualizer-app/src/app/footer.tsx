import React from 'react';
import Link from "next/link";
import './footer.css'

const Footer: React.FC = () => {
  return (
        <footer>
            <div className="aboutus">
                作成者：吉田彩人
                <br></br>
                作成年月日：2024-12-10
                <br></br>
                mail address: aytsd@gmail.com
            </div>
        </footer>
    );
};

export default Footer;