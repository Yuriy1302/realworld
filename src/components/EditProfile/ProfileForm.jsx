import React from "react";
import { useDispatch /* useSelector */ } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { notification } from "antd";

import { updateUser } from "../../actions";

const ProfileForm = (props) => {
  const { username, email } = props.user;
  const dispatch = useDispatch();
  /* const { error } = useSelector((state) => state.genericReducer); */
  const { token } = props;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      username,
      email,
    },
  });

  // Отправка новых данных
  const onSubmitProfile = (data) => {
    const newData = {};

    for (const item in data) {
      if (data[item] !== "") {
        newData[item] = data[item];
      }
    }

    dispatch(updateUser(token, newData));
    /* if (error) { */
    notification.success({
      message: "Correction of profile saved",
      duration: 2,
    });
    /* } else {
      notification.error({
        message: "There is an Error!",
        duration: 2
      }); 
    } */
  };

  return (
    <div className="edit-profile">
      <form
        action=""
        className="form-create"
        onSubmit={handleSubmit(onSubmitProfile)}
      >
        <h3>Edit Profile</h3>
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="input"
          placeholder="Username"
          ref={register({ required: true, minLength: 3, maxLength: 20 })}
        />
        {errors.username?.type === "required" && (
          <span className="text-danger">The field must be filled</span>
        )}
        {errors.username?.type === "minLength" && (
          <span className="text-danger">Needs to be at least 3 characters</span>
        )}
        {errors.username?.type === "maxLength" && (
          <span className="text-danger">
            Must be no more than 20 characters long
          </span>
        )}

        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email address"
          ref={register({
            required: true,
            // eslint-disable-next-line
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email?.type === "required" && (
          <span className="text-danger">The field must be filled</span>
        )}
        {errors.email?.type === "pattern" && (
          <span className="text-danger">Needs to enter a valid address</span>
        )}

        <label htmlFor="password" className="label">
          New password
        </label>
        <input
          type="password"
          name="password"
          className="input"
          placeholder="New password"
          ref={register({ minLength: 8, maxLength: 40 })}
        />
        {errors.password?.type === "minLength" && (
          <span className="text-danger">
            Your password needs to be at least 8 characters
          </span>
        )}
        {errors.password?.type === "maxLength" && (
          <span className="text-danger">
            Your password must be no more than 40 characters long
          </span>
        )}

        <label htmlFor="password" className="label">
          Avatar image (url)
        </label>
        <input
          type="text"
          name="image"
          className="input"
          placeholder="Avatar image"
          // eslint-disable-next-line
          ref={register({
            pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
          })}
        />
        {errors.image?.type === "pattern" && (
          <span className="text-danger">Needs to enter a valid URL</span>
        )}

        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string.isRequired,
};

export default ProfileForm;
