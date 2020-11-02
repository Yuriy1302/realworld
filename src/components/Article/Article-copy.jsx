/* Вынести отрисовку компонента (JSX) в отдельную функцию.
Отрисовку делать по условию: если article не пустой, то рисуем, иначе null.
В функцию отрисовки передать article и там вычленить свойства */



import React, { useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { connect, /* useSelector */ } from 'react-redux';

import Spiner from '../Spiner';

import { getArticle } from '../../actions';

import './Article.css';

const mapStateToProps = (state) => {
  const { article, loader } = state;
  return { article, loader };
}

const Article = (props) => {
  
  const { slug, article, loader, getArticle } = props;
  
  useEffect(() => {
    async function fetchData() {
      await getArticle(slug);
    }
    fetchData();    
  }, [slug, getArticle]);
  

  const createdTime = Object.keys(article).length !== 0 ? format(new Date(article.createdAt), "MMMM d, y") : null;
  const { author } = article;
  const username = author ? author.username : null;
  const image = author ? author.image : null;
  
  
  /* const {
    title,
    description,
    body,
    createdAt,
    favoritesCount,
    tagList,
    author,
  } = content.article; */
  /* console.log('article in <Article /> -> ', article); */
 /*  console.log('author: ', author); */

  /* const {
    image,
    username
  } = author; */

  /* console.log('Slug in Article -> ', slug); */

  


  if (loader) {
    return <Spiner />
  }

  return (
    article && <div className="article">
      <div className="article-item__header">
        <div className="article-item__block">
          <div className="article-item__info">
            <h2 className="article-item__title">{article.title}</h2>
            <span className="article-item__likes">{article.favoritesCount}</span>
          </div>
          <div className="article-item__tags">
            <span className="tag">Tag1</span>
          </div>
        </div>
        <div className="article-item__block flex-row">
          <div className="article-item__creator">
            <div className="article-item__author">{username}</div>
            <span className="article-item__date">{createdTime}</span>
          </div>
          <img src={author ? author.image : null} className="article-item__avatar" alt="User's avatar" />
        </div>
      </div>

      <div className="article-item__annotation">
        {article.description}
      </div>

      <div className="article-body">{article.body}
        {/* <h5>Est Ampyciden pater patent</h5>
        <h6>Amor saxa inpiger</h6>
        <p>Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.</p>
        <br />
        <h6>Qua deos has fontibus</h6>
        <p>Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.</p>
        <br />
        <h6>Quamvis pronuba</h6>
        <p>Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.</p>
        <br />
        <ol>
          <li> Clamoribus haesit tenentem iube Haec munera</li>
          <li> Vincla venae</li>
          <li> Paris includere etiam tamen</li>
          <li> Superi te putria imagine Deianira</li>
          <li> Tremore hoste Esse sed perstat capillis siqua</li>
        </ol> */}

      </div>

    </div>
  );
};

export default connect(mapStateToProps, { getArticle })(Article);