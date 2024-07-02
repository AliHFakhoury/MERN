import React, { useEffect } from "react";

import {Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";

import { EmptyState } from "../../../components";
import SampleTypeTab from "./Sample Type Tab/SampleTypeTab";

import { useAppContext } from "../../../context/appContext";
import GeneralTab from "./GeneralTab/GeneralTab";


const TabsMenu = () => {
    return (
        <Tabs>
         
            <TabList aria-label="List of tabs" activation="manual">
                <Tab>General</Tab>
                {/* Gotta fix the width */}
                <Tab>Sample Types</Tab>
                <Tab>User Settings</Tab>
                <Tab>Billing</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <GeneralTab />
                </TabPanel>
                <TabPanel>
                    <SampleTypeTab />
                </TabPanel>
                <TabPanel>
                <EmptyState
                        heading={'Coming Soon...'}
                        text={'To change account settings, please contact us.'}
                        buttonOneText={'Contact Us'}
                        imgSrc={''}
                    />
                </TabPanel>
                <TabPanel>
                    <EmptyState
                        heading={'View your billing details on Stripe'}
                        text={'Securely manage your subscriptions and seats.'}
                        buttonOneText={'View Billing'}
                        imgSrc={''}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default TabsMenu;