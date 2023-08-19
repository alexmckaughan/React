import KanbanCard from './KanbanCard';
import { Stack } from '@mui/material';
import { useState } from 'react';

function KanbanRow() {
    const initialCards = [
        { title: 'Green Iguana', description: 'Commonly found in Central and South America, green iguanas are large, arboreal herbivores.' },
        { title: 'Gecko', description: 'Geckos are small to average-sized reptiles belonging to the family Gekkonidae, found in warm climates throughout the world.' },
        { title: 'Monitor Lizard', description: 'Monitor lizards are large lizards in the genus Varanus, native to Africa, Asia, and Oceania.' },
        { title: 'Chameleon', description: 'Chameleons are distinguished by their highly specialized, rapidly extrudable tongues and zygodactylous feet.' },
    ];
    const [cards, setCards] = useState(initialCards);

    return (
        <Stack spacing={5} direction={"row"} justifyContent={"space-around"} padding={"5vw"} wrap="nowrap">
            {cards.map((card) => (
                <KanbanCard key={card.title} card={card} />
            ))}
        </Stack>
    );

}

export default KanbanRow;
