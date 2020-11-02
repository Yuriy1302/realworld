import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { createArticle } from '../../actions';


import './CreateArticle.css';

const CreateArticle = (props) => {

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ body, setBody ] = useState('');
  const [ tagList, setTagList ] = useState([]);

  const onSubmitArticle = (article) => {
    console.log('New article: ', article);
    dispatch(createArticle(article, token));
    props.history.push('/'); /* Пока переход на общий список */
  }

  const onChangeTitle = (event) => {
    const { value } = event.target;
    console.log('Title: ', value);
    setTitle(value);
  }

  const onChangeDescription = (event) => {
    const { value } = event.target;
    console.log('Description: ', value);
    setDescription(value);
  }

  const onChangeBody = (event) => {
    const { value } = event.target;
    console.log('Body: ', value);
    setBody(value);
  }


  return (
    <div className="create-article" onSubmit={handleSubmit(onSubmitArticle)}>
      <h2>Create new article</h2>
      <form className="form-create-article">
        <label htmlFor="title" className="label">Title</label>
        <input type="text" name="title" id="title" onChange={onChangeTitle} value={title} ref={register} className="input" placeholder="Title" />
        <label htmlFor="description" className="label">Short description</label>
        <input type="text" name="description" id="description" onChange={onChangeDescription} value={description} ref={register} className="input" placeholder="Title" />
        <label htmlFor="" className="label">Text</label>
        <textarea className="input textarea" name="body" id="body" onChange={onChangeBody} value={body} ref={register} placeholder="Text"></textarea>
        
        <label htmlFor="text" className="label">Tags<br />
          <input type="text" name="tag" id="tag" className="input w300" placeholder="Tag" />
          <button type="button" className="btn-del">Delete</button>
          <button type="button" className="btn-add">Add tag</button>
        </label>
        
        <button type="submit" className="btn-primary w300">Send</button>
        
      </form>
    </div>
  );
};

export default withRouter(CreateArticle);