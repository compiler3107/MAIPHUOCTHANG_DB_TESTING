import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './page/home';
import Footer from './components/footer';
import Header from './components/header';
import Adminpage from './page/addmin';
function App() {
  return (
    <div className='bg-slate-200'>
      <Router >
      <Header></Header>
      <div>
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/quanly' element={<Adminpage/>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
    </div>
  );
}

export default App;
