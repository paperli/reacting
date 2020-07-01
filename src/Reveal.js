import React from 'react';
import './Reveal.css';
import hero_image from './Assets/Images/OSIMxPredator-01.png';
import logo_image from './Assets/Images/predator_logo.svg';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function interpolate(x, xMin, xMax, yMin, yMax, clipMin = true) {
  if (clipMin) {
    return Math.min(Math.max( ( (x - xMin) * (yMax - yMin) / (xMax - xMin) ) + yMin, yMin), yMax);
  }
  return Math.min(( (x - xMin) * (yMax - yMin) / (xMax - xMin) ) + yMin, yMax);
}

function calcHeaderOffset(scrollY) {
  return Math.min(scrollY, 200);
}

function calcLogoScale(scrollY) {
  return interpolate(scrollY, 0, 200, 1, 10);
}

function calcLogoOpacity(scrollY) {
  return 1 - interpolate(scrollY, 200 - 50, 200, 0, 1);
}

function Reveal() {
  const middlePartRef = useRef(null);
  const [logoHeight, setLogoHeight] = useState(200);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleResize() {
      setLogoHeight(middlePartRef.current.offsetHeight);
      handleScroll();
    }

    function handleScroll() {
      setScrollY(window.scrollY);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div className="main container-fluid">
      <div className="row">
        <div className="showcase overflow-hidden w-100 bg-dark position-relative" style={{transform: `translate(0,${calcHeaderOffset(scrollY)}px)`}}>
          <img src={hero_image} alt="PREDATORxOSIM" width="100%" height="100%" className="chair"/>
          <div className="mask w-100 h-100 position-absolute d-flex flex-column" style={{transform: `scale(${calcLogoScale(scrollY)})`, opacity: calcLogoOpacity(scrollY)}}>
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
      <div className="row">
        <div className="col-12" style={{height: 200, background: "black"}}></div>
      </div>
    </div>
  );
}

export default Reveal;
