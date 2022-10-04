import { Fragment, useContext, useState } from "react";
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import {Context1} from './../App.js'

let YellowBtn = styled.button`
    background : ${ props => props.bg};
    color : ${ props => props.bg === 'blue' ? 'white' : 'black'};
    padding : 10px;
`;

let BlackBox = styled.div`
    background : grey;
    padding : 20px;
`;

function Detail(props){

    let {재고} = useContext(Context1); // 보관함 해체

    let [count, setCount] = useState(0)
    
    let [alert1, setalert1] = useState(true);

    let {id} = useParams();    
    
    let 찾은상품 = props.shoes.find(function(x){
        return x.id == id
        // find() 콜백함수에 파라미터 넣으면 array자료에 있던 자료를 뜻 x로 지정
        // array자료.id == url에입력한번호
      });

    // html 렌더링 후에 동작 - 어려운연산, - 서버에서 데이터가져오는 작업, - 타이머
    useEffect(() => {
        let a = setTimeout(() => { setalert1(false) }, 2000);
        return () => {
            //useEffect 실행전에 동작
            //기존타이머는 제거해주세요
            clearTimeout(a);
        };
         // setTimeout( ()=> {  1초 후 실행할 코드 }, 1000);
    }, []); // [] 실행조건 넣을 수 있는 곳

    let [num, setNum] = useState('');

    useEffect(() => {
        if(isNaN(num) == true) {
            alert('숫자만 입력해주세요')
        }
    }, [num])
    
    let [tab, setTab] = useState(0);

    let [fade1, setFade1] = useState('');

    useEffect(() => {
        setFade1('end');

        return () => {
            setFade1('');
        };

    }, []);

    return (
        <div className={`container start ${fade1}`}>
            {count}
            <YellowBtn bg='blue' onClick={() => { setCount(count + 1) }}>버튼</YellowBtn>
            <BlackBox></BlackBox>
            {
                alert1 === true
                    ? <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            <div className="row">
                <input onChange={(e) => { setNum(e.target.value) }} />
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="신발1" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                {/* defaultActiveKey="link0" 처음에 기본으로 눌려있는 키 
                    eventKey="link0" 키 번호 */}
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => { setTab(0) }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => { setTab(1) }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => { setTab(2) }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
        </div>
    )
}
// props -> {tab} 으로 사용가능
// function TabContent({tab}) {
//     if (tab == 0) {
//         return <div>내용0</div>
//     } else if (tab == 1) {
//         return <div>내용1</div>
//     } else if (tab == 2) {
//         return <div>내용2</div>
//     };
// };

function TabContent({tab}) {

    let [fade, setFade] = useState('');
    let {재고} = useContext(Context1);

    useEffect(() => {
        let timer = setTimeout(() => {setFade('end')}, 100);

        return () => {
            clearTimeout(timer);
            setFade('');
        };
    }, [tab]);

    return ( <div className={`start ${fade}`}>
        { [<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div> )
};

export default Detail;