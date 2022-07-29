"use strict";

const arregloTareas = [
  { id: 1, descripcion: "comprar pan", estado: false },
  {
    id: 2,
    descripcion: "ir al gym",
    estado: false,
  },
  { id: 3, descripcion: "cocinar", estado: false },
  { id: 4, descripcion: "ver series", estado: false },
];

const boxInput = document.querySelector("#input-nueva-tarea");
const boxButton = document.querySelector("#btn-agregar");
const inyecionHtml = document.querySelector("#tareas");
const inyecionBtns = document.querySelector("#acciones");
const boxTotalTareas = document.querySelector("#id-total-tareas");
const boxTotalRealizadas = document.querySelector("#id-total-realizadas");

let idInicial = arregloTareas.length + 1;
let componenteTarea = "";
let componenteEliminarSeleccionar = "";

window.onload = function () {
  cargarData();
  agregarEventoClickCheckbox();
  agregarEventoClickButton();
  contarTareas();
};

const contarTareas = () => {
  const totalTareas = arregloTareas.length;
  const totalTareasRealizadas = arregloTareas.filter(
    (arreglo) => arreglo.estado
  );

  boxTotalTareas.innerHTML = totalTareas;
  boxTotalRealizadas.innerHTML = totalTareasRealizadas.length;
};

const cargarData = () => {
  arregloTareas.forEach((tarea) => {
    obtenerHtml(tarea.id, tarea.descripcion, tarea.estado);
  });

  inyecionHtml.innerHTML = componenteTarea;
  inyecionBtns.innerHTML = componenteEliminarSeleccionar;
  contarTareas();

  componenteTarea = "";
  componenteEliminarSeleccionar = "";
};

const obtenerHtml = (id, descripcion, estado) => {
  if (estado) {
    componenteTarea = `        
    <div class="job" id="job-${id}"> 
        <p>${id}</p> 
        <p style="text-decoration: line-through; color: red;" id="descripcion-${id}">
            ${descripcion}
        </p>
    </div>`;

    componenteEliminarSeleccionar = `
    <div class="action" id="action-${id}">
        <input type="checkbox" class="checkbox" id="check-${id}" checked="true">
        <button class="btn-delete" id="btn-delete-${id}" type="button"> X </button>
    </div>`;
  }

  componenteTarea += `
    <div class="job" id="job-${id}"> 
        <p>${id}</p> 
        <p id="descripcion-${id}">
            ${descripcion}
        </p>
    </div>`;

  componenteEliminarSeleccionar += `
    <div class="action" id="action-${id}">
        <input type="checkbox" class="checkbox" id="check-${id}">
        <button class="btn-delete" id="btn-delete-${id}" type="button"> X </button>
    </div>`;
};

const agregar = (detalleTarea) => {
  if (!detalleTarea) {
    alert("Debe ingresar el nombre de la tarea");
    return;
  }

  arregloTareas.push({
    id: idInicial,
    descripcion: detalleTarea,
    estado: false,
  });
  idInicial++;

  cargarData();
};

boxButton.addEventListener("click", () => {
  agregar(boxInput.value);
  agregarEventoClickCheckbox();
  agregarEventoClickButton();
  document.querySelector("#input-tarea").value = "";
});

const cambioCheck = (idCapturado) => {
  const index = arregloTareas.findIndex(
    (elemento) => Number(elemento.id) === Number(idCapturado)
  );

  let pasoId = arregloTareas[index].id;
  let pasoDescripcion = arregloTareas[index].descripcion;
  if (arregloTareas[index].estado === false) {
    arregloTareas.splice(index, 1, {
      id: pasoId,
      descripcion: pasoDescripcion,
      estado: true,
    });

    document.getElementById(`descripcion-${pasoId}`).style.textDecoration =
      "line-through";
  } else {
    arregloTareas.splice(index, 1, {
      id: pasoId,
      descripcion: pasoDescripcion,
      estado: false,
    });

    document.getElementById(`descripcion-${pasoId}`).style.textDecoration =
      "none";
    document.getElementById(`descripcion-${pasoId}`).style.color = "white";
  }

  contarTareas();
};

const agregarEventoClickCheckbox = () => {
  const obtenerChecks = document.querySelectorAll(".checkbox");

  obtenerChecks.forEach((check) => {
    const checkClass = `#${check.id}`;
    const idBusqueda = checkClass.match(/\d+/g).join("");
    const boxCheck = document.querySelector(checkClass);

    boxCheck.addEventListener("click", () => {
      cambioCheck(idBusqueda);
    });
  });
};

const eliminarTarea = (idCapturado) => {
  const index = arregloTareas.findIndex(
    (elemento) => Number(elemento.id) === Number(idCapturado)
  );
  arregloTareas.splice(index, 1);
  cargarData();
  agregarEventoClickButton();
  agregarEventoClickCheckbox();
};

const agregarEventoClickButton = () => {
  const obtenerBotonesEliminar = document.querySelectorAll(".btn-delete");

  obtenerBotonesEliminar.forEach((botonEliminar) => {
    const bntEliminarClass = `#${botonEliminar.id}`;
    const idBusqueda = bntEliminarClass.match(/\d+/g).join("");
    const boxBtn = document.querySelector(bntEliminarClass);
    boxBtn.addEventListener("click", () => {
      eliminarTarea(idBusqueda);
    });
  });
};
