import { Grid, Box } from "@mui/material";
import ContainerElements from "@/components/containerElements";
import ReadmeCanva from "@/components/readmeCanva";
import ReadmeCode from "@/components/readmeCode";

function CreationReadmeLayout() {
    return ( 
        <Grid
            container
            spacing={3} 
            sx={{ 
                padding: '0px', 
                margin: '0px',
            }}
            className="creationReadmeLayout"
        >
            <Box 
                sx={{ 
                    display: {xs: 'flex', md: 'contents', lg: 'contents'}, 
                    flexDirection: {xs: 'column', sm: 'row', md: 'row', lg: 'row'} }}>
                <ContainerElements />
                <ReadmeCanva />
            </Box>
            <ReadmeCode />
        </Grid>
    );
}

export default CreationReadmeLayout;