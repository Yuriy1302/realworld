import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { createArticle, getArticlesList } from '../../actions';

import './CreateArticle.css';

const CreateArticle = (props) => {
  const token = localStorage.getItem('token');
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ body, setBody ] = useState('');
    
  /* for value of input tag */
  const [ tag, setTag ] = useState('');
  const [ tagsList, setTagsList ] = useState([]);
  const [ includesTagMessage, setIncludesTagMessage ] = useState(false);
  const [ emtyTagMessag, setEmtyTagMessag ] = useState(false);
  
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  
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

  const onSubmitArticle = async (data) => {
    data.tagsList = tagsList.reverse();
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

  const tagClass = classNames({
    tag: true,
    'tag-include': includesTagMessage
  });

  return (
    <div>
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
                  
            <label htmlFor="tag" className="label">Tags</label>
            <fieldset>
            {
            !tagsList.length ? null : <div>{tagsList.map(item => (
              <span className={item !== tag ? "tag" : tagClass} key={tag} onClick={deleteTag}>{item}</span>
            ))}</div>
          }
            <input type="text"
                    className="input m-right w-300"
                    placeholder="Tag"
                    value={tag}
                    id="tag"
                    name="tag"
                    onChange={onChangeTag}

                    onKeyDown={(event) => {
                        
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          addTag();
                        }
                        return false;
                      }
                    }
            />
              <button type="button" onClick={addTag} className="btn-add">Add</button>
              { includesTagMessage && <div className="text-danger">There is such a tag</div> }
              { emtyTagMessag && <div className="text-danger">The tag cannot be empty</div>}
            </fieldset>

          <button type="submit" className="btn-primary w300">Send</button>        
        </form>
      </div>
      <div className="p-top"></div>
    </div>
  );
};

export default withRouter(CreateArticle);
