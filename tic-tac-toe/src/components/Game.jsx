import ReactResizeDetector from "react-resize-detector";
import { useState, useEffect } from "react";
import { calculateWinner } from "./Board";
import Board from "./Board";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Stack,
} from "@mui/material";
import Settings from "./Settings";
import SettingsIcon from "@mui/icons-material/Settings";
import ReplayIcon from "@mui/icons-material/Replay";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [boardWidth, setBoardWidth] = useState(300);
    const [boardHeight, setBoardHeight] = useState(300);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState({ x: 3, y: 3 });
    const [showSettings, setShowSettings] = useState(false);
    const [speed, setSpeed] = useState(40);
    const [playerOneName, setPlayerOneName] = useState("X");
    const [playerTwoName, setPlayerTwoName] = useState("O");

    useEffect(() => {
        const handleBounce = () => {
            let newX = position.x + direction.x;
            let newY = position.y + direction.y;

            // Check for collisions with the container edges and reverse direction if necessary
            if (newX + boardWidth > windowWidth || newX < 0) {
                setDirection((prev) => ({ ...prev, x: -prev.x }));
            }
            if (newY + boardHeight > windowHeight || newY < 0) {
                setDirection((prev) => ({ ...prev, y: -prev.y }));
            }

            setPosition({ x: newX, y: newY });
        };

        // Set up an interval to move the board
        const intervalId = setInterval(handleBounce, speed);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [
        position,
        direction,
        boardWidth,
        boardHeight,
        windowWidth,
        windowHeight,
        speed,
    ]);

    const handleWindowResize = (windowWidth, windowHeight) => {
        setWindowWidth(windowWidth);
        setWindowHeight(windowHeight);
    };

    const handleBoardResize = (boardWidth, boardHeight) => {
        setBoardWidth(boardWidth);
        setBoardHeight(boardHeight);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    function handleRestart() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setPosition({ x: Math.floor(Math.random() * (windowWidth - 500)), y: Math.floor(Math.random() * (windowHeight - 500)) });
        setDirection((prev) => ({ ...prev, x: -prev.x }));
        setDirection((prev) => ({ ...prev, y: -prev.y }));
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? playerOneName : playerTwoName);
    }

    return (
        <Box className="game" sx={{ backgroundColor: "bisque" }}>
            <ReactResizeDetector onResize={handleWindowResize} />
            <Card
                className="status"
                sx={{
                    backgroundColor: "beige",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "50px",
                    fontSize: "30px",
                    textTransform: "uppercase",
                }}
            >
                {status}
                <ButtonGroup variant="contained">
                    <Button
                        onClick={toggleSettings}
                        justifyContent={"space-between"}
                        sx={{
                            width: "8vh",
                            height: "4vh",
                        }}
                    >
                        <SettingsIcon />
                    </Button>
                    {showSettings && (
                        <Settings
                            open={showSettings}
                            handleClose={toggleSettings}
                            speed={speed}
                            setSpeed={setSpeed}
                            boardSize={boardWidth}
                            setBoardHeight={setBoardHeight}
                            setBoardWidth={setBoardWidth}
                            setBoardSize={(size) => {
                                setBoardWidth(size);
                                setBoardHeight(size);
                            }}
                            playerOneName={playerOneName}
                            setPlayerOneName={setPlayerOneName}
                            playerTwoName={playerTwoName}
                            setPlayerTwoName={setPlayerTwoName}
                        />

                    )}
                    <Button
                        onClick={() => handleRestart()}
                        sx={{
                            width: "8vh",
                            height: "4vh",
                        }}
                    >
                        <ReplayIcon />
                    </Button>
                </ButtonGroup>
            </Card>
            <Box
                className="board-container"
                sx={{
                    position: "absolute",
                    left: position.x,
                    top: position.y,
                    transition: "left 0.01s linear, top 0.01s linear",
                }}
            >
                <ReactResizeDetector onResize={handleBoardResize} />
                <Board
                    className="board"
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    boardWidth={boardWidth}
                    boardHeight={boardHeight}
                    handleBoardResize={handleBoardResize}
                />
            </Box>
            <Stack
                sx={{
                    position: "absolute",
                    bottom: "5vh",
                    right: "5vh",
                    fontSize: "1.25em",
                }}
            >
                <Box>
                    Window: {windowWidth}px by {windowHeight}px
                </Box>
                <Box>
                    Board: {boardWidth}px by {boardHeight}px
                </Box>
                <Box>
                    Position: {position.x}px by {position.y}px
                </Box>
            </Stack>
        </Box>
    );
}

export default Game;
