import React from "react";
import { useState, useRef } from "react";
import QuoteRender from "./QuoteRender";
import { isMobileDevice } from "./Checkdevice";
import Typed from "typed.js";
import Swal from 'sweetalert2';
import "../App.css";
function QuoteInput() {
  const [quotetext, Setquotetext] = useState("");
  const [author, Setauthor] = useState("");
  const [showtemps, Setshowtemps] = useState(false);
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Type, Inspire, Repeat",
        "Craft Inspiring Quotes",
        "Your Quotes, Animated",
        "Words Create Worlds",
        "Quote and Ignite",
        "Express, Impress",
        "Inspire with Text",
        "Words That Soar",
        "Instant Wise Words",
        "Type, Inspire, Repeat",
        "Quoting Brilliance"
    ],
      typeSpeed: 50,
      loop:true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="inputdiv">
        <center>
        <span c className="typer head"  ref={el}/>
        <br /><br />
        <h2>Templates Gallery</h2>
          <label htmlFor="quotetext">Quote</label>
          <br />
          <input
            value={quotetext}
            onChange={(e) => {
              Setquotetext(e.target.value);
            }}
            placeholder="Your Quote here"
            className="quotetext"
            type="text"
            maxLength={140}
            style={{ width: isMobileDevice() == false ? "100%" : "78wh" }}
          />
          <br />
          <label htmlFor="author">Author</label>
          <br />
          <input
            value={author}
            onChange={(e) => {
              Setauthor(e.target.value);
            }}
            placeholder=" Author here"
            type="text"
            maxLength={29}
            className="inputauth"
            style={{ width: isMobileDevice() == true ? "100%" : "100vh" }}
          />
          <br />
          <button
            className="button-30"
            style={{
              height: "36px",
              width: "105px",
              fontSize: "15px",
              padding: "5px",
            }}
            onClick={() => {
              if(quotetext=="")  {
                Swal.fire({
                  icon: 'warning',
                  title: 'Looks like you are in a hurry!',
                  text: 'Please enter a quote before generating.',
                  color:"black",
                  confirmButtonColor: '#3085d6',
                 
                });
                 return;
            };
              Setshowtemps(true);
             !isMobileDevice ? document.querySelector(".inputdiv").style.marginLeft="34px" : document.querySelector(".inputdiv").style.marginLeft="14px";
            }}
          >
            Generate
          </button>
        </center>
      </div>
      <QuoteRender
        showtemps={showtemps}
        quotetext={quotetext}
        author={author}
      ></QuoteRender>
    </>
  );
}
export default QuoteInput;
