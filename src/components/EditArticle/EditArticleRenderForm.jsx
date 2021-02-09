import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uniqueId from "lodash.uniqueid";
import PropTypes from "prop-types";
import classNames from "classnames";

import Spiner from "../Spiner";

import { updateArticle } from "../../actions";

import { getLocalData } from "../../service/local-service";

import "./EditArticle.css";

const EditArticleRenderForm = (props) => {
  const token = getLocalData("token");
  const { article } = props;

  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState(article.tagList);
  const [includesTagMessage, setIncludesTagMessage] = useState(false);
  const [emtyTagMessag, setEmtyTagMessag] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });

  const dispatch = useDispatch();

  const onSubmitArticle = async (data) => {
    data.tagList = tagsList;
    await dispatch(updateArticle(token, article.slug, data));
    // eslint-disable-next-line
    await props.history.push(`/articles/${article.slug}`); // Переход на общий список
  };

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
  };

  const addTag = () => {
    if (tagsList.includes(tag)) {
      setIncludesTagMessage(true);
      return null;
    }

    if (tag === "" || tag.trim() === "") {
      setEmtyTagMessag(true);
      setTag("");
      return null;
    }

    const newTagsList = [...tagsList, tag];
    setTagsList(newTagsList);
    setTag("");
    setIncludesTagMessage(false);
  };

  const deleteTag = (event) => {
    event.preventDefault();
    const newTagsList = tagsList.filter(
      (tag) => tag !== event.target.textContent
    );
    setTagsList(newTagsList);
  };

  const tagClass = classNames({
    tag: true,
    "tag-include": includesTagMessage,
  });

  return article ? (
    <form
      className="form-create-article"
      onSubmit={handleSubmit(onSubmitArticle)}
    >
      <label htmlFor="title" className="label">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="input"
        placeholder="Title"
        ref={register}
      />
      {errors.title && (
        <span className="text-danger">The field must be filled</span>
      )}

      <label htmlFor="description" className="label">
        Short description
      </label>
      <input
        type="text"
        name="description"
        id="description"
        className="input"
        placeholder="Title"
        ref={register}
      />
      {errors.description && (
        <span className="text-danger">The field must be filled</span>
      )}

      <label htmlFor="" className="label">
        Text
      </label>
      <textarea
        className="input textarea"
        name="body"
        id="body"
        placeholder="Text"
        ref={register}
      />
      {errors.body && (
        <span className="text-danger">The field must be filled</span>
      )}

      <label htmlFor="tag" className="label">
        Tags
      </label>
      <fieldset>
        {!tagsList.length ? null : (
          <div>
            {tagsList.map((item) => (
              <span
                className={item !== tag ? "tag" : tagClass}
                key={uniqueId()}
                onClick={deleteTag}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <input
          type="text"
          className="input m-right w-300"
          placeholder="Tag"
          value={tag}
          id="tag"
          name="tag"
          onChange={onChangeTag}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
            return false;
          }}
        />
        <button type="button" onClick={addTag} className="btn-add">
          Add
        </button>
        {includesTagMessage && (
          <div className="err-text">There is such a tag</div>
        )}
        {emtyTagMessag && (
          <div className="err-text">The tag cannot be empty</div>
        )}
      </fieldset>

      <button type="submit" className="btn-primary w300">
        Send
      </button>
    </form>
  ) : (
    <Spiner />
  );
};

EditArticleRenderForm.propTypes = {
  article: PropTypes.object.isRequired,
};

export default withRouter(EditArticleRenderForm);
