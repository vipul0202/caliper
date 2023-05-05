
import {  useState } from 'react';
import './App.css';
import Popup from './Components/popup/popup';
import Table from './Components/table/table';
import Banner from './Components/banner';

function App() {
  const [showPopup,setShow] = useState(false)
  const onEditClick = () => {
    setShow(true)
  }
  return (
 <div className='app-container'>
    <Banner/>
    <Table onEditClick={onEditClick}/>
    <Popup show={showPopup} setShow={setShow}/>
 </div>
  );
}

export default App;
