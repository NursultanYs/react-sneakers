import React from 'react';
import styles from './Card.module.scss'


function Card({imageUrl,title,price,onFavorite,onPlus}){
    const [isAdded,setIsAdded]=React.useState(false)

    const onClikPlus=()=>{
      setIsAdded(!isAdded) ;
      onPlus({title,imageUrl,price});
    }


    React.useEffect(()=>{
      console.log('Changed')
    },[isAdded]);

    return (
        <div className={styles.card}>
            <div onClick={onFavorite} className={styles.favorite}>
              <img src="/img/heart-unliked.svg" alt="Unliked" />  
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{`${price} руб.`}</b>  
              </div>  
                <img className={styles.plus} onClick={onClikPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/Plus.svg"} alt="Plus" />
            </div>  
        </div>
    );
}

export default Card;