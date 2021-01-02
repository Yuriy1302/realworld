import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import { createArticle, getArticlesList } from '../../actions';

import './CreateArticle.css';

const CreateArticle = (props) => {
  const token = localStorage.getItem('token');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ body, setBody ] = useState('');
  
  const [ indexes, setIndexes ] = useState([0]); 
  const [ counter, setCounter ] = useState(1);
  const [ tags, setTags ] = useState(['tagsList[0]']);
  
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmitArticle = async (data) => {
    await dispatch(createArticle(data, token));
    await dispatch(getArticlesList());
    // eslint-disable-next-line
    await props.history.push('/'); // Переход на общий список
  }

  const onChangeTitle = (event) => {
    const { value } = event.target;
    setTitle(value);
  }

  const onChangeDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
  }

  const onChangeBody = (event) => {
    const { value } = event.target;
    setBody(value);
  }

  const addField = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    const newTag = `tagsList[${indexes.length}]`;
    setTags(prevTags => [...prevTags, newTag]);
    setCounter(prevCounter => prevCounter + 1);
    return null;
  }

  const removeField = (item) => {
    if (tags.length === 1) {
      return false;
    }
    const index = tags.indexOf(item);
    setTags(prevTags => [...prevTags.filter(el => el !== tags[index])]);
    return null;
  }

  const renderTagInput = (item) => {
    return (
      <fieldset key={item} name={item} className="form-group row input-bottom" style={{ display: 'flex' }}>
        <input type="text"
              className="input"
              style={{ width: '50%' }}
              name={item}
              placeholder="Tag"
              ref={register({ required: false })}
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
    <div className="create-article">
      <h2>Create new article</h2>
      <form className="form-create-article" onSubmit={handleSubmit(onSubmitArticle)}>
        <label htmlFor="title" className="label">Title</label>
        <input type="text"
               name="title"
               id="title"
               onChange={onChangeTitle}
               value={title}
               className="input"
               placeholder="Title"
               ref={register({ required: true })}
        />
        { errors.title && <span className="text-danger">The field must be filled</span> }

        <label htmlFor="description" className="label">Short description</label>
        <input type="text"
               name="description"
               id="description"
               onChange={onChangeDescription}
               value={description}
               className="input"
               placeholder="Title"
               ref={register({ required: true })}
        />
        { errors.description && <span className="text-danger">The field must be filled</span> }
        
        <label htmlFor="body" className="label">Text</label>
        <textarea className="input textarea"
                  name="body"
                  id="body"
                  onChange={onChangeBody}
                  value={body}
                  placeholder="Text"
                  ref={register({ required: true })}
        />
        { errors.body && <span className="text-danger">The field must be filled</span> }

        <span className="label">Tags</span>
        {
          tags.map(item => {
            return renderTagInput(item)
          })
        }
        
        <button type="submit" className="btn-primary w300">Send</button>        
      </form>
    </div>
  );
};

export default withRouter(CreateArticle);
