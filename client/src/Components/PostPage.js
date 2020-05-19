import React from 'react';
import Base from './Base';
import { useState, useEffect } from 'react';
import { getPost, deletePost } from '../Api/PostsAPI';
import {searchUser, isAuthenticated} from '../Api/AuthAPI';
import { Redirect } from 'react-router-dom';


const APost = ({match, location}) => {

  const { user, token } = isAuthenticated();
    const [post, setPost] =useState({
        id : "",
        title : "",
        description : "",
        img_src: "",
        postUser : "",
        userName : ""
    })
    const {id, title, description, img_src, postUser, userName} = post;

   
    const preloadData = () =>{
       var id = match.params.postId;
        getPost(id)
        .then(data => {
            setPost({
              id: data._id,
              title: data.title,
              description: data.description,
              img_src: data.image[0].url,
              postUser: data.user,
            });
        })
    }

   useEffect(()=>{
       preloadData();
   })

   const delButton = () => {
     alert("Are you sure you want to delete this post?");
     var postId = id;
     var userId = user._id;
     deletePost(postId, userId, token).then(data => {

     });
     
   };    

   const username = () => {
    searchUser(user)
    .then(fetcheduser=>{
       
    })
   }


    const showPost = () => {
        return (
          <div>
            <div className="row text-dark">
              <div className="col-sm-12 col-lg-4 ">
                <img src={img_src} alt="" className="img-thumbnail" />
              </div>
              <div className=" col-sm-12 col-lg-8">
                <h3>Description :</h3>
                <div className="bg-light">{description}</div>
                <p>
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                       <button
                       className="btn btn-info"
                       onClick={delButton}
                     >
                       Delete
                     </button>
                    )}
                </p>
              </div>
            </div>
          </div>
        );
    }

    return ( 
        <Base title={title} >

           {showPost()}

        </Base>
     );
}
 
export default APost;