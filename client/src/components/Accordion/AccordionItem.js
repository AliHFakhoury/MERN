import React, { useState, useEffect } from 'react';
import { CaretDown, CaretUp, Edit, TrashCan } from '@carbon/icons-react';
import './Accordion.scss';
import Button from '../Button/Button';

const AccordionItem = ({ children, id, headerText, content, isExpanded, handleExpand, icon : Icon, showAddButton, buttonOnClick, handleDelete, handleEdit }) => {
  //set accordion to groups for V1
  
  // const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {

    // console.log('accord-expand-'+id)

    const faqExpand = document.getElementById('accord-expand-'+id);

    if (isExpanded) {
      // faqExpand.style.height = faqExpand.scrollHeight + 'px';
      faqExpand.style.height = 'auto';
      
      if(headerText){
        const arrowImg = document.getElementById('image-12-'+id);
        arrowImg.style.transform = 'rotate(180deg)';
      }

    } else {
      faqExpand.style.height = '0px';

      if(headerText){
        const arrowImg = document.getElementById('image-12-'+id);
        arrowImg.style.transform = 'rotate(0deg)';
      }

    }
  }, [isExpanded]);

  // const handleExpand = () => {
  //   setIsExpanded(!isExpanded);
  // };

  const handleDeleteAccordion = () => {
    handleDelete(id) 
  }

  const handleEditAccordion = () => {
    handleEdit(id)
  }

  return (
    <div className='accordion-wrap'>
      <div className='accordion-item'>
        <div className='idkwhattodoplzhelp'>
          <div className='accordion-header' onClick={() => handleExpand(id)}>
            <div className='accordion-header-content'>
              {/* Please fix me ^_^ */}
              { Icon && <> <Icon/> </>} 

              { (headerText && <> {headerText} <CaretDown className='accordion-chevron' id={'image-12-'+id}/> </>) || <>{children[0]}</>}
            </div>
          </div>

          { handleEdit && (
            <div onClick={handleEditAccordion}>
              <Edit />
            </div>
          )}

          {handleDelete && (
            <div onClick={handleDeleteAccordion}>
              <TrashCan />
            </div>
          )}

        </div>
        
        <div className='accordion-expand' id={'accord-expand-'+id}>
          <div className='accord-expand-inner'>
            <div className='accordion-expand-content'> 
              <div className='divider-line'></div>
              {(content && <> {content} </>) || <>{children[1]}</>}

              {/* The Add Button */}
              { showAddButton && <> <div> <Button text={"Add New Field"} buttonStyle={"primary"} icon={"Add"} onChange={ buttonOnClick }/> </div></>}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;

// Set .accordion-expand height to 0px by default using JS

// On first click of .accordion-header, set .accordion-expand height to auto & rotate
// the .accordion-chevron icon 180*

// On the next click of the same .accordion-header, do the previous actions in reverse to 
// all .accordion-expand elements on the page