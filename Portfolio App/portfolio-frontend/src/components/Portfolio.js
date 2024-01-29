import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/portfolio')
      .then(response => response.json())
      .then(data => setPortfolios(data));
  }, []);

  return (
    <div>
      <h1>Portfolio Items</h1>
      {portfolios.map(portfolio => (
        <div key={portfolio._id}>
          <h2>{portfolio.title}</h2>
          <p>{portfolio.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
