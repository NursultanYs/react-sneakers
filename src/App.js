import React from 'react';
import {Routes,Route} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';


function App() {
  const [items,setItems]=React.useState([]);
  const [cartItems,setCartItems]=React.useState([]);
  const [searchValue,setSearchValue]=React.useState('');
  const [cartOpened,setCartOpened]=React.useState(false);
  React.useEffect(()=>{
    // fetch('https://63e5297e4474903105faefa8.mockapi.io/items')
    //    .then(res=>res.json())
    //    .then(json=>{setItems(json)})
    axios.get('https://63e5297e4474903105faefa8.mockapi.io/items').then((res)=>{
      setItems(res.data);
    });
    axios.get('https://63e5297e4474903105faefa8.mockapi.io/cart').then((res)=>{
      setCartItems(res.data);
    })
  },[])

  
  const onAddToCart= async (obj)=>{
    try{
      if(cartItems.find(cartObj=>cartObj.id===obj.id)){
        axios.delete(`https://63e5297e4474903105faefa8.mockapi.io/cart/${obj.id}`);
        setCartItems((prev)=>prev.filter(item=>item.id!==obj.id));
     }else{
       const {data}=await axios.post('https://63e5297e4474903105faefa8.mockapi.io/cart',obj);
       setCartItems(prev=>[...prev,data]);
     }
    }catch(error){
      alert ('Не удалось добавить в Корзину')
    }
  }
  const onRemoveItem=(id)=>{
    axios.delete(`https://63e5297e4474903105faefa8.mockapi.io/cart/${id}`);
    setCartItems((prev)=>prev.filter(item=>item.id!==id));
  }

  // const onAddToFavorite=(obj)=>{
  //   axios.post('https://63e5297e4474903105faefa8.mockapi.io/cart',obj);
  //   setCartItems(prev=>[...prev,obj]);
  // }

  const onChangeSearchInput=(event)=>{
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClickClose={()=>setCartOpened(false)} onRemove={onRemoveItem}/>}
        {<Header onClickCart={()=>setCartOpened(true)}/>}

        <Routes>
          <Route path='/' element={<Home items={items} 
                                         searchValue={searchValue}
                                         setSearchValue={setSearchValue}
                                         onChangeSearchInput={onChangeSearchInput}
                                         onAddToCart={onAddToCart}/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>


       
    </div>
  );
}


export default App;








