import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
    return (
        <div className="ui menu">
            <Link to="/" className="item">
                Twitch My Niche
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                        All Streams
                </Link>
                <div className="item">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    );
}

export default Header;