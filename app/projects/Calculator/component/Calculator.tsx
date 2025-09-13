'use client';

import React, { useState, useCallback } from 'react';
import '../Calculator.css';

const Calculator = () => {

  const [display, setDisplay] = useState('0');
  const [result, setResult] = useState('');
  const [isOperationClicked, setIsOperationClicked] = useState(false);

  const playAudio = useCallback(() => {
    const audio = new Audio('/audio/click5.wav');
    audio.play().catch(() => {});
  }, []);

  const getFontSize = useCallback((text: string) => {
    const length = text.length;
    if (length <= 6) return 'text-5xl';
    if (length <= 8) return 'text-4xl';
    if (length <= 10) return 'text-3xl';
    if (length <= 12) return 'text-2xl';
    if (length <= 14) return 'text-xl';
    if (length <= 16) return 'text-lg';
    return 'text-base';
  }, []);

  
  const formatDisplay = useCallback((value: string | number) => {
    const strValue = String(value);
    if (strValue.length > 18) {
      const numValue = parseFloat(String(value));
      if (!isNaN(numValue)) {
        return numValue.toExponential(8);
      }
    }
    return strValue;
  }, []);

  const handleNumberClick = useCallback((number: string) => {
    playAudio();
    if (number === '.' && display.includes('.')) return;

    if (display.length <= 25) {
      if (isOperationClicked) {
        setDisplay(number === '.' ? '0.' : number);
        setIsOperationClicked(false);
      }
      else {
        setDisplay(display === '0' && number !== '.' ? number : display + number);
      }
    }
    setResult(prev => prev + number);
  }, [display, isOperationClicked, playAudio]);


  const handleMathOperation = useCallback((operation: string) => {
    playAudio();
    if (result.length >= 1) {
      try {
        const evalResult = eval(result);
        const formattedResult = formatDisplay(evalResult);
        setDisplay(formattedResult);
      } catch (error) {
        console.log('Error:', error);
        setDisplay('Error');
      }
      
      let newResult = result + operation;
      const resultArray = newResult.split('');
      
      if (['+', '-', '*', '/'].includes(resultArray[resultArray.length - 1]) &&
          ['+', '-', '*', '/'].includes(resultArray[resultArray.length - 2])) {
        resultArray.splice(-2, 1);
        newResult = resultArray.join('');
      }
      
      setResult(newResult);
      setIsOperationClicked(true);
    }
  }, [result, playAudio, formatDisplay]);

  const handleEquals = useCallback(() => {
    playAudio();
    if (result.length >= 1) {
      const resultArray = result.split('');
      if (resultArray[resultArray.length - 1] !== '%') {
        try {
          if (['+', '-', '*', '/'].includes(resultArray[resultArray.length - 1])) {
            resultArray.pop();
            const evalResult = eval(resultArray.join(''));
            const formattedResult = formatDisplay(evalResult);
            setResult(String(evalResult));
            setDisplay(formattedResult);
          } else {
            const evalResult = eval(result);
            const formattedResult = formatDisplay(evalResult);
            setResult(String(evalResult));
            setDisplay(formattedResult);
          }
        } catch (error) {
          console.log('Error:', error);
          setDisplay('Error');
        }
      } else {
        resultArray.pop();
        const baseResult = resultArray.join('');
        const percentResult = (Number(baseResult) * Number(display)) / 100;
        setDisplay(formatDisplay(percentResult + '%'));
      }
    }
  }, [result, display, playAudio, formatDisplay]);

  const handleClear = useCallback(() => {
    playAudio();
    setResult('');
    setIsOperationClicked(false);
    setDisplay('0');
  }, [playAudio]);

  const handlePlusMinus = useCallback(() => {
    playAudio();
    if (display !== '0' && display !== 'Error') {
      const newValue = display.startsWith('-') ? display.slice(1) : '-' + display;
      setDisplay(newValue);
      if (result) {
        const newResult = Number(result) * -1;
        setResult(String(newResult));
      }
    }
  }, [display, result, playAudio]);

  const handlePercent = useCallback(() => {
    playAudio();
    if (display !== '0' && display !== 'Error')
    {
      const currentValue = parseFloat(display);
     
      if (!isNaN(currentValue))
      {
        console.log(currentValue);
        const percentValue = currentValue / 100;
        setDisplay(formatDisplay(percentValue));
        setResult(String(percentValue));
      }
    }
  }, [display, playAudio, formatDisplay]);

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper">
        {/* Display */}
        <div className="calculator-display-wrapper">
          <div className="calculator-display">
            <span className={`display-value ${getFontSize(display)}`}>
              {display}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-grid">
          {/* Row 1 */}
          <button onClick={handleClear} className="btn function">AC</button>
          <button onClick={handlePlusMinus} className="btn function">+/-</button>
          <button onClick={handlePercent} className="btn function">%</button>
          <button onClick={() => handleMathOperation('/')} className="btn operator">÷</button>

          {/* Row 2 */}
          <button onClick={() => handleNumberClick('7')} className="btn number">7</button>
          <button onClick={() => handleNumberClick('8')} className="btn number">8</button>
          <button onClick={() => handleNumberClick('9')} className="btn number">9</button>
          <button onClick={() => handleMathOperation('*')} className="btn operator">x</button>

          {/* Row 3 */}
          <button onClick={() => handleNumberClick('4')} className="btn number">4</button>
          <button onClick={() => handleNumberClick('5')} className="btn number">5</button>
          <button onClick={() => handleNumberClick('6')} className="btn number">6</button>
          <button onClick={() => handleMathOperation('-')} className="btn operator">-</button>

          {/* Row 4 */}
          <button onClick={() => handleNumberClick('1')} className="btn number">1</button>
          <button onClick={() => handleNumberClick('2')} className="btn number">2</button>
          <button onClick={() => handleNumberClick('3')} className="btn number">3</button>
          <button onClick={() => handleMathOperation('+')} className="btn operator">+</button>

          {/* Row 5 */}
          <button onClick={() => handleNumberClick('00')} className="btn number double">00</button>
          <button onClick={() => handleNumberClick('0')} className="btn number double">0</button>
          <button onClick={() => handleNumberClick('.')} className="btn number">.</button>
          <button onClick={handleEquals} className="btn operator">=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
