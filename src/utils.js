


const flights = [
    { id: '1', name: 'LON - NYC'},
    { id: '2', name: 'BUE - SYD'},
    { id: '3', name: 'SAO - YTO'}
    
]

const hotels = [
    { id: '1', name: 'The Ritz Hotel'},
    { id: '2', name: 'Cotton House Hotel'},
    { id: '3', name: 'Four Seasons Hotel'},
]

export const categoriesService = (category) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(
            category === 'flights' ? flights : hotels
        ), 3000);
    })
}