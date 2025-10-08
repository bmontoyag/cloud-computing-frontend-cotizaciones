# Frontend Cotizaciones (SPA estática)

- API base: http://18.204.238.193:8081
- Endpoints usados:
  - GET /api/cotizaciones/proyectos
  - POST /api/cotizaciones/proyectos
  - GET /api/cotizaciones/presupuestos/{id_proyecto}
  - POST /api/cotizaciones/presupuestos

## Despliegue rápido (EC2)

1) Instala Docker y Compose v2.
2) Copia esta carpeta a la instancia, entra a la carpeta.
3) docker compose up -d --build
4) Abre http://<IP_PUBLICA_EC2>/

Para cambiar el backend, edita dist/config.js.
