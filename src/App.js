import React from 'react';
import {Routes,Route} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';

function App() {
  const [items,setItems]=React.useState([]);
  const [cartItems,setCartItems]=React.useState([]);
  const [searchValue,setSearchValue]=React.useState('');
  const [cartOpened,setCartOpened]=React.useState(false);
  const [isLoading,setIsLoading]=React.useState(true);
  React.useEffect(()=>{
    async function fetchData(){
      const cartResponse =await axios.get('https://63e5297e4474903105faefa8.mockapi.io/cart');
      const itemsResponse=await axios.get('https://63e5297e4474903105faefa8.mockapi.io/items');
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
    // fetch('https://63e5297e4474903105faefa8.mockapi.io/items')
    //    .then(res=>res.json())
    //    .then(json=>{setItems(json)})
  },[])

  
  const onAddToCart= async (obj)=>{
    try{
      if(cartItems.find(cartObj=>Number(cartObj.id)===Number(obj.id))){
        axios.delete(`https://63e5297e4474903105faefa8.mockapi.io/cart/${Number(obj.id)}`);
        setCartItems((prev)=>prev.filter(item=>Number(item.id)!==Number(obj.id)));
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

  const isItemAdded=(id)=>{
    return cartItems.some((obj)=>Number(obj.id)===Number(id));
  }

  return (
    <AppContext.Provider value={{items,cartItems,isItemAdded,setCartOpened,setCartItems}}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClickClose={()=>setCartOpened(false)} onRemove={onRemoveItem}/>}
        {<Header onClickCart={()=>setCartOpened(true)}/>}
        <Routes>
          <Route path='/' element={<Home items={items} 
                                         cartItems={cartItems} 
                                         searchValue={searchValue}
                                         setSearchValue={setSearchValue}
                                         onChangeSearchInput={onChangeSearchInput}
                                         onAddToCart={onAddToCart}
                                         isLoading={isLoading}
                                         />}
              />
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>


       
      </div>
    </AppContext.Provider>
  );
}


export default App;





