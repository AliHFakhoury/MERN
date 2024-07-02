import React from "react";

const Link = ({href, target, children}) => {
    return (
      <a className="link-wrap" style={{textDecoration:'none'}} href={href} target={target}>
        {children}
      </a>
    );
  }
  
  export default Link;