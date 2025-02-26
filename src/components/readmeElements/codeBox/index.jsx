import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import data from '../../../data/codeExtensions/data.json'

function CodeBox({ codeType, setCodeType }) {

    const extensionFiles = Object.values(data.extensions).map((item, index) => (
        <MenuItem key={index} value={item.extension} sx={{ fontFamily: "GT Planar !important", letterSpacing: "-.3px" }}>
            {item.name} ({item.extension})
        </MenuItem>
    ));

    const titleExtension = Object.values(data.extensions).map((item) => item.name);

    const cards = [
        {
          id: 1,
          title: 'Code Box',
          description: 'Select the programming language for your code box.',
          type: 'codeBox'
        },
    ];

    const handleCodeTypeChange = (event) => {
        setCodeType(event.target.value);
    };

    const handleDragStart = (e, card) => {
        const dragData = {
            ...card,
            codeType,
            title: titleExtension,
        };
        e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    };

    return ( 
        <Box className="card-container"
            sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 2, justifyItems: 'center' }}
        >
            {cards.map((card) => (
            <Card
                key={card.id}
                sx={{
                    width: '95%',
                    marginTop: '15px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover, &:focus, &.targeted': {
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                      borderWidth: '2px',
                      borderStyle: 'solid'
                    },
                    '&:hover, &:focus': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
            >
                <CardActionArea>
                <CardContent>
                    <Typography variant="h5" sx={{ fontFamily: 'Acorn' }}>{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'GT Planar', letterSpacing: '-.3px' }}>{card.description}</Typography>
                    <FormControl fullWidth style={{ marginTop: '18px' }}>
                        <InputLabel id="markdown-type-label" sx={{ fontFamily: 'GT Planar', letterSpacing: '-.3px' }}>Markdown type</InputLabel>
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
                </CardContent>
                </CardActionArea>
            </Card>
            ))}
        </Box>
     );
}

export default CodeBox;