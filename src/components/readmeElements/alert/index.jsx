import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'sonner';
import { useReadme } from '../../../context/saveElements';

function AlertBlock({ markdownType, setMarkdownType }) {

	const { setElements } = useReadme();

    const markdownTypes = {
		NOTE: { title: "NOTE", color: "#4F8EF7", iconType: "info" },
		TIP: { title: "TIP", color: "#2DCE89", iconType: "lightbulb" },
		IMPORTANT: { title: "IMPORTANT", color: "#845EC2", iconType: "error" },
		WARNING: { title: "WARNING", color: "#FFA500", iconType: "warning" },
		CAUTION: { title: "CAUTION", color: "#E63946", iconType: "caution" }
    };
    
    const handleMarkdownTypeChange = (event) => {
      	setMarkdownType(event.target.value);
    };

    const handleDragStart = (e, card) => {
		const dragData = {
			...card,
			markdownType,
			color: markdownTypes[markdownType].color,
			title: markdownTypes[markdownType].title,
			iconType: markdownTypes[markdownType].iconType
		};
		e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    };

    const cards = [
		{
			id: 1,
			title: 'Alert',
			description: 'Select the Alert type that you need.',
			type: 'alert'
		},
    ];

	const handleClick = (card) => {
        
        toast.success('Element successfully added');
        setElements(prev => [...prev, {
            ...card,
            text: '',
            bold: false,
            color: '#000000',
            markdownType,
			color: markdownTypes[markdownType].color,
			title: markdownTypes[markdownType].title,
			iconType: markdownTypes[markdownType].iconType
        }]);
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
					cursor: 'pointer',
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
				<CardContent>
					<Typography variant="h5" sx={{ fontFamily: 'Acorn' }} >{card.title}</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'GT Planar', letterSpacing: '-.3px' }} >{card.description}</Typography>
					<FormControl fullWidth style={{ marginTop: '18px' }}>
						<InputLabel id="markdown-type-label" sx={{ fontFamily: 'GT Planar', letterSpacing: '-.3px' }} >Alert type</InputLabel>
						<Select
							labelId="markdown-type-label"
							value={markdownType || "NOTE"}
							onChange={handleMarkdownTypeChange}
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
					<Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2, fontFamily: 'GT Planar !important', background: 'linear-gradient(90deg, #2c3e50 0%, #4a6491 100%)', fontWeight: '400' }}
                        onClick={() => handleClick(card)}
                    >
                        Add Alert Box
                    </Button>
				</CardContent>
			</Card>
			))}
		</Box>
    );
}

export default AlertBlock;