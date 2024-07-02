import React from 'react';
import { useAppContext } from '../../context/appContext';
import { CheckmarkFilled } from '@carbon/icons-react';
import { Error } from '@carbon/icons-react';
import { CloudUpload } from '@carbon/icons-react';
import { CloudDownload } from '@carbon/icons-react';
import { Renew } from '@carbon/icons-react';
import { ChangeCatalog } from '@carbon/icons-react';
import { Warning } from '@carbon/icons-react';
import { TableShortcut } from '@carbon/icons-react';
import { WifiOff } from '@carbon/icons-react';
import './AppStatus.scss';

const AppStatus = ({currentStatus}) => {

    const componentsIconList = {
        good: CheckmarkFilled,       //Status = good
        error: Error,                //Status = error
        syncing: Renew,              //Status = syncing
        warning: Warning,            //Status = warning
        'no-connection': WifiOff,    //Status = no-connection
        ChangeCatalog,               //View Changes in Current Session
        TableShortcut,               //Export Data
        CloudUpload,
        CloudDownload,
    }

    const CarbonIcon = componentsIconList[currentStatus];

    // const { currentStatus } = useAppContext();
    
    return <div className='status-bar'>
                <div className='status-wrap'>
                    <CarbonIcon className={`status-icon ${currentStatus}`}/>
                </div>
                <div className='status-spacer'></div>
                <button className='status-wrap' title='Data Export [Coming Soon]'>
                    <TableShortcut className='status-icon'/>
                </button>
                <div className='status-spacer'></div>
                <button className='status-wrap' title='Project Changes'>
                    <ChangeCatalog className='status-icon'/>
                </button>
            </div>
}

export default AppStatus;