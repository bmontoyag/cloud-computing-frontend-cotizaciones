
(function () {
  const baseURL = (window.APP_CONFIG && window.APP_CONFIG.baseURL) || "";
  const proyectosURL = `${baseURL}/cotizaciones/proyectos`;
  const presupuestosURL = `${baseURL}/cotizaciones`;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  $("#api-url").textContent = baseURL;
  $("#tab-proyectos").addEventListener("click", () => switchTab("proyectos"));
  $("#tab-presupuestos").addEventListener("click", () => switchTab("presupuestos"));
  function switchTab(tab) {
    $$(".section").forEach(s => s.classList.remove("active"));
    $$("#tab-proyectos, #tab-presupuestos").forEach(b => b.classList.remove("active"));
    if (tab === "proyectos") { $("#proyectos-section").classList.add("active"); $("#tab-proyectos").classList.add("active"); }
    else { $("#presupuestos-section").classList.add("active"); $("#tab-presupuestos").classList.add("active"); }
  }
  async function apiGet(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
    return res.json();
  }
  async function apiPost(url, data) {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) { const text = await res.text().catch(() => ""); throw new Error(`POST ${url} -> ${res.status}: ${text}`); }
    return res.json();
  }
  async function cargarProyectos() {
    try {
      const data = await apiGet(proyectosURL);
      const tbody = $("#tabla-proyectos tbody");
      tbody.innerHTML = "";
      data.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${p.id_proyecto ?? p.id ?? ""}</td><td>${p.nombre_proyecto ?? ""}</td><td>${p.cliente ?? ""}</td><td>${p.total_proyecto ?? 0}</td><td>${p.estado ?? ""}</td>`;
        tbody.appendChild(tr);
      });
    } catch (e) { alert(`Error cargando proyectos: ${e.message}`); console.error(e); }
  }
  $("#btn-refresh-proyectos").addEventListener("click", cargarProyectos);
  $("#form-proyecto").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const payload = { id_proyecto: fd.get("id_proyecto"), nombre_proyecto: fd.get("nombre_proyecto"), cliente: fd.get("cliente"), total_proyecto: parseFloat(fd.get("total_proyecto") || "0"), estado: fd.get("estado") || null };
    try { await apiPost(proyectosURL, payload); await cargarProyectos(); ev.target.reset(); alert("Proyecto creado"); }
    catch (e) { alert(`Error creando proyecto: ${e.message}`); console.error(e); }
  });
  async function cargarPresupuestos(idProyecto) {
    if (!idProyecto) { alert("Indica un ID de proyecto"); return; }
    try {
      const data = await apiGet(`${presupuestosURL}/${encodeURIComponent(idProyecto)}`);
      const tbody = $("#tabla-presupuestos tbody");
      tbody.innerHTML = "";
      data.forEach(pr => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${pr.id_presupuesto ?? pr.id ?? ""}</td><td>${pr.id_proyecto ?? ""}</td><td>${pr.nombre_presupuesto ?? ""}</td><td>${pr.total_presupuesto ?? 0}</td>`;
        tbody.appendChild(tr);
      });
    } catch (e) { alert(`Error cargando presupuestos: ${e.message}`); console.error(e); }
  }
  $("#btn-load-presupuestos").addEventListener("click", () => { const idProyecto = $("#filter-proyecto").value.trim(); cargarPresupuestos(idProyecto); });
  $("#form-presupuesto").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const payload = { id_presupuesto: fd.get("id_presupuesto"), id_proyecto: fd.get("id_proyecto"), nombre_presupuesto: fd.get("nombre_presupuesto"), total_presupuesto: parseFloat(fd.get("total_presupuesto") || "0") };
    try { await apiPost(presupuestosURL, payload); const filter = $("#filter-proyecto").value.trim() || payload.id_proyecto; await cargarPresupuestos(filter); ev.target.reset(); alert("Presupuesto creado"); }
    catch (e) { alert(`Error creando presupuesto: ${e.message}`); console.error(e); }
  });
  cargarProyectos();
})();
