import { useEffect,useState} from "react";
import axios from 'axios'


const TablaProductos = ({users}) => {

    const [page,setPage] = useState(0)

    const [productos, setProductos] = useState([]);
    
    const[limit,setLimit] = useState(false)

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
    }, [page]);

    

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

    

    
    return(
        <div className="container">
            <div className="row">
            <div className="col-8">
            
            <h3 className="text-center"> Lista de Productos </h3>

                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Modificar</th>
                    <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                {
                    productos.map(unProducto =>(
                    <tr key={unProducto.id}>
                    <th scope="col">{unProducto.nombre}</th>
                    <th scope="col"> <span>$</span>{unProducto.precioUnitario}</th>
                    <th scope="col">{unProducto.stock}</th>
                    <th scope="col"><button className="btn btn-warning btn-sm" onClick={() => handleModificar(unProducto)}>Modificar</button></th>
                    <th scope="col"><button className="btn btn-danger btn-sm" onClick = {() => handleEliminar(unProducto)}>Eliminar</button></th>
                    
                    </tr>
                    
                    ))
                }
                </tbody>
                </table>
                <br/>
                <button className="btn btn-primary"onClick = {handlePrevPage}>&laquo;</button>
                <button className="btn btn-primary" onClick = {handleNextPage}>&raquo;</button>
            </div>            
            {
                modificar && users.admin ? 
                <div className="col-4">
                    <h3 className="text-center"> Editar Productos </h3>
                    <form className = "form-dark">
                        <div className="mb-3">
                            <h6 className="text-center">Nombre</h6>
                            <input type="text" name = "nombre" className="form-control" onChange={handleChange} value={productosSeleccionados.nombre} />
                        </div>
                        <div className="mb-3">
                            <h6 className="text-center">Precio unitario</h6>
                                <input type="number" name = "precioUnitario" className="form-control" onChange={handleChange} value={productosSeleccionados.precioUnitario}/>
                        </div>
                        <div className="mb-3">
                            <h6 className="text-center">Stock</h6>
                            <input type="number" name = "stock" className="form-control"  onChange={handleChange} value={productosSeleccionados.stock}/>
                        </div> 
                        <div className="d-grid gap-2 d-md-flex ">
                        <button type="submit" className = "btn btn-outline-success btn-sm" onClick = {peticionPut}>Aceptar</button>
                        <button className = "btn btn-outline-secondary btn-sm" onClick={() => setModificar(!modificar)}>Cancelar</button>
                        </div>
                    </form>
                </div> : "" }
                
            </div>
            
        </div>
        
    )
}
export default TablaProductos;