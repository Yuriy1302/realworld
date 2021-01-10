import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

import Spiner from '../Spiner';

import { updateArticle } from '../../actions';

import './EditArticle.css';

const EditArticleRenderForm = (props) => {
  const token = localStorage.getItem('token');
  const { article } = props;
  
  /* const [ indexes, setIndexes ] = useState([0]); 
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
  }, []); */

  const [ tag, setTag ] = useState('');
  const [ tagsList, setTagsList ] = useState(article.tagList);
  const [ includesTagMessage, setIncludesTagMessage ] = useState(false);
  const [ emtyTagMessag, setEmtyTagMessag ] = useState(false);
  
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
      /* tagList: article.tagList */
    }
  });

  const dispatch = useDispatch();

  /* const onSubmitArticle = async (data) => {
    let newData = {};
    for (let item in data) {
      if (data[item] !== '') {
        newData[item] = data[item];
      }
    }
    await dispatch(updateArticle(token, article.slug, newData));
    await props.history.push(`/articles/${article.slug}`); // Переход обратно на статью
  } */

  const onSubmitArticle = async (data) => {
    /* console.log(tagsList); */
    data.tagList = tagsList;
    await dispatch(updateArticle(token, article.slug, data));
    // eslint-disable-next-line
    await props.history.push(`/articles/${article.slug}`); // Переход на общий список
  }

  /* const addField = () => {
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
  }; */

/* for value of input tag */
const onChangeTag = (event) => {
  event.preventDefault();
  if (includesTagMessage) {
    setIncludesTagMessage(false);
  }
  if (emtyTagMessag) {
    setEmtyTagMessag(false);
  }
  const { value } = event.target;
  setTag(value);
}


const addTag = () => {
  /* event.preventDefault(); */
  if (tagsList.includes(tag)) {
    setIncludesTagMessage(true);
    return null;
  }
  if (tag === '' || tag.trim() === '') {
    setEmtyTagMessag(true);
    setTag('');
    return null;
  }
  const newTagsList = [ ...tagsList, tag ];
  setTagsList(newTagsList);
  setTag('');
  setIncludesTagMessage(false);
}

const deleteTag = (event) => {
  event.preventDefault();
  const { textContent } = event.target;
  const index = tagsList.indexOf(textContent);
  const newTagsList = [ ...tagsList.slice(0, index), ...tagsList.slice(index + 1) ];
  setTagsList(newTagsList);
}

const tagClass = classNames({
  tag: true,
  'tag-include': includesTagMessage
});





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

          {/* <label htmlFor="" className="label">Tags</label>
          {
            tags.map((item, index) => {
              return renderTagInput(item, index)
            })
          } */}

          <label htmlFor="tag" className="label">Tags</label>
            <fieldset>
            {
            !tagsList.length ? null : <div>{tagsList.map(item => (
              <span className={item !== tag ? "tag" : tagClass} key={uniqueId()} onClick={deleteTag}>{item}</span>
            ))}</div>
          }
            
              <input type="text"
                    className="input m-right"
                    style={{ width: '300px' }}
                    placeholder="Tag"
                    value={tag}
                    id="tag"
                    name="tag"
                    onChange={onChangeTag}

                    onKeyDown={(event) => {
                        
                        if (event.key === 'Enter') {
                          // console.log("You pressed 'Enter' key!");
                          event.preventDefault();
                          addTag();
                        }
                        return false;
                      }
                    }

                   /*  ref={register({
                      validate: (value) => value.trim().length !== 0
                    })} */ />
              {/* { errors.tag && <span style={{ color: 'red', fontSize: '14px' }}>The field cannot be empty</span> } */}
              <button type="button" onClick={addTag} className="btn-add">Add</button>
              { includesTagMessage && <div style={{ color: 'red' }}>There is such a tag</div> }
              { emtyTagMessag && <div style={{ color: 'red' }}>The tag cannot be empty</div>}
            </fieldset>



          

          <button type="submit" className="btn-primary w300">Send</button>
        </form>
        : <Spiner />
  );
};

EditArticleRenderForm.propTypes = {
  article: PropTypes.object.isRequired
}

export default withRouter(EditArticleRenderForm);
