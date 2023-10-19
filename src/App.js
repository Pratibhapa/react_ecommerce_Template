import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [openNav, setOpenNav] = useState(false);
  const [subData, setSubData] = useState({});

  return (
    <div className='App'>
      <Header setOpenNav={setOpenNav} openNav={openNav} setSubData= {setSubData} subData={subData}/>

      <div className='cards'>
        {
         carts.map((item, index) => (
          <cartItem key={index} data= {item} setSubData= {setSubData} subData={subData}/>
         ))
        }
      </div>
    </div>
  ); 
}

const Nav = (props)=> {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect (() => {
    var bumpTotal = 0;
    Object.keys(subData).map((key) => {
      if (subData[key]["count"] <= 0) {
        let bump = {...subData};
        delete bump [key];
        setSubData(bump);
      }
      
    })
  })

}

export default App;
