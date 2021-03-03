import React,{useState, useEffect} from 'react';
import Base from './Base';
import { getPost, getAllPosts } from '../Api/PostsAPI';
import { searchUser } from '../Api/AuthAPI';
import { Link } from 'react-router-dom';



const AllPosts = () => {

    const [ posts, setPosts ] = useState([]);
    const [pagi , setPagis] = useState({
        current : 1,
        limit : 8,
        skip : 0,
        total : 8
    });

    const {limit, skip, current, total} = pagi;

    const pagination = () => {
      
        const onNext = () =>{
            setPagis({
                skip : skip + 8,
                current : current +1,
                limit : 8
            });
            window.scrollTo(0,0);
        }

        const onPrev = () => {
          
            setPagis({
                skip : skip - 8,
                current : current -1,
                limit  : 8
            })
            window.scrollTo(0,0);
        }

        return (
            <div className="mt-30 text-center">
            <ul className="pagination justify-content-center">
                { current !=1 && (
                    <li className="page-item"><button className="btn btn-dark" onClick={onPrev}>Previous Page</button></li>
                )  }
                 <li className="page-item"><button className="btn btn-dark" > {current} </button></li>
                 {total>0 && (<li className="page-item"><button className="btn btn-dark" onClick={onNext}>Next Page</button></li>)}
                
               
            </ul>
        </div>
        )
    }

    const preloadData =()=>{
        getAllPosts(limit, skip)
        .then(data =>{
            if (data.error) {
                console.log(data.error);
              } else {
                setPosts(data);
              } 
        })

    };

    useEffect(()=>{
        preloadData();
    }, []);

    return (
      <div>
        <Base title="All Posts" description="All the posts">
          
          <div className="row text-dark">
            <div className="card-deck">
              {posts.map((post, index) => {
                return (
                  <div
                    key={index}
                    className="col-lg-3 col-sm-6 text-center mb-2 "
                  >
                    <div className="card h-100">
                      <img
                        src={post.image[0].url}
                        alt={post.title}
                        className="card-img-top img-thumbnail"
                      />
                      <div className="card-body ">
                        <h5 className="card-title">{post.title}</h5>
                      </div>
                      <div className="card-footer">
                        <Link
                          className="btn btn-info"
                          to={"/post/" + post._id}
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* {pagination()} */}
        </Base>
      </div>
    );
}
 
export default AllPosts;