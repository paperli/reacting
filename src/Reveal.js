import React from 'react';
import './Reveal.css';
import hero_image from './Assets/Images/OSIMxPredator-01.png';
import logo_image from './Assets/Images/predator_logo.svg';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Reveal() {
  const middlePartRef = useRef(null);
  const [logoHeight, setLogoHeight] = useState(200);

  useEffect(() => {
    function handleResize() {
      setLogoHeight(middlePartRef.current.offsetHeight);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="main container-fluid">
      <div className="row">
        <div className="showcase overflow-hidden w-100 bg-dark position-relative">
          <img src={hero_image} alt="PREDATORxOSIM" width="100%" height="100%" className="chair"/>
          <div className="mask w-100 h-100 position-absolute d-flex flex-column">
            <div className="top-part w-100 h-20"></div>
            <div className="center-part w-100 flex-grow-1 d-flex flex-row">
              <div className="left-part flex-grow-1">&nbsp;</div>
              <div className="middle-part" ref={middlePartRef} style={{width: logoHeight}}>&nbsp;</div>
              <div className="right-part flex-grow-1">&nbsp;</div>
            </div>
            <div className="bottom-part w-100 h-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reveal;
