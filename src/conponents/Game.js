import React from 'react';
import {Board} from './Board';
import {calculateWinner} from '../util';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        history: state.history,
        xIsNext: state.xIsNext,
        winner: state.winner,
        stepNumber: state.stepNumber,
    }
};

class Game extends React.Component {
    render() {
        const history = this.props.history;
        const current = history[this.props.stepNumber];
        const winner = this.props.winner;

        // step 是 histroy 数组的一个元素，move 是元素索引
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        });

        let status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        if (winner) {
            status = 'Winner: ' + winner;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    handleClick(i) {
        if (this.props.winner) {
            return;
        }
        let history = this.props.history.slice();
        let squares = history[history.length - 1].squares.slice();
        if (squares[i]) return;
        squares[i] = this.props.xIsNext ? 'X' : 'O';
        const winner = calculateWinner(squares);
        history.push({squares: squares});

        this.props.dispatch({
            type: 'click',
            xIsNext: !this.props.xIsNext,
            history: history,
            winner: winner,
            stepNumber: this.props.stepNumber + 1,
        });
    }

    jumpTo(step) {
    debugger
        this.props.dispatch({
            type: 'jumpTo',
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
}

const App = connect(
    mapStateToProps
)(Game);

export default App;
