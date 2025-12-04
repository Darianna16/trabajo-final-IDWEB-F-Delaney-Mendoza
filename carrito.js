//Agregar producto al carrito 
function agregarAlCarrito(nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito_ropa")) || [];
  const existente = carrito.find(item => item.nombre === nombre);

  if (existente) {
    existente.cantidad += 1; 
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  localStorage.setItem("carrito_ropa", JSON.stringify(carrito));
  alert(`${nombre} añadido al carrito`);
}

//Mostrar carrito
if (document.getElementById("lista-carrito")) {

  const lista = document.getElementById("lista-carrito");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const cantidadEl = document.getElementById("cantidad-productos");

  function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito_ropa")) || [];
    lista.innerHTML = "";

    if (carrito.length === 0) {
      lista.innerHTML = "<p>Tu carrito está vacío</p>";
      subtotalEl.textContent = "S/.0.00";
      totalEl.textContent = "S/.0.00";
      cantidadEl.textContent = "0";
      return;
    }

    let subtotal = 0;

    carrito.forEach((p, i) => {
      subtotal += p.precio * p.cantidad;

      lista.innerHTML += `
        <div class="producto">
          <img src="${p.imagen}" alt="${p.nombre}">
          <div class="info">
            <h4>${p.nombre}</h4>
            <p class="precio-descuento">S/.${p.precio.toFixed(2)}</p>

            <div class="cantidad">
              <button onclick="cambiarCantidad(${i}, -1)">-</button>
              <span>${p.cantidad}</span>
              <button onclick="cambiarCantidad(${i}, 1)">+</button>
            </div>
          </div>
          <button class="eliminar" onclick="eliminar(${i})">×</button>
        </div>
      `;
    });

    subtotalEl.textContent = `S/.${subtotal.toFixed(2)}`;
    totalEl.textContent = `S/.${subtotal.toFixed(2)}`;
    cantidadEl.textContent = carrito.length;
  }

  // Cambiar cantidad
  window.cambiarCantidad = (index, delta) => {
    let carrito = JSON.parse(localStorage.getItem("carrito_ropa")) || [];
    carrito[index].cantidad += delta;

    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;

    localStorage.setItem("carrito_ropa", JSON.stringify(carrito));
    renderCarrito();
  };

  // Eliminar producto
  window.eliminar = (index) => {
    let carrito = JSON.parse(localStorage.getItem("carrito_ropa")) || [];
    carrito.splice(index, 1);

    localStorage.setItem("carrito_ropa", JSON.stringify(carrito));
    renderCarrito();
  };

  renderCarrito();
}

function animarBoton(boton) {
  boton.classList.add("added");
  boton.textContent = "✔ Añadido";

  setTimeout(() => {
    boton.classList.remove("added");
    boton.textContent = "Agregar al carrito";
  }, 1500);
}
