import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Logo from '../img/logo-sample.png';

const Navbar = (props) => {

    const [newBucket,setNewBucket] = useState(false);

//     const [, updateState] = React.useState();
//  const forceUpdate = React.useCallback(() => updateState({}), []);

    // function handleClick(){
    //     setNewBucket(true);
    // }

    function submit(e){
        e.preventDefault();
        console.log(e.target[0].value);
        async function post() {
            const object = { "name": e.target[0].value ,"cards": []};
            const response = await fetch('http://localhost:8000/buckets', {
              method: 'POST',
              headers: new Headers({
                'content-type':'application/json'
              }),
              body: JSON.stringify(object)
            });
            const responseText = await response.text();
            console.log(responseText);
          }
          post();

        setNewBucket(false);
        // props.setChangeBucket(false);
        //   forceUpdate();

    }
    function cancel(){
        setNewBucket(false);
    }

  return (
    <nav className="navbar">
      <div className="navbar-logo" style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
        <img 
        src={Logo}
        height={"50px"}  
        width={"50px"}  
        alt="Logo" />
        <span>Name</span>
      </div>
      <div className="navbar-buttons">
        <Button onClick={()=>setNewBucket(true)} type="primary">Add new Bucket</Button>
      </div>
      <Modal
        title={"Create New Bucket"}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={cancel}
        open={newBucket}>
            {newBucket && (
          <form onSubmit={submit}>
            <input type={"text"} name={"Title"} placeholder={"Enter Bucket Name"}/><br/>
            <input 
            style={{margin:"15px 0",display:"inline",padding:"10px",borderRadius:"7px",border:"none",backgroundColor:"blue",color:"white"}}
            type={"submit"}></input>
            {/* <Button onSubmit={submit} type='primary'>Submit</Button> */}
          </form>
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
