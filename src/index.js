import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {calculateWinner} from "./util";


function Square(props) {
    return (
        <button className={"square"}
                onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 定义历史数组，每个元素是一个对象，这个对象有一个 squares 属性，为数组
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            winner: null,
            // 代表第几步，<Board/> 组件的内容依赖它
            stepNumber: 0,
        }
    }

    render() {
        const history = this.state.history;
    debugger
        const current = history[this.state.stepNumber];
        console.log(current);
        const winner = this.state.winner;

        // 映射 history 数组到 moves 数组
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={{move}}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        });

        let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
        if (this.state.winner) {
            return;
        }
        // 使用 slice() 返回一个新数组，原数组不会被改变
        // 不改变原数组，而是直接使用新对象替换的好处：
        // 便于 react 跟踪 state 的变化，直接替换对象肯定就变了，修改的话还要对比
        let history = this.state.history.slice();
        let squares = history[history.length - 1].squares.slice();
        // 此时只是数组改变了，组件没变
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const winner = calculateWinner(squares);
        history.push({squares: squares});
        // setState 后，react 会知道 state 变了，重新渲染组件
        this.setState({
            xIsNext: !this.state.xIsNext,
            history: history,
            winner: winner,
            stepNumber: this.state.stepNumber + 1,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

