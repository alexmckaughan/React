import { Button, Dialog, DialogActions, Stack, DialogTitle, Slider, TextField } from '@mui/material';
import React, { useState } from 'react';

function Settings({
    open,
    handleClose,
    speed,
    setSpeed,
    boardSize,
    setBoardHeight,
    setBoardWidth,
    playerOneName,
    setPlayerOneName,
    playerTwoName,
    setPlayerTwoName,
}) {
    const [selectedBoardSize, setSelectedBoardSize] = useState(boardSize);
    const [selectedSpeed, setSelectedSpeed] = useState(speed);
    const [selectedPlayerOneName, setSelectedPlayerOneName] = useState(playerOneName);
    const [selectedPlayerTwoName, setSelectedPlayerTwoName] = useState(playerTwoName);

    const handleApply = () => {
        // Update the actual speed, board size, and player names when applying the changes
        setSpeed(selectedSpeed);
        setBoardWidth(selectedBoardSize);
        setBoardHeight(selectedBoardSize);
        setPlayerOneName(selectedPlayerOneName);
        setPlayerTwoName(selectedPlayerTwoName);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Settings</DialogTitle>
            <Stack spacing={2} paddingLeft={"2vh"} paddingRight={"2vh"}>
                <div>
                    <TextField label="Player 1 (X):" value={selectedPlayerOneName} onChange={(e) => setSelectedPlayerOneName(e.target.value)} variant="filled" />
                </div>
                <div>
                    <TextField label="Player 2 (O):" value={selectedPlayerTwoName} onChange={(e) => setSelectedPlayerTwoName(e.target.value)} variant="filled" />
                </div>
                <div>
                    <label>Speed:</label>
                    <Slider value={selectedSpeed} onChange={(e, newValue) => setSelectedSpeed(newValue)} aria-labelledby="speed-slider" valueLabelDisplay="auto" step={1} marks min={10} max={100} />
                </div>
                <div>
                    <label>Board Size:</label>
                    <Slider value={selectedBoardSize} onChange={(e, newValue) => setSelectedBoardSize(newValue)} aria-labelledby="board-size-slider" valueLabelDisplay="auto" step={10} marks min={200} max={800} />
                </div>
            </Stack>
            <DialogActions sx={{ justifyContent: 'space-around', padding: '2vh' }}>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleApply} color="primary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog >
    );
}

export default Settings;
