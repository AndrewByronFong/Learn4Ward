import AppBar from '../components/ResponsiveAppbar';
import PhonemBoard from '../components/PhonemBoard';
import '../styles/Dashboard.css';


function Dashboard() {
  return (
    <>
      <div className="Home">
        <AppBar />
        <PhonemBoard />
      </div>
    </>
  );
}

export default Dashboard;