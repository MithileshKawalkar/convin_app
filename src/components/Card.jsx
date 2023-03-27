import { useState } from 'react';

import { PlaySquareOutlined,DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { Modal, Card } from 'antd';


const App = (props) => {
  
  const id = props.id;
  // console.log(props.key);
  const [editModal,setEditModal] = useState(false);

  function cancel(){
    setEditModal(false);
  }

  //To update card data
  async function submit(e){
    e.preventDefault();

    var bucketData;
    async function get(){
        const response = await fetch(`http://localhost:8000/buckets/${props.bucketKey}`);
            var bucketArray = await response.json();
            bucketData = JSON.parse(JSON.stringify(bucketArray));
        }
    await get();


    var newArray = bucketData.cards.filter(card => card.cardId !== id);
    // console.log(newArray);
    const object = {"cardId":id,"name":e.target[0].value,"link":e.target[1].value}
    newArray.push(object);
    // console.log(newArray);
    bucketData.cards = newArray;
    console.log(bucketData);
        
    async function post() {
        
      const response = await fetch(`http://localhost:8000/buckets/${props.bucketKey}`, {
        method: 'PUT',
        headers: new Headers({
          'content-type':'application/json'
        }),
        body: JSON.stringify(bucketData)
      });
      const responseText = await response.text();
      console.log(responseText);
    }
    post();

    setEditModal(false);

  }
  
  return ( 
    <Card className='card'
    key={props.key}
    title={props.title}
    actions={[
      <PlaySquareOutlined onClick={props.handleClick}/>,
        <EditOutlined key="edit" onClick={()=>setEditModal(true)}/>,
        <DeleteOutlined onClick={props.handleDelete}/>
        ]}
        hoverable
    >
    <p>Link: {props.link}</p>

    <Modal
        title={"Create New Card"}
        open={editModal}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={cancel}
      >
        {editModal && (
          <form onSubmit={submit}>
            <textarea name={"Title"}  placeholder={"Enter Title"} defaultValue={props.title}></textarea><br/>
            <textarea type={"text"} name={"Link"} placeholder={"Enter Link"} defaultValue={props.link}></textarea><br/>
            <input 
            style={{margin:"15px 0",display:"inline",padding:"10px",borderRadius:"7px",border:"none",backgroundColor:"blue",color:"white"}}
            type={"submit"}></input>
          </form>
        )}
      </Modal>
  </Card>
  
)};
export default App;