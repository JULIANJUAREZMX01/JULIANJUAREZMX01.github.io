# Bóveda ja-vault — reglamento sagrado de credenciales

- **Estado:** vigente · **Repositorio:** `JULIANJUAREZMX01/ja-vault` (privado)
- **Cifrado:** GPG simétrico AES-256-CFB con frase de paso (verificado con `gpg --list-packets`)
- **Fecha:** 2026-11-03

## Regla

La bóveda es el **único** registro de claves, hosts y contactos. Ninguna credencial vive en un repositorio de proyecto, en `.env.example`, en Notes, ni en este sitio. Los repositorios solo declaran el **nombre** de la variable.

## Contenido

| Archivo | Qué guarda |
|---|---|
| `credenciales.md.gpg` | token de escritura, PINs, frase de la bóveda |
| `infraestructura.md.gpg` | hosts, proveedores y estado de cada servicio |
| `proyectos.md.gpg` | inventario de repositorios y su rol |
| `contactos.md.gpg` | directorio operativo |

## Cómo la usa el agente

El skill `vault` clona la bóveda, descifra en memoria y **nunca** escribe texto plano. Cuatro comandos:

    bash run.sh list                     # archivos y tamaño, sin descifrar
    bash run.sh check                    # comprueba que la frase abre los cuatro archivos
    bash run.sh keys credenciales        # nombres de claves, sin valores
    bash run.sh get credenciales <clave> # valor puntual, para usar dentro de un script

Requiere dos secretos del agente: el token de GitHub y la frase de la bóveda. Si falta la frase, el skill falla cerrado y no adivina nada.

## Prohibiciones

1. Nunca pegar el valor de una clave en el chat ni en un archivo del repositorio.
2. Nunca escribir texto plano en el sandbox; se descifra al momento de usarlo y se descarta.
3. Nunca commitear un `.md` sin cifrar. Si aparece uno, es incidente y se rota la clave afectada.
4. La frase no se guarda en git, ni en notas, ni en capturas.

## Rotación

Cambiar la frase de la bóveda obliga a re-cifrar los cuatro archivos:

    gpg --symmetric --cipher-algo AES256 credenciales.md && rm credenciales.md

Después se reemplaza el secreto de la frase en el gestor y se corre `check`. Si la frase se filtra, se rotan también las claves que contiene, en este orden: token de escritura, llaves de agente, tokens de proveedor.

## Automatización

El estado de la bóveda se verifica con `check` antes de cualquier tarea que necesite una credencial. Un fallo de descifrado se reporta como incidente, nunca se rodea buscando la clave en otro lado.
