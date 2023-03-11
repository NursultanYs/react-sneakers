import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss'
import AppContext from '../../context';

function Card({id,onPlus,loading=false,title,price,imageUrl}){ 
    const {isItemAdded}=React.useContext(AppContext);
    const [isFavorite,setFavorite]=React.useState(false);



    const onClikPlus=()=>{
      onPlus({id,parentId:id,title,imageUrl,price});
      console.log({id,parentId:id,title,imageUrl,price})
    }
    const onClickFavorite=()=>{
      setFavorite(!isFavorite);
    }

    // React.useEffect(()=>{
    //   console.log('Changed')
    // },[isAdded]);

    return (
        <div className={styles.card}>
          {loading ? <ContentLoader 
    speed={0}
    width={150}
    height={265}
    viewBox="0 0 150 265"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
    <rect x="0" y="102" rx="10" ry="10" width="150" height="15" /> 
    <rect x="1" y="120" rx="10" ry="10" width="100" height="15" /> 
    <rect x="4" y="153" rx="10" ry="10" width="80" height="25" /> 
    <rect x="118" y="149" rx="10" ry="10" width="32" height="32" />
  </ContentLoader> : 
  <>
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
                <img className={styles.plus} onClick={onClikPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/Plus.svg"} alt="Plus" />
            </div>  
  </>
}
        </div>
    );
}

export default Card;