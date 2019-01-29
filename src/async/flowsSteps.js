
const steps = [
    { notes: 'Simple User flow', range: [0, 100]},
    { notes: 'User starts flow', tokens: { 6: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16,17,18,19,20,21,22]}},
    { notes: 'Waiting for user to category selection', lines: [9]},
    { notes: 'Waiting for user selection', lines: [20]},
    { notes: 'Waiting for user confirmation', lines: [23]},
    { notes: 'Flow completed', range: [0, 100]},
]

export default steps;