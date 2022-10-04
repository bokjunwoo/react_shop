import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    // 수정
    reducers : {
        changeName(state){
            state.name = 'bok'
        },
        changeAge(state, action){ // state 변경함수를 action이라고 작명
            state.age += action.payload
        }
    }
})

// 변경함수 보내기
export let {changeName, changeAge} = user.actions

export default user