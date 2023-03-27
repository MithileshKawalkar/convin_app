import React, { useEffect, useState } from 'react';
import {Button, Modal } from 'antd';
import Card from './Card';
// import ReactPlayer from 'react-player';



const Bucket = ({ id,name, cards }) => {

    const key = id; //current bucket id
    const [visible, setVisible] = useState(false);
    const [createCard, setCreateCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [numCards, setnumCards] = useState(0);

  
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setVisible(true);

    var date = new Date();
   const dateString = date.toGMTString();
    var istTime = new Date(dateString.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    istTime = istTime.toString().substring(4,24);
  

    var log = {"title": card.name,
    "link": card.link,
    "time": istTime};

    async function post() 
    {        
      const response = await fetch(`http://localhost:8000/history`, {
        method: 'POST',
        headers: new Headers({
          'content-type':'application/json'
        }),
        body: JSON.stringify(log)
      });
      const responseText = await response.text();
      console.log(responseText);
    }
  post();

  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedCard(null);
  };
  
  const cancel = () => {
    setCreateCard(false);
  };

  //to delete a card from the bucket
  const handleDeleteCard = (thisCard) => {
    // Code to delete a card from the bucket
    console.log(thisCard);

    cards = cards.filter(card => card !== thisCard);
    console.log(cards);

    async function post() {
        
        const response = await fetch(`http://localhost:8000/buckets/${key}`, {
          method: 'PUT',
          headers: new Headers({
            'content-type':'application/json'
          }),
          body: JSON.stringify({"id":key,"name":name,"cards":cards})
        });
        const responseText = await response.text();
        console.log(responseText);
      }
    post();
  };

  //to delete all cards from the bucket
  const handleDeleteAllCards = () => {
    cards = [];
    console.log(cards);

    async function post() {
        
        const response = await fetch(`http://localhost:8000/buckets/${key}`, {
          method: 'PUT',
          headers: new Headers({
            'content-type':'application/json'
          }),
          body: JSON.stringify({"id":key,"name":name,"cards":cards})
        });
        const responseText = await response.text();
        console.log(responseText);
      }
    post();

    setnumCards(1);

  };

  //on submitting form for creating new card
  const submit = async(e) => 
  {
    e.preventDefault();
    var bucketData;
    async function get(){
        const response = await fetch(`http://localhost:8000/buckets/${key}`);
            var bucketArray = await response.json();
            bucketData = JSON.parse(JSON.stringify(bucketArray));
        }
    await get();
    const title = e.target[0].value;
    const link = e.target[1].value;
    const object = {"cardId":numCards, "name": title, "link":link};

    bucketData.cards.push(object);
    // console.log(bucketData.cards);

    async function post() {
        
        const response = await fetch(`http://localhost:8000/buckets/${key}`, {
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

      setnumCards(numCards+1);
    setCreateCard(false);
  };

  

  return (
    <div className="bucket">
        <div className="title">
            <h2>{name} Bucket</h2>
            <Button onClick={()=>setCreateCard(true)} className='create-button' type="primary">Create Card</Button>
        </div>
      <div className="bucket-cards">
        {useEffect(()=>{
          setnumCards(cards.length +1)
        },[])}
      {
        cards.map((card) => (
          <Card key={card.cardId}
                id={card.cardId}
                title={card.name}
                link={card.link}
                handleClick={() => handleCardClick(card)}
                handleDelete={() => handleDeleteCard(card)}
                bucketKey={key}
                />
        ))}
      </div>
      <Modal
        title={selectedCard?.name}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{width:""}}
        width={800}
        height={600}
      >
        {selectedCard && (
          // <ReactPlayer controls={true} url={selectedCard.link}width="100%" height="400"></ReactPlayer>
          <iframe id='iframe' src={selectedCard.link} width="100%" height="400" />
        )}
      </Modal>
      
      <Modal
        title={"Create New Card"}
        open={createCard}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={cancel}
      >
        {createCard && (
          <form onSubmit={submit}>
            <input type={"text"} name={"Title"} placeholder={"Enter Title"}/><br/>
            <input type={"text"} name={"Link"} placeholder={"Enter Link"}/><br/>
            <input 
            style={{margin:"15px 0",display:"inline",padding:"10px",borderRadius:"7px",border:"none",backgroundColor:"blue",color:"white"}}
            type={"submit"}></input>
            {/* <Button onSubmit={submit} type='primary'>Submit</Button> */}
          </form>
        )}
      </Modal>
      {(numCards===1 || numCards===0) && (<p>No items to show.</p>)}
      <Button onClick={handleDeleteAllCards}>Delete All Cards</Button>
    </div>
  );
};

export default Bucket;
