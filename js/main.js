let opcion;
let opcionCat;
let opcionCarrito;
let opcionEliminar;

const productos = [];

function agregarItem(numero) {
  productos[numero - 1].cantidadCarrito += 1;
  productos[numero - 1].enCarrito = true;
  productos[numero - 1].cantidad -= 1;
}

function eliminarItem(numero) {
  productos[numero - 1].cantidadCarrito -= 1;
  if (productos[numero - 1].cantidadCarrito == 0) {
    productos[numero - 1].enCarrito = false;
  }
  productos[numero - 1].cantidad += 1;
}

class Producto {
  constructor(sku, nombre, precio, cantidad) {
    this.sku = sku;
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.cantidad = parseInt(cantidad);
    this.enCarrito = false;
    this.cantidadCarrito = 0;
  }
}

productos.push(new Producto(1, "Llavero", 850, 4));
productos.push(new Producto(2, "Remera", 2000, 2));
productos.push(new Producto(3, "Gorra", 1250, 5));
productos.push(new Producto(4, "Plancha de stickers", 350, 2));
productos.push(new Producto(5, "Poster", 500, 8));

opcion = parseInt(
  prompt(
    "Ingrese el numero de la opcion que le gustaria elegir: \n1- Mostrar catalogo\n2- Finalizar compra\n3- Salir"
  )
);

while (opcion != 3) {
  switch (opcion) {
    case 1:
      opcionCat = parseInt(
        prompt(
          `Ingrese el numero del item que le gustaria agregar al carrito. Aprete 6 para salir al menu principal y finalizar la compra\n${productos[0].sku} - ${productos[0].nombre} | ${productos[0].precio} \n${productos[1].sku} - ${productos[1].nombre} | ${productos[1].precio}\n${productos[2].sku} - ${productos[2].nombre} | ${productos[2].precio}\n${productos[3].sku} - ${productos[3].nombre} | ${productos[3].precio}\n${productos[4].sku} - ${productos[4].nombre} | ${productos[4].precio} \n6- Volver al menu anterior`
        )
      );

      while (opcionCat != 6) {
        switch (opcionCat) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            if (productos[opcionCat - 1].cantidad == 0) {
              alert("La cantidad agregada es mayor al stock disponible");
              break;
            }
            agregarItem(opcionCat);
            alert("Item agregado al carrito!");
            break;

          case 6:
            break;
          default:
            alert("Ingrese una opcion valida:");
        }

        opcionCat = parseInt(
          prompt(
            `Ingrese el numero del item que le gustaria agregar al carrito. Aprete 6 para salir al menu principal y finalizar la compra\n${productos[0].sku} - ${productos[0].nombre} | ${productos[0].precio} \n${productos[1].sku} - ${productos[1].nombre} | ${productos[1].precio}\n${productos[2].sku} - ${productos[2].nombre} | ${productos[2].precio}\n${productos[3].sku} - ${productos[3].nombre} | ${productos[3].precio}\n${productos[4].sku} - ${productos[4].nombre} | ${productos[4].precio} \n6- Volver al menu anterior`
          )
        );
      }

      break;

    case 2:
      do {
        let carrito = productos.filter((el) => el.enCarrito == true);
        let avisoCarrito = "Su carrito contiene: \n\n";
        let avisoEliminarCarrito =
          "Ingrese el numero del item que desea eliminar: \n\n";
        let total = 0;
        for (const producto of carrito) {
          avisoCarrito =
            avisoCarrito +
            `${producto.nombre}   |   Cantidad: ${producto.cantidadCarrito}   |   Precio: $${producto.precio}\n`;
          avisoEliminarCarrito =
            avisoEliminarCarrito +
            `${producto.sku}. ${producto.nombre}   |   Cantidad: ${producto.cantidadCarrito}\n`;
          total = total + producto.cantidadCarrito * producto.precio;
        }
        avisoCarrito =
          avisoCarrito +
          `\nTotal: $${total}\n\nIngrese 1 para finalizar la compra o 2 para eliminar algun item del carrito:`;

        opcionCarrito = parseInt(prompt(avisoCarrito));

        switch (opcionCarrito) {
          case 1:
            alert(
              `Su Total es: $${total}\n\nMuchas gracias por comprar con nosotros!`
            );
            for (const producto of carrito) {
              producto.enCarrito = false;
              producto.cantidadCarrito = 0;
            }
            break;

          case 2:
            opcionEliminar = parseInt(prompt(avisoEliminarCarrito));
            eliminarItem(opcionEliminar);
            break;

          default:
            alert("Ingrese una opcion valida:");
        }
      } while (opcionCarrito != 1);
      break;

    case 3:
      break;

    default:
      alert("Elija una opcion valida");
      break;
  }

  opcion = parseInt(
    prompt(
      "Ingrese el numero de la opcion que le gustaria elegir: \n1- Mostrar catalogo\n2- Finalizar compra\n3- Salir"
    )
  );
}
