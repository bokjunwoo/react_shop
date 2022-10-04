import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Button  } from 'react-bootstrap';
import Item from './component/Item';
import React, { createContext, useState } from 'react';
import data from './component/data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './component/Detail';
import Event from './component/Event';
import axios from 'axios'
import Cart from './component/Cart';

export let Context1 = createContext(); // state보관함


function App() {
  let [shoes, shoesChange] = useState(data);
  let navigate = useNavigate(); // 페이지이동 도와줌

  let [재고] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>홈</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}>상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      <Routes>
        <Route path='/' element={
          <div>
            <Button variant="primary" onClick={() => {
              let copy = [...shoes];
              copy.sort();
              shoesChange(copy);
            }}>이름순 정렬</Button>
            <div className="container">
              <div className="row">
                {
                  shoes.map(function (a, i) {
                    return (
                      <Item
                        key={shoes[i].id}
                        shoes={shoes[i]}
                      />
                    )
                  })
                }
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과) => {
                // .concat
                let copy = [...shoes, ...결과.data];
                shoesChange(copy);
              })
              .catch(() => {
                console.log('실패')
              })
            }}>더보기</button>
          </div>}>
        </Route>

        <Route path='/detail/:id' element={<Context1.Provider value={ {재고} }> <Detail shoes={shoes} /> </Context1.Provider>}></Route>
        {/* <Route path='/about' element={<About />}></Route>
        <Route path='/about/member' element={<About />}></Route>
        <Route path='/about/location' element={<About />}></Route> */}

        <Route path='/cart' element={<Cart />}></Route>

        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>멤버</div>}></Route>
          <Route path='location' element={<div>위치</div>}></Route>
        </Route>
        
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>

        <Route path='*' element={<div>없는페이지</div>}></Route>
      </Routes>
    </div>
  );
}

function About(){
  return(
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
      {/* <Route path='member' element={<div>멤버</div>}></Route>  이걸 보여줌*/}
    </div>
  )
}

export default App;
