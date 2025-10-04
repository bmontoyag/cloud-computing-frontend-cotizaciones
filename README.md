
# Frontend Cotizaciones (React + Vite)

Pequeño frontend para listar proyectos desde el microservicio de Cotizaciones expuesto por API Gateway.

## Desarrollo local
```bash
npm install
npm run dev
```
Crea un archivo `.env` con:
```
VITE_API_URL=https://<api-id>.execute-api.us-east-1.amazonaws.com/api/cotizaciones/proyectos
```

## Build
```bash
npm run build
```
Salida en `dist/`.

## Despliegue en AWS S3 + CloudFront
1. Crear bucket S3 (público para hosting estático)
2. Subir carpeta `dist/` al bucket
3. Crear distribución CloudFront con el bucket como origen
4. Habilitar CORS en API Gateway para el dominio de CloudFront

Comandos de ejemplo (CLI):
```bash
npm run build
aws s3 mb s3://frontend-cotizaciones-app
aws s3 sync dist/ s3://frontend-cotizaciones-app --delete
```
