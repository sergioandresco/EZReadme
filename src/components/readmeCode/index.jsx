import { useState } from "react";
import { Grid, Paper, Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { useReadme } from "../../context/saveElements";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css/github-markdown.css';
import './readmeCode.css';

function ReadmeCode() {

    const { elements } = useReadme();
    const [viewMode, setViewMode] = useState("edit");

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
                    case "alert":
                        return `> [!${el.title}]\n> \n> ${el.text}`;
                    case "codeBox":
                        return `\`\`\`${el.codeType}\n${el.text}\n\`\`\``;
                    case "table":
                        if (!Array.isArray(el.data) || el.data.length === 0) {
                            return "⚠️ Table data is missing or invalid";
                        }
                    
                        const columnCount = Math.max(...el.data.map(row => row.length));
                    
                        const normalizeRow = (row) => 
                            `| ${row.map(cell => cell || "").join(" | ")} |`;
                    
                        const header = normalizeRow(el.data[0]);
                    
                        const separator = `| ${Array(columnCount).fill("---").join(" | ")} |`;
                    
                        const rows = el.data.slice(1).map(normalizeRow);
                    
                        return [header, separator, ...rows].join("\n");
                    case "list":
                        return el.items.map((item) => `- ${item.replace(/(.{30})/g, "$1\u200B")}`).join("\n");
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

    const markdownContent = generateMarkdown();

    return (
        <Paper 
            elevation={3}
            sx={{
                padding: '0px',
                height: "100%",
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
            }}
            id="readme-code-live"
        >
            <Box
                sx={{
                    maxHeight: 'max-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                    background: 'linear-gradient(90deg, #2c3e50 0%, #4a6491 100%)',
                    borderRadius: '12px 12px 0px 0px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 1.5,
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1.5,
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    <Box
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <Box 
                            component="span" 
                            sx={{ 
                                width: 12, 
                                height: 12, 
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
                                fontSize: '17px', 
                                color: 'white',
                                fontWeight: 500,
                                letterSpacing: '0.3px',
                                width: '170px',
                                textAlign: { xs: 'center', md: 'start' },
                            }}
                        >
                            Code on Markdown language
                        </Typography>
                    </Box>
                    <ToggleButtonGroup
                        id="readme-code-toggle"
                        value={viewMode}
                        exclusive
                        onChange={(event, newMode) => {
                            if (newMode !== null) setViewMode(newMode);
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            '& .MuiToggleButton-root': {
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '500',
                                border: 'none',
                                textTransform: 'none',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    fontWeight: '600',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                }
                            }
                        }}
                    >
                        <ToggleButton id="code-toggle" value="edit">Code</ToggleButton>
                        <ToggleButton id="preview-toggle" value="preview">Preview</ToggleButton>
                    </ToggleButtonGroup>
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
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    overflowY: 'auto',
                    backgroundColor: viewMode === "preview" ? "#ffffff" : "transparent",
                    padding: viewMode === "preview" ? "12px" : "12px",
                }}
            >
                {viewMode === "edit" ? (
                    <pre
                        style={{ 
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            margin: 0,
                            fontFamily: 'monospace'
                        }}
                    >
                        {markdownContent}
                    </pre>
                ) : (
                    <div 
                        className="markdown-body" 
                        style={{ 
                            backgroundColor: '#ffffff',
                            color: '#24292e',
                            padding: '8px',
                            borderRadius: '6px',
                            width: '100%',
                            overflowX: 'auto',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            boxSizing: 'border-box',
                        }}
                    >
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            rehypePlugins={[rehypeRaw]}
                        >
                            {markdownContent}
                        </ReactMarkdown>
                    </div>
                )}
            </Box>
        </Paper>
    );
}

export default ReadmeCode;