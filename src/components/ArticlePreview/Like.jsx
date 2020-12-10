import React from 'react';

import heartImg from '../../images/heart.svg';
import heartImgFill from '../../images/path4.svg';

const Like = (props) => {
  const { favorited, favoritesCount, onChangFavoriteArticle } = props;
  return (
    <div>
      <button onClick={onChangFavoriteArticle} className="btn-favorite">
        {favorited ? <img src={heartImgFill} alt="" /> : <img src={heartImg} alt="" />}
        <span>{favoritesCount}</span>
      </button>
    </div>
  );
};

export default Like;

/* 
      <a onClick={onChangFavoriteArticle} className="btn-favorite">
        {favorited ? <img src={heartImgFill} alt="" /> : <img src={heartImg} alt="" />}
        <span>{favoritesCount}</span>
      </a>
       */
