import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // This is where we mount the micro frontends, normally you would use an environment variable
    // which would point the source to the bundled app on an S3 bucket or another static hosting
    // service.
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://localhost:9000/main.bundle.js');
    document.head.append(script);
  }, [])

  return (
    <div className="App">
      <h1>Monolith</h1>
      <p>This is the monolith application, to which micro frontends are mounted</p>
      <h2>Micro frontend</h2>
      <div id='webcomponent-mount' />
    </div>
  );
}

export default App;
