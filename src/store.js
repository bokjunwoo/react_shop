import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/user.js'

let cart = createSlice({
    name : 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers : {
        changeCart(state, action){
            console.log(action)
            // state[action.payload].count++
        }
    }
});

export let {changeCart} = cart.actions;

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer,
    }
})