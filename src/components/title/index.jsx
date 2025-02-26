import { Typography, Box } from "@mui/material";

function Title() {
    return ( 

        <Box sx={{ width: '100%' }}>
            <Typography 
                variant="h1"
                sx={{
                    fontFamily: 'Acorn',
                    fontWeight: 600,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: { xs: '4rem', sm: '5rem', md: '5rem', lg: '6rem' }
                }}
            >
                EZReadme
            </Typography>
        </Box>
        
    );
}

export default Title;