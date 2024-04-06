import React, { useState } from "react";
import "./Header.css";
import Logo from "../../assets/sbiGLogo_final.jpg"

const Header = () => {
    const [arrowUp, setArrowUp] = useState(false)
    const handleClick = () => {
        if (arrowUp) {
            setArrowUp(false);
        } else {
            setArrowUp(true);
        }
    }
    return (
        <header className="header">
            <img className="header-logo" src={Logo} />
            <h2>CKYC Status Check</h2>
            <button className="button" onClick={handleClick}>
                KYC Status<i className={arrowUp ? "arrow up" : "arrow down"}></i>
            </button>
            {/* <a href="#" className="button1">KYC Status</a> */}
        </header>
    )
}

export default Header;