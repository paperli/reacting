import React from 'react';
import './Reveal.css';
import hero_image from './Assets/Images/OSIMxPredator-01.png';
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
  return 1 - interpolate(scrollY, 200 - 150, 200, 0, 1);
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
    <div className="main container-fluid" style={{transform: `translate(0,${calcHeaderOffset(scrollY)}px)`}}>
      <div className="row">
        <div className="showcase overflow-hidden w-100 bg-dark position-relative">
          <div className="chair h-100 w-100">&nbsp;</div>
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
        <div className="container d-flex align-items-center justify-content-center flex-column flex-md-row my-4">
          <div className="event flex-grow-1" style={{background: "black"}}>
            <h1>Win The Prize</h1>
            <ul className="d-flex flex-column align-items-left rules">
              <li><div className="icon"></div><div className="description flex-grow-1">Press the AR button to try the chair in your physical place.</div></li>
              <li><div className="icon"></div><div className="description flex-grow-1">Find the coupon code in the chair in the AR mode.</div></li>
              <li><div className="icon"></div><div className="description flex-grow-1">Go to Store and shop a chair with the coupon code.</div></li>
            </ul>
          </div>
          <div className="qrcode">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

export default Reveal;
