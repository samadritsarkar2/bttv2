import React, {useState} from 'react';
import Base from './Base';
import Nav from './Nav';
import '../index.css';
import { Link } from 'react-router-dom';
import { Carousel } from "react-bootstrap";

const Home = () => {

  const Slider = () =>{
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src="https://res.cloudinary.com/samadritsarkar/image/upload/v1589903046/jhxvfwg4t36r6zje3os4.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src="https://res.cloudinary.com/samadritsarkar/image/upload/v1589903277/jyzf2yxiuukerdmmi5ft.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Ujjayanta Palace</h3>
            <p>Tripura's State Museum</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src="https://res.cloudinary.com/samadritsarkar/image/upload/v1589903669/mwooowovqj3qraivv46i.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Unakoti</h3>
            <p>
              Ancient stone Cravings
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  

    return (
      <div>
        <Nav />
        <div className="container">
          <div className="jumbotron bg-light mt-2">
            <div className="container">
              <h1 className="text-dark">Breathtaking Tripura v2.0</h1>
              <p className=" des text-lg-right font-weight-bolder">
                Showcase the beauty of Tripura
              </p>
            </div>
          </div>
        </div>

      <div className="container h-100">
        {Slider()}
        <br></br>
        <br></br>
      </div>
      
        <div className="container">
          <div className="row">
            <div className="col">
              <Link className="btn btn-outline-info btn-block" to="/all">
                Checkout the Places
              </Link>
            </div>
            <div className="col">
              <Link className="btn btn-outline-info btn-block" to="/new">
                Add in a place
              </Link>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
}
 
export default Home;