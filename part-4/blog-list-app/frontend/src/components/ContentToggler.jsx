/* eslint-disable react/prop-types */
import { useState, useImperativeHandle } from 'react';

// This component wraps another component (like our Blog form). It toggles the display of that component's content, depending on whether the wrapper's action buttons, e.g., Create, Cancel, are clicked.
const ContentToggler = (props) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  // When 'isContentVisible' is true, hide the action button.
  // An empty string '' resets 'display' to the element’s default CSS display value.
  const buttonStyle = { display: isContentVisible ? 'none' : '' };
  //   When 'isContentVisible' is true, display the content and Cancel button.
  const contentStyle = { display: isContentVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  // Trigger 'toggleVisibility' from outside this component, in conjunction with the useRef() hook.
  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={buttonStyle}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={contentStyle}>
        {props.children}
        <button
          onClick={toggleVisibility}
          style={{ marginTop: '10px', color: 'red' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContentToggler;
