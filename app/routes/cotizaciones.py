from fastapi import APIRouter, HTTPException
from app.database import get_connection
from app.schemas import ProyectoIn, PresupuestoIn

router = APIRouter()

@router.get('/proyectos')
def listar_proyectos():
    conn, cur = get_connection()
    try:
        cur.execute("SELECT id_proyecto, nombre_proyecto, cliente, total_proyecto, estado FROM proyecto")
        cols = ['id_proyecto','nombre_proyecto','cliente','total_proyecto','estado']
        return [dict(zip(cols,row)) for row in cur.fetchall()]
    finally:
        conn.close()

@router.post('/proyectos')
def crear_proyecto(p: ProyectoIn):
    conn, cur = get_connection()
    try:
        cur.execute("""
            INSERT INTO proyecto (id_proyecto, nombre_proyecto, cliente, total_proyecto, estado)
            VALUES (%s,%s,%s,%s,%s)
        """, (p.id_proyecto, p.nombre_proyecto, p.cliente, p.total_proyecto, p.estado))
        conn.commit()
        return {"mensaje": "Proyecto creado"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.get('/presupuestos/{id_proyecto}')
def listar_presupuestos(id_proyecto: str):
    conn, cur = get_connection()
    try:
        cur.execute("SELECT id_presupuesto, nombre_presupuesto, total_presupuesto FROM presupuesto WHERE id_proyecto=%s", (id_proyecto,))
        cols=['id_presupuesto','nombre_presupuesto','total_presupuesto']
        return [dict(zip(cols,row)) for row in cur.fetchall()]
    finally:
        conn.close()

@router.post('/presupuestos')
def crear_presupuesto(pr: PresupuestoIn):
    conn, cur = get_connection()
    try:
        cur.execute("""
            INSERT INTO presupuesto (id_presupuesto, id_proyecto, nombre_presupuesto, total_presupuesto)
            VALUES (%s,%s,%s,%s)
        """, (pr.id_presupuesto, pr.id_proyecto, pr.nombre_presupuesto, pr.total_presupuesto))
        conn.commit()
        return {"mensaje": "Presupuesto creado"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()
