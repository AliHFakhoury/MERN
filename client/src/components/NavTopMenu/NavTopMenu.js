import React from "react";
import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";
import "./NavTopMenu.scss";

const NavTopMenu = ({children}) => (
        <div className="right-content">
          <div className="sq-button-wrapper">
            {children}
          </div>
          {/* <Avatar /> */}
        </div>
);

export default NavTopMenu;