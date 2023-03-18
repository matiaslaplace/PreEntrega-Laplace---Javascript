// CLASES

class Producto {
  constructor(sku, nombre, precio, cantidad, cantidadCarrito) {
    this.sku = sku;
    this.nombre = nombre;
    this.precio = parseInt(precio);
    this.cantidad = parseInt(cantidad);
  }
}

class ProductoCarrito {
  constructor(sku, nombre, precio, cantidad = 1) {
    this.sku = sku;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

// FUNCIONES

function renderizarListaDeProductos() {
  // Limpiar la lista de productos
  divListaDeProductos.innerHTML = "";

  // Recorrer la lista de productos
  for (const productoDeLista of productos) {
    // Crear div del producto
    const div = document.createElement("div");
    div.setAttribute("class", "Cart-Container");

    // Crear el título del producto
    const nombre = document.createElement("h3");
    nombre.setAttribute("class", "title");
    nombre.innerText = productoDeLista.nombre;

    //Crear la imagen del producto
    const imagen = document.createElement("img");
    imagen.src = `/Images/${productoDeLista.nombre}.jpeg`;
    imagen.setAttribute("class", "imagenesCarrito");

    // Crear el precio del producto
    const precio = document.createElement("h4");
    precio.innerText = `$${productoDeLista.precio}`;
    precio.setAttribute("class", "subtitle");

    // Crear el contador de cada item del carrito
    const divCantidad = document.createElement("div");
    divCantidad.setAttribute("class", "counter");
    const sumar = document.createElement("div");
    sumar.setAttribute("id", `btnSumar${productoDeLista.sku}`);
    sumar.setAttribute("class", "btnSumar");
    sumar.style.visibility = "hidden";
    sumar.innerText = "+";
    const contador = document.createElement("div");
    contador.setAttribute("class", "count");
    contador.setAttribute("id", `contador${productoDeLista.sku}`);
    contador.style.visibility = "hidden";
    contador.innerText = "0";
    const restar = document.createElement("div");
    restar.setAttribute("class", "btnRestar");
    restar.setAttribute("id", `btnRestar${productoDeLista.sku}`);
    restar.style.visibility = "hidden";
    restar.innerText = "-";

    // Crear el botón
    const btnAgregarAlCarrito = document.createElement("button");
    btnAgregarAlCarrito.innerText = "Agregar al carrito";
    btnAgregarAlCarrito.setAttribute("class", "button");

    // Crear los eventos para agregar o restar los productos al carrito

    btnAgregarAlCarrito.addEventListener("click", () => {
      agregarItem(productoDeLista);
    });

    sumar.addEventListener("click", () => {
      agregarItem(productoDeLista);
    });

    restar.addEventListener("click", () => {
      eliminarItem(productoDeLista);
    });

    // Agregar al div los elementos del contador y luego el div total
    divCantidad.append(sumar, contador, restar);
    div.append(nombre, imagen, precio, divCantidad, btnAgregarAlCarrito);

    // Agregar el div a la lista
    divListaDeProductos.append(div);
  }
  let carritoEnJS = localStorage.getItem("Carrito");
  if (carritoEnJS != null) {
    carrito = JSON.parse(carritoEnJS);
    renderizarCarrito();
  }
}

function modificarIconoCarrito() {
  let numero = document.getElementById("numeroCarrito");
  numero.innerText = cantidadEnIconoCarrito;
}

function obtenerProductosDelJSON() {
  fetch("/productos.json")
    .then((response) => {
      return response.json();
    })
    .then((productosJSON) => {
      for (const productoJSON of productosJSON) {
        productos.push(
          new Producto(
            productoJSON.sku,
            productoJSON.nombre,
            productoJSON.precio,
            productoJSON.cantidad
          )
        );
      }
      renderizarListaDeProductos();
    });
}

function renderizarCarrito() {
  for (const productoDeCarrito of carrito) {
    const indiceProductoEncontrado = carrito.findIndex(
      (productoCarrito) => productoCarrito.sku === productoDeCarrito.sku
    );

    cantidadEnIconoCarrito =
      cantidadEnIconoCarrito + productoDeCarrito.cantidad;

    modificarIconoCarrito();

    if (indiceProductoEncontrado != -1) {
      let texto = document.getElementById(`contador${productoDeCarrito.sku}`);
      texto.innerText = productoDeCarrito.cantidad;
      texto.style.visibility = "visible";
      document.getElementById(
        `btnSumar${productoDeCarrito.sku}`
      ).style.visibility = "visible";
      document.getElementById(
        `btnRestar${productoDeCarrito.sku}`
      ).style.visibility = "visible";
    }
  }
}

function agregarItem(productoAAgregar) {
  const indiceProductoEncontrado = carrito.findIndex(
    (productoCarrito) => productoCarrito.sku === productoAAgregar.sku
  );
  const indiceProductoListado = productos.findIndex(
    (productoCarrito) => productoCarrito.sku === productoAAgregar.sku
  );
  if (indiceProductoEncontrado === -1) {
    carrito.push(
      new ProductoCarrito(
        productoAAgregar.sku,
        productoAAgregar.nombre,
        productoAAgregar.precio
      )
    );
    let texto = document.getElementById(`contador${productoAAgregar.sku}`);
    texto.innerText = 1;
    texto.style.visibility = "visible";
    let botonSumar = document.getElementById(`btnSumar${productoAAgregar.sku}`);
    botonSumar.style.visibility = "visible";
    let botonRestar = document.getElementById(
      `btnRestar${productoAAgregar.sku}`
    );
    botonRestar.style.visibility = "visible";
    cantidadEnIconoCarrito += 1;
    modificarIconoCarrito();
  } else {
    // chequeo si la cantidad en el listado de productos es mayor a 0
    if (
      productos[indiceProductoListado].cantidad <=
      carrito[indiceProductoEncontrado].cantidad
    ) {
      Swal.fire({
        icon: "error",
        title: "No hay mas stock",
        text: "La cantidad agregada supera la cantidad disponible del producto",
      });
    } else {
      carrito[indiceProductoEncontrado].cantidad += 1;
      let texto = document.getElementById(`contador${productoAAgregar.sku}`);
      texto.innerText = carrito[indiceProductoEncontrado].cantidad;
      cantidadEnIconoCarrito += 1;
      modificarIconoCarrito();
    }
    console.log(cantidadEnIconoCarrito);
    guardarLocal("Carrito", JSON.stringify(carrito));
  }
}

function eliminarItem(productoADescontar) {
  const indiceProductoEncontrado = carrito.findIndex(
    (productoCarrito) => productoCarrito.sku === productoADescontar.sku
  );

  if (indiceProductoEncontrado != -1) {
    // Chequeo que el producto sea mayor a 0 en el carrito

    if (carrito[indiceProductoEncontrado].cantidad > 0) {
      carrito[indiceProductoEncontrado].cantidad -= 1;
      cantidadEnIconoCarrito -= 1;
      modificarIconoCarrito();
      let texto = document.getElementById(`contador${productoADescontar.sku}`);
      texto.innerText = carrito[indiceProductoEncontrado].cantidad;
    }
  }

  // oculto el contador del producto en caso de que el item en el carrito este en 0

  if (carrito[indiceProductoEncontrado].cantidad == 0) {
    let texto = document.getElementById(`contador${productoADescontar.sku}`);
    texto.style.visibility = "hidden";
    let botonSumar = document.getElementById(
      `btnSumar${productoADescontar.sku}`
    );
    botonSumar.style.visibility = "hidden";
    let botonRestar = document.getElementById(
      `btnRestar${productoADescontar.sku}`
    );
    botonRestar.style.visibility = "hidden";
    carrito.splice(indiceProductoEncontrado, 1);
  }

  guardarLocal("Carrito", JSON.stringify(carrito));
}

function visualizarResumen() {
  divListaDeCarrito.innerHTML = "";

  let total = 0;

  const resumen = document.createElement("p");
  resumen.innerText = "Resumen";
  resumen.setAttribute("class", "resumen");
  divListaDeCarrito.append(resumen);

  const trTitulos = document.createElement("tr");
  const tdNombres = document.createElement("td");
  tdNombres.setAttribute("class", "titulosTabla");
  const tdPrecios = document.createElement("td");
  tdPrecios.setAttribute("class", "titulosTabla");
  const tdCantidades = document.createElement("td");
  tdCantidades.setAttribute("class", "titulosTabla");

  tdNombres.innerText = "Producto";
  tdPrecios.innerText = "Subtotal";
  tdCantidades.innerText = "Cant";

  trTitulos.append(tdNombres, tdPrecios, tdCantidades);
  divListaDeCarrito.append(trTitulos);

  for (const productoDeCarrito of carrito) {
    // Crear div para el carrito

    const div = document.createElement("div");
    div.setAttribute("class", "resumenCarrito");

    // Crear la tabla de productos

    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    tdNombre.innerText = `${productoDeCarrito.nombre}`;

    const tdPrecio = document.createElement("td");
    tdPrecio.innerText = `$${
      productoDeCarrito.precio * productoDeCarrito.cantidad
    }`;

    const tdCantidad = document.createElement("td");
    tdCantidad.innerText = `${productoDeCarrito.cantidad}`;

    const tdAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.setAttribute("class", "btn btn-danger");
    btnEliminar.innerText = "Eliminar";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(productoDeCarrito);
    });

    tdAcciones.append(btnEliminar);

    tr.append(tdNombre, tdPrecio, tdCantidad, tdAcciones);
    divListaDeCarrito.append(tr);

    total = total + productoDeCarrito.precio * productoDeCarrito.cantidad;
  }

