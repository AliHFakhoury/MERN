import React, { useState, useEffect } from 'react';
import { Animation, AnimationGroup } from 'react-web-animation';
import './Accordion.scss';

const FaqItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const faqExpand = document.getElementsByClassName('faq-expand')[0];
    const arrowImg = document.getElementsByClassName('image-12')[0];
    if (isExpanded) {
      faqExpand.style.height = faqExpand.scrollHeight + 'px';
      arrowImg.style.transform = 'rotate(180deg)';
    } else {
      faqExpand.style.height = '0';
      arrowImg.style.transform = 'rotate(0deg)';
    }
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='faq-wrapper'>
      <div className='faq-item'>
        <div className='faq-question' onClick={handleExpand}>
          <span>Heading</span>
          <img src='http://unsplash.it/20/20' alt='arrow' className='image-12' />
          {/* {children[0]} */}
        </div>
        <div className='faq-expand'>
          <div className='faq-answer'>
            {/* {children[1]} */}

            This is the faq content
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
