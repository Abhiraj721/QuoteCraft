import React, { useRef, useState,useEffect } from "react";
import "../App.css";
import html2canvas from "html2canvas";
import { obj, obj2 } from "./Imageobj";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { isMobileDevice } from "./Checkdevice"; // Import the RandomFontGenerator component
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
function QuoteRender({ showtemps, quotetext, author }) {
  const canvasRef = useRef(null);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const divRefs = useRef([]);
  const [indextemps, Setindextemps] = useState(0);
  const objmaper = [obj, obj2];

  const captureToCanvas = (node) => {
    if (node) {
      // Create a new div to hold the canvas
      const canvasContainer = document.createElement("div");
      canvasContainer.style.backgroundImage = node.style.backgroundImage;
      canvasContainer.style.width = node.offsetWidth + "px";
      canvasContainer.style.height = node.offsetHeight + "px";
      canvasContainer.style.overflow = "hidden";

      // Create the canvas and set its background as transparent
      html2canvas(node, {
        allowTaint: true,
        background: "transparent",
        backgroundColor: null,
        useCORS: true, // Enable CORS to avoid tainted canvas
      }).then((canvas) => {
        const canvasElement = canvas;
        canvasContainer.appendChild(canvasElement);

        // Append the canvas container to the canvasRef
        // document.body.appendChild(canvasContainer);

        // Convert the canvas to a data URL and open it in a new tab
        const dataURL = canvas.toDataURL("image/png");

        // Download the image
        saveAs(dataURL, "image.png");
      });
    }
  };

  const handleButtonClick = (index) => {
    const divRef = divRefs.current[index];
    if (divRef) {
      captureToCanvas(divRef, {
        allowTaint: false,
      });
    }
  };

  const handleNextbtn = () => {
    if (indextemps > 0) return;
    Setindextemps(indextemps + 1);
    scrollToSection("section1")
  };

  const handlePrevbtn = () => {
    if (indextemps <= 0) return;
    Setindextemps(indextemps - 1);
    scrollToSection("section1")
  };
  function scrollToSection(e) {

    let section = document.getElementById(e); // Replace "section2" with the ID of the target section
  
    const sectionTopOffset = section.getBoundingClientRect().top;
    const scrollPosition = sectionTopOffset + window.pageYOffset-38;
  
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }

  return (
    <div>
      {/* The RandomFontGenerator component */}

      {showtemps && (
        <div className="row qrparent">
          {objmaper[indextemps].map((e, index) => {
            return (
              <div
                key={index}
                data-aos="zoom-in-up"
                className="col-lg-4 col-md-6 col-sm-1  templates"
                ref={(ref) => (divRefs.current[index] = ref)}
                style={{
                  fontFamily: "RandomFont", // Use the 'RandomFont' class from the RandomFontGenerator
                  backgroundImage: "url(" + e.url + ")",
                  backgroundSize: "100% 100%",
                }}
              >
                <button
                  className="contentimg dowloadbtn "
                  onClick={(e) => {
                    e.target.style.visibility = "hidden";
                    handleButtonClick(index);
                    e.target.style.visibility = "visible";
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircleDown}
                    beat
                    style={{ color: "skyblue" }}
                  />
                </button>
                <h3 style={e.styles}  className="contentimg">
                  {quotetext}
                </h3>
                <br />
                <h3 style={e.styles}  className="contentimg author">
                  {author!= "" ? "-" :""} {author}
                </h3>
              </div>
            );
          })}
  
      <p>
        <button
          className="button-30"
          style={{ height: "38px" }}
          onClick={() => {
            handlePrevbtn();
          }}
        >
          Prev
        </button>
        <button
          className="button-30"
          style={{ height: "38px" }}
          onClick={() => {
            handleNextbtn();
          }}
        >
          next
        </button>
      </p>
      </div>
      )}

      {/* The canvas div where the captured content will be added */}
      <div ref={canvasRef}></div>
    </div>
  );
}

export default QuoteRender;
