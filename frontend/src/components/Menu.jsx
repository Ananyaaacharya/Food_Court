//src/components/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const menuItems = [
  {
    src: 'breakfast.jpg',
    alt: 'Breakfast',
    link: '/breakfast',
    title: 'Breakfast',
    description: 'Start your day with a healthy breakfast.'
  },
  {
    src: 'meals.JPG',
    alt: 'Meal',
    link: '/meals', 
    title: 'Meal',
    description: 'Delicious meals to satisfy your hunger.'
  },
  {
    src: 'snacks.jpg',
    alt: 'Snacks',
    link: '/snacks', // Link to /snacks route (example)
    title: 'Snacks',
    description: 'Tasty snacks for a quick bite.'
  },
  {
    src: 'egg.jpeg',
    alt: 'Egg Items',
    link: '/egg-items', 
    title: 'Egg Items',
    description: 'A variety of egg dishes for you.'
  },
  {
    src: 'chicken.jpeg',
    alt: 'Chicken Items',
    link: '/chicken-items', 
    title: 'Chicken Items',
    description: 'Delicious chicken dishes to relish.'
  }
];

const Menu = () => {
  return (
    <div className="menu-container container">
      <div className="row justify-content-center">
        {menuItems.map((item, index) => (
          <div className="col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card">
              <img className="card-img-top" src={item.src} alt={item.alt} />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={item.link}>{item.title}</Link> 
                </h5>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
