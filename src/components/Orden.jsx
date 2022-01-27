import { useEffect,useState} from "react";
import axios from 'axios'


const Orden = ({orden,handleChangeTerminar}) => {

    const [precioTotal,setPrecioTotal] = useState(0)
    const url = "http://localhost:8080/"

    const peticionPost = async() => {
        const carrito1 = JSON.stringify(orden)
        await axios.post("http://localhost:8080/orden",carrito1)
        .then(response=>{
            console.log(response)
        })
        .catch(error => {
            console.log("ERROR",error)
        })
    }

    const handleAceptar = () => {
        console.log(orden)
        peticionPost()
    }

    const precio = () => {
        let precioTotal = 0
        orden.map(objeto=>{
            precioTotal = precioTotal +objeto.detalle.producto.precioUnitario
        })
        setPrecioTotal(precioTotal)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-8">
                
                <h3 className="text-center"> Orden </h3>

                    <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orden.map((item,index) =>(
                        <tr key={index}>
                        <th scope="col">{item.detalle.producto.nombre}</th>
                        <th scope="col"><span>$</span>{item.detalle.producto.precioUnitario*item.detalle.cantidad}</th>
                        <th scope="col">{item.detalle.cantidad}</th>
                        <th scope="col">{item.detalle.cantidad}</th>
                        </tr>
                        ))
                    }
                    </tbody>
                    <tbody>
                        <tr >
                            <th scope="col" onLoad={precio}><span>Precio total: $</span>{precioTotal}</th>
                        </tr>
                    </tbody>
                    </table>
                    <br/>
                    <button className="btn btn-success" onClick={handleAceptar}>Aceptar</button>
                    <button className="btn btn-primary" onClick={handleChangeTerminar}>Atras</button>
                </div>    
            </div>
        </div>
        
    )
}
export default Orden;