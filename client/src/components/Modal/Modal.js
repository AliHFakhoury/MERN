import React from "react";
import { render } from "react-dom";
import "./Modal.scss";
import { Close } from '@carbon/icons-react';
import Spacer from "../Spacer/Spacer";

const Modal = ({children, modalTitle, onCloseButton}) => (
  <div className="modal-wrapper">
    <div className="modal">
        <h6 className="modal-title">{modalTitle}</h6>
        {children}
        <span id="close-object-default" className='close' onClick={onCloseButton}><Close className='icon'/></span>
    </div>
  </div>
);

export default Modal;