import { useState } from 'react';
import { SYMBOL_O, SYMBOL_X } from "./constants";

const computeWinner = (cells) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            cells[a] &&
            cells[a] === cells[b] &&
            cells[b] === cells[c]
        ) {
            return [a, b, c];
        }
    }
}


export function useGameState() {
    const [currentStep, setCurrentStep] = useState(SYMBOL_O);
    const [cells, setSells] = useState([null, null, null, null, null, null, null, null, null]);
    const [winnerSequence, setWinnerSeqence] = useState();

    const handleCellClick = (index) => {
        if (cells[index] || winnerSequence) {
            return;
        }

        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;
        const winner = computeWinner(cellsCopy);

        setSells(cellsCopy);
        setCurrentStep((currentStep === SYMBOL_X) ? SYMBOL_O : SYMBOL_X);
        setWinnerSeqence(winner);
    }

    const clearField = () => {
        const cellsCopyClear = cells.fill(null);

        setSells(cellsCopyClear);
        setCurrentStep((currentStep === SYMBOL_X) ? SYMBOL_O : SYMBOL_X);
        setWinnerSeqence(undefined);
    }

    const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;
    const tieDraw = !winnerSequence && !cells.includes(null);

    return {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        clearField,
        winnerSymbol,
        tieDraw
    }
}