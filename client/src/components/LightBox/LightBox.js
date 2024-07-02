import React from 'react';
import { Close, AddComment, Chat } from '@carbon/icons-react';
import UserLabel from "../UserLabel/UserLabel";

import './LightBox.scss';
import Spacer from '../Spacer/Spacer';

const LightBox = ({children}) => {
    
    return (
        <>
        <div className='light-box-grid'>
            {children[0]}
            {children[1]}
            {children[2]}
            {children[3]}
            {children[4]}
            <div className='last-item'>
                {children[5]}
                {children[6]}
                {children[7]}
                {children[8]}
            </div>
        </div>
{/* Add or remove the hide class to view the lightbox overlay */}
        <div className='light-box '>    
            <span className='close'><Close className='icon'/></span>
            <div className='light-box-content'>
                <>
                    <img src='http://unsplash.it/600/300' alt='sample image' className='light-box-selected-image'/>
                    <div className='light-box-image-info'>
                        <div>
                            <label>Main</label>
                            <Spacer size='_03'/>
                            <div>
                            Image caption - Double click to edit
                            </div> 
                            <div className='divider'/>
                        </div>
                        <div>
                            <label>Pinned Notes</label>
                            <Spacer size='_03'/>
                            <div className='pinned-note-wrapper'>
                                <Chat className='icon'/>
                                This is an example of a pinned note that is longer than the new pinned note. These should be limited to one line of text with ... at the end.
                            </div>
                            <div className='pinned-note-wrapper'>
                                <Chat className='icon'/>
                                This is an example of a pinned note.
                            </div>
                            <div className='pinned-note-wrapper new'>
                                <AddComment className='icon'/>
                                Add a new pinned note
                            </div>
                            <div className='divider'/>
                        </div>
                        <div>
                            <label>Image Tags</label>
                            <Spacer size='_04'/>
                            <div className='user-label-wrap'>
                                <UserLabel labelText='Visable Gold' colour='ruby'/>
                                <UserLabel labelText='Chris M.' colour='olive'/>
                                <UserLabel labelText='Processed' colour='alt-pink'/>
                                <UserLabel labelText='In Quartz' colour='indigo'/>
                            </div>
                            <div className='divider'/>
                        </div>

                        <div>
                            <label>File Data</label>
                            <Spacer size='_03'/>
                            <span className='info-bit'>img_0369.jpeg</span>
                            <span className='info-bit space'>·</span>
                            <span className='info-bit'>658kb</span>
                            <span className='info-bit space'>·</span>
                            <span className='info-bit'>Date Taken</span>
                        </div>
                    </div>
                </>
            </div>
            <div className='light-box-carousel'>
                {children}
            </div>
        </div>
        </>
    );
};

export default LightBox;