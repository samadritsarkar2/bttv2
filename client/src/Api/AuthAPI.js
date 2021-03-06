import { API } from "../backend";

export const signup = async (user) => {
    try {
          const response = await fetch(`${API}/signup`, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
          });
          return response.json();
      }
      catch (err) {
          return console.log(err);
      }
  };
 
 
  export const signin = async (user) => {
    try {
          const response = await fetch(`${API}/signin`, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
          });
          return response.json();
      }
      catch (err) {
          return console.log(err);
      }
  };
  
 export const authenticate = (data,next) => {
     if (typeof window !== "undefined") {
         localStorage.setItem("jwt", JSON.stringify(data));
         next();
     }
 }
 
  
 export const signout = next => {
     if(typeof window !== "undefined"){
         localStorage.removeItem("jwt");
         next();
 
         return fetch(`${API}/signout`, {
             method : "GET"
         })
         .then(response => console.log("SIGNOUT Success !"))
         .catch(err => console.log(err))
 
     }
 }
 
 export const isAuthenticated = () => {
     if( typeof window == "undefined") {
         return false
     }
     if(localStorage.getItem("jwt")){
         return JSON.parse(localStorage.getItem("jwt"));
     } else {
         return false;
     }
 }
    
export const searchUser = async (userId) => {
  try {
    const response = await fetch(`${API}/searchuser/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (err) {
    return console.log(err);
  }
}; 