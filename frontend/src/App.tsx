import React, {useEffect} from 'react';
import './App.css';
import {Layout} from "antd";
import {TrendsPicker} from "./components/TrendsPicker";
import {ModelPicker} from "./components/ModelPicker";
import {TrendsDisplay} from "./components/TrendsDisplay";
import {useDispatch, useSelector} from "react-redux";
import {updateLabels} from "./redux/paramsSlice";
import {RootState} from "./redux/store";
import {updateTrend} from "./redux/trendsSlice";

const {Header, Content} = Layout;

function App() {
    const dispatch = useDispatch();
    const columns = useSelector((state: RootState) => state.params.columns)
    const range = useSelector((state: RootState) => state.params.selectedRange)

    useEffect(() => {
        dispatch(updateLabels());
    },[dispatch])

    useEffect(() => {
        dispatch(updateTrend(columns, range))
    }, [dispatch, columns])

  return (
      <Layout>
        <Header>
            <h1 style={{color: "grey"}}>River Flow Forecaster</h1>
        </Header>
          <Content

              draggable={false}
              unselectable={'on'}
              onDragStart={(e) => e.preventDefault()}
              onDrag={(e) => e.preventDefault()}
              style={{
                  height: 'calc(100vh - 70px)',
                  width: '100vw',
                  userSelect: 'none',
              }}
          >
              <TrendsPicker />
              <ModelPicker />
              <TrendsDisplay />
          </Content>
      </Layout>
  );
}

export default App;
