import { useState } from 'react';
import { Paper, Box, TextField, IconButton, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdFormatColorFill, MdDelete } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AlertCategories from '@/components/readmeElements/alert/function';
import data from '../../../data/codeExtensions/data.json'

function DraggableItem ({ element, index, handleTextChange, setElements, onRemove, onLink, onAddRow, onDeleteRow, onAddColumn, onDeleteColumn, onAddListItem, onRemoveListItem, onUpdateCell, onUpdateListItem }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: index,
    });

	const [markdownType, setMarkdownType] = useState('NOTE');
	const [codeType, setCodeType] = useState('js');

	const markdownTypes = {
		NOTE: { title: "NOTE", color: "#4F8EF7", iconType: "info" },
		TIP: { title: "TIP", color: "#2DCE89", iconType: "lightbulb" },
		IMPORTANT: { title: "IMPORTANT", color: "#845EC2", iconType: "error" },
		WARNING: { title: "WARNING", color: "#FFA500", iconType: "warning" },
		CAUTION: { title: "CAUTION", color: "#E63946", iconType: "caution" }
    };

	const extensionFiles = Object.values(data.extensions).map((item, index) => (
        <MenuItem key={index} value={item.extension} sx={{ fontFamily: "GT Planar !important", letterSpacing: "-.3px" }}>
            {item.name} ({item.extension})
        </MenuItem>
    ));

	const handleAlertTypeChange = (event) => {
		const newType = event.target.value;
    	setMarkdownType(newType);

		const updatedElement = {
			...element,
			markdownType: newType,
			title: markdownTypes[newType].title,
			color: markdownTypes[newType].color,
			iconType: markdownTypes[newType].iconType,
		};

		setElements(prevElements => {
			const newElements = prevElements.map((el, i) =>
				i === index ? { ...el, ...updatedElement } : el
			);
	
			sessionStorage.setItem("readmeElements", JSON.stringify(newElements));
	
			return newElements;
		});
	}

	const handleCodeTypeChange = (event) => {
		const newCodeLanguage = event.target.value;
		setCodeType(newCodeLanguage);

		const updatedElement = {
			...element,
			codeType: newCodeLanguage,
		};

		setElements(prevElements => {
			const newElements = prevElements.map((el, i) =>
				i === index ? { ...el, ...updatedElement } : el
			);
	
			sessionStorage.setItem("readmeElements", JSON.stringify(newElements));
	
			return newElements;
		});
	}
  
    const getElementByType = () => {
		switch (element.type) {
			case 'title':
			case 'subtitle':
			case 'paragraph':
				return (
					<TextField
						value={element.text}
						onChange={(e) => handleTextChange(index, e.target.value)}
						placeholder={`Enter ${element.type}`}
						fullWidth
						variant="outlined"
						multiline={element.type === 'paragraph'}
						sx={{
							marginBottom: 1,
							fontWeight: element.bold ? 'bold' : 'normal',
							color: element.color,
							fontSize: element.type === 'title' ? '2em' : '1.5em'
						}}
						inputProps={{
							style: {
								fontWeight: element.bold ? 'bold' : 'normal',
								color: element.color,
								fontSize: element.type === 'title' ? undefined : '0.9rem',
								fontFamily: 'GT Planar',
								letterSpacing: '-.3px'
							}
						}}
					/>
				);
	
			case 'image':
				return (
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
					{element.text && (
						<img
						src={element.text}
						alt="Uploaded Preview"
						style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
						/>
					)}
					</Box>
				);
				
			case 'alert':
				return (
					<AlertCategories
						type={element.markdownType}
						text={element.text}
						onTextChange={(newText) => handleTextChange(index, newText)}
						color={element.color}
						title={element.title}
						iconType={element.iconType}
						className="markdown-elementtttt"
					/>
				);
	
			case 'codeBox':
				return (
					<TextField
						multiline
						minRows={4}
						value={element.text}
						onChange={(e) => handleTextChange(index, e.target.value)}
						placeholder="Insert your code here..."
						fullWidth
						variant="outlined"
						sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5' }}
					/>
				);
	
			case 'table':
				return (
					<TableContainer component={Paper}>
					<Table>
						<TableBody>
						{(element.data || [[]]).map((row, rowIndex) => (
							<TableRow key={rowIndex}>
							{row.map((cell, colIndex) => (
								<TableCell key={colIndex}>
								<TextField
									value={cell}
									onChange={(e) => onUpdateCell(index, rowIndex, colIndex, e.target.value)}
									inputProps={{
									style: {
										fontFamily: 'GT Planar',
										letterSpacing: '-.3px'
									}
									}}
								/>
								</TableCell>
							))}
							</TableRow>
						))}
						</TableBody>
					</Table>
					</TableContainer>
				);

			case 'list':
				return (
					<List>
						{(element.items || []).map((item, itemIndex) => (
							<ListItem key={itemIndex}>
								<TextField
									value={item}
									onChange={(e) => onUpdateListItem(index, itemIndex, e.target.value)}
									placeholder="Enter list item"
									fullWidth
									inputProps={{
										style: {
											fontFamily: 'GT Planra',
											letterSpacing: '-.3px'
										}
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											onAddListItem(index);
										}
									}}
								/>
								<Button onClick={() => onRemoveListItem(index, itemIndex)}>❌</Button>
							</ListItem>
						))}
					</List>
				);
	
			default:
				return <p>Unknown element type</p>;
		}
    };

    const getActionButtons = () => {
        switch (element.type) {
			case 'title':
			case 'subtitle':
			case 'paragraph':
				return (
					<Button 
						onClick={() => onLink(index)}
						size="small"
						sx={{ mb: 1 }}
					>
						Insert Link
					</Button>
				);
	
			case 'image':
				return (
					<label htmlFor={`file-input-${index}`}>
						<input
							id={`file-input-${index}`}
							type="file"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) {
								const objectUrl = URL.createObjectURL(file);
								handleTextChange(index, objectUrl);
								}
							}}
							style={{ display: 'none' }}
						/>
						<Button 
							variant="contained" 
							component="span"
							size="small"
							sx={{ mb: 1 }}
						>
						Upload Image
						</Button>
					</label>
				);

			case 'alert':
				return (
					<Box sx={{ mb: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
						<FormControl fullWidth style={{ marginTop: '18px' }}>
							<InputLabel id="markdown-type-label" sx={{ fontFamily: 'GT Planar', letterSpacing: '-.3px' }} >Alert type</InputLabel>
							<Select
								labelId="markdown-type-label"
								value={markdownType}
								onChange={handleAlertTypeChange}
								MenuProps={{
									PaperProps: {
										sx: {
											fontFamily: "GT Planar",
										},
									},
								}}
							>
								{Object.keys(markdownTypes).map((type) => (
									<MenuItem key={type} value={type} sx={{ fontFamily: "GT Planar !important", letterSpacing: "-.3px" }}>
										{type}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				);

			case 'codeBox':
				return (
					<Box sx={{ mb: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
						<FormControl fullWidth style={{ marginTop: '18px' }}>
							<InputLabel id="markdown-type-label" sx={{ fontFamily: 'GT Planar', letterSpacing: '-.3px' }} >Code language</InputLabel>
							<Select
								labelId="markdown-type-label"
								value={codeType || 'JS'}
								onChange={handleCodeTypeChange}
								MenuProps={{
									PaperProps: {
										sx: {
											fontFamily: "GT Planar",
										},
									},
								}}
							>
								{extensionFiles}
							</Select>
						</FormControl>
					</Box>
				);
	
			case 'table':
				return (
					<Box sx={{ mb: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
						<Button 
						onClick={() => onAddRow(index)} 
						size="small"
						sx={{ fontFamily: 'Acorn' }}
						>
						➕ Add Row
						</Button>
						<Button 
						onClick={() => onAddColumn(index)} 
						size="small"
						sx={{ fontFamily: 'Acorn' }}
						>
						➕ Add Column
						</Button>
						<Button 
						onClick={() => onDeleteRow(index)} 
						size="small"
						sx={{ fontFamily: 'Acorn' }}
						>
						- Delete Row
						</Button>
						<Button 
						onClick={() => onDeleteColumn(index)} 
						size="small"
						sx={{ fontFamily: 'Acorn' }}
						>
						- Delete Column
						</Button>
					</Box>
				);
	
			case 'list':
				return (
					<Box sx={{ mb: 1 }}>
						<Button 
						onClick={() => onAddListItem(index)}
						size="small"
						sx={{ fontFamily: 'Acorn' }}
						>
						➕ Add Item
						</Button>
					</Box>
				);
	
			default:
				return null;
        }
    };
  
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "10px",
        border: "1px dashed #ccc",
        borderRadius: "8px",
        marginBottom: "10px",
        backgroundColor: "#f8f9fa",
    };
  
    return (
        <Box 
            ref={setNodeRef} 
            style={style}
        >
            <Box sx={{ 
                borderBottom: '1px solid #eee', 
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box>
                    {getActionButtons()}
                </Box>
                <Box 
                    {...attributes} 
                    {...listeners}
                    sx={{
                        cursor: 'grab',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#666',
                        '&:hover': {
                            color: '#000'
                        }
                    }}
                >
                    <MdDragIndicator size={24} />
                </Box>
            </Box>

            <Box sx={{ paddingBottom: 2 }}>
                {getElementByType()}
            </Box>

            <Box 
                sx={{
                    borderTop: '1px solid #eee',
                    paddingTop: 1,
                    display: 'flex',
                    gap: 1
                }}
            >
                <IconButton 
                    onClick={() => onRemove(index)}
                    size="small"
                    sx={{
                        '&:hover': {
                            color: 'error.main'
                        }
                    }}
                >
                    <MdDelete />
                </IconButton>
            </Box>
        </Box>
    );
};

export default DraggableItem;