import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
/* import classNames from 'classnames'; */

import Spiner from '../Spiner';

import { getArticle, createArticle, updateArticle } from '../../actions';

import './EditArticle.css';

const EditArticleRenderForm = (props) => {
  /* console.log('props-slug: ', props.slug); */
  const token = localStorage.getItem('token');
  /* const { article } = useSelector(state => state); */
  const { article } = props;
  /* console.log('article in edit render: ', article); */

  /* const [ title, setTitle ] = useState(article.title); */
  /* const [ description, setDescription ] = useState(article.description); */
  /* const [ body, setBody ] = useState(article.body); */
  // Добавлено - start
  const [ indexes, setIndexes ] = useState([0]); 
  const [ counter, setCounter ] = useState(1);
  const [ tags, setTags ] = useState(['tagList[0]']);
  /* const [ tagsList, setTagsList ] = useState([]); */
  // Добавлено - end

  /* const fillingFields = () => {
    console.log('article.tagList: ', article.tagList);
    const arr = article.tagList.map((item, index) => {
      return `tagsList[${index}]`
    }, [])
    console.log(arr);
  }

  fillingFields(); */

  useEffect(() => {
    console.log('article.tagList: ', article.tagList);
    const arr1 = article.tagList.map((item, index) => {
      return `tagList[${index}]`
    });
    const arr2 = article.tagList.map((item, index) => {
      return index;
    });
    
    console.log(arr1);
    console.log(arr2);
    
    setTags(arr1);
    setCounter(article.tagList.length + 1);
    setIndexes(arr2)
  }, []);

  
  

  /* const propertyValues = article ? {
      title: article.title,
      description: article.description,
      body: article.body
    } : {}; */
  /* console.log('propertyValues in edit render: ', propertyValues); */
  
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList
    }
  });



  const dispatch = useDispatch();
  
  
  
  

  

  const onSubmitArticle = async (data) => {
    let newData = {};
    for (let item in data) {
      if (data[item] !== '') {
        newData[item] = data[item];
      }
    }
    await dispatch(updateArticle(token, article.slug, newData));
    /* console.log('New article: ', article); */
    console.log('Data in edit render: ', newData);
    await props.history.push(`/articles/${article.slug}`); /* Пока переход на статью обратно, сделать попробовать запрос новый на получение списка */
    
  }

  const onChangeTitle = (event) => {
    const { value } = event.target;
    console.log('Title: ', value);
    /* setTitle(value); */
  }

  const onChangeDescription = (event) => {
    const { value } = event.target;
    /* console.log('Description: ', value); */
    /* setDescription(value); */
  }

  const onChangeBody = (event) => {
    const { value } = event.target;
    /* console.log('Body: ', value); */
    /* setBody(value); */
  }


  /* Добавлено */

  const addField = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    const newTag = `tagList[${indexes.length}]`;
    setTags(prevTags => [...prevTags, newTag]);
    setCounter(prevCounter => prevCounter + 1);
  }

  const removeField = (item) => {
    if (tags.length === 1) {
      return false;
    }
    const index = tags.indexOf(item);
    setTags(prevTags => [...prevTags.filter(item => item !== tags[index])]);
  }

  /* console.log('counter: ', counter);
  console.log('indexes: ', indexes);
  console.log('tags: ', tags); */
    
  const renderTagInput = (item, index) => {
    return (
      <fieldset key={item} name={item} className="form-group row input-bottom" style={{ display: 'flex' }}>
        <input type="text"
              className="input"
              style={{ width: '50%' }}
              name={item}
              /* id={inputField} */
              placeholder="Tag"
              ref={register}
        />
        {errors[item] && <p className="text-error" style={{ color: 'red' }} >The field is required, add the tag or delete this field</p>}
        
        <button type="button"
                className="btn btn-del"
                style={{ marginLeft: '10px' }}
                onClick={() => removeField(item)}
        >Delete</button>

        { tags.indexOf(item) === tags.length - 1 ? <button type="button"
                  className="btn btn-add"
                  style={{ marginLeft: '10px' }}
                  onClick={addField}
                >Add</button> : null }
      </fieldset>
    );
  };

  return (
    /* Object.keys(propertyValues).length */ article ? <form className="form-create-article" onSubmit={handleSubmit(onSubmitArticle)}>
        <label htmlFor="title" className="label">Title</label>
        <input type="text"
               name="title"
               id="title"
               /* onChange={onChangeTitle} */
               /* value={title} */
               className="input"
               placeholder="Title"
               ref={register}
        />
        { errors.title && <span className="text-danger">The field must be filled</span> }

        <label htmlFor="description" className="label">Short description</label>
        <input type="text"
               name="description"
               id="description"
               /* onChange={onChangeDescription} */
               /* value={description} */
               className="input"
               placeholder="Title"
               ref={register}
        />
        { errors.description && <span className="text-danger">The field must be filled</span> }
        
        
        
        <label htmlFor="" className="label">Text</label>
        <textarea className="input textarea"
                  name="body"
                  id="body"
                  /* onChange={onChangeBody} */
                  /* value={body} */
                  placeholder="Text"
                  ref={register}
        />
        { errors.body && <span className="text-danger">The field must be filled</span> }

        
        
        {/* Добавлено */}
        <label htmlFor="" className="label">Tags</label>
        {
          tags.map((item, index) => {
            /* const fieldName = `tagsList[${index}]`; */
            return (
              renderTagInput(item, index)
            )
          })
        }

        
        <button type="submit" className="btn-primary w300">Send</button>
        
      </form> : <Spiner />
  );
};

export default withRouter(EditArticleRenderForm);