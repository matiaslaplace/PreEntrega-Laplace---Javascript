let opcion;
let opcioncat;
let carrito = 0;

opcion = parseInt(
  prompt(
    "Ingrese el numero de la opcion que le gustaria elegir: \n1- Mostrar catalogo\n2- Finalizar compra\n3- Salir"
  )
);

while (opcion != 3) {
  switch (opcion) {
    case 1:
      opcioncat = parseInt(
        prompt(
          "Ingrese el numero del item que le gustaria agregar al carrito. Aprete 6 para salir al menu principal y finalizar la compra\n1- Llavero | $850\n2- Remera | $2000\n3- Gorra | $1250\n4- Plancha de stickers | $350\n5- Poster | $500\n6- Volver al menu anterior"
        )
      );
      while (opcioncat != 6) {
        switch (opcioncat) {
          case 1:
            carrito = carrito + 850;
            alert("Item agregado al carrito!");
            break;
          case 2:
            carrito = carrito + 2000;
            alert("Item agregado al carrito!");
            break;
          case 3:
            carrito = carrito + 1250;
            alert("Item agregado al carrito!");
            break;
          case 4:
            carrito = carrito + 350;
            alert("Item agregado al carrito!");
            break;
          case 5:
            carrito = carrito + 500;
            alert("Item agregado al carrito!");
            break;
          case 6:
            break;
          default:
            alert("Ingrese una opcion valida:");
        }

        opcioncat = parseInt(
          prompt(
            "Ingrese el numero del item que le gustaria agregar al carrito. Aprete 6 para salir al menu principal y finalizar la compra\n1- Llavero | $850\n2- Remera | $2000\n3- Gorra | $1250\n4- Plancha de stickers | $350\n5- Poster | $500\n6- Volver al menu anterior"
          )
        );
      }
      break;

    case 2:
      alert("El total de su compra es: $" + carrito);
      carrito = 0;
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
