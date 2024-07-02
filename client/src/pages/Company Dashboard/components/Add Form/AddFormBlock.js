import React from 'react'
import './FormBlock.scss'

const AddFormBlock = ({ Icon, title, onClick }) => {


    return (
        <div className='project-new-grid-item' onClick={ onClick }>
            <Icon />
            <div> {title} </div>

        </div>
    )
}


export default AddFormBlock