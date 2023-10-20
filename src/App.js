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
      bumpTotal = bumpTotal + subData[key] ["price"] * subData[key]["count"];
    });

    setTotalPrice(bumpTotal);
  }, [subData]);

  const removeElement = (id) => {
    let bump = {...subData};
    delete bump[id];
    setSubData(bump);
  }

  const changeCount = (id, preData, value) => {
    setSubData({...subData, [preData.id];{
      id: preData.id,
      source: preData.source,
      name: preData.name,
      price: preData.price;
      count: Number(value),
    }})
  }

  const handleCheckout =() => {
    alert("purchased" + totalPrice + "$");
  }
  return (
    <div className='nav'>
      <div className='nav-content'>
        <div className='close'>
          <p>Your Cart</p>
          <button onClick={() => setOpenNav(false)}>
            <i className='fa-regular fa-circle-xmaek'></i>
          </button>
        </div>

        <div className='subtotal'>
          <p>Subtotal</p>
          <p>
            {Number (totalPrice).toFixed(2)}$
          </p>
        </div>
        <div className='added_carts'>
          {
            Object.keys(subData).length> 0 ?

            Object.keys(subData).map((key, index) => (
              <subCart data = {subData[key]} changeCount= {changeCount} removeElement= {removeElement}/>
            )):
            (<p>No items found</p>)
          }
        </div>
        
      </div>
    </div>
  )

}

export default App;
