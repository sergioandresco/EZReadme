import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function SubTitleComponent() {

    const cards = [
        {
          id: 1,
          title: 'Subtitle',
          description: 'With this component you can insert a subtitle in your Readme file.',
          type: 'subtitle',
        }
    ];
      
    return (
        <Box
            className="card-container"
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
                justifyItems: 'center',
            }}
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
                    onDragStart={(e) =>
                    e.dataTransfer.setData('application/json', JSON.stringify(card))
                    }
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ fontFamily: 'Acorn' }} >
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'GT Planar', letterSpacing: '-.3px' }} >
                                {card.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
}

export default SubTitleComponent;
