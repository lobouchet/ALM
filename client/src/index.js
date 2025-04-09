import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #ffffff;
    line-height: 1.6;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, 
        rgba(255, 107, 53, 0.08) 0%,
        rgba(255, 107, 53, 0) 50%,
        rgba(255, 107, 53, 0.08) 100%
      );
      pointer-events: none;
      z-index: -2;
    }

    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(-45deg, 
        rgba(255, 107, 53, 0.08) 0%,
        rgba(255, 107, 53, 0) 50%,
        rgba(255, 107, 53, 0.08) 100%
      );
      pointer-events: none;
      z-index: -2;
    }

    &::before {
      content: '';
      position: fixed;
      bottom: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, 
        rgba(255, 107, 53, 0.15) 0%,
        rgba(255, 107, 53, 0) 20%,
        rgba(255, 107, 53, 0) 80%,
        rgba(255, 107, 53, 0.15) 100%
      );
      transform: rotate(45deg);
      pointer-events: none;
      z-index: -1;
    }
  }

  a {
    color: #00b4d8;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(90deg, #00b4d8, #e94560);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: #e94560;
      text-shadow: 0 0 10px rgba(233, 69, 96, 0.5);

      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  input, textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:focus {
      outline: none;
      border-color: #00b4d8;
      box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2),
                  0 0 20px rgba(0, 180, 216, 0.1),
                  0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  button {
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, 
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      
      &::before {
        transform: translateX(100%);
      }
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00b4d8, #e94560);
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #e94560, #00b4d8);
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
); 