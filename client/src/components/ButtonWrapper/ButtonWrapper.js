import React from "react";
// import PropTypes from 'prop-types';
import "./ButtonWrapper.scss";

const ButtonWrapper = ({children, align}) => {
  return (
    <div className={'button-wrapper '.concat(align)}>
      {children}
    </div>
    
  );
  
}
// ButtonWrapper.propTypes = {
//     align: PropTypes.string.isRequired,
//   };

export default ButtonWrapper;