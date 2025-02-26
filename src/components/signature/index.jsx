import { Box, Stack, Typography, IconButton } from "@mui/material";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import StarBorder from "../animation/starBorder";

import Logo from '../../resources/images/serch.png';

function Signature() {
    return ( 
        <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
            <Stack spacing={1} alignItems="center">

                <StarBorder
                    className="custom-class"
                    color="red"
                    speed="5s"
                >
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <Typography variant="h6" sx={{ fontFamily: 'Acorn', color: 'white', fontSize: '20px' }}>Developed by Sergio Cobos</Typography>
                        <img src={Logo} alt="Sergio Cobos Logo" width={72} style={{ margin: '0px' }} />
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ marginTop: '0px !important', justifyContent: 'center' }}>
                        <IconButton 
                            component="a" 
                            href="https://www.instagram.com/sergioandresco/" 
                            target="_blank" 
                            aria-label="Instagram"
                            sx={{ margin: '0px !important' }}
                        >
                            <FaInstagram style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton 
                            component="a" 
                            href="https://github.com/sergioandresco" 
                            target="_blank" 
                            aria-label="GitHub"
                            sx={{ margin: '0px !important' }}
                        >
                            <FaGithub style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton 
                            component="a" 
                            href="https://www.linkedin.com/in/sergio-andres-cobos-suarez-942637219/" 
                            target="_blank" 
                            aria-label="LinkedIn"
                            sx={{ margin: '0px !important' }}
                        >
                            <FaLinkedin style={{ color: 'white' }} />
                        </IconButton>
                    </Stack>
                </StarBorder>
            </Stack>
        </Box>
     );
}

export { Signature };