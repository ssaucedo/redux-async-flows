
const steps = [
    { notes: 'Simple User flow', range: [0, 100]},
    { notes: 'User starts flow', tokens: { 6: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] } },
    { notes: 'User must trigger categorySelected thunk', lines: [10] },
    { notes: 'User must trigger optionSelected thunk', lines: [24] },
    { notes: 'User must trigger operationConfirmation thunk', lines: [29] },
    { notes: 'Flow completed', range: [0, 100]},
]

export default steps;