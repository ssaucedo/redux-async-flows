

const bookingService = (paymentMethod) => {
    return new Promise(resolve => {
        setTimeout(() => resolve({
            method: paymentMethod,
            res: 'Successful payment!'
        }), 0);
    });
}


export default bookingService;