import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Grid, Paper, Box } from '@mui/material';
import { toast } from 'sonner';
import { useReadme } from '../../context/saveElements';
import DraggableItem from './draggableItem';

function ReadmeCanva() {

    const { elements, setElements } = useReadme();

    const handleDrop = (e) => {
        e.preventDefault();
        
        // Primero verifica si es un archivo arrastrado
        if (e.dataTransfer.files?.length > 0) {
          const file = e.dataTransfer.files[0];
          
          // Si es una imagen, crea un nuevo elemento de tipo 'image'
          if (file.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(file);
            
            toast.success('Element successfully added');
            setElements(prev => [...prev, {
              type: 'image',
              text: objectUrl,
              bold: false,
              color: '#000000'
            }]);
          } else {
            toast.error('Only images can be dropped directly');
          }
          return;
        }
      
        // Si no es un archivo, intenta obtener los datos JSON
        const data = e.dataTransfer.getData('application/json');
        
        if (data) {
          const parsedData = JSON.parse(data);
          toast.success('Element successfully added');
          setElements(prev => [...prev, {
            ...parsedData,
            text: '',
            bold: false,
            color: '#000000',
            data: parsedData.type === 'table' ? (parsedData.data || [['']]) : undefined,
            items: parsedData.type === 'list' ? (parsedData.items || ['']) : undefined
          }]);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleTextChange = (index, value) => {
        setElements((prev) =>
        prev.map((el, i) => (i === index ? { ...el, text: value } : el))
        );
    };

    const toggleBold = (index) => {
        setElements((prev) =>
        prev.map((el, i) => (i === index ? { ...el, bold: !el.bold } : el))
        );
    };

    const changeColor = (index, color) => {
        setElements((prev) =>
        prev.map((el, i) => (i === index ? { ...el, color } : el))
        );
    };

    const removeElement = (index) => {
        setElements(prev => prev.filter((_, i) => i !== index));
        toast.error('Element removed');
    };

    const insertLink = (index) => {
        const link = prompt('Enter URL:');
        if (link) {
            const updatedElements = elements.map((el, i) =>
                i === index ? { ...el, text: `${el.text} [Link](${link})` } : el
            );
            setElements(updatedElements);
        }
    };

    // Add a new row
    const addRow = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: [...el.data, new Array(el.data[0]?.length || 1).fill('')] };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Delete a row
    const deleteRow = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: el.data.slice(0, -1) };
            }
            return el;
        });
        setElements(updatedElements);
    }

    // Add a new column
    const addColumn = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: el.data.map(row => [...row, '']) };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Delete a column
    const deleteColumn = (index) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                return { ...el, data: el.data.map(row => row.slice(0, -1)) };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Update a specific cell
    const updateCell = (index, rowIndex, colIndex, value) => {
        const updatedElements = elements.map((el, i) => {
            if (i === index) {
                const newData = [...el.data];
                newData[rowIndex][colIndex] = value;
                return { ...el, data: newData };
            }
            return el;
        });
        setElements(updatedElements);
    };

    // Add a new list item
    const addListItem = (listIndex) => {
        setElements((prev) =>
            prev.map((el, idx) =>
                idx === listIndex ? { ...el, items: [...el.items, ''] } : el
            )
        );
    };
    
    // Update a specific list item
    const updateListItem = (listIndex, itemIndex, value) => {
        setElements((prev) =>
            prev.map((el, idx) =>
                idx === listIndex
                    ? {
                          ...el,
                          items: el.items.map((item, i) =>
                              i === itemIndex ? value : item
                          ),
                      }
                    : el
            )
        );
    };
    
    // Remove a specific list item
    const removeListItem = (listIndex, itemIndex) => {
        setElements((prev) =>
            prev.map((el, idx) =>
                idx === listIndex
                    ? {
                          ...el,
                          items: el.items.filter((_, i) => i !== itemIndex),
                      }
                    : el
            )
        );
    };

    const handleDragEnd = (event) => {
        
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = elements.findIndex((_, i) => i === active.id);
        const newIndex = elements.findIndex((_, i) => i === over.id);
        setElements(arrayMove(elements, oldIndex, newIndex));
    };

    return (
        <Grid
            item
            xs={12}
            sm={9}
            md={9}
            lg={9}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{ 
                padding: '20px !important',
                height: {xs: '100%', sm: '585px', md: '585px', lg: '585px'}, 
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    height: {xs: '585px', sm: '100%', md: '100%', lg: '100%'}
                }}
                id="readme-canvas"
            >
                {/* Canvas with fixed height and scroll */}
                <Box
                sx={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    borderRadius: '8px',
                    padding: 2,
                }}
                >
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={elements.map((_, index) => index)} strategy={verticalListSortingStrategy}>
                        {elements.map((el, index) => (
                            <DraggableItem
                                key={index}
                                element={el}
                                index={index}
                                handleTextChange={handleTextChange}
                                setElements={setElements}
                                onRemove={removeElement}
                                onLink={insertLink}
                                onAddRow={addRow}
                                onDeleteRow={deleteRow}
                                onAddColumn={addColumn}
                                onDeleteColumn={deleteColumn}
                                onAddListItem={addListItem}
                                onRemoveListItem={removeListItem}
                                onUpdateCell={updateCell}
                                onUpdateListItem={updateListItem}
                            />
                        ))}
                        </SortableContext>
                    </DndContext>
                </Box>
            </Paper>
        </Grid>
    );
}

export default ReadmeCanva;