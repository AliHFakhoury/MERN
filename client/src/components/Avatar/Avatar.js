import React from 'react';
import './Avatar.scss';

const Avatar = () => {
    // const { notification, userInitials, userColour, userProfilePic } = useAppContext(); CODE LATER
    return <div className={'avatar'}>
                <div className='notification'></div>
            </div>
}

// Props for Avatar: User Initials, User Colour, User Profile Pic, Has Notification (This might be easier to show/hide this with a state/prop than SCSS)

export default Avatar;