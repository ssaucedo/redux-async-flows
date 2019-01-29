


const shirts = [
    { id: '1', name: '#ff2400', label: 'Scarlet'},
    { id: '2', name: '#9dc183', label: 'Sage'},
    { id: '3', name: '#c7e446', label: 'Lime'},
    
]

const jeans = [
    { id: '1', name: '#000080', label: 'Navy'},
    { id: '3', name: '#FFF8DC', label: 'Cornsilk'},
    { id: '2', name: '#A0522D', label: 'Sienna'},
]

export const getAvailableColors = (category) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(
            category === 'shirts' ? shirts : jeans
        ), 3000);
    })
}