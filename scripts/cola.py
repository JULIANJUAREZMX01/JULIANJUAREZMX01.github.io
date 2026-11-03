#!/usr/bin/env python3
"""Cola multi-repositorio DACC: inventaria, prioriza y limita el trabajo por dia."""
import json, os, subprocess, urllib.request, datetime

TOKEN = os.environ.get("GITHUB_MUEVECANCUN_TOKEN", "")
CUENTAS = ["JULIANJUAREZMX01", "sistemascancunjefe-ai"]
TOPE_DIARIO = 3          # ritmo calmado: maximo 3 unidades de trabajo al dia
API = "https://api.github.com"

def gh(path):
    r = urllib.request.Request(API + path, headers={
        "Authorization": "Bearer " + TOKEN, "Accept": "application/vnd.github+json",
        "User-Agent": "kynicos-cola"})
    try:
        with urllib.request.urlopen(r, timeout=25) as f:
            return json.load(f)
    except Exception as e:
        return {"_error": str(e)}

repos = []
for c in CUENTAS:
    for r in gh(f"/users/{c}/repos?per_page=100&sort=pushed") or []:
        if isinstance(r, dict) and r.get("name"):
            repos.append(r)
vistos, uniq = set(), []
for r in repos:
    if r["full_name"] not in vistos:
        vistos.add(r["full_name"]); uniq.append(r)

trabajo = []
for r in uniq:
    fn = r["full_name"]
    if r.get("archived"): continue
    prs = gh(f"/repos/{fn}/pulls?state=open&per_page=20")
    if isinstance(prs, list):
        for p in prs:
            edad = (datetime.date.today() - datetime.date.fromisoformat(p["created_at"][:10])).days
            trabajo.append({"repo": fn, "tipo": "PR", "num": p["number"], "titulo": p["title"][:70],
                            "edad": edad, "draft": p.get("draft", False), "url": p["html_url"],
                            "riesgo": "bajo" if not p.get("draft") else "espera"})
    iss = gh(f"/repos/{fn}/issues?state=open&per_page=20")
    if isinstance(iss, list):
        for i in iss:
            if "pull_request" in i: continue
            edad = (datetime.date.today() - datetime.date.fromisoformat(i["created_at"][:10])).days
            trabajo.append({"repo": fn, "tipo": "ISSUE", "num": i["number"], "titulo": i["title"][:70],
                            "edad": edad, "draft": False, "url": i["html_url"], "riesgo": "medio"})

def peso(t):
    p = t["edad"] * 2
    if t["tipo"] == "PR": p += 25
    if "fix" in t["titulo"].lower() or "security" in t["titulo"].lower(): p += 40
    if t["riesgo"] == "bajo": p += 10
    return -p
trabajo.sort(key=peso)

hoy = datetime.date.today().isoformat()
lineas = [f"# Cola multi-repositorio · {hoy}", "",
          f"Repos activos inventariados: **{len(uniq)}** · unidades en cola: **{len(trabajo)}** · tope diario: **{TOPE_DIARIO}**", ""]
lineas.append("## Turno de hoy (maximo %d, ritmo calmado)" % TOPE_DIARIO)
for t in trabajo[:TOPE_DIARIO]:
    lineas.append(f"- [{t['tipo']} #{t['num']}] {t['repo']} — {t['titulo']} ({t['edad']} d) · {t['url']}")
if len(trabajo) > TOPE_DIARIO:
    lineas += ["", f"## Esperando turno ({len(trabajo)-TOPE_DIARIO})"]
    for t in trabajo[TOPE_DIARIO:TOPE_DIARIO+15]:
        lineas.append(f"- {t['repo']} #{t['num']} · {t['titulo']} ({t['edad']} d)")
open("COLA.md", "w").write("\n".join(lineas) + "\n")
json.dump({"fecha": hoy, "repos": len(uniq), "cola": trabajo}, open("cola.json", "w"), ensure_ascii=False, indent=1)
print("\n".join(lineas[:14]))
