import { Card } from "@mui/material";

function Square({ value, onSquareClick, size }) {
    // Calculate the font size proportionally based on the square size
    const fontSize = (size / 100) * 50;

    return (
        <Card
            className="square"
            onClick={onSquareClick}
            sx={{
                width: `${size}px`, // Use size prop
                height: `${size}px`, // Use size prop
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: `${fontSize}px`, // Use calculated font size
            }}
        >
            {value}
        </Card>
    );
}

export default Square;
