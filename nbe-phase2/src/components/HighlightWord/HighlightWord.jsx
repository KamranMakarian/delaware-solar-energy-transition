import React from 'react';

const HighlightedWord = ({ text, wordToHighlight1, wordToHighlight2, highlightColor1, highlightColor2 }) => {
  // Split the text into parts based on the words to highlight
  const parts = text.split(new RegExp(`(${wordToHighlight1}|${wordToHighlight2})`, 'gi'));
  
  return (
    <span>
      {parts.map((part, index) => {
        // Check if the current part is one of the words to highlight
        const isHighlighted1 = part.toLowerCase() === wordToHighlight1.toLowerCase();
        const isHighlighted2 = part.toLowerCase() === wordToHighlight2.toLowerCase();

        let highlightStyle;
        if (isHighlighted1) {
          highlightStyle = { color: highlightColor1, fontWeight: 'bold' };
        } else if (isHighlighted2) {
          highlightStyle = { color: highlightColor2, fontWeight: 'bold' };
        }

        return highlightStyle ? (
          <span key={index} style={highlightStyle}>{part}</span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

export default HighlightedWord;
