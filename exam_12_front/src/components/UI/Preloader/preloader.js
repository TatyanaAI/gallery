import React from 'react';
import './preloader.css';

const Preloader = ({loading}) => (
  <div className="Preloader" style={{ display: loading ===true ? 'block' : 'none' }}>Loading...</div>
);

export default Preloader;

