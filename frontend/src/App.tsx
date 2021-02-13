import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Layout} from "antd";

const {Header, Content} = Layout;

function App() {
  return (
      <Layout>
        <Header>
            <h1 style={{color: "grey"}}>River Flow Forecaster</h1>
        </Header>
          <Content>
              <TrendsPicker />
              <ModelPicker />
              <TrendsDisplay />
              <TimeFramePicker />
          </Content>
      </Layout>
  );
}

export default App;
