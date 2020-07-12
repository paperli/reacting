import React from 'react';
import './Reveal.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Lottie from 'lottie-web-react';
import iconShop from './Assets/Animation/shop.json';
import iconAR from './Assets/Animation/ar.json';
import iconCode from './Assets/Animation/code.json';
import FadeIn from "react-fade-in";
import ContentLoader from "react-content-loader";
import { useTranslation } from 'react-i18next';

const SCROLL_TRAVEL_DISTANCE = 300;

function interpolate(x, xMin, xMax, yMin, yMax, clipMin = true) {
  if (clipMin) {
    return Math.min(Math.max( ( (x - xMin) * (yMax - yMin) / (xMax - xMin) ) + yMin, yMin), yMax);
  }
  return Math.min(( (x - xMin) * (yMax - yMin) / (xMax - xMin) ) + yMin, yMax);
}

function calcHeaderOffset(scrollY) {
  return Math.min(scrollY, SCROLL_TRAVEL_DISTANCE + 100);
}

function maskShallHide(scrollY) {
  return scrollY > SCROLL_TRAVEL_DISTANCE - 150;
}

function calcLogoScale(scrollY) {
  return interpolate(scrollY, 0, SCROLL_TRAVEL_DISTANCE, 1, 10);
}

function calcLogoOpacity(scrollY) {
  return 1 - interpolate(scrollY, SCROLL_TRAVEL_DISTANCE - 150, SCROLL_TRAVEL_DISTANCE, 0, 1);
}

function Footer() {
  return (
    <div className="row footer d-flex flex-column align-items-center">
      <div className="divider"></div>
      <div className="social mt-3 mb-3 d-flex flex-row"><a href="https://www.instagram.com/predatorgaming/" className="instagram"><FontAwesomeIcon icon={faInstagram} size="2x"/></a></div>
      <div className="credit mb-4">© Diing Inc. 2020</div>
    </div>
  );
}

function Reveal() {
  const middlePartRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    function handleResize() {
      handleScroll();
    }

    function handleScroll() {
      setScrollY(window.scrollY);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    fetch("https://modelviewer.dev/shared-assets/models/Astronaut.glb")
      .then(() => {
        setTimeout(() => setLoading(false), 4000);
      });
  });

  return (
    <div className="main container-fluid" style={{transform: `translate(0,${calcHeaderOffset(scrollY)}px)`}}>
      {loading ? (
        <ContentLoader
          style={{width:"100%"}}
          speed={2}
          height={600}
          backgroundColor="#f3f3f3"
          foregroundColor="#cccccc"
        >
          <rect x="0" y="0" rx="2" ry="2" width="100%" height="600" />
        </ContentLoader>
      ) : (
        <FadeIn>
        <div className="row">
            <div className="showcase overflow-hidden w-100 bg-dark position-relative">
              <div className="chair h-100 w-100">
                <div className="realityfab-wrapper">
                  <iframe style={{border: "none", background: "transparent"}} scrolling="no" width="100%" height="100%" allow="fullscreen" src="http://localhost:3000/reacting/embed.html" frameborder="0"></iframe>
                </div>
              </div>
              <div className={`mask w-100 h-100 position-absolute flex-column ${maskShallHide(scrollY) ? "d-none" : "d-flex"}`} style={{transform: `scale(${calcLogoScale(scrollY)})`, opacity: calcLogoOpacity(scrollY)}}>
                <div className="top-part w-100 flex-grow-1"></div>
                <div className="center-part w-100 d-flex flex-row">
                  <div className="left-part flex-grow-1">&nbsp;</div>
                  <div className="middle-part" ref={middlePartRef} style={{width: 300, height: 300}}>&nbsp;</div>
                  <div className="right-part flex-grow-1">&nbsp;</div>
                </div>
                <div className="bottom-part w-100 flex-grow-1"></div>
              </div>
            </div>
        </div>
        </FadeIn>
      )}
      <div className="row">
        <div className="container d-flex align-items-center justify-content-center flex-column flex-md-row mt-5 mb-4">
          <div className="event flex-grow-1" style={{background: "black"}}>
            <h1>{t('head')}</h1>
            <ul className="d-flex flex-column align-items-left rules">
              <li>
                <div className="icon ar-lottie"><Lottie className="lottie-icon" options={{autoplay: true, animationData: iconAR, loop: true}} playingState={"play"}></Lottie></div>
                <div className="description flex-grow-1">{t('description1')}</div>
              </li>
              <li>
                <div className="icon code-lottie"><Lottie className="lottie-icon" options={{autoplay: true, animationData: iconCode, loop: true}} playingState={"play"}></Lottie></div>
                <div className="description flex-grow-1">{t('description2')}</div>
              </li>
              <li>
                <div className="icon shop-lottie"><Lottie className="lottie-icon" options={{autoplay: true, animationData: iconShop, loop: true}} playingState={"play"}></Lottie></div>
                <div className="description flex-grow-1">{t('description3.phrase1')}<a href="#">{t('description3.phrase2')}</a>{t('description3.phrase3')}</div>
              </li>
              <li><div className="footnote">{t('compatibility_note')}</div></li>
            </ul>
            <a href="https://predatorxosim.com" className="btn btn-primary btn-main mb-5" target="_blank" rel="noopener noreferrer" role="button">Find Out More</a>
          </div>
          <div className="qrcode ml-md-4 mb-4">&nbsp;</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reveal;
