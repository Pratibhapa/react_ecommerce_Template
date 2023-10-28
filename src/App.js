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
    setSubData({...subData, [preData.id]: {
      id: preData.id,
      source: preData.source,
      name: preData.name,
      price: preData.price,
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
        <div className='checkout'>
          <button onClick={handleCheckout}>checkout</button>
        </div>
      </div>
    </div>
  )
}

const Subcart = (props) => {
  const {data, changeCount, removeElement} = props;
  return (
		<div className="sub_cart">
			<div>
				<img src={data.source} alt="" /> 
				<div className="sub_content">
					<p>{data.name}</p>
					<button onClick={() => removeElement(data.id)}>Remove</button>
				</div>
				<div className="sub_count">
					<input type="number" value={data.count} onChange={(e) => changeCount(data.id, data, e.target.value)} />
				</div>
			</div>
		</div>
	);
}

const Header = (props) => {
  const {setOpenNav, openNav, setSubData, subData} = props;
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    var bumpTotal = 0;
    Object.keys(subData).map((key) => {
      bumpTotal += subData[key]["count"];
    });
    setTotalCount(bumpTotal);
  }, [subData]);

  
  return (
    <header>
      <div>
        <h2>Shop</h2>
      </div>
      <div className='navbar'>
        <button onClick={() => setOpenNav(!openNav)}>
          <i class="fa-solid fa-cart-shopping"></i>
          {totalCount > 0 ?  (
            <div className='cart_count'>
              {totalCount}
            </div>
          ) : null}
        </button>
        {openNav && <Nav setOpenNav={setOpenNav} setSubData={setSubData} subData={subData}/>}
      </div>
    </header>
  )
}

const cartItem = (props) => {
  const {data, setSubData, subData} = props;

  const  addCart = (data) => {
    setSubData({...subData, [data.id]: {
      id: data.id,
      source: data.source,
      price: data.price,
      count: subData[data.id] ?
      subData[data.id] ["count"] + 1 : 1,
    }})
  }

  return(
    <div className='card'>
      <div className='avatar'>
        <img src={data.source} alt=''/>
      </div>

      <div className='content'>
        <p>$ {data.price}</p>
        <button onClick={() => addCart(data)}> Add Cart</button>
      </div>
    </div>
  )
}

const carts = [
  {
    id: 1,
    source: "images/car.jpg",
    name: "product 1",
    price: 10.25
  },
  {
    id: 2,
    source: images/cartItem.jpg,
    price: 12.5
  },
  {
    id: 3,
    source: "images/car.jpg",
    price: 12.5
  },
  {
    id: 4,
    source: images/car.jpg,
    price: 16.5
  },
  {
    id:5,
    source: images/car.jpg,
    price: 17
  },
  {
    id: 6,
    source: images/car.jpg,
    price: 17.56
  },
  {
    id: 7,
    source: images.car.jpg,
    price: 20
  }
]

ReactDOM.render(<App/>,
document.getElementById("root"));
export default App;
