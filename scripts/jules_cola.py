#!/usr/bin/env python3
"""Despachador de cola para Jules, respetando el techo real de 3 sesiones simultaneas.

Uso:
    python3 scripts/jules_cola.py --estado       # muestra cupo y cola
    python3 scripts/jules_cola.py --despachar    # lanza mientras haya cupo

Requiere la llave en /app/.agents/secrets/jules.json (campo "personal_2") o en la
variable de entorno JULES_API_KEY. Nunca se guarda en el repositorio.

Reglas (ADR-019):
  - techo 3 sesiones activas, una sola por repositorio
  - automationMode AUTO_CREATE_PR, jamas auto-merge
  - cada encargo exige entrada en docs/agentes/MEMORIA.md
"""
import argparse
import json
import os
import subprocess
import sys

API = "https://jules.googleapis.com/v1alpha"
TECHO = 3

# Cola priorizada: (repo, persona, objetivo backend). El orden es la prioridad.
COLA = [
    ("JULIANJUAREZMX01/KYNYKOS_AI_Agent", "sentinel",
     "Verifica que la correccion de inyeccion de comandos cubra los casos encadenados "
     "y anade pruebas que fallen con el codigo anterior."),
    ("JULIANJUAREZMX01/cantabria-pms-demo", "speedy",
     "Consolida en una sola funcion el armado del payload de publicacion sin cambiar "
     "el contrato que consume el frontend."),
    ("JULIANJUAREZMX01/KynicOS", "sentinel",
     "Timeouts explicitos y reintentos acotados en app/cloud/whatsapp_bridge.py."),
    ("JULIANJUAREZMX01/palladium-c2", "bolt",
     "Reduce consultas repetidas en las funciones de alertas de energia y mide el "
     "numero de operaciones antes y despues."),
    ("JULIANJUAREZMX01/SAC_OS", "speedy",
     "Consolida logica duplicada entre agente_ia, agente_sac y agente_siempre_activo "
     "sin cambiar la interfaz que consumen."),
    ("JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps", "sentinel",
     "Revisa el manejo de entradas no confiables en el detector y anade validacion "
     "en la frontera, sin tocar el frontend."),
]

BASE = (
    "Micro optimizacion de BACKEND unicamente. No toques interfaz, estilos ni "
    "componentes visuales. Lee AGENTS.md y docs/agentes/MEMORIA.md primero. Un solo "
    "cambio pequeno, medible y reversible. Ejecuta las pruebas. Agrega entrada a "
    "docs/agentes/MEMORIA.md con la medicion. Un solo PR pequeno. Prohibido: "
    "dependencias nuevas, cambios de contrato de API, tocar frontend, refactors "
    "grandes.\n\nObjetivo: "
)


def llave():
    if os.environ.get("JULES_API_KEY"):
        return os.environ["JULES_API_KEY"]
    ruta = "/app/.agents/secrets/jules.json"
    if os.path.exists(ruta):
        datos = json.load(open(ruta))
        return datos.get("personal_2") or datos.get("personal")
    sys.exit("Sin llave: define JULES_API_KEY o crea /app/.agents/secrets/jules.json")


def get(url, key):
    out = subprocess.run(["curl", "-s", "-H", f"X-Goog-Api-Key: {key}", url],
                         capture_output=True, text=True).stdout
    try:
        return json.loads(out)
    except Exception:
        return {}


def sesiones_activas(key):
    activas, tok = [], ""
    while True:
        url = f"{API}/sessions?pageSize=100" + (f"&pageToken={tok}" if tok else "")
        d = get(url, key)
        for s in d.get("sessions", []):
            if s.get("state") in ("IN_PROGRESS", "PLANNING", "QUEUED", "AWAITING_USER_FEEDBACK"):
                activas.append(s)
        tok = d.get("nextPageToken", "")
        if not tok:
            return activas


def despachar(key, repo, persona, objetivo):
    payload = {
        "prompt": BASE + objetivo,
        "sourceContext": {"source": f"sources/github/{repo}",
                          "githubRepoContext": {"startingBranch": "main"}},
        "title": f"{persona}: micro optimizacion backend",
        "automationMode": "AUTO_CREATE_PR",
    }
    out = subprocess.run(["curl", "-s", "-X", "POST",
                          "-H", f"X-Goog-Api-Key: {key}",
                          "-H", "Content-Type: application/json",
                          "-d", json.dumps(payload), f"{API}/sessions"],
                         capture_output=True, text=True).stdout
    d = json.loads(out)
    return d.get("name") or d.get("error", {}).get("message", "error desconocido")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--estado", action="store_true")
    ap.add_argument("--despachar", action="store_true")
    args = ap.parse_args()
    key = llave()
    activas = sesiones_activas(key)
    ocupados = {s.get("sourceContext", {}).get("source", "").split("/")[-1] for s in activas}
    cupo = TECHO - len(activas)
    print(f"Activas: {len(activas)}/{TECHO} | cupo: {max(cupo, 0)}")
    for s in activas:
        print(f"  {s.get('state'):22} {s.get('title', '')[:52]}")
    pendientes = [t for t in COLA if t[0].split("/")[-1] not in ocupados]
    print(f"Pendientes sin colision de repo: {len(pendientes)}")
    if args.estado or not args.despachar:
        for repo, persona, _ in pendientes:
            print(f"  · {repo:46} {persona}")
        return
    for repo, persona, objetivo in pendientes:
        if cupo <= 0:
            print("Techo alcanzado; el resto espera a que se libere cupo.")
            break
        print(f"→ {repo:46} {persona:9} {despachar(key, repo, persona, objetivo)}")
        cupo -= 1
        ocupados.add(repo.split("/")[-1])


if __name__ == "__main__":
    main()
