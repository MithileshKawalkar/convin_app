import { useEffect, useState } from 'react';

import {Tabs } from 'antd';
import Bucket from './Bucket';

const App = () => {

    const [buckets,setBuckets] = useState([]);

    useEffect(()=>{
        async function loadBuckets() {
            const response = await fetch('http://localhost:8000/buckets/');
            const bucketArray = await response.json();
            // console.log(bucketArray);
            setBuckets(bucketArray);
          }
          loadBuckets();    
    },[buckets]);


  return (
    <div className='bucket-list'>
      
      <Tabs
        defaultActiveKey="1"
        style={{
          height: 220,
          color:"white"
        }}
        items={buckets.map((bucket) => {
          const id = bucket.id;
          return {
            label: bucket.name,
            key: bucket.id,
            children: <Bucket key={id} id={id} name={bucket.name} cards={bucket.cards}/>,
          };
        })}
      />
    </div>
  );
};
export default App;
