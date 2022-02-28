// react
import React from "react";

// components
import Stock from "../Stock/Stock";

// styled components
import { StyledAppContainer } from "./StyledApp";

function App() {
  return (
    <StyledAppContainer className="App">
      <Stock />
    </StyledAppContainer>
  );
}

export default App;
