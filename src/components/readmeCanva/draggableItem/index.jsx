import { Paper, Box, TextField, IconButton, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { MdFormatColorFill, MdDelete } from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MarkdownCategories from '@/components/readmeElements/markdownBlock/function';

function DraggableItem ({ element, index, handleTextChange, onRemove, onLink, onAddRow, onDeleteRow, onAddColumn, onDeleteColumn, onAddListItem, onRemoveListItem, onUpdateCell, onUpdateListItem }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: index,
    });
  
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
            
        case 'markdown':
			return (
				<MarkdownCategories
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
                    size="small"
                    sx={{ position: 'relative' }}
                >
                    <input
                        type="color"
                        value={element.color}
                        onChange={(e) => changeColor(index, e.target.value)}
                        style={{
                            cursor: 'pointer',
                            height: '24px',
                            width: '24px',
                            border: 'none',
                            background: 'none',
                            position: 'absolute',
                            opacity: 0
                        }}
                    />
                    <MdFormatColorFill />
                </IconButton>

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