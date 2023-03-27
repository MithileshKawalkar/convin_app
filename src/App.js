import './css/style.scss';
import {BucketList, History , NavBar} from "./components/";
import {Tabs } from 'antd';
const { TabPane } = Tabs;

function App() {

  return (
    <div className="App">
         <NavBar/>
         <Tabs className='custom-tabs' type="card" centered defaultActiveKey="home"
         style={{color:"white"}}>
        <TabPane tab="Home" key="home">
          <BucketList />
        </TabPane>
        <TabPane tab="History" key="history">
          <History />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
