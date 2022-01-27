import { useState } from "react"
import axios from 'axios'

const NuevoProducto = () => {
    
    const [nuevoProducto,setNuevoProducto] = useState({
        nombre:'',
        precioUnitario:0,
        stock:0
    })

    const [errores,setErrores] = useState([])
    
    const handleChange = (e) =>{
        const {name,value} = e.target
        setNuevoProducto( estadoAnterior => (
            {
            ...estadoAnterior,
            [name]: value
            }
        ))
    }

    const enviarDatos = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/producto",nuevoProducto)
        .then(response => {
            if(response.status===200){
                setErrores(response.data)
            }
            e.target.reset()
        })
        .catch((error) => {
            console.log("ERRORES", error)
        })
    }
    return (
        <div className="container">
            <div className="col-8">
                <h3 className="text-center"> Nuevo Producto </h3>
                <form className = "form-dark" onSubmit={enviarDatos}>
                    <div className="mb-3">
                        <label >Nombre</label>
                        <input type="text" name = "nombre" className="form-control" value={nuevoProducto.nombre} onChange={handleChange}/>
                        {
                            errores.nombre? <span class="badge rounded-pill bg-info">{errores.nombre}</span> : ""
                        }
                    </div>
                    <div className="mb-3">
                        <label >Precio unitario</label>
                        <input type="number" name = "precioUnitario" className="form-control" value={nuevoProducto.precioUnitario} onChange={handleChange}/>
                        {
                            errores.precioUnitario? <span class="badge rounded-pill bg-info">{errores.precioUnitario}</span> : ""
                        }
                    </div>
                    <div className="mb-3">
                        <label>Stock</label>
                        <input type="number" name = "stock" className="form-control" value={nuevoProducto.stock} onChange={handleChange}/>
                        {
                            errores.stock? <span class="badge rounded-pill bg-info">{errores.stock}</span> : ""
                        }
                    </div>              
                    <a href="http://localhost:3000/"><button type="submit" className = "btn btn-outline-success" >Aceptar</button></a>
                </form>
            </div>
        </div>
    )
}

export default NuevoProducto