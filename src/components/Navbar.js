import React from 'react'
import icon from "./images/icon.png";
import mobileicon from "./images/mobileicon.png";

import { isMobileDevice } from './Checkdevice';
const navelement=["Templates Gallery","Custom Quotes"]
let scrollArr={
  "Templates Gallery":"section1",
  "Custom Quotes":"section2",
}
function scrollToSection(e) {
  let sectionToScroll = e.target.innerText;
  let scroll = scrollArr[sectionToScroll];
  console.log(scroll);
  let section = document.getElementById(scroll); // Replace "section2" with the ID of the target section

  const sectionTopOffset = section.getBoundingClientRect().top;
  const scrollPosition = sectionTopOffset + window.pageYOffset-38;

  window.scrollTo({ top: scrollPosition, behavior: "smooth" });
}
export default function Navbar() {
  return (
    <div className='NAV'>
      <center>
    <ol className='navBtn'>
      <img className='iconnav' style={ !isMobileDevice() ?{ height:"29px",width:"145px"} : { height:"26px",width:"31px"}} src={!isMobileDevice() ? icon : mobileicon} alt="" />
      { navelement.map((e,index)=>{
       return <button onClick={scrollToSection} style={isMobileDevice() ?{backgroundColor:"transparent",border:"none" ,width:"153px",fontSize:"13px"} : {backgroundColor:"transparent",border:"none"} }><li  className='btns' key={index}>{ e}</li></button>

       })}
    </ol>
    </center>
    </div>
  )
}
