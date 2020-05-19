import React, { useState } from 'react';
import Base from './Base';
import { createPost } from '../Api/PostsAPI';
import { isAuthenticated } from '../Api/AuthAPI';
import { Redirect } from 'react-router-dom';

const NewPost = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    error: "",
    loading: false,
    didRedirect: false,
    formData: new FormData(),
  });
  const {
    title,
    description,
    image,
    error,
    loading,
    didRedirect,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createPost(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          image: "",
          error: "",
          loading: false,
          didRedirect: true,
        });
      }
    });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Post is being created...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const didRedirectFunction = () => {
    if (didRedirect) {
      return <Redirect to="/all" />;
    }
  };

  const PostForm = () => {
    return (
      <form encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Name of the place</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            className="form-control "
            type="text"
            name="description"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-group">
          <label className="btn btn-block btn-info" htmlFor="image">
            <input
              type="file"
              name="image"
              className="form-control-file"
              placeholder="choose a image"
              accept="image/*"
              onChange={handleChange("image")}
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-info btn-block"
        >
          Submit
        </button>
      </form>
    );
  };
  return (
    <div>
      <Base title="Add Location" description="Add new post here">
        {loadingMessage()}
        {errorMessage()}
        {didRedirectFunction()}
        {PostForm()}
      </Base>
    </div>
  );
};
 
export default NewPost;