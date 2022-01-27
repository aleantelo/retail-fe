import { useState,useEffect} from "react";
import Navbar from "./components/Navbar";
import TablaProductos from "./components/TablaProductos";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import Footer from "./components/Footer";
import NuevoProducto from "./components/NuevoProducto";
import TablaProductosClientes from "./components/TablaProductosCliente";
import Orden from "./components/Orden"
function App() {

  const [users,setUsers] = useState({
    admin:false,
    empleado:false,
    cliente:true
  })

  const handleAdmin = () => {

    console.log("Soy admin")
    setUsers({
      admin:true,
      empleado:false,
      cliente:false
    })
  } 

  const handleCliente = () => {
    setUsers({
      admin:false,
      empleado:false,
      cliente:true
    })
  } 

  const handleEmpleado = () => {
    setUsers({
      admin:false,
      empleado:true,
      cliente:false
    })
  } 

  return (
      <Router>
        <div className="App">
          <Navbar/>
          <button className="btn btn-dark btn-sm" onClick={handleCliente}>Cliente</button>
          <button className="btn btn-dark btn-sm" onClick={handleEmpleado}>Empleado</button>
          <button className="btn btn-dark btn-sm" onClick={handleAdmin}>Admin</button>
            <div className="btn-group mt-5 " >
              {
                users.admin?<Link to='/admin' className = "btn btn-dark btn-sm active">Home</Link>
                :""
              }
              {
                users.cliente ?<Link to='/home' className = "btn btn-dark btn-sm active">Home</Link>
                :""
              }
               {
                users.empleado ?<Link to='/empleado' className = "btn btn-dark btn-sm active">Home</Link>
                :""
              }
              
              {users.admin? <Link to='/producto' className = "btn btn-dark btn-sm active">Nuevo Producto</Link>
              : ""
              }
              
              
            </div>
            <Routes>       
              <Route path="/producto" element={<NuevoProducto/>} />    
            </Routes>
            <Routes>       
              <Route path="/orden" element={<Orden/>}/>    
            </Routes>
            <Routes>       
              <Route path="/home" element={<TablaProductosClientes users={users}/>} />    
            </Routes>
            <Routes>       
              <Route path="/empleado" element={<TablaProductosClientes/>} />    
            </Routes>
            <Routes>       
              <Route path="/admin" element={<TablaProductos users={users}/>} />    
            </Routes>
        </div>
        <Footer/>
      </Router>
  );
}

export default App;
