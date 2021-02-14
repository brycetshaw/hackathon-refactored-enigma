import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Layout} from "antd";
import {TrendsPicker} from "./components/TrendsPicker";
import {ModelPicker} from "./components/ModelPicker";
import {TrendsDisplay} from "./components/TrendsDisplay";
import {useDispatch} from "react-redux";
import {updateLabels} from "./redux/paramsSlice";

const {Header, Content} = Layout;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateLabels());
    },[dispatch])


  return (
      <Layout>
        <Header>
            <h1 style={{color: "grey"}}>River Flow Forecaster</h1>
        </Header>
          <Content>
              <TrendsPicker />
              <ModelPicker />
              <TrendsDisplay />
          </Content>
      </Layout>
  );
}

export default App;
