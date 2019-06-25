import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App: React.FC = () => {
  return (
    <div>
      <p>Hello HTV</p>
      <FontAwesomeIcon icon={['fab', 'twitter']} />
    </div>
  );
};

export default App;
