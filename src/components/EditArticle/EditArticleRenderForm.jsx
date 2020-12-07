import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Spiner from '../Spiner';

import { updateArticle } from '../../actions';

import './EditArticle.css';

const EditArticleRenderForm = (props) => {
  const token = localStorage.getItem('token');
  const { article } = props;

  const [ indexes, setIndexes ] = useState([0]); 
  const [ counter, setCounter ] = useState(1);
  const [ tags, setTags ] = useState(['tagList[0]']);

  useEffect(() => {
    console.log('article.tagList: ', article.tagList);
    const arr1 = article.tagList.map((item, index) => {
      return `tagList[${index}]`
    });
    const arr2 = article.tagList.map((item, index) => {
      return index;
    });
    
    setTags(arr1);
    setCounter(article.tagList.length + 1);
    setIndexes(arr2)
    // eslint-disable-next-line
  }, []);
  
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
    await props.history.push(`/articles/${article.slug}`); // Переход обратно на статью
  }

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

  const renderTagInput = (item) => {
    return (
      <fieldset key={item} name={item} className="form-group row input-bottom" style={{ display: 'flex' }}>
        <input type="text"
              className="input"
              style={{ width: '50%' }}
              name={item}
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
    article
      ? <form className="form-create-article" onSubmit={handleSubmit(onSubmitArticle)}>
          <label htmlFor="title" className="label">Title</label>
          <input type="text"
                name="title"
                id="title"
                className="input"
                placeholder="Title"
                ref={register}
          />
          { errors.title && <span className="text-danger">The field must be filled</span> }

          <label htmlFor="description" className="label">Short description</label>
          <input type="text"
                name="description"
                id="description"
                className="input"
                placeholder="Title"
                ref={register}
          />
          { errors.description && <span className="text-danger">The field must be filled</span> }

          <label htmlFor="" className="label">Text</label>
          <textarea className="input textarea"
                    name="body"
                    id="body"
                    placeholder="Text"
                    ref={register}
          />
          { errors.body && <span className="text-danger">The field must be filled</span> }

          <label htmlFor="" className="label">Tags</label>
          {
            tags.map((item, index) => {
              return renderTagInput(item, index)
            })
          }

          <button type="submit" className="btn-primary w300">Send</button>
        </form>
        : <Spiner />
  );
};

export default withRouter(EditArticleRenderForm);
