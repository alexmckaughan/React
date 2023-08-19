import ReactResizeDetector from "react-resize-detector";
import { Stack } from "@mui/material";
import Square from "./Square";

function Board({ xIsNext, squares, onPlay, boardWidth, boardHeight, handleBoardResize }) {

    const spacing = 1; // Spacing between squares
    const totalSpacing = spacing * 4; // Total spacing in one row or column (2 spaces between squares, each with spacing * 2)
    const squareSize = (boardWidth - totalSpacing) / 3; // Adjusted square size

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    function renderRow(row) {
        const startIndex = row * 3;
        return (
            <Stack direction="row" spacing={spacing} key={row}>
                {squares.slice(startIndex, startIndex + 3).map((square, i) => (
                    <Square
                        value={square}
                        index={startIndex + i}
                        customKey={startIndex + i}
                        onSquareClick={() => handleClick(startIndex + i)}
                        size={squareSize}
                    />
                ))}
            </Stack>
        );
    }

    return (
        <ReactResizeDetector onResize={handleBoardResize}>
            <div style={{ display: 'inline-block' }}>
                <Stack
                    spacing={spacing}
                    direction="column"
                    sx={{
                        alignItems: "center",
                        width: `${boardWidth}px`,
                        height: `${boardHeight}px`,
                        maxWidth: `${boardWidth}px`, // Added maxWidth
                        maxHeight: `${boardHeight}px`, // Added maxHeight
                    }}
                >
                    {Array.from({ length: 3 }, (_, row) => renderRow(row))}
                </Stack>
            </div>
        </ReactResizeDetector>
    );
}

export default Board;

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}