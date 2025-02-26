import { Grid } from "@mui/material";
import Title from "@/components/title";
import CreationReadmeLayout from "@/design/creationReadme";

function PrincipalLayout() {
    return ( 
        <Grid 
            container 
            spacing={3} 
            sx={{
                width: '100%', 
                padding: '0px', 
                margin: '0px' 
            }}
        >
            <Title />
            <CreationReadmeLayout />
        </Grid>
    );
}

export default PrincipalLayout;