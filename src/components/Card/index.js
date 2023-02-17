import React from 'react';
import styles from './Card.module.scss'


function Card({imageUrl,title,price,onFavorite,onPlus,id}){
    const [isAdded,setIsAdded]=React.useState(false)
    const [isFavorite,setFavorite]=React.useState(false)

    const onClikPlus=()=>{
      setIsAdded(!isAdded) ;
      onPlus({title,imageUrl,price,id});
    }
    const onClickFavorite=()=>{
      setFavorite(!isFavorite);
    }

    // React.useEffect(()=>{
    //   console.log('Changed')
    // },[isAdded]);

    return (
        <div className={styles.card}>
            <div onClick={onClickFavorite} className={styles.favorite}>
              <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg" }alt="Unliked" />  
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