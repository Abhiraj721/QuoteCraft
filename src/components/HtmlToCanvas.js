import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function HtmlToCanvas() {
  const canvasRef = useRef(null);

  const captureToCanvas = () => {
    const node = document.getElementById('content-to-capture'); // Replace with the ID of the element you want to capture
    if (node) {
      html2canvas(node).then((canvas) => {
        const canvasElement = canvas;
        canvasRef.current.appendChild(canvasElement);
      });
    }
  };

  return (
    <div>
      <div id="content-to-capture">
        <h1>Hello, this will be captured to canvas!</h1>
        <p>This is some text to demonstrate html2canvas in React.</p>
      </div>
      <button onClick={captureToCanvas}>Capture to Canvas</button>
      <div ref={canvasRef}></div>
    </div>
  );
}
