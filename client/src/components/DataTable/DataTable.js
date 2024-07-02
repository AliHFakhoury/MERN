import React, { useEffect, useState } from 'react';
import { Button, DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableContainer, TableToolbarSearch, TableToolbar, TableToolbarContent } from 'carbon-components-react';
import './DataTable.scss';


const DataTableComponent = ({ headersProp, rowDataProp }) => {

    const [rows, setRows] = useState([{}]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    // const [editCell, setEditCell] = useState(null);
    const [headers, setHeaders] = useState([])

   

    useEffect(() => {
        if(headersProp.length > 0){
            setHeaders(headersProp)
        }
    }, [headersProp])
    
    useEffect(()=>{
        if(Object.keys(rowDataProp).length > 0){
            let samples = rowDataProp.ST_Samples
            let fields = rowDataProp.fields
            let rowsArray = []
            
            samples.forEach((sample) => {
                let objectData = {}

                fields.forEach((field) => {

                    let key = field.values.field_name
                    let sampleData = sample.data[key]

                    if(sampleData != undefined){
                        switch (field.type) {
                            case "coordinates":
                                // Latitude: 40 degrees 42 minutes 51 seconds North
                                // Longitude: 74 degrees 0 minutes 21 seconds West
                                // In DMS format, this coordinate would be written as 40° 42' 51" N, 74° 0' 21" W.
                                
                                let string = ""
                                if(sampleData.value.coordinate_type == "DMS"){
                                    let sampleDataValue = sampleData.value
                                    
                                    let lat_degrees = sampleDataValue.lat_degrees
                                    let lat_minutes = sampleDataValue.lat_minutes
                                    let lat_seconds = sampleDataValue.lat_seconds
                                    
                                    let lon_degrees = sampleDataValue.lon_degrees
                                    let lon_minutes = sampleDataValue.lon_minutes
                                    let lon_seconds = sampleDataValue.lon_seconds

                                    // change star to degree
                                    string = lat_degrees + "* " + lat_minutes +"' "+lat_seconds+" \" N, " + lon_degrees + "* " + lon_minutes + "' " + lon_seconds + "\" W"
                                }else{
                                    //Latitude: 40.7142° N
                                    //Longitude: -74.0059° W
                                    //In DD format, this coordinate would be written as 40.7142° N, -74.0059° W.

                                    let sampleDataValue = sampleData.value
                                    let latitude = sampleDataValue.latitude
                                    let longitude = sampleDataValue.longitude
                                    
                                    // change star to degree
                                    string = latitude + "* N, " + longitude + "* W"
                                }                            
                                
                                objectData[key] = string
    
                                break;
                            case "files":
                                objectData[key] = "files..."
                                break;
                            case "option":
                                let fieldOptions = field.values
                                
                                let lhs = fieldOptions.lhsText
                                let rhs = fieldOptions.rhsText
                                
                                let boolValue;

                                if(sampleData.value){
                                    boolValue = fieldOptions.argument[0]
                                }else{
                                    boolValue = fieldOptions.argument[1]
                                }
    
                                objectData[key] = lhs + " "+boolValue+" " + rhs
                                break;
                            case "link":
                                objectData[key] = "<a>"+sampleData.value

                                break;
                            default:
                                objectData[key] = sampleData.value
                                break;
                        } 
                    }else{

                        //set default values here
                        switch (field.type) {
                            case "option":
                                let fieldOptions = field.values
                                
                                let lhs = fieldOptions.lhsText
                                let rhs = fieldOptions.rhsText
                                
                                let boolValue = fieldOptions.argument[1]

                                objectData[key] = lhs + " "+boolValue+" " + rhs
                                break;
                            default:
                                objectData[key] = ""
                                break;
                        }  
                    }                    
                })

                const objectToPush = {  // this syntax exists?!?!?!?! 
                    id: sample._id,
                    ...objectData
                }
                
                rowsArray.push(objectToPush)
            })

            setRows(rowsArray)

        }
    }, [rowDataProp])

    

    // const handleCellDoubleClick = (rowId, key) => {
    //     setEditCell({ rowId, key });
    // };

    // const handleCellEdit = (event, rowId, key) => {
    //     const updatedRows = rows.map((row) => {
    //         if (row.id === rowId) {
    //         return {
    //             ...row,
    //             [key]: event.target.innerText,
    //         };
    //         }
    //         return row;
    //     });
    //     setRows(updatedRows);
    //     setEditCell(null); // turn off edit mode after saving changes
    // };


    
    return (
        <>
            {Object.keys(rows).length !== 0 ? (
                <DataTable rows={rows} headers={headers} selectedRows={selectedRowIds} onRowSelected={setSelectedRowIds} isSortable={true}>
                    {({ rows, getHeaderProps, getRowProps, getSelectionProps, getBatchActionProps, onInputChange }) => (
                        <TableContainer title="Sample Type Data">
                            <TableToolbar>
                                <TableToolbarContent>
                                    <TableToolbarSearch tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0} onChange={onInputChange} />
                                    
                                    {/* <Button   **********FOR V1
                                        tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                                        onClick={() => addRow({ id: 'newRow', name: 'New Row', age: 0 })}
                                        size="lg"  I changed this cause it was giving an error, it was set to small initially k thanks 
                                        kind="primary"
                                    >
                                        Add new
                                    </Button> */}

                                    
                                </TableToolbarContent>
                            </TableToolbar>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {headers.map((header) => (
                                            <TableHeader {...getHeaderProps({ header })} key={header.key}>
                                                {header.header}
                                            </TableHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow {...getRowProps({ row })} key={row.id}>
                                            {row.cells.map((cell) => {
                                                if(cell.value.includes('<a>')){
                                                    const link = cell.value.slice(3)
    
                                                    return (
                                                        <TableCell
                                                            key={cell.id}
                                                            // onClick={() => handleCellDoubleClick(row.id, cell.id)}
                                                            // contentEditable={editCell && editCell.rowId === row.id && editCell.key === cell.id}
                                                            // onBlur={(event) => handleCellEdit(event, row.id, cell.id)}
                                                        >
                                                            <a href={link}>{link}</a>
                                                        </TableCell>
                                                    ) 
                                                }else{
                                                    return (
                                                        <TableCell
                                                            key={cell.id}
                                                            // onClick={() => handleCellDoubleClick(row.id, cell.id)}
                                                            // contentEditable={editCell && editCell.rowId === row.id && editCell.key === cell.id}
                                                            // onBlur={(event) => handleCellEdit(event, row.id, cell.id)}
                                                        >
                                                            {cell.value}
                                                        </TableCell>
                                                    )
                                                } 
                                            }
                                            
                                                
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DataTable>

            ): (
                <>
                Empty State
                </>
            )}
        </>
        
             
    );
};

export default DataTableComponent;