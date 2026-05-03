import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/dashboard"; 

function App() {
  return (

      <div className="flex flex-row flex-1">

        <Sidebar />

        <div className="flex-1 p-4">
          <Header />
          <Dashboard />
        </div>

      </div>
  );
}

export default App;