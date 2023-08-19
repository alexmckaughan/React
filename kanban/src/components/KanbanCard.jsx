import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from "@mui/material";


function KanbanCard({ card }) {
    return (
        <Card
            sx={{
                backgroundColor: "aquamarine",
                paddingLeft: "1.5vw",
                paddingRight: "1.5vw",
            }}
        >
            <CardHeader>
                {card.title}
            </CardHeader>
            <CardMedia
                sx={{ height: 200 }}
                image={`https://source.unsplash.com/400x400/?${card.title}`}
                title={card.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {card.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default KanbanCard;
