from pydantic import BaseModel
from typing import Optional

class ProyectoIn(BaseModel):
    id_proyecto: str
    nombre_proyecto: str
    cliente: Optional[str] = None
    total_proyecto: float = 0
    estado: str = "borrador"

class PresupuestoIn(BaseModel):
    id_presupuesto: str
    id_proyecto: str
    nombre_presupuesto: str
    total_presupuesto: float = 0
