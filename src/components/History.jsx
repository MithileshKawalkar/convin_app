import React,{useEffect,useState} from 'react'

const History = () => {

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/history/`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setLogs(data);
          });
      }, [logs]);

  return (
    <div>

        {logs.length === 0 && <p>No history to show.</p>}
        <ul style={{listStyle:"none"}}>
            {console.log(logs)}
            {logs.slice(0).reverse().map((log) => {
                return (<li className='log'><span><strong>Title:</strong>{log.title}</span><span><strong>Link:</strong> {log.link}</span><span><strong>Last Played:</strong> {log.time}</span></li>)
            })}
        </ul>
    </div>
  )
}

export default History