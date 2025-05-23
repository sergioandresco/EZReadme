import { useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import TitleComponent from "@/components/readmeElements/title";
import SubTitleComponent from "@/components/readmeElements/subtitle";
import ParagraphComponent from "@/components/readmeElements/paragraph";
import UploadImage from "@/components/readmeElements/uploadImage";
import AlertBlock from "@/components/readmeElements/alert";
import CodeBox from "@/components/readmeElements/codeBox";
import TableComponent from "@/components/readmeElements/table";
import ListComponent from "@/components/readmeElements/list";

function ContainerElements() {

    const [markdownType, setMarkdownType] = useState('NOTE');
    const [codeType, setCodeType] = useState('JS');

    return (
        <Paper 
            elevation={3}
            sx={{
                padding: '0px',
                height: "100%",
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
            }}
            id="container-elements"
        >
            <Box
            sx={{
                maxHeight: '500px',
                overflowY: 'auto',
                borderRadius: '8px',
                padding: 2,
            }}
            >
                <TitleComponent />
                <SubTitleComponent />
                <ParagraphComponent />
                <UploadImage />
                <AlertBlock
                    markdownType={markdownType} 
                    setMarkdownType={setMarkdownType} 
                />
                <CodeBox 
                    codeType={codeType} 
                    setCodeType={setCodeType}
                />
                <TableComponent />
                <ListComponent />
            </Box>
        </Paper>
    );
}

export default ContainerElements;