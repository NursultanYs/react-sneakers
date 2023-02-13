import React from 'react';
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer';



function App() {
  const [items,setItems]=React.useState([]);
  const [cartItems,setCartItems]=React.useState([]);
  const [cartOpened,setCartOpened]=React.useState(false);

  React.useEffect(()=>{
    fetch('https://63e5297e4474903105faefa8.mockapi.io/items')
       .then(res=>res.json())
       .then(json=>{setItems(json)})
  },[])

  
  const onAddToCart=(obj)=>{
    setCartItems(prev=>[...prev,obj])
  }

  return (
    <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClickClose={()=>setCartOpened(false)}/>}
        <Header onClickCart={()=>setCartOpened(true)}/>
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>Все кроссовки</h1>
            <div className="search-block d-flex">
              <img src="img/search.svg" alt="Search"/>
              <input placeholder="Поиск..."/>
            </div>
          </div>

          <div className="d-flex flex-wrap">
            {items.map((item)=>(
              <Card 
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={()=>console.log("Добавили в закладки")}
                onPlus={(obj)=>onAddToCart(obj)}/>
            ))}
          </div>
        </div>
    </div>
  );
}

// [
//   {"title":"Мужские Кроссовки Nike Blazer Mid",
//   "price":"12 999",
//   "imageUrl":"/img/sneakers/1.jpg"
//   },
//   {"title":"Мужские Кроссовки Nike Air Max 270",
//   "price":"12 999",
//   "imageUrl":"/img/sneakers/2.jpg"
//   },
//   {"title":"Мужские Кроссовки Nike Blazer Mid Suede",
//   "price":"8499",
//   "imageUrl":"/img/sneakers/3.jpg"
//   },
//   {"title":"Кроссовки Puma X Aka Boku Future Rider",
//   "price":"8999",
//   "imageUrl":"/img/sneakers/4.jpg"
//   },
//   {"title":"Мужские Кроссовки Under Armour Curry 8",
//   "price":"15 199 руб.",
//   "imageUrl":"/img/sneakers/5.jpg"
//   },
//   {"title":"Мужские Кроссовки Nike Kyrie 7",
//   "price":"11 299",
//   "imageUrl":"/img/sneakers/6.jpg"
//   },
//   {"title":"Мужские Кроссовки Jordan Air Jordan 11",
//   "price":"10 799",
//   "imageUrl":"/img/sneakers/7.jpg"
//   },
//   {"title":"Мужские Кроссовки Nike LeBron XVIII",
//   "price":"16 499",
//   "imageUrl":"/img/sneakers/8.jpg"
//   } 
// ]

export default App;


