import React from "react";
import {TreeView, TreeNode} from "@carbon/react";
import {Folder, FolderShared, Document, DocumentSigned, DocumentPdf} from "@carbon/icons-react";

const Tree = () => {
    return (

        <>
            <TreeView>
                <TreeNode
                    id="3"
                    label="Field Reports"
                    renderIcon={Folder}
                >
                    <TreeNode
                    id="3-1"
                    label="Report March 25th.pdf"
                    renderIcon={DocumentPdf}
                    />
                    
                    <TreeNode
                    id="3-2"
                    label="Report March 30th.pdf"
                    renderIcon={DocumentPdf}
                    />
                </TreeNode>

               

                <TreeNode
                    id="5"
                    label="Paperwork"
                    renderIcon={Folder}
                >
                    <TreeNode
                    id="5-1"
                    label="Project Approval"
                    renderIcon={DocumentSigned}
                    />

                    <TreeNode
                    id="5-2"
                    label="Tag Order Request"
                    renderIcon={DocumentSigned}
                    />
                    
                </TreeNode>
                <TreeNode
                    id="6"
                    label="Shared Files"
                    renderIcon={FolderShared}
                >
                    <TreeNode
                    id="6-1"
                    label="Team Report.pdf"
                    renderIcon={DocumentPdf}
                    value="Big data"
                    />
                </TreeNode>
                {/* <TreeNode
                    id="6"
                    label="Shared Files"
                    renderIcon={FolderShared}
                /> */}
            </TreeView>


        </>
    );
};

export default Tree;
