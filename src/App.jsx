// App.js
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Components/Nav';

import MainRoutes from './Routes/MainRoutes';


function App() {

  
  return (
    <div className='bg-[#f3f4ed] h-screen w-full'>
      <Nav/>
      <MainRoutes/>
    </div>
  );
}

export default App;
