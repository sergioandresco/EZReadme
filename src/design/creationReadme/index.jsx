import { Grid, Box } from "@mui/material";
import ContainerElements from "@/components/containerElements";
import ReadmeCanva from "@/components/readmeCanva";
import ReadmeCode from "@/components/readmeCode";

function CreationReadmeLayout() {
    return ( 
        <Grid
            container
            sx={{ 
                padding: '0px', 
                margin: '0px',
                justifyContent: { xs: 'center', md: 'unset' },
            }}
            className="creationReadmeLayout"
        >
            <Grid item xs={10} md={3} sx={{ height: '585px', padding: { xs: '24px 0px 0px 0px', md: 3 } }}>
                <ContainerElements />
            </Grid>

            <Grid item xs={10} md={5} sx={{ height: '585px', padding: { xs: '24px 0px 0px 0px', md: 3 } }}>
                <ReadmeCanva />
            </Grid>

            <Grid item xs={10} md={4} sx={{ height: '585px', padding: { xs: '24px 0px 0px 0px', md: 3 } }}>
                <ReadmeCode />
            </Grid>
        </Grid>
    );
}

export default CreationReadmeLayout;