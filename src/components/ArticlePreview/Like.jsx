import React from "react";
import PropTypes from "prop-types";

import heartImg from "../../images/heart.svg";
import heartImgFill from "../../images/heart-fill.svg";

const Like = (props) => {
  const { favorited, favoritesCount, onChangFavoriteArticle } = props;

  return (
    <div>
      <button
        type="button"
        onClick={onChangFavoriteArticle}
        className="btn-favorite"
      >
        {favorited ? (
          <img src={heartImgFill} alt="" />
        ) : (
          <img src={heartImg} alt="" />
        )}
        <span>{favoritesCount}</span>
      </button>
    </div>
  );
};

Like.propTypes = {
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  onChangFavoriteArticle: PropTypes.func.isRequired,
};

export default Like;
