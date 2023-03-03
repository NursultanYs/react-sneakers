import Info from "./Info";
import React from "react";
import AppContext from "../context";
import axios from "axios";

const delay=()=>new Promise((resolve)=>setTimeout(resolve,1000));

function Drawer({onClickClose,onRemove,items=[]}){
    const { cartItems,setCartItems } = React.useContext(AppContext);
    const [isComplete,setIsOrderComplete]=React.useState(false);
    const [isLoading,setIsLoading]=React.useState(false);

    const onClickOrder= async()=>{
        try{
          setIsLoading(true);
          setIsOrderComplete(true);
          setCartItems([]);

       for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        await axios.delete(`https://63e5297e4474903105faefa8.mockapi.io/cart/${item.id}`);
        await delay();
       }
        }catch(err){
          alert("Не удалось создать заказ!")
        }
        setIsLoading(false);
    }

    return(
        <div className="overlay">
        <div className="drawer">
        <h2 className="d-flex justify-between mb-30">Корзина <img onClick={onClickClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" /></h2>
        
        {
          items.length > 0 ? 
        <div className="d-flex flex-column flex">
          <div className="items">
            {items.map((obj)=>(
            <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <div style={{backgroundImage:`url(${obj.imageUrl})`}} 
                  className="cartItemImg"></div>
              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img onClick={()=>onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
            </div>
            ))}
          </div>
         <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Итого: </span>
                <div></div>
                <b>21 398 руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб.</b>
              </li>
            </ul>
            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /> </button>
         </div>
        </div>
        :
        (<Info title={isComplete ? "Заказ оформлен!" : "Корзина пустая"} 
               description={isComplete ? "Ваш заказ скоро будет передан курьерской доставке" :"Добавьте хотя бы одну пару кроссовок,чтобы сделать заказ."} 
               image={isComplete  ? "/img/complete-order.jpg":"/img/empty-cart.jpg"}/>)
        } 


      
       
      </div>
      </div>
    )
}

export default Drawer;


