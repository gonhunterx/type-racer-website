"use client"
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
// import carImage from '@/public/flying-car1.png';

const GameBox = () => {
    const sentence = 'Type this sentence as fast as you can!';
    const [inputValue, setInputValue] = useState('')
    const [boxPosition, setBoxPosition] = useState(0)
    const [time, setTime] = useState(0)
    const [displayTime, setDisplayedTime] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [displayWpm, setDisplayedWpm] = useState(0)
    const [gameStarted, setGameStarted] = useState(false)


    useEffect(() => {
        let timer;
        if (gameStarted) {
          timer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
          }, 1000);
        }

        return () => {
          clearInterval(timer);
        };
      }, [gameStarted]);

    useEffect(() => {
        let wpmTimer
        if (gameStarted) {
            wpmTimer = setInterval(() => {
                const wordsTyped = inputValue.split(' ').length
                const minutes = time / 60
                setWpm((wordsTyped / minutes) || 0)
            }, 1000)
        }

        return () => {
            clearInterval(wpmTimer)
        }    
    },[gameStarted, time, inputValue])

    const handleInputChange = (event) => {
        const typedText = event.target.value;
        setInputValue(typedText);
        
        if (sentence.startsWith(typedText)) {
            const progress = typedText.length / sentence.length;
            const boxWidthPercentage = 50 / 512 * 100
            setBoxPosition(progress * (100 - boxWidthPercentage))

            const wordsTyped = typedText.split(' ').length
            const minutes = time / 60
            setWpm((wordsTyped / minutes) || 0)
        }
        if (typedText == sentence) {
            setDisplayedWpm(wpm)
            setDisplayedTime(time)
            setTime(0)
            setWpm(0)
            setGameStarted(false)
        } else if (gameStarted) {
            const wordsTyped = typedText.split(' ').length
            const minutes = time /60
            setWpm((wordsTyped / minutes) || 0)
        }
    };

    const startGame = () => {
    setGameStarted(true)
    setInputValue('')
    setTime(0)
    setWpm(0)
    }

    const renderSentence = () => {
        return sentence.split('').map((char, index) => {
            let color 
            if (index < inputValue.length) {
                color = char == inputValue[index] ? 'green' : 'red'
            }
            return <span key={index} style={{ color }}>{char}</span>
        })
    }
    
    return (
    <div style={{ height: '512px', width: '512px', border: '2px solid black', position: 'relative', padding: '4px'}}>
        <img src={'/flying-car.png'} alt="Car" style={{ left: `${boxPosition}%`, position: 'absolute', height: '50px', width: '50px' }} />
        <p className='p-20'>{renderSentence()}</p>
        <input 
        className='p-2 rounded'
        type="text" value={inputValue} onChange={handleInputChange} style={{ width: '100%' }} 
        />
        <p>Time: {gameStarted? time : displayTime} seconds</p>
        <p>Speed: {Math.round(gameStarted ? wpm : displayWpm)} WPM</p>
        <button onClick={startGame}>Start</button>
    </div>
    )
}

export default GameBox;