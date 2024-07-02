import React from "react";
import { render } from "react-dom";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import "./Navbar.scss";
import NavTopMenu from "../NavTopMenu/NavTopMenu";
import { useAppContext } from '../../context/appContext';


const Navbar = () => {
  
  const { addingProject, setAddingProject } = useAppContext();

  const onAddButtonClick = () => {
    console.log(addingProject)
    setAddingProject(true)
  }

  return (
    <div className="nav-wrapper">
      <div className="container">
        <div className="top-bar">
          <Logo colour='white'/>
          <div className="link-menu">
            {/* <a href="gooole.a" target="" className="nav-link">
              Purchase Tags
            </a>
            <a href="gooole.a" target="" className="nav-link">
              Submit Feedback
            </a>
            <a href="gooole.a" target="" className="nav-link">
              Upgrade Account
            </a> */}
          </div>
          <NavTopMenu>
            
            {/* <Button buttonStyle='sq-button on-colour black' text={"Add Project"}  onChange={onAddButtonClick}/> */}
            <Button buttonStyle='primary' text={"Add Project"}  onChange={onAddButtonClick}/>

          </NavTopMenu>
        </div>
      </div>
    </div>
  );
  
}

export default Navbar;