import React from 'react';

import heartImg from '../../images/heart.svg';
import heartImgFill from '../../images/path4.svg';

const Like = (props) => {
  const { favorited, favoritesCount, onChangFavoriteArticle } = props;
  return (
    <div>
      <a onClick={onChangFavoriteArticle} className="btn-favorite">
        {favorited ? <img src={heartImgFill} /> : <img src={heartImg} />}
        <span>{favoritesCount}</span>
      </a>
    </div>
  );
};

export default Like;
