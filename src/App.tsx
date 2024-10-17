import { useState } from "react";
import Header from "./components/Header/Header";
import Section from "./components/Section/Section";
import AddTask from "./components/AddTask/AddTask";

import "./styles/styles.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Header></Header>
          <Section></Section>
          <AddTask></AddTask>
        </div>
      </div>
    </>
  );
}

export default App;
