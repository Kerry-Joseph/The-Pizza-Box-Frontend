import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import React, { useState } from "react";


function App() {
  
  const [cookieState, setCookieState] = useState("")

  return (
    <div className="App">
        <Nav 
          cookieState={cookieState}
        />
        <Main 
          cookieState={cookieState}
          setCookieState={setCookieState}
        />
        <Footer />
    </div>
  );
}

export default App;
 