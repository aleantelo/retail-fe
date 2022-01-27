import { useEffect,useState} from "react";
import axios from 'axios'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Orden from "./Orden"

const TablaProductosClientes = () => {

    const [terminarOrden,setTerminarOrden] = useState(false)

    const[orden,setOrden] = useState([])

    const [cantidad,setCantidad] = useState (0)
    
    const [page,setPage] = useState(0)

    const [productos, setProductos] = useState([]);
    
    const [limit,setLimit] = useState(false)

    const [modificar,setModificar] = useState(false)
    
    const [productosSeleccionados,setProductosSeleccionados] = useState({
        nombre:'',
        precioUnitario:0,
        stock:0
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setProductosSeleccionados( estadoAnterior => (
            {
            ...estadoAnterior,
            [name]: value
            }
        ))
    }

    const peticionGet= async (e)=>{
        let url = "http://localhost:8080/productos/page/"+page
        await axios.get(url)
        .then(response => {
            setProductos(response.data.content)
            setLimit(response.data.last)
        })
        
      }

    useEffect(() => {
        peticionGet()
    }, [page])


    const handleModificar = (producto) => {
        setModificar(true)
        setProductosSeleccionados(producto)
    }
    
    const peticionDelete = async (id)=> {
        await axios.delete("http://localhost:8080/productos/"+id)
        .then(() => {
            const newArray = productos.filter(producto => {
                return producto.id != id
              })
              setProductos(newArray)
        })
        .catch(
            console.log("hubo un error")
        )
    }

    const handleNextPage = () => {
        if(!limit){
            setPage(page+1)
        }
        
    }

    const handlePrevPage = () => {
        if(page>0){
            setPage(page-1)
        }
    }

    const handleEliminar = (unProducto) => {
        let opcion = window.confirm ("¿Seguro que desea eliminar el producto: ?"+ unProducto.id )
        if(opcion){
            peticionDelete(unProducto.id)
        }
    }

    const peticionPut = async (e) => {
        await axios.put("http://localhost:8080/producto/"+productosSeleccionados.id,productosSeleccionados)
        .then(response => {
            let productosNuevos = productos
            productosNuevos.map(producto => {
                if(productosSeleccionados.id === producto.id ){
                    producto.nombre = productosSeleccionados.nombre
                    producto.stock = productosSeleccionados.stock
                    producto.precioUnitario = productosSeleccionados.precioUnitario
                }
            })
            setProductosSeleccionados(productosNuevos)
            setModificar(!modificar)
        })
    }

    const handleChangeCantidad = (e) => {
        setCantidad(e.target.value)
    }
    
    const handleCarrito = (unProducto) => {
        let detalleAgregar = {
            producto:unProducto,
            cantidad:cantidad
        }

        if(unProducto.stock>0){
            setOrden( carritoAnterior => (
                [
                    ...carritoAnterior,
                    {
                        detalle:detalleAgregar
                    }
                ]
            ))
            const newArray = productos.filter(producto => {
                return producto.id != unProducto.id
              })
              setProductos(newArray)
        }else{
            alert("No hay stock del producto seleccionado")
        }
        
        
    } 
    const handleChangeTerminar = () => {
        setTerminarOrden(!terminarOrden)
    }

    const handleTerminar = () => {
        setTerminarOrden(true)
    }

    return(
        <div className="container">
            {!terminarOrden ?
            <div className="row">
                <div className="col-8">
                
                <h3 className="text-center"> Lista de Productos </h3>

                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col"></th>
                        <th scope="col">Agregar al carrito</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        productos.map(unProducto =>(
                        <tr key={unProducto.id}>
                        <th scope="col">{unProducto.nombre}</th>
                        <th scope="col"> <span>$</span>{unProducto.precioUnitario}</th>
                        {
                            unProducto.stock>0 ? <th scope="col">Si</th>: <th scope="col">No</th>
                        }
                        <th scope="col"><input placeholder="cantidad" onChange={handleChangeCantidad}></input></th>
                        <th scope="col"><button className="btn btn-success btn-sm" onClick={() => handleCarrito(unProducto)}>+</button></th>
                        </tr>
                        
                        ))
                    }
                    </tbody>
                    </table>
                    <br/>
                    <button className="btn btn-primary"onClick = {handlePrevPage}>&laquo;</button>
                    <button className="btn btn-primary" onClick = {handleNextPage}>&raquo;</button>
                    <button className="btn btn-primary" onClick = {handleTerminar}>Ver carrito</button>
                </div>  
            </div>  
        : 
            <div>
                <Orden orden={orden} handleChangeTerminar={handleChangeTerminar}/>
            </div>
        }
        </div>
    )
}
export default TablaProductosClientes;