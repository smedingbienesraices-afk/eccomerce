/* break-ui: datos de prueba para los formularios de index.html (solo desarrollo).
   Los valores "peor caso" son plausibles y respetan los límites reales de los campos:
   nombre 80, correo 120, teléfono 30, mensaje 1000, reseña 600 (atributos maxlength). */
(function () {
  var url = 'https://www.proveedor-internacional-de-electrodomesticos.example.com/catalogo/2026/primavera-verano/pequenos-electrodomesticos?categoria=cocina&marca=northwind&referencia=SGV-2026-04-18-ABCDEFGH';
  function rellenar(base, n) { var t = base; while (t.length < n) t += ' ' + base; return t.slice(0, n); }

  var contacto = {
    demo: {
      nombre: 'Ana Pérez', email: 'ana@correo.com', tel: '+56 9 1234 5678', pais: 'Chile',
      mensaje: 'Quiero cotizar un producto para mi tienda.'
    },
    worst: {
      nombre: 'María de los Ángeles Fernández-Echeverría de la Barrera Villalobos Montenegro',
      email: 'bartholomew.fitzgerald-montgomery+pedidos@northwind-industries-holdings-international.example.com',
      tel: '+598 2915 0000 int. 1234567', pais: 'Otro país',
      mensaje: ('Ñandú 東京 👍 ¿Cotización en USD? ' + url + ' ' +
        rellenar('Hola, quisiera cotizar 500 unidades del producto que figura en el catálogo de temporada.', 1000))
    }
  };
  var resena = {
    demo: { nombre: 'Luis', pais: 'Uruguay', cal: 5, texto: 'Muy buen servicio, todo llegó bien.' },
    worst: {
      nombre: 'Aleksandra Wiśniewska-Kowalczyk de la Fuente y Montgomery-Hernández III', pais: 'Otro país', cal: 1,
      texto: 'Excelente atención 👍👍👍 ' + rellenar('Compré en Montevideo y retiré en Santiago; la importación demoró más de lo previsto, pero respondieron cada consulta.', 600)
    }
  };

  function poner(doc, id, valor) {
    var el = doc.getElementById(id); if (!el) return;
    el.value = (el.maxLength > 0 ? valor.slice(0, el.maxLength) : valor);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function enviar(doc, idForm) {
    doc.getElementById(idForm).dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  /* modo: 'demo' | 'worst' | 'empty' */
  function aplicar(doc, modo) {
    var c = contacto[modo] || { nombre: '', email: '', tel: '', pais: '', mensaje: '' };
    var r = resena[modo] || { nombre: '', pais: '', cal: 0, texto: '' };
    poner(doc, 'ct-nombre', c.nombre); poner(doc, 'ct-email', c.email); poner(doc, 'ct-tel', c.tel);
    poner(doc, 'ct-pais', c.pais); poner(doc, 'ct-mensaje', c.mensaje);
    poner(doc, 'rv-nombre', r.nombre); poner(doc, 'rv-pais', r.pais); poner(doc, 'rv-texto', r.texto);
    doc.querySelectorAll('input[name="rv-cal"]').forEach(function (i) { i.checked = false; });
    var vr = doc.getElementById('rv-cal-valor'); if (vr) vr.textContent = 'Sin calificar';
    if (r.cal) { var radio = doc.getElementById('rv-' + r.cal); radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
    enviar(doc, 'form-contacto'); enviar(doc, 'form-resena');
  }

  window.SGV_BREAK = { contacto: contacto, resena: resena, aplicar: aplicar };
})();
