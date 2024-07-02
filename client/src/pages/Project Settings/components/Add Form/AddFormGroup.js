import React, { useEffect, useState } from 'react'
import './AddFormGroup.scss'

const AddFormGroup = ({ children }) => {
    return (
        <div className='w-layout-grid settings-sample-type-field-options-grid button-wrapper'>       
            { children }
        </div>
    )
}


export default AddFormGroup