import React from "react";
import { 
  ChevronSort,
  Calendar,
  CharacterWholeNumber,
  Chat,
  DataTableReference,
  DecisionTree,
  Document,
  Boolean,
  ImageCopy,
  LetterAa,
  Link,
  Map,
  User
} from '@carbon/icons-react';

import { FormRow } from "../../../../components";
import { Accordion, AccordionItem, Form } from "@carbon/react";
import { useAppContext } from "../../../../context/appContext";

const SampleListItem = ({id, fieldType, fieldName}) => {
  const { toggleSampleListOpen } = useAppContext();
  
  
  const onSubmit = (e) => {
    e.preventDefault();
    
}

const componentsIconList = {
  'text': LetterAa,
  'number': CharacterWholeNumber,
  'gallery': ImageCopy,
  'files': Document,
  'date': Calendar,
  'coordinates': Map,
  'person': User,
  'notes': Chat,
}

const testingHeadingClick = () => {
  toggleSampleListOpen();
}

const testingOpen = () => {
  console.log("I'm OPEN");
}

const CarbonIcon = componentsIconList[fieldType];

  return (
        <div key={id} className='sample-input-item'>
           <ChevronSort className="sample-input-sort"/>
            <AccordionItem title={fieldName} style={{listStyleType:"none"}}>
                <Form onSubmit={onSubmit}>  
                    <FormRow/>
                    <FormRow/>
                    <FormRow/>
                    {/* <button onClick={toggleSampleListOpen}>Click me to toggle sorting I guess :D</button> */}
                </Form>
            </AccordionItem>

          
        </div>
  );
};

export default SampleListItem