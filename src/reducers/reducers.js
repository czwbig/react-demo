let history = [{squares: Array(9).fill(null)}];
let [xIsNext, winner, stepNumber] = [true, null, 0];

export const reducer = (
    state = {
        history: history,
        xIsNext: xIsNext,
        winner: winner,
        stepNumber: stepNumber,
    }, action) => {
    switch (action.type) {
        case 'click':
            return {
                ...state,
                winner: action.winner,
                history: action.history,
                xIsNext: action.xIsNext,
                stepNumber: action.stepNumber,
            };
        case 'jumpTo':
            return {
                ...state,
                stepNumber: action.stepNumber,
                xIsNext: action.xIsNext,
            };
        default:
            return state
    }
};
