import { GameCell } from "./game-cell";
import { GameInfo } from "./game-info";
import styles from "./game.module.css";
import { useGameState } from "./use-game-state";

export function Game() {

    const {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        clearField,
        winnerSymbol,
        tieDraw
    } = useGameState();

    console.log(cells);

    return (
        <div className={styles['game']}>
            <GameInfo
                tieDraw={tieDraw}
                winnerSymbol={winnerSymbol}
                currentStep={currentStep}
            />
            <div className={styles['game-field']}>
                {cells.map((symbol, index) => (
                    <GameCell
                        key={index}
                        isWinner={winnerSequence?.includes(index)}
                        onClick={() => handleCellClick(index)}
                        symbol={symbol} />))
                }
            </div>
            <div>
                <button className={styles['reset']} onClick={clearField}>Очистить</button>
            </div>
        </div>
    )
};