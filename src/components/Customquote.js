import React, { useEffect } from "react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "../App.css";
import { isMobileDevice } from "./Checkdevice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export default function Customquote() {
  const [previewImage, setPreviewImage] = useState("");
  const [quotetext, Setquotetext] = useState("");
  const [fontfamily, Setfontfamily] = useState("Poppins");
  const [color, Setcolor] = useState("white");
  const [size, Setsize] = useState("medium");
  const [border,Setborder]=useState("20px");
  const [author, Setauthor] = useState("");
  const fonts = [
    "Bruno Ace SC",
    "Delius Unicase",
    "Fugaz One",
    "Shippori Antique B1",
    "Open Sans",
    "Roboto",
    "Montserrat",
    "Lato",
    "Poppins",
    "Quicksand",
    "Muli",
    "Playfair Display",
    "Sirin Stencil",
    "Montez",
    "Sofia",
    "Shippori Antique B1",
    "New Rocker",
    "Source Code Pro",
    "Open Sans",
  ];
  const styles = {
    fontFamily: fontfamily,
    color: color,
    fontSize: size,
  };

  const desktopStyles = {
    backgroundImage: `url(${previewImage})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "380px",
    width: "560px",
        marginTop: "23px",
  };

  const mobileStyles = {
    backgroundImage: `url(${previewImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "310px",
    width: "94%",
  };
  const divStyles = isMobileDevice() ? mobileStyles : desktopStyles;
  const divToDownloadRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    html2canvas(divToDownloadRef.current).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "quote_image.png";
      link.href = dataURL;
      link.click();
    });
  };


  return (
    <div style={{position:"relative"}}>
        <h2>Custom quote</h2>
      <div className="row">
        <div className="col-lg-6 col-sm-12" >
          <form className="quote-form" >
            <div className="form-group">
              <label htmlFor="image-upload">Upload Background Image:</label>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quotetext">Your Quote:</label>
              <input
                value={quotetext}
                onChange={(e) => Setquotetext(e.target.value)}
                className="quotetext"
                maxLength={size != "28px" && size!="24px" && size!="12px" && size!="20px" ?  404 : size=="20px" ? 344 : size == "24px" ? 200 : size=="28px" ? 150 :650}
                type="text"
                style={{width:"100%"}}
                placeholder="Enter your quote here"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                value={author}
                onChange={(e) => Setauthor(e.target.value)}
                type="text"
                className="author"
                style={{width:"100%"}}
                placeholder="Enter the author's name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="font-family">Select Font:</label>
              <select
                id="font-family"
                value={fontfamily}
                onChange={(e) => Setfontfamily(e.target.value)}
              >
                {fonts.map((e, index) => (
                  <option value={e} key={index}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="text-color">Text Color:</label>
              <input
                value={color}
                onChange={(e) => Setcolor(e.target.value)}
                type="color"
                id="text-color"
              />
            </div>
            <div className="form-group">
              <label htmlFor="text-size">Text Size:</label>

              <select
                id="text-size"
                value={size}
                onChange={(e) => {
                  (Setsize(e.target.value))
                }}
              >
                <option value="12px">12px</option>
                <option value="16px">16px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="28px">28px</option>
              </select>
            </div>
          </form>
        </div>
        <div
          className="col-lg-6 col-sm-12 divback"
          ref={divToDownloadRef}
          style={divStyles}
        >
          <center>
            
            {previewImage && (
              <>
                <button
                  className="contentimg2 dowloadcustombtn"
                  onClick={(e) => {
                    e.target.style.visibility = "hidden";
                    handleDownload();
                    e.target.style.visibility = "visible";
                  }}
                  style={!isMobileDevice() ?{height:"40px",left:"250px",backgroundColor:"transparent"} :{height:"40px",left:"140px",backgroundColor:"transparent"}}
                >
 
                  <FontAwesomeIcon
                    icon={faCircleDown}
                    fade
                    style={{ color: "skyblue" }}
                    size="2x"
                  />
                </button>
                <p style={styles} className="contentimg2 conatainer">
                  {quotetext}
                </p>
                <br />
                <p style={styles} className="contentimg2">
                 {author!="" ? "-" : "" } {author}
                </p>
              </>
            )}
          </center>
        </div>
      </div>
    </div>
  );
}
