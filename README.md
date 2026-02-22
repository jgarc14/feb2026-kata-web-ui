# Feb2026KataWebUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# 📦 Code Migration Engine

Backend desarrollado en **Node.js 20** que permite convertir código legacy (Delphi / COBOL) a un lenguaje moderno (Java + Spring Boot, Node.js, Python o Go).

El sistema aplica reglas de migración y genera un reporte con:
- Reglas aplicadas
- Warnings detectados

---

# 🏗 Arquitectura

La solución está diseñada siguiendo principios de **Clean Architecture** y el patrón **Strategy**.

## 📐 Estructura del Proyecto
src/
├── domain/
│ ├── services/
│ ├── strategies/
│ └── models/
│
├── application/
│ └── use-cases/
│
├── infrastructure/
│ ├── controllers/
│ ├── routes/
│ └── config/
│
└── main/
└── server.ts

---

## 🔹 Capas

### 1️⃣ Frontend
Cliente (Postman o aplicación web) que envía:
- Código legacy
- Lenguaje destino

Recibe:
- Código convertido
- Reporte de migración

---

### 2️⃣ API (Infrastructure Layer)

Responsable de:
- Validar entrada
- Controlar acceso
- Invocar el caso de uso
- Retornar respuesta estructurada

Endpoint principal:
POST /api/migrate

---

### 3️⃣ Application Layer

**MigrateCodeUseCase**

Orquesta:
- Selección de estrategia según lenguaje destino
- Ejecución del motor de migración
- Construcción del reporte

---

### 4️⃣ Domain Layer

Contiene la lógica central:

- `MigrationEngine`
- `MigrationStrategy` (interface)
- Implementaciones concretas:
  - JavaStrategy
  - NodeStrategy
  - PythonStrategy
  - GoStrategy

Se utiliza el patrón **Strategy** para permitir agregar nuevos lenguajes sin modificar el motor principal.

---

## 🔄 Flujo de Interacción
Frontend
↓
API Controller
↓
MigrateCodeUseCase
↓
MigrationEngine
↓
TargetLanguageStrategy
↓
Output + Report


---

# 🚀 Despliegue

---

# 🖥 Opción A – On-Premise

## Arquitectura
Usuario
↓
Load Balancer (NGINX)
↓
Servidor Node.js (PM2)
↓
Logs / Storage

## Componentes

- Servidor Linux
- Node.js 20
- PM2
- NGINX como reverse proxy
- Firewall configurado
- Logs centralizados

## Ventajas

- Control total
- Costos fijos

## Desventajas

- Escalabilidad manual
- Mantenimiento propio

---

# ☁ Opción B – Cloud (Recomendado)

## Arquitectura en AWS (ejemplo)
Cliente
↓
API Gateway / Load Balancer
↓
Container (ECS / EKS / EC2)
↓
CloudWatch Logs
↓
S3 (opcional)

## Componentes

- API Gateway o Application Load Balancer
- Docker container
- ECS / EKS / EC2
- CloudWatch (logs y métricas)
- WAF
- IAM Roles

## Alternativas

- Azure App Service
- Azure Container Apps
- GCP Cloud Run
- GKE

## Ventajas

- Escalabilidad automática
- Alta disponibilidad
- Monitoreo integrado
- Seguridad administrada

---

# 🔐 Seguridad

Este sistema procesa código como texto, lo que implica riesgos importantes.

---

## 1️⃣ Ejecución de Código Malicioso

**Riesgo:** Intento de inyección o ejecución remota.

**Mitigación:**
- No usar `eval`
- No ejecutar código recibido
- Parser controlado
- Sandbox si en el futuro se requiere ejecución

---

## 2️⃣ Denegación de Servicio (DoS)

**Riesgo:** Payloads grandes o procesamiento excesivo.

**Mitigación:**
- Límite de tamaño en requests
- Timeout en procesamiento
- Rate limiting

---

## 3️⃣ Falta de Control de Acceso

**Riesgo:** Uso no autorizado.

**Mitigación:**
- JWT o API Key
- Middleware de autenticación
- Rate limiting
- Registro de IP

---

## 4️⃣ Exposición de Información Interna

**Riesgo:** Mostrar stack traces o rutas internas.

**Mitigación:**
- Global error handler
- No exponer errores internos en producción
- Logs solo en servidor

---

## 5️⃣ Inyección en Logs

**Riesgo:** Manipulación de registros.

**Mitigación:**
- No loggear código completo
- Sanitizar entradas
- Loggear solo metadata

---

# 📊 Ejemplo de Respuesta

```json
{
  "convertedCode": "if (amount > 0) { logger.info(\"VALID\"); } else { logger.info(\"INVALID\"); }",
  "report": {
    "rulesApplied": [
      "IF → if",
      "DISPLAY → logger",
      "END-IF → block closing"
    ],
    "warnings": [
      "Variable AMOUNT converted to camelCase"
    ]
  }
}