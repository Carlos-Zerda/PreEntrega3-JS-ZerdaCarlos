class Cliente {
    constructor(nombre, email) {
      this.nombre = nombre;
      this.email = email;
    }
  }
  
  class Producto {
    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  }
  
  class Pedido {
    constructor(cliente) {
      this.cliente = cliente;
      this.productos = [];
      this.total = 0;
      this.formaDePago = null;
    }
  
    agregarProducto(producto) {
      this.productos.push(producto);
      this.total += producto.precio;
    }
  
    eliminarProducto(producto) {
      const index = this.productos.findIndex((p) => p.nombre === producto.nombre);
      if (index !== -1) {
        this.productos.splice(index, 1);
        this.total -= producto.precio;
      }
    }
  
    mostrarResumen() {
      let resumen = `Cliente: ${this.cliente.nombre} (${this.cliente.email})\n\n`;
      resumen += "Productos:\n";
      this.productos.forEach((producto) => {
        resumen += `- ${producto.nombre} - $${producto.precio}\n`;
      });
      resumen += `\nTotal: $${this.total.toFixed(2)}\n`;
      resumen += `Forma de pago: ${this.formaDePago}\n`;
      return resumen;
    }
  }
  
  const productosDisponibles = {
    bebidas: [
      new Producto("Café americano", 250),
      new Producto("Cappuccino", 300),
      new Producto("Té negro", 200),
      new Producto("Chocolate caliente", 290),
      new Producto("Frappé de vainilla", 400),
    ],
    postres: [
      new Producto("Cheesecake (porción)", 450),
      new Producto("Tarta de manzana (porción)", 320),
      new Producto("Brownie (porción)", 380),
      new Producto("Galletas de chocolate", 250),
      new Producto("Torta de zanahoria (porción)", 400),
    ],
  };
  
  function mostrarMenu(opciones) {
    let opcionSeleccionada = null;
    while (opcionSeleccionada === null) {
      const opcion = prompt(opciones.map((opcion, index) => `${index + 1}) ${opcion}`).join("\n"));
      if (opcion === null) {
        opcionSeleccionada = -1;
      } else {
        const opcionNumerica = parseInt(opcion);
        if (opcionNumerica > 0 && opcionNumerica <= opciones.length) {
          opcionSeleccionada = opcionNumerica;
        } else {
          alert("Por favor, seleccione una opción válida");
        }
      }
    }
    return opcionSeleccionada;
  }
  
  function mostrarMenuProductos(productos) {
    const opciones = productos.map((producto) => `${producto.nombre} - $${producto.precio}`);
    const opcionSeleccionada = mostrarMenu([...opciones, "Siguiente"]);
    if (opcionSeleccionada === opciones.length + 1) {
      return null;
    } else {
      return productos[opcionSeleccionada - 1];
    }
  }
  
  function mostrarMenuFormasDePago() {
    const opciones = ["Efectivo", "Tarjeta de crédito", "Tarjeta de débito", "PayPal"];
    const opcionSeleccionada = mostrarMenu([...opciones, "Siguiente"]);
    if (opcionSeleccionada === opciones.length + 1) {
      return null;
    } else {
      return opciones[opcionSeleccionada - 1];
    }
  }
  
  function iniciarSistema() {
    let opcionSeleccionada = null;
    while (opcionSeleccionada !== "3") {
      const opciones = ["Realizar pedido", "Ver productos disponibles", "Salir"];
      const opcion = prompt(opciones.map((opcion, index) => `${index + 1}) ${opcion}`).join("\n"));
      if (opcion === null) {
        opcionSeleccionada = "3";
      } else {
        const opcionNumerica = parseInt(opcion);
        if (opcionNumerica > 0 && opcionNumerica <= opciones.length) {
          opcionSeleccionada = opcionNumerica.toString();
          if (opcionSeleccionada === "1") {
            hacerPedido();
          } else if (opcionSeleccionada === "2") {
            VerproductosDisponibles();
          }
        } else {
          alert("Por favor, seleccione una opción válida");
        }
      }
    }
  }
  
  iniciarSistema();
  function VerproductosDisponibles() {
    let opciones = [];
    for (let categoria in productosDisponibles) {
      opciones.push(`\n${categoria.toUpperCase()}`);
      opciones.push(...productosDisponibles[categoria].map((producto) => `${producto.nombre} - $${producto.precio}`));
    }
    alert(opciones.join("\n"));
  }
  
  
  function hacerPedido() {
    const nombreCliente = prompt("Ingrese su nombre:");
    const emailCliente = prompt("Ingrese su email:");
  
    const cliente = new Cliente(nombreCliente, emailCliente);
    const pedido = new Pedido(cliente);
  
    let productoSeleccionado = mostrarMenuProductos(productosDisponibles.bebidas);
    while (productoSeleccionado !== null) {
      pedido.agregarProducto(productoSeleccionado);
      productoSeleccionado = mostrarMenuProductos(productosDisponibles.bebidas);
    }
  
    productoSeleccionado = mostrarMenuProductos(productosDisponibles.postres);
    while (productoSeleccionado !== null) {
      pedido.agregarProducto(productoSeleccionado);
      productoSeleccionado = mostrarMenuProductos(productosDisponibles.postres);
    }
  
    let productosSeleccionados = pedido.productos.slice(); // copia los productos seleccionados
    let opcionSeleccionada = null;
    while (opcionSeleccionada !== "2") {
      const resumenPedido = pedido.mostrarResumen();
      const opcion = prompt(`${resumenPedido}\n\n1) Eliminar producto\n2) Continuar con el pago`);
      if (opcion === null) {
        opcionSeleccionada = "2";
      } else {
        const opcionNumerica = parseInt(opcion);
        if (opcionNumerica === 1) {
          const productoAEliminar = mostrarMenuProductos(productosSeleccionados);
          if (productoAEliminar !== null) {
            pedido.eliminarProducto(productoAEliminar);
            productosSeleccionados = pedido.productos.slice();
          }
        } else if (opcionNumerica === 2) {
          opcionSeleccionada = "2";
        } else {
          alert("Por favor, seleccione una opción válida");
        }
      }
    }
  
    const formaDePago = mostrarMenuFormasDePago();
    if (formaDePago !== null) {
      pedido.formaDePago = formaDePago;
      const resumenPedido = pedido.mostrarResumen();
      alert(`Resumen del pedido:\n\n${resumenPedido}\n\n¡Gracias por su compra!`);
    } else {
      alert("Operación cancelada.");
    }
  }