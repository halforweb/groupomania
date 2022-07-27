import React from "react";
import Routes from "./components/Routes";
import { DataProvider } from "./components/AppContext";

const App = () => {
  
return (
    <div>
      <DataProvider>
      <Routes />
      </DataProvider>
    </div>
  );
}

export default App;
