from fastapi import FastAPI
from mangum import Mangum
from app.routes.cotizaciones import router as cot_router

app = FastAPI(title="MS Cotizaciones", version="1.0.0")
app.include_router(cot_router, prefix="/api/cotizaciones", tags=["Cotizaciones"])
handler = Mangum(app)
