import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { generate } from 'random-words';

const RandomFontGenerator = () => {
  const [randomFont, setRandomFont] = useState(null);
  const [selectedFont, setSelectedFont] = useState(null);
const apiKey="AIzaSyBvXKlNgIRwcfQXIFE_zTEzgLvqfeOR42Y"
  useEffect(() => {
    fetchRandomFont();
  }, []);

  const fetchRandomFont = async () => {
    try {
      // Fetch a random font from the Google Fonts API
      const response = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`
      );

      if (response.data.items) {
        const randomIndex = Math.floor(Math.random() * response.data.items.length);
        const randomFontName = response.data.items[randomIndex].family;
        setRandomFont(randomFontName);
      }
    } catch (error) {
      console.error('Error fetching fonts:', error);
    }
  };

  const handleSelectFont = (fontName) => {
    setSelectedFont(fontName);
  };

  return (
    <div>
      <h1>Random Google Font Generator</h1>
      {randomFont && (
        <div>
          <button
            onClick={() => {
              setRandomFont(null);
              fetchRandomFont();
            }}
          >
            Generate New Font
          </button>
          <select
            value={selectedFont}
            onChange={handleSelectFont}
          >
            {
              randomFont &&
              randomFont.split(' ').map((font) => (
                <option key={font} value={font}>{font}</option>
              ))
            }
          </select>
          <p style={{ fontFamily: selectedFont, fontSize: '24px' }}>
            This is a sample text in {selectedFont}.
          </p>
        </div>
      )}
    </div>
  );
};

export default RandomFontGenerator;
