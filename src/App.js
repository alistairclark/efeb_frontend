import React, { PureComponent } from "react";
import ListView from "./ListView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends PureComponent {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListView />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
