import AppBar from '../components/ResponsiveAppbar';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <AppBar />
      <div className="text">
        <p className="header">Power Phonetics Learning With AI</p>
        <p className="body">Designed for Dyslexia.</p>
        <p className="body">Built for Anyone.</p>

      </div>
    </div>
  );
}

export default Home;