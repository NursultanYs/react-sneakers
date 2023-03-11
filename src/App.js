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

  console.log(cartItems);

  React.useEffect(()=>{
    async function fetchData(){
      try{
        const [cartResponse,itemsResponse]=await Promise.all([axios.get('https://63e5297e4474903105faefa8.mockapi.io/cart'), axios.get('https://63e5297e4474903105faefa8.mockapi.io/items')])
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      }
      catch(err){
        alert('Ошибка при запросе данных');
      }
    }
    fetchData();
    // fetch('https://63e5297e4474903105faefa8.mockapi.io/items')
    //    .then(res=>res.json())
    //    .then(json=>{setItems(json)})
  },[])

  
  const onAddToCart= async (obj)=>{
    try{
      const findItem=cartItems.find(cartObj=>Number(cartObj.parentId)===Number(obj.id))
      if(findItem){
        console.log(obj.parentId);
        setCartItems((prev)=>prev.filter(item=>Number(item.parentId)!==Number(obj.id)));
        axios.delete(`https://63e5297e4474903105faefa8.mockapi.io/cart/${findItem.id}`);
     }else{
      const {data}=await axios.post('https://63e5297e4474903105faefa8.mockapi.io/cart',obj);
      setCartItems(prev=>[...prev,data]);
     }
    }catch(error){
      alert ('Не удалось добавить в Корзину')
    }
  }

  const onRemoveItem=(id)=>{
   try{
    console.log(id);
    axios.delete(`https://63e5297e4474903105faefa8.mockapi.io/cart/${id}`);
    setCartItems((prev)=>prev.filter(item=>item.id!==id));
   }
   catch(err){
    alert('Ошибка при удалении из корзины');
   }
  }

  // const onAddToFavorite=(obj)=>{
  //   axios.post('https://63e5297e4474903105faefa8.mockapi.io/cart',obj);
  //   setCartItems(prev=>[...prev,obj]);
  // }

  const onChangeSearchInput=(event)=>{
    setSearchValue(event.target.value);
  }

  const isItemAdded=(id)=>{
    return cartItems.some((obj)=>Number(obj.parentId)===Number(id));
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





