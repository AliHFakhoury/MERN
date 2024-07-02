import React from "react";
import Spacer from "../Spacer/Spacer";
import ButtonWrapper from "../ButtonWrapper/ButtonWrapper";
import Button from "../Button/Button";
import Link from "../Link/Link";

import "./EmptyState.scss";

const EmptyState = ({heading, text, buttonOneText, buttonTwoText, buttonOneIcon, imgSrc}) => {
  return (
    <div className="empty-state-wrapper">
      <img className='empty-state-icon' src={imgSrc} alt=''/>
      <h1>{heading}</h1>
      <p>{text}</p>
      <Spacer size={'_08'}/>
      <ButtonWrapper align={'center'}>
      {buttonOneText  && <Link href={'https://www.google.com'} target={'_blank'}><Button buttonStyle={'primary'}
                                 title={buttonOneText}
                                 text={buttonOneText}
                                 icon={buttonOneIcon}/></Link>}
      {buttonTwoText  && <Link href={''}><Button buttonStyle={'secondary'}
                                 title={buttonTwoText}
                                 text={buttonTwoText}/></Link>}
      </ButtonWrapper>
    </div>
  );
}

export default EmptyState;