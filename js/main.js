const productos = [];
let subtotal = 0; //para calcular el subtotal de la compra
let totalItems = 0; //para calcular la cantidad de items en el carrito
const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

function textoSubtotal() {
  totalItems = 0;
  for (const producto of productos) {
    totalItems = totalItems + producto.cantidadCarrito;
  }

  let subtotal1 = document.getElementById("subtotal");
  subtotal1.innerText = `$${subtotal}`;
  let textoamount = document.getElementById("items");
  textoamount.innerText = `${totalItems} items`;
}

function agregarItem(numero) {
  if (productos[numero - 1].cantidad == 0) {
    document.getElementById(`maxStock${numero}`).style.visibility = "visible";
  } else {
    let texto = document.getElementById(`contador${numero}`);
    let amount = document.getElementById(`amount${numero}`);

    document.getElementById(`remove${numero}`).style.visibility = "visible";

    productos[numero - 1].cantidadCarrito += 1;
    productos[numero - 1].enCarrito = true;
    productos[numero - 1].cantidad -= 1;

    amount.innerText = `$${
      productos[numero - 1].precio * productos[numero - 1].cantidadCarrito
    }`;
    subtotal = subtotal + productos[numero - 1].precio;
    texto.innerText = productos[numero - 1].cantidadCarrito;

    textoSubtotal();

    guardarLocal("Carrito", JSON.stringify(productos));
  }
}

function eliminarItem(numero) {
  if (productos[numero - 1].cantidadCarrito > 0) {
    document.getElementById(`maxStock${numero}`).style.visibility = "hidden";
    let texto = document.getElementById(`contador${numero}`);
    let amount = document.getElementById(`amount${numero}`);
    productos[numero - 1].cantidadCarrito -= 1;
    if (productos[numero - 1].cantidadCarrito == 0) {
      productos[numero - 1].enCarrito = false;
      document.getElementById(`remove${numero}`).style.visibility = "hidden";
    }
    productos[numero - 1].cantidad += 1;
    amount.innerText = `$${
      productos[numero - 1].precio * productos[numero - 1].cantidadCarrito
    }`;
    subtotal = subtotal - productos[numero - 1].precio;
    texto.innerText = productos[numero - 1].cantidadCarrito;

    textoSubtotal();
    guardarLocal("Carrito", JSON.stringify(productos));
  }
}

function removeAll() {
  for (let i = 1; i < 6; i++) {
    while (productos[i - 1].cantidadCarrito > 0) {
      eliminarItem(i);
    }
  }
}

function renderizarCarrito() {
  for (let i = 1; i < 6; i++) {
    while (productos[i - 1].cantidadCarrito < carrito[i - 1].cantidadCarrito) {
      agregarItem(i);
    }
  }
}

function remove(numero) {
  while (productos[numero - 1].cantidadCarrito > 0) {
    eliminarItem(numero);
  }
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

document.getElementById("remove1").style.visibility = "hidden";
document.getElementById("remove2").style.visibility = "hidden";
document.getElementById("remove3").style.visibility = "hidden";
document.getElementById("remove4").style.visibility = "hidden";
document.getElementById("remove5").style.visibility = "hidden";
document.getElementById("maxStock1").style.visibility = "hidden";
document.getElementById("maxStock2").style.visibility = "hidden";
document.getElementById("maxStock3").style.visibility = "hidden";
document.getElementById("maxStock4").style.visibility = "hidden";
document.getElementById("maxStock5").style.visibility = "hidden";

productos.push(new Producto(1, "Llavero", 850, 4));
productos.push(new Producto(2, "Remera", 2000, 2));
productos.push(new Producto(3, "Gorra", 1250, 5));
productos.push(new Producto(4, "Plancha de stickers", 350, 2));
productos.push(new Producto(5, "Poster", 500, 8));

let carrito = [];
let carritoEnJS = localStorage.getItem("Carrito");
if (carritoEnJS != null) {
  carrito = JSON.parse(carritoEnJS);
  renderizarCarrito();
}

let boton11 = document.getElementById("btnSumar1");
boton11.addEventListener("click", () => agregarItem(1));
let boton12 = document.getElementById("btnRestar1");
boton12.addEventListener("click", () => eliminarItem(1));

let boton21 = document.getElementById("btnSumar2");
boton21.addEventListener("click", () => agregarItem(2));
let boton22 = document.getElementById("btnRestar2");
boton22.addEventListener("click", () => eliminarItem(2));

let boton31 = document.getElementById("btnSumar3");
boton31.addEventListener("click", () => agregarItem(3));
let boton32 = document.getElementById("btnRestar3");
boton32.addEventListener("click", () => eliminarItem(3));

let boton41 = document.getElementById("btnSumar4");
boton41.addEventListener("click", () => agregarItem(4));
let boton42 = document.getElementById("btnRestar4");
boton42.addEventListener("click", () => eliminarItem(4));

let boton51 = document.getElementById("btnSumar5");
boton51.addEventListener("click", () => agregarItem(5));
let boton52 = document.getElementById("btnRestar5");
boton52.addEventListener("click", () => eliminarItem(5));

let botonRemoveAll = document.getElementById("removeAll");
botonRemoveAll.addEventListener("click", removeAll);

let botonRemove1 = document.getElementById("remove1");
botonRemove1.addEventListener("click", () => remove(1));

let botonRemove2 = document.getElementById("remove2");
botonRemove2.addEventListener("click", () => remove(2));

let botonRemove3 = document.getElementById("remove3");
botonRemove3.addEventListener("click", () => remove(3));

let botonRemove4 = document.getElementById("remove4");
botonRemove4.addEventListener("click", () => remove(4));

let botonRemove5 = document.getElementById("remove5");
botonRemove5.addEventListener("click", () => remove(5));
