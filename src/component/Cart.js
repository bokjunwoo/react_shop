import{ Table } from 'react-bootstrap'
import{ useSelector, useDispatch } from 'react-redux'
import { changeCart } from '../store.js';
import{ changeName, changeAge } from './../store/user.js'

function Cart() {

    let state = useSelector((state) => {return state}); //state 전체를 찾아서 가져온다 .으로 자세한 정보를 찾을 수 있다.
    let dispatch = useDispatch(); //store에 요청하는

    return(
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={() => {
                dispatch(changeAge(100))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i) => {
                            return (
                                <tr key = {i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(changeCart(i))
                                        }}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;