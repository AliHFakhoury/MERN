import React from 'react';
import './Breadcrumb.scss';

const Breadcrumb = ({children}) => {
    return <div className='breadcrumb-wrapper'>
                {children}
           </div>
}


export default Breadcrumb;