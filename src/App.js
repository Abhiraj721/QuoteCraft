
import './App.css';
import HtmlToCanvas from './components/HtmlToCanvas';
import QuoteInput from './components/QuoteInput';
import Customquote from './components/Customquote';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
            <Navbar></Navbar>
      <section className='section-1' id='section1'>
    <QuoteInput></QuoteInput>
    </section>
    <br />
    <section className="section-2" id="section2">
    <Customquote></Customquote>
    </section>
    <br />
    <Footer></Footer>
    </div>
  );
}

export default App;
