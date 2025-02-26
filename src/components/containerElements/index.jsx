import { useState } from "react";
import { Grid, Paper, Box } from "@mui/material";
import TitleComponent from "@/components/readmeElements/title";
import SubTitleComponent from "@/components/readmeElements/subtitle";
import ParagraphComponent from "@/components/readmeElements/paragraph";
import UploadImage from "@/components/readmeElements/uploadImage";
import MarkDownBlock from "@/components/readmeElements/markdownBlock";
import CodeBox from "@/components/readmeElements/codeBox";
import TableComponent from "@/components/readmeElements/table";
import ListComponent from "@/components/readmeElements/list";

function ContainerElements() {

    const [markdownType, setMarkdownType] = useState('NOTE');
    const [codeType, setCodeType] = useState('JS');

    return ( 
        <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{
                padding: '20px !important',
                height: '585px',
            }}
        >
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
                    <MarkDownBlock
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
        </Grid>
    );
}

export default ContainerElements;