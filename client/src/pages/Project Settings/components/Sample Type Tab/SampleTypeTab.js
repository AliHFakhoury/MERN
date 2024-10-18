import { React, useEffect, useState, useMemo } from "react";
import axios from "axios";
import AccordionItem from "../../../../components/Accordion/AccordionItem";
import { Button, Spacer } from "../../../../components";

import {BoolSIT, NotesSIT, CoordinatesSIT, FilesSIT, ImageGallerySIT, LinkSIT, NumberSIT, OptionsSIT, ReferenceSIT, TextSIT, DateTimeSIT, SampleTypeForm} from "../SampleInputTypes/index";

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
  User,
  Notebook,
  Time
} from '@carbon/icons-react';

import "./SampleList.scss";

import AddFormBlock from "../Add Form/AddFormBlock";
import AddFormGroup from "../Add Form/AddFormGroup";
import { useAppContext } from "../../../../context/appContext";
import { useParams } from "react-router-dom";

// Don't allow the user to switch without having to press ok on canceling or something like that. Ask Cole :D

const SampleTypeTab = () => {
  const { projectIdParams } = useParams();
  const [ project, setProject ] = useState({})

  //These come from the database 
  const [ sampleTypes, setSampleTypes ] = useState([]);
  const [ isExpandedSIT, setExpandedSIT] = useState(false)
  const [ isExpandedST, setExpandedST] = useState(null)

  // For the Adding functionality
  const [ STAddMenuShow, setSTAddMenuShow ] = useState(false)
  const [ STAddFormType, setSTAddFormType ] = useState(null)
  const [ isAddingSIT, setIsAddingSIT] = useState(false)
  const [ showAddButton, setShowAddButton ] = useState(true)
  
  // For Sample Types Forms
  const [ STAdding, setSTAdding ] = useState(false)
  const [ STEditing, setSTEditing ] = useState(false)
  
  // headers is for fields, titles is for the ST (gotta change them)
  const [ sampleTypesHeaders, setSampleTypesHeaders ] = useState([]);
  const [ sampleTypeTitles, setSampleTypesTitles ] = useState([]);

  const componentsIconList = {
    'TextSIT': LetterAa,
    'NumberSIT': CharacterWholeNumber,
    'ImageGallerySIT': ImageCopy,
    'FilesSIT': Document,
    'date': Calendar,
    'CoordinateSIT': Map,
    'person': User,
    'notes': Chat,
  }

  useEffect( () => {
    loadProject()
  }, [])


  useEffect(() => {
    if(Object.keys(project).length > 0){
      fetchData();
    }

  }, [project]);
  

  const loadProject = async () => {
    await axios.get(`http://localhost:5000/controller/project/getProject/${projectIdParams}`).then( (response) => {
        console.log(response) 
        if(response.status === 200){
            setProject(response.data)
        }
    })
}

  const fetchData = async () => {

    // const response = await axios.get('http://localhost:5000/controller/sampleType/getAllSampleTypes')

    const projectSampleTypesRequest = await axios.get(`http://localhost:5000/controller/project/getProjectSampleTypes/${project._id}`)
    const sampleTypeIds = projectSampleTypesRequest.data

    setSampleTypes(sampleTypeIds)

    let headerArray = []
    let sampleTypeTitlesArray = []

    for (let index = 0; index < sampleTypeIds.length; index++) {
      const element = sampleTypeIds[index];

      let listOfHeaders = []
      const elementFields = element.fields

      for (let elementIndex = 0; elementIndex < elementFields.length; elementIndex++) {
        const field_name = elementFields[elementIndex].values.field_name;
      
        listOfHeaders[elementIndex] = field_name
      }

      headerArray[index] = listOfHeaders
      sampleTypeTitlesArray[index] = element.sampleTypeName
    }
    
    setSampleTypesHeaders(headerArray)
    setSampleTypesTitles(sampleTypeTitlesArray)
  }


  const handleSubmit = async (fieldData, sampleTypeIndex, fieldIndex) => {  

    const isFormEdited = Object.values(fieldData).some((value, index) => {
      return value !== Object.values(sampleTypes[sampleTypeIndex].fields[fieldIndex].values)[index];
    });  

    if(!isFormEdited){
      setExpandedSIT(false)
      
      return
    }

    const updatedField = {
      ...sampleTypes[sampleTypeIndex].fields[fieldIndex],
      values: fieldData
    };

    const updatedFields = [...sampleTypes[sampleTypeIndex].fields];
    updatedFields[fieldIndex] = updatedField;

    const updatedSampleType = {
      ...sampleTypes[sampleTypeIndex],
      fields: updatedFields
    };

    const updatedSampleTypes = [...sampleTypes];
    updatedSampleTypes[sampleTypeIndex] = updatedSampleType;

    setSampleTypes(updatedSampleTypes);

    const sampleTypeId = sampleTypes[sampleTypeIndex]._id;

    const response = await axios.put(`http://localhost:5000/controller/sampleType/updateSampleType/updateField/${sampleTypeId}/${fieldIndex}`, fieldData);    

    setExpandedSIT(false)
  }

  const handleSITEdit = () => {
    setExpandedSIT(false)
  }

  const handleSITExpand = (id) => {
    if(id === isExpandedSIT){
      setExpandedSIT(false)
    }else{
      if(!isAddingSIT){
        setExpandedSIT(id)
      }
    }
  }

  const handleSTExpand = (id) => {
    if(STEditing !== false && STEditing !== id){
      alert("Close the edit form")
      return
    }

    if(id === isExpandedST){
      setExpandedST(false)
    }else{
      setExpandedST(id)
    }

      setShowAddButton(true)
      setSTAddMenuShow(false)
      setIsAddingSIT(false)
  }
  
  const handleSTCancel = (sampleTypeIndex, fieldIndex) => {
    
    setExpandedSIT(false)
    
    //to update the headers
    const updatedSTHeaders = [...sampleTypesHeaders]
    const updatedSTHeader = [...sampleTypesHeaders[sampleTypeIndex]]

    updatedSTHeader[fieldIndex] = sampleTypes[sampleTypeIndex].fields[fieldIndex].values.field_name

    updatedSTHeaders[sampleTypeIndex] = updatedSTHeader
    
    setSampleTypesHeaders(updatedSTHeaders)
  }

  const handleAddFormClick = (type, sampleTypeIndex) => {
    
    const STFields = [
      ...sampleTypes[sampleTypeIndex].fields
    ];

    let componentType;

    switch(type){
      case "text": componentType = "TextSIT"; break;
      case "number": componentType = "NumberSIT"; break;
      case "option": componentType = "BoolSIT"; break;
      case "coordinates": componentType = "CoordinateSIT"; break;
      case "gallery": componentType = "ImageGallerySIT"; break;
      case "files": componentType = "FilesSIT"; break;
      case "notes": componentType = "NotesSIT"; break;
      case "date": componentType = "DateTimeSIT"; break;
      case "link": componentType = "LinkSIT"; break;
    }

    const fieldToAdd = {
      'type': type,
      'component': componentType,
      'values': {}
    }

    const keys = Object.keys(STFields);
    const index = keys.length;

    STFields[index] = fieldToAdd
    
    const updatedSampleType = {
      ...sampleTypes[sampleTypeIndex],
      fields: STFields
    };

    
    const updatedSampleTypes = [...sampleTypes];
    updatedSampleTypes[sampleTypeIndex] = updatedSampleType;

    setSampleTypes(updatedSampleTypes);


    setSTAddFormType(type)
    setIsAddingSIT(true)
    setSTAddMenuShow(false)
    
  }
  
  const handleAddSITButtonClick = (sampleTypeIndex) => {

    if(isExpandedSIT){
      alert("Close everything else")
      return
    }

    // To prevent other sample type fields from being clicked
    setIsAddingSIT(true)
    
    setShowAddButton(false)
    setSTAddMenuShow(true)
  }

  const handleAddFormSave = async (formData, sampleTypeIndex) => {
    console.log("From handleAddSave")
    console.log(formData)
    console.log(sampleTypeIndex)
    const STFields = [
      ...sampleTypes[sampleTypeIndex].fields
    ];


    let componentType;

    switch(STAddFormType){
      case "text": componentType = "TextSIT"; break;
      case "number": componentType = "NumberSIT"; break;
      case "option": componentType = "BoolSIT"; break;
      case "coordinates": componentType = "CoordinateSIT"; break;
      case "gallery": componentType = "ImageGallerySIT"; break;
      case "files": componentType = "FilesSIT"; break;
      case "notes": componentType = "NotesSIT"; break;
      case "date": componentType = "DateTimeSIT"; break;
      case "link": componentType = "LinkSIT"; break;
    }

    const fieldToAdd = {
      'type': STAddFormType,
      'component': componentType,
      'values': formData
    }

    const keys = Object.keys(STFields);
    const index = keys.length-1;

    STFields[index] = fieldToAdd
    
    const updatedSampleTypes = [...sampleTypes];
    updatedSampleTypes[sampleTypeIndex].fields[index] = fieldToAdd;
    console.log(updatedSampleTypes)
    setSampleTypes(updatedSampleTypes);

    const sampleTypeId = sampleTypes[sampleTypeIndex]._id;

    setShowAddButton(true)
    setSTAddFormType(null)
    setSTAddMenuShow(false)
    setIsAddingSIT(false)

    const response = await axios.put(`http://localhost:5000/controller/sampleType/updateSampleType/addField/${sampleTypeId}`, STFields);    

  }

  const handleAddFormCancel = (sampleTypeIndex) => {  

    if(sampleTypesHeaders[sampleTypeIndex].length == sampleTypes[sampleTypeIndex].fields.length){
      const updatedSampleTypeHeaders = JSON.parse(JSON.stringify(sampleTypesHeaders))
      updatedSampleTypeHeaders[sampleTypeIndex].pop()
      setSampleTypesHeaders(updatedSampleTypeHeaders)
    }
    

    const updatedSampleTypes = JSON.parse(JSON.stringify(sampleTypes))
    updatedSampleTypes[sampleTypeIndex].fields.pop()
    

    setSampleTypes(updatedSampleTypes)
    
    setShowAddButton(true)
    setSTAddFormType(null)
    setSTAddMenuShow(false)
    setIsAddingSIT(false)
  }

  const handleOnFieldNameChange = (updatedName, sampleTypeIndex, fieldIndex) => {

      if(fieldIndex == null){
        fieldIndex = sampleTypes[sampleTypeIndex].fields.length-1
      }
      
      const updatedSTHeaders = [...sampleTypesHeaders]
      const updatedSTHeader = [...sampleTypesHeaders[sampleTypeIndex]]
      updatedSTHeader[fieldIndex] = updatedName

      updatedSTHeaders[sampleTypeIndex] = updatedSTHeader
      
      setSampleTypesHeaders(updatedSTHeaders)
  }

  const handleDelete = async (id) => {

    if(isAddingSIT){
      alert("close the add form first mate")
      return
    }

    const idSplit = id.split(" ")
    const sampleTypeIndex = idSplit[0]
    const fieldIndex = idSplit[1]
    
    const sampleTypeId = sampleTypes[sampleTypeIndex]._id

    const STFields = JSON.parse(JSON.stringify([...sampleTypes[sampleTypeIndex].fields]))
    STFields.splice(fieldIndex, 1)

    const STFieldHeaders = JSON.parse(JSON.stringify(sampleTypesHeaders))[sampleTypeIndex]
    STFieldHeaders.splice(fieldIndex, 1)
    
    const STFieldsHeaders = JSON.parse(JSON.stringify(sampleTypesHeaders))
    STFieldsHeaders[sampleTypeIndex] = STFieldHeaders

    setSampleTypesHeaders(STFieldsHeaders)

    const updatedSampleTypes = JSON.parse(JSON.stringify([...sampleTypes]))
    updatedSampleTypes[sampleTypeIndex].fields = STFields


    setSampleTypes(updatedSampleTypes)
    
    const response = await axios.put(`http://localhost:5000/controller/sampleType/updateSampleType/${sampleTypeId}`, updatedSampleTypes[sampleTypeIndex].fields);    
  }

  const addSampleType = () => {
   
    // can't open if something else is otg
    if(isAddingSIT || STEditing ){
      alert("Finish adding")
      return
    }

    // resetting states
    setExpandedST(null)



    setSTAdding(true)

    const updatedSampleTypes = JSON.parse(JSON.stringify(sampleTypes))

    const sampleTypeObject = {
      sampleTypeName: "",
      fields: []
    }

    updatedSampleTypes.push(sampleTypeObject)
    setSampleTypes(updatedSampleTypes)

    const updatedSampleTypeHeaders = [...sampleTypesHeaders]
    updatedSampleTypeHeaders.push([])

    setSampleTypesHeaders(updatedSampleTypeHeaders)
    
    // Need a delete on cancel
    // Fix adding sample fields to the added sample type


  }

  const handleSTAddFormCancel = () => {
    setSTAdding(false)

    if(sampleTypeTitles.length == sampleTypes.length){
      const updatedSampleTypesTitles = JSON.parse(JSON.stringify(sampleTypeTitles))
      updatedSampleTypesTitles.pop()
  
      setSampleTypesTitles(updatedSampleTypesTitles)
    }


    const updatedSampleTypes = JSON.parse(JSON.stringify(sampleTypes))
    updatedSampleTypes.pop()

    setSampleTypes(updatedSampleTypes)

  }

  const handleSTAddFormSave = async (formData) => {
    const sampleTypeIndex = sampleTypes.length - 1

    const updatedSampleTypes = [...sampleTypes]

    formData['project_id'] = project._id

    const response = await axios.post(`http://localhost:5000/controller/sampleType/addSampleType`, formData).then( (result) => {
      updatedSampleTypes[sampleTypeIndex]._id = result.data.sampleTypeID
      updatedSampleTypes[sampleTypeIndex].project_id = result.data.project_id
      updatedSampleTypes[sampleTypeIndex].sampleTypeName = result.data.sampleTypeName
      setSampleTypes(updatedSampleTypes)
    });

    setSTAdding(false) 
  }

  const handleSTNameChangeOnAdd = (st_name) => {

    const updatedSampleTypesTitles = JSON.parse(JSON.stringify(sampleTypeTitles))

    const sampleTypeIndex = sampleTypes.length - 1
    
    updatedSampleTypesTitles[sampleTypeIndex] = st_name
    setSampleTypesTitles(updatedSampleTypesTitles)
  }

  const handleSTDelete = async (index) => {
    if(STAdding){
      alert("Can't delete while ST is being added")
      return
    }

    if(STEditing !== false){
      alert("Can't delete while ST is being edited")
      return    
    }

    if(isExpandedST){
      // probably should delete all fields or something idk
      alert("Can't delete while ST is being used")
      return    
    }


    const updatedSampleTypeTitles = JSON.parse(JSON.stringify(sampleTypeTitles))
    updatedSampleTypeTitles.splice(index, 1)

    setSampleTypesTitles(updatedSampleTypeTitles)

    const sampleTypeId = sampleTypes[index]._id

    const updatedSampleTypes = JSON.parse(JSON.stringify(sampleTypes))
    updatedSampleTypes.splice(index, 1)

    setSampleTypes(updatedSampleTypes)

    const response = await axios.delete(`http://localhost:5000/controller/sampleType/deleteSampleType/${sampleTypeId}`);
    
  }

  const handleSTEdit = (sampleTypeIndex) => {
    
    if(isAddingSIT ){
      window.alert("Close everything else mate")
      return
    }

    if(STEditing === sampleTypeIndex){
      return
    }

    if(STEditing !== false){
      
      //Cancel options?

      if(window.confirm("Are you sure you want to cancel the current edit form?")){
          
          const updatedSampleTypeTitles = JSON.parse(JSON.stringify(sampleTypeTitles))
          updatedSampleTypeTitles[STEditing]=sampleTypes[STEditing].sampleTypeName
        
          setSTEditing(sampleTypeIndex)
          setSampleTypesTitles(updatedSampleTypeTitles)

          setExpandedST(sampleTypeIndex)

      }else{
      
      }
    }else{
 
      setSTEditing(sampleTypeIndex)
    }

  }

  const handleSTNameChangeOnEdit = (st_name) => {
    const updatedSampleTypesTitles = JSON.parse(JSON.stringify(sampleTypeTitles))
    updatedSampleTypesTitles[STEditing] = st_name
    
    setSampleTypesTitles(updatedSampleTypesTitles)
  }

  const handleSTEditFormSave = async (formData) => {
    const sampleTypeId = formData._id
    const response = await axios.put(`http://localhost:5000/controller/sampleType/updateSampleType/onEdit/${sampleTypeId}`, formData);    
    
    setSTEditing(false)
    
    const updatedSampleTypes = JSON.parse(JSON.stringify(sampleTypes))
    updatedSampleTypes[STEditing] = formData
    setSampleTypes(updatedSampleTypes)
  }

  const handleSTEditFormCancel = (initialState) => {
    
    const updatedSampleTypes = JSON.parse(JSON.stringify(sampleTypes))
    updatedSampleTypes[STEditing] = initialState
    
    const updatedSampleTypeTitles = JSON.parse(JSON.stringify(sampleTypeTitles))
    updatedSampleTypeTitles[STEditing]=sampleTypes[STEditing].sampleTypeName

    setSTEditing(false)
    setSampleTypes(updatedSampleTypes)
    setSampleTypesTitles(updatedSampleTypeTitles)

  }

  const handleAddFormMenuCancel = () => {
    setSTAddMenuShow(false)
    setIsAddingSIT(false)
    setShowAddButton(true)
  }

  return (
    <>
      <div className="sample-list-wrap">
        <Spacer size='_055'/> 

        {sampleTypes.map((sampleType, sampleTypeIndex) => (
            <div key={sampleTypeIndex}>
              
              <AccordionItem handleEdit={handleSTEdit} handleDelete={handleSTDelete} id={sampleTypeIndex} isExpanded={sampleTypeIndex === isExpandedST} handleExpand={handleSTExpand} showAddButton = { showAddButton } buttonOnClick={(e) => { handleAddSITButtonClick(sampleTypeIndex) }}>
                <div>{sampleTypeTitles[sampleTypeIndex]} </div>
                {sampleType.fields.map((field, fieldIndex) => {
                  const Component = field.component;
                  const accordionItemId = sampleTypeIndex.toString() + " " + fieldIndex.toString()

                  if(Component === "TextSIT")               { return <AccordionItem handleDelete={handleDelete} icon={LetterAa}               headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <TextSIT             onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "NumberSIT")        { return <AccordionItem handleDelete={handleDelete} icon={CharacterWholeNumber}   headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <NumberSIT           onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "CoordinateSIT")    { return <AccordionItem handleDelete={handleDelete} icon={Map}                    headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <CoordinatesSIT      onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "BoolSIT")          { return <AccordionItem handleDelete={handleDelete} icon={DecisionTree}           headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <BoolSIT             onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "ImageGallerySIT")  { return <AccordionItem handleDelete={handleDelete} icon={ImageCopy}              headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <ImageGallerySIT     onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "FilesSIT")         { return <AccordionItem handleDelete={handleDelete} icon={Document}               headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <FilesSIT            onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "NotesSIT")         { return <AccordionItem handleDelete={handleDelete} icon={Document}               headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <NotesSIT            onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "DateTimeSIT")      { return <AccordionItem handleDelete={handleDelete} icon={Time}                   headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <DateTimeSIT         onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}
                  else if(Component === "LinkSIT")          { return <AccordionItem handleDelete={handleDelete} icon={Link}                   headerText={sampleTypesHeaders[sampleTypeIndex][fieldIndex]} id={accordionItemId} key={sampleTypeIndex+'-'+fieldIndex} isExpanded={accordionItemId === isExpandedSIT} handleExpand={handleSITExpand}> <LinkSIT            onFNChange = {handleOnFieldNameChange} initialState={sampleType.fields[fieldIndex].values} onSave={handleSubmit} sampleTypeIndex={sampleTypeIndex} fieldIndex={fieldIndex} onCancel={handleSTCancel} /> </AccordionItem>}

                })}
 
              </AccordionItem>
              
              { (isExpandedST === sampleTypeIndex && STAddMenuShow) && (
                <div>
                {/* Add the rest of the form blocks */}
                  <AddFormGroup>
                    <AddFormBlock Icon={LetterAa}               title={"Text"}          onClick={ (e) => handleAddFormClick("text",         sampleTypeIndex) }/>    
                    <AddFormBlock Icon={CharacterWholeNumber}   title={"Number"}        onClick={ (e) => handleAddFormClick("number",       sampleTypeIndex) }/>    
                    <AddFormBlock Icon={Map}                    title={"Coordinates"}   onClick={ (e) => handleAddFormClick("coordinates",  sampleTypeIndex) }/>    
                    <AddFormBlock Icon={DecisionTree}           title={"Bool"}          onClick={ (e) => handleAddFormClick("option",       sampleTypeIndex) }/>    
                    <AddFormBlock Icon={ImageCopy}              title={"Image Gallery"} onClick={ (e) => handleAddFormClick("gallery",      sampleTypeIndex) }/>    
                    <AddFormBlock Icon={Document}               title={"Files"}         onClick={ (e) => handleAddFormClick("files",        sampleTypeIndex) }/>    
                    <AddFormBlock Icon={Notebook}               title={"Notes"}         onClick={ (e) => handleAddFormClick("notes",        sampleTypeIndex) }/>    
                    <AddFormBlock Icon={Time}                   title={"Time"}          onClick={ (e) => handleAddFormClick("date",         sampleTypeIndex) }/>    
                    <AddFormBlock Icon={Link}                   title={"Link"}          onClick={ (e) => handleAddFormClick("link",         sampleTypeIndex) }/>    
                  </AddFormGroup>

                  <Button text={"Close"} buttonStyle={"primary"} onChange={(e) => {handleAddFormMenuCancel()}}/>
                </div>
              ) }

              { (isExpandedST === sampleTypeIndex && isAddingSIT === true) &&  (
                <div>
                 { STAddFormType === "text"         && <TextSIT         isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "number"       && <NumberSIT       isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "coordinates"  && <CoordinatesSIT  isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "option"       && <BoolSIT         isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "gallery"      && <ImageGallerySIT isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "files"        && <FilesSIT        isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "notes"        && <NotesSIT        isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "date"         && <DateTimeSIT     isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                 { STAddFormType === "link"         && <LinkSIT         isAdding={true} onFNChange = {handleOnFieldNameChange} sampleTypeIndex={sampleTypeIndex} onSave={handleAddFormSave}    onCancel={handleAddFormCancel} /> }
                </div>
              ) }
            </div>
        ))}

        { (STAdding) && (
          <div className="sampleTypeForm">
            <SampleTypeForm onSave={handleSTAddFormSave} onCancel={handleSTAddFormCancel} onSNChange={handleSTNameChangeOnAdd} isAdding={true}/>
          </div>
        )}

        { (!STAdding) && (
          <div className="sampleTypeAddButton">
            <Button text={"Add Sample Type"} buttonStyle={"primary"} onChange={addSampleType}/>
          </div>
        )}
        
        { (STEditing!==false) && (
          <div className="sampleTypeAddButton">
            {STEditing}
            <SampleTypeForm initialState={sampleTypes[STEditing]} onSave={handleSTEditFormSave} onCancel={handleSTEditFormCancel} onSNChange={handleSTNameChangeOnEdit}/>
          </div>
        )}
      </div>

    </>
  )
}
  
export default SampleTypeTab;