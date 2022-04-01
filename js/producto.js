class Producto{
    constructor(id, nombre, descripcion, precio, precionro, stock, cantidad, ventas, iva, imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;        
        this.precio = precio;
        this.stock = stock;
        this.cantidad = cantidad;
        this.ventas = ventas;
        this.iva = iva;
        this.imagen = imagen;
    };
    
/*
    toString(){
        return `Id producto: ${this.id} \n Nombre:  ${this.nombre} \n Descripción: ${this.descripcion} \n Marca: ${this.marca} \n Precio: ${this.precio} \n Stock: ${this.stock} \n`;
    };

    mostrarNombre(){
        return this.nombre;
    };

    modificarPrecio(precioNuevo){
        if(precioNuevo < 0){
            alert("El precio no puede ser negativo");
        }else{
            this.precio = precioNuevo;
        };
    };

    aumentoPrecio(porcentaje){
        if(porcentaje < 0){
            alert("El porcentaje no puede ser negativo");
        }else{
            this.precio = this.precio + (this.precio * porcentaje / 100);
        };
    };

    modificarStock(cantidad, movimiento){
        if(movimiento == "-"){
            if(cantidad < 0){
                alert("La cantidad no puede ser negativa");
            }else{
                if(cantidad > this.stock){
                    alert("No hay suficiente stock");
                }else{
                    this.stock = this.stock - cantidad;
                }   
            };
        }else{
            if(cantidad < 0){
                alert("La cantidad no puede ser negativa");
            }else{
                this.stock = this.stock + cantidad;
            }
        };
    };*/
    
}