  const linea = document.createElement("hr");
  divListaDeCarrito.append(linea);

  const trTotal = document.createElement("tr");
  trTotal.setAttribute("class", "titulosTabla");

  const tdTotalProductos = document.createElement("td");
  tdTotalProductos.innerText = "TOTAL";

  const tdTotalPrecio = document.createElement("td");
  tdTotalPrecio.innerText = `$${total}`;

  const tdTotalCantidad = document.createElement("td");
  tdTotalCantidad.innerText = `${cantidadEnIconoCarrito}`;

  const btnCheckout = document.createElement("button");
  btnCheckout.setAttribute("class", "btn btn-primary");
  btnCheckout.innerText = "Pagar";

  trTotal.append(tdTotalProductos, tdTotalPrecio, tdTotalCantidad, btnCheckout);
  divListaDeCarrito.append(trTotal);

  divListaDeCarrito.style.visibility = "visible";

  divListaDeCarrito.addEventListener("mouseleave", () => ocultarResumen());
}

function ocultarResumen() {
  divListaDeCarrito.style.visibility = "hidden";
}

function eliminarProducto(productoAEliminar) {
  while (productoAEliminar.cantidad > 0) {
    eliminarItem(productoAEliminar);
    visualizarResumen();
  }
}

// INICIO DEL PROGRAMA

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

const divListaDeProductos = document.getElementById("listaDeProductos");
const divListaDeCarrito = document.getElementById("listaDeCarrito");
divListaDeCarrito.style.visibility = "hidden";
let productos = [];
let carrito = [];
let cantidadEnIconoCarrito = 0;

obtenerProductosDelJSON();

let resumenCarrito = document.getElementById("carritoCheck");
resumenCarrito.addEventListener("click", () => visualizarResumen());
