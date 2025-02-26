import { Grid, Paper, Box, Typography } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { useReadme } from "../../context/saveElements";
import { toast } from "sonner";

function ReadmeCode() {

    const { elements } = useReadme();

    const generateMarkdown = () => {
        return elements
            .map((el) => {
                switch (el.type) {
                    case "title":
                        return `# ${el.text}`;
                    case "subtitle":
                        return `## ${el.text}`;
                    case "paragraph":
                        return el.text;
                    case "image":
                        return `![Insert the name of your image](Insert image URL here)`;
                    case "markdown":
                        return `> [!${el.title}]\n> ${el.text}`;
                    case "codeBox":
                        return `\`\`\`${el.codeType}\n${el.text}\n\`\`\``;
                    case "table":
                        return el.data.map((row) => `| ${row.join(" | ")} |`).join("\n");
                    case "list":
                        return el.items.map((item) => `- ${item}`).join("\n");
                    default:
                        return "";
                }
            })
            .join("\n\n");
    };

    const handleCopy = () => {
        const markdownText = generateMarkdown();
        navigator.clipboard.writeText(markdownText)
            .then(() => {
                toast.success("Markdown copied to clipboard");
            })
            .catch((err) => console.error("Failed to copy:", err));
    };

    return ( 
        <Grid
            item
            xs={12}
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
                id="readme-code-live"
            >
                <Box
                    sx={{
                        maxHeight: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 2,
                        background: 'linear-gradient(90deg, #2c3e50 0%, #4a6491 100%)',
                        borderRadius: '12px 12px 0px 0px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                    >
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1.5
                    }}>
                        <Box 
                        component="span" 
                        sx={{ 
                            width: 18, 
                            height: 18, 
                            borderRadius: '50%', 
                            background: '#4caf50', 
                            display: 'inline-block',
                            boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)' 
                        }} 
                        />
                        <Typography 
                        variant="h3" 
                        sx={{ 
                            fontFamily: 'Acorn', 
                            fontSize: '20px', 
                            color: 'white',
                            fontWeight: 500,
                            letterSpacing: '0.3px'
                        }}
                        >
                            Code on Markdown language
                        </Typography>
                    </Box>
                    <Box 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                transform: 'scale(1.05)'
                            }
                        }}
                        id="readme-code-copy"
                    >
                        <MdContentCopy 
                            style={{ width: '22px', height: '22px', cursor: 'pointer', color: 'white' }}
                            onClick={handleCopy}
                        />
                    </Box>
                </Box>
                <Box
                sx={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    borderRadius: '8px',
                    padding: 2,
                }}
                >
                    <pre>{generateMarkdown()}</pre>
                </Box>
            </Paper>
        </Grid>
    );
}

export default ReadmeCode;