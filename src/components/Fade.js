import React from 'react';
import { Transition } from 'react-transition-group';

// Fade component
const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};
const Fade = ({ in: inProp, text: inText }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {inText}
      </div>
    )}
  </Transition>
);

export default Fade;