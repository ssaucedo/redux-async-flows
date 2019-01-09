
/**
 * 
 * @param {*} take 
 * @param {*} dispatch 
 */
export const step = (take, dispatch) => async (interactionType, userInteraction, params) => {
    const prom = take(interactionType); // take interaction
    dispatch(userInteraction(params)); // user interacts
    await prom; // wait for take resolution
}
