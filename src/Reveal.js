import React from 'react';
import './Reveal.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

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
  return scrollY > SCROLL_TRAVEL_DISTANCE
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
      <div className="social mt-3 mb-3 d-flex flex-row"><a href="#" className="instagram">&nbsp;</a></div>
      <div className="credit mb-4">© Diing Inc. 2020</div>
    </div>
  );
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
          <div className="chair h-100 w-100">
            
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
      <div className="row">
        <div className="container d-flex align-items-center justify-content-center flex-column flex-md-row mt-5 mb-4">
          <div className="event flex-grow-1" style={{background: "black"}}>
            <h1>贏得您的獎勵</h1>
            <ul className="d-flex flex-column align-items-left rules">
              <li><div className="icon"></div><div className="description flex-grow-1">在擴增實境相容的裝置*上開啟本頁，點擊上面的擴增實境按鈕，在您的房間或是辦公室等空間中體驗電競座椅的舒適感受。</div></li>
              <li><div className="icon"></div><div className="description flex-grow-1">當您在擴增實境中體驗電競座椅時，花點時間，在座椅上尋找優惠代碼。請仔細觀察，優惠代碼就藏在座椅的某個地方。</div></li>
              <li><div className="icon"></div><div className="description flex-grow-1">前往<a href="#">商店</a>，挑選並購買您喜歡的電競座椅，在結帳時輸入優惠代碼。恭喜您完成任務，贏得折扣獎勵！</div></li>
              <li><div className="footnote">* 擴增實境體驗適用於搭載 iOS 12 或以上的 iPhone 及 iPad，或是安裝了 Google Chrome v83 版本的 Android 裝置。</div></li>
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
