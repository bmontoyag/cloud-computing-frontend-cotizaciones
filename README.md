# MS Cotizaciones

APIs para proyectos y presupuestos (PostgreSQL).

## Endpoints
- GET /api/cotizaciones/proyectos
- POST /api/cotizaciones/proyectos
- GET /api/cotizaciones/presupuestos/{id_proyecto}
- POST /api/cotizaciones/presupuestos

## SQL mínimo
```
CREATE TABLE IF NOT EXISTS proyecto(
  id_proyecto VARCHAR(50) PRIMARY KEY,
  nombre_proyecto VARCHAR(150),
  cliente VARCHAR(100),
  total_proyecto NUMERIC,
  estado VARCHAR(30)
);
CREATE TABLE IF NOT EXISTS presupuesto(
  id_presupuesto VARCHAR(50) PRIMARY KEY,
  id_proyecto VARCHAR(50) REFERENCES proyecto(id_proyecto),
  nombre_presupuesto VARCHAR(150),
  total_presupuesto NUMERIC
);
```
