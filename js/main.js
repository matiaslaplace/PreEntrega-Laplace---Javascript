let opcion;
let opcionCat;

const productos = [];

function agregarItem(numero) {
  productos[numero - 1].cantidadCarrito += 1;
  productos[numero - 1].enCarrito = true;
  productos[numero - 1].cantidad -= 1;
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
            if (productos[opcionCat - 1].cantidad == 0) {
              alert("La cantidad agregada es mayor al stock disponible");
              break;
            }
            agregarItem(opcionCat);
            alert("Item agregado al carrito!");
            break;

          case 2:
            if (productos[opcionCat - 1].cantidad == 0) {
              alert("La cantidad agregada es mayor al stock disponible");
              break;
            }
            agregarItem(opcionCat);
            alert("Item agregado al carrito!");
            break;

          case 3:
            if (productos[opcionCat - 1].cantidad == 0) {
              alert("La cantidad agregada es mayor al stock disponible");
              break;
            }
            agregarItem(opcionCat);
            alert("Item agregado al carrito!");
            break;

          case 4:
            if (productos[opcionCat - 1].cantidad == 0) {
              alert("La cantidad agregada es mayor al stock disponible");
              break;
            }
            agregarItem(opcionCat);
            alert("Item agregado al carrito!");
            break;

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
      // console.log(productos);
      break;

    case 2:
      const carrito = productos.filter((el) => el.enCarrito == true);
      let avisoCarrito = "Su carrito contiene: \n\n";
      for (const producto of carrito) {
        avisoCarrito =
          avisoCarrito +
          `${producto.nombre} | Cantidad: ${producto.cantidadCarrito}\n`;
      }
      alert(avisoCarrito);
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
