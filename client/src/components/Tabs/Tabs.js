import React, { useState } from 'react';

import Tab from "./Tab";
import TabList from "./TabList";
import TabPanel from "./TabPanel";
import TabPanels from "./TabPanels";

const Tabs = ({children})  => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    const tabList = React.Children.map(children, (child, index) => {

        if (child.type.name === 'Tab') {
            const isActive = activeTabIndex === index;
            return React.cloneElement(child, { isActive, onClick: () => handleTabClick(index) });
        }
    });

    const tabPanels = React.Children.map(children, (child, index) => {
    if (child.type.name === 'TabPanel') {
        const isActive = activeTabIndex === index;
        return React.cloneElement(child, { isActive });
    }
    });

    return (
        <div className="tabs">
            <TabList>{children}</TabList>
            <TabPanels>{children}</TabPanels>
        </div>
    );
}


export default Tabs;