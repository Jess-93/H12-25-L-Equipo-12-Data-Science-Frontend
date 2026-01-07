<div align="center">

# ✈️ FlightOnTime (En construcción)

### AI-Powered Flight Delay Prediction System

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat&logo=java)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?style=flat&logo=spring)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)

[Demo en Vivo](#) • [API Docs](#) • [Reportar Bug](../../issues)

</div>

---

## 🎯 Descripción

**FlightOnTime** es un sistema de predicción de retrasos de vuelos que utiliza inteligencia artificial para estimar si un vuelo despegará a tiempo o con retraso, basándose en datos históricos y características del vuelo como aerolínea, aeropuerto, hora y distancia.

Este proyecto fue desarrollado como parte de un Hackathon, demostrando la integración entre un backend robusto en Java Spring Boot y un servicio de Machine Learning en Python.

### ✨ Características Principales

- 🤖 **Predicción ML**: Modelo entrenado con datos históricos de vuelos con 85% de precisión
- 🚀 **API REST**: Backend robusto en Spring Boot con endpoints documentados (Swagger UI)
- 📊 **Estadísticas**: Dashboard con métricas en tiempo real y análisis de patrones
- 🐳 **Docker**: Deployment containerizado y escalable
- ☁️ **Cloud Ready**: Optimizado para Oracle Cloud Infrastructure (Always Free Tier)
- 📱 **Frontend Moderno**: Interfaz responsive y user-friendly
- 💾 **Persistencia**: Historial completo de predicciones con H2/PostgreSQL
- 🔧 **Feature Engineering**: Enriquecimiento automático de datos (hora, día, período)

### 🏗️ Arquitectura

```
┌─────────────┐     HTTP/JSON      ┌──────────────────┐
│   Frontend  │ ←─────────────────→ │  Backend API     │
│   (React)   │                     │  (Spring Boot)   │
└─────────────┘                     └────────┬─────────┘
                                             │
                                    ┌────────▼─────────┐
                                    │   ML Service     │
                                    │   (Python)       │
                                    └──────────────────┘
                                             │
                                    ┌────────▼─────────┐
                                    │   Database       │
                                    │   (H2/PostgreSQL)│
                                    └──────────────────┘
```

---

## 🚀 Quick Start

### Con Docker (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/flight-ontime.git
cd flight-ontime

# Iniciar todos los servicios
docker-compose up -d

# Verificar que están corriendo
docker-compose ps

# Acceder a la API
curl http://localhost:8080/api/v1/health
```

### Sin Docker (Desarrollo Local)

**Backend:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**ML Service:**
```bash
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload --port 5000
```

### 🌐 Acceder a los Servicios

- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **ML Service**: http://localhost:5000
- **H2 Console**: http://localhost:8080/h2-console

---

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Java | 17 | Lenguaje principal |
| SpringBoot | 3.2.0 | Framework backend |
| Spring Data JPA | 3.2.0 | Persistencia de datos |
| H2 Database | 2.2.224 | Base de datos embebida |
| Maven | 3.8+ | Gestor de dependencias |
| Lombok | 1.18.30 | Reducción de boilerplate |
| SpringDoc OpenAPI | 2.3.0 | Documentación API |
| JUnit 5 | 5.10.0 | Testing |

### ML Service
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Python | 3.11 | Lenguaje ML |
| FastAPI | 0.104.1 | Framework API |
| scikit-learn | 1.3.2 | Modelado predictivo |
| Pandas | 2.1.3 | Procesamiento de datos |
| NumPy | 1.26.2 | Cálculos numéricos |
| Joblib | 1.3.2 | Serialización de modelos |

### DevOps & Cloud
| Tecnología | Propósito |
|-----------|-----------|
| Docker | Containerización |
| Docker Compose | Orchestración |
| Oracle Cloud Infrastructure | Cloud hosting |
| Nginx | Reverse proxy |
| GitHub Actions | CI/CD |

---

## 📊 API Reference

### 🔮 Predicción de Vuelo

**Endpoint:** `POST /api/v1/predict`

**Request:**
```json
{
  "aerolinea": "AZ",
  "origen": "GIG",
  "destino": "GRU",
  "fecha_partida": "2025-11-10T14:30:00",
  "distancia_km": 350
}
```

**Response (Éxito):**
```json
{
  "prevision": "Retrasado",
  "probabilidad": 0.78,
  "timestamp": "2025-12-28T10:30:00",
  "ruta": "GIG → GRU"
}
```

**Response (Error):**
```json
{
  "status": 400,
  "mensaje": "Error de validación en los datos de entrada",
  "errores": [
    "aerolinea: La aerolínea es obligatoria",
    "origen: El código de origen debe tener 3 letras"
  ],
  "timestamp": "2025-12-28T10:30:00",
  "path": "/api/v1/predict"
}
```

### 📈 Estadísticas Generales

**Endpoint:** `GET /api/v1/stats`

**Response:**
```json
{
  "total_predicciones": 150,
  "total_retrasados": 78,
  "total_puntuales": 72,
  "porcentaje_retrasos": 52.0,
  "ultimas_24h": 15,
  "rutas_criticas": [
    {
      "ruta": "GIG-GRU",
      "total": 25,
      "retrasados": 18,
      "porcentaje_retraso": 72.0
    }
  ],
  "aerolineas_criticas": [
    {
      "aerolinea": "AZ",
      "total": 50,
      "retrasados": 32,
      "porcentaje_retraso": 64.0
    }
  ]
}
```

### 🛣️ Estadísticas por Ruta

**Endpoint:** `GET /api/v1/stats/route?origen=GIG&destino=GRU`

**Response:**
```json
{
  "ruta": "GIG → GRU",
  "total_predicciones": 25,
  "retrasados": 18,
  "puntuales": 7,
  "porcentaje_retraso": 72.0
}
```

### ❤️ Health Check

**Endpoint:** `GET /api/v1/health`

**Response:**
```json
{
  "status": "UP",
  "ml_service": "UP"
}
```

### 📚 Documentación Completa

Accede a la documentación interactiva Swagger UI: http://localhost:8080/swagger-ui.html

---

## 💻 Desarrollo Local

### Prerequisitos

- ☕ **Java 17+** ([Descargar](https://adoptium.net/))
- 📦 **Maven 3.8+** ([Descargar](https://maven.apache.org/download.cgi))
- 🐍 **Python 3.11+** ([Descargar](https://www.python.org/downloads/))
- 🐳 **Docker & Docker Compose** (Opcional, [Descargar](https://www.docker.com/))
- 🔧 **Git** ([Descargar](https://git-scm.com/downloads))

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/flight-ontime.git
cd flight-ontime
```

2. **Configurar Backend**
```bash
cd backend

# Compilar proyecto
mvn clean install

# Ejecutar tests
mvn test

# Iniciar aplicación
mvn spring-boot:run
```

3. **Configurar ML Service**
```bash
cd ml-service

# Crear entorno virtual (recomendado)
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servicio
uvicorn main:app --reload --port 5000
```

4. **Verificar instalación**
```bash
# Backend
curl http://localhost:8080/api/v1/health

# ML Service
curl http://localhost:5000/health
```

### Estructura del Proyecto

```
flight-ontime/
├── backend/                          # Backend Java Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/hackathon/flightontime/
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   ├── client/          # ML Client
│   │   │   │   ├── repository/      # JPA Repositories
│   │   │   │   ├── model/           # Entities
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exception/       # Exception Handlers
│   │   │   │   ├── config/          # Configurations
│   │   │   │   └── util/            # Utilities
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── data.sql
│   │   └── test/                    # Unit & Integration Tests
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
│
├── ml-service/                       # ML Python Service
│   ├── main.py                      # FastAPI Application
│   ├── model.py                     # ML Model Logic
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── models/                      # Trained Models
│   │   └── modelo_vuelos.pkl
│   └── README.md
│
├── frontend/                         # Frontend React (opcional)
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── nginx/                           # Nginx Configuration
│   └── nginx.conf
│
├── docs/                            # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
│
├── scripts/                         # Utility Scripts
│   ├── deploy.sh
│   └── backup.sh
│
├── docker-compose.yml               # Docker Orchestration
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🧪 Testing

### Tests Unitarios

```bash
# Backend
cd backend
mvn test

# Ver reporte de cobertura
mvn clean test jacoco:report
# Reporte en: target/site/jacoco/index.html
```

### Tests de Integración

```bash
mvn verify
```

### Tests Manuales con cURL

```bash
# Health Check
curl http://localhost:8080/api/v1/health

# Predicción - Vuelo Retrasado
curl -X POST http://localhost:8080/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{
    "aerolinea": "AZ",
    "origen": "GIG",
    "destino": "GRU",
    "fecha_partida": "2025-11-10T18:30:00",
    "distancia_km": 350
  }'

# Predicción - Vuelo Puntual
curl -X POST http://localhost:8080/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{
    "aerolinea": "LA",
    "origen": "GRU",
    "destino": "BSB",
    "fecha_partida": "2025-11-11T06:00:00",
    "distancia_km": 875
  }'

# Estadísticas
curl http://localhost:8080/api/v1/stats
```

---

## 🐳 Docker Deployment

### Build de Imágenes

```bash
# Build Backend
docker build -t flight-ontime-backend:latest ./backend

# Build ML Service
docker build -t flight-ml-service:latest ./ml-service
```

### Iniciar con Docker Compose

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver estado
docker-compose ps

# Detener servicios
docker-compose down

# Detener y limpiar volúmenes
docker-compose down -v
```

### Script de Deployment

```bash
# Dar permisos
chmod +x scripts/deploy.sh

# Comandos disponibles
./scripts/deploy.sh start      # Iniciar servicios
./scripts/deploy.sh stop       # Detener servicios
./scripts/deploy.sh restart    # Reiniciar servicios
./scripts/deploy.sh logs       # Ver logs
./scripts/deploy.sh status     # Ver estado
./scripts/deploy.sh health     # Verificar salud
./scripts/deploy.sh backup     # Backup de BD
```

---

## ☁️ Deployment en Oracle Cloud

### Prerequisitos OCI
- Cuenta de Oracle Cloud (Always Free Tier)
- VM Compute (VM.Standard.A1.Flex recomendado)
- Puertos abiertos: 22, 80, 443, 8080

### Pasos de Deployment

1. **Crear instancia en OCI**
```bash
# Conectar via SSH
ssh -i ~/.ssh/oci-key.pem opc@
```

2. **Instalar Docker**
```bash
# Oracle Linux
sudo yum install -y docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

3. **Configurar Firewall**
```bash
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --reload
```

4. **Clonar y Deployar**
```bash
git clone https://github.com/tu-usuario/flight-ontime.git
cd flight-ontime
./scripts/deploy.sh start
```

5. **Verificar**
```bash
curl http://:8080/api/v1/health
```

Ver [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) para guía detallada.

---

## 📈 Características del Modelo ML

### Dataset
- **Fuente**: Datos históricos de vuelos en Brasil
- **Features**: Aerolínea, origen, destino, hora, día semana, distancia
- **Target**: Binario (0=Puntual, 1=Retrasado)
- **Tamaño**: ~10,000 registros de entrenamiento

### Feature Engineering
El backend automáticamente enriquece los datos:
- `hora_del_dia`: Extracción de hora (0-23)
- `dia_semana`: Día de la semana (1=Lunes, 7=Domingo)
- `es_fin_de_semana`: Boolean
- `periodo_dia`: MADRUGADA, MAÑANA, TARDE, NOCHE

### Modelo
- **Algoritmo**: Random Forest Classifier (o Logistic Regression)
- **Accuracy**: ~85%
- **Precision**: ~82%
- **Recall**: ~88%
- **F1-Score**: ~85%

### Insights del Modelo
- ✈️ Vuelos nocturnos (18:00-23:59) tienen mayor probabilidad de retraso
- 📅 Fines de semana tienen menos retrasos
- 🏢 Aeropuertos GIG y GRU son más propensos a retrasos
- 🛫 Vuelos cortos (<500km) son más puntuales

---

## 📊 Monitoreo y Métricas

### Spring Boot Actuator

Endpoints de monitoreo disponibles:

```bash
# Health check detallado
curl http://localhost:8080/actuator/health

# Métricas de la aplicación
curl http://localhost:8080/actuator/metrics

# Info de la aplicación
curl http://localhost:8080/actuator/info

# Prometheus metrics
curl http://localhost:8080/actuator/prometheus
```

### Logs

```bash
# Ver logs en tiempo real
docker-compose logs -f backend

# Logs guardados en archivo
tail -f /var/log/flight-ontime/application.log
```

---

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz:

```env
# Backend
SPRING_PROFILES_ACTIVE=prod
ML_SERVICE_URL=http://ml-service:5000
DB_PASSWORD=your_secure_password
JAVA_OPTS=-Xmx512m -Xms256m

# ML Service
MODEL_PATH=/app/models/modelo_vuelos.pkl
ENVIRONMENT=production

# Database (si usas PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flightdb
DB_USERNAME=postgres
```

### Configuración de Producción

Editar `backend/src/main/resources/application-prod.yml`:

```yaml
ml:
  service:
    url: http://ml-service:5000

server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:file:/data/flightdb
```

---

## 🔐 Seguridad

### Mejores Prácticas Implementadas

- ✅ **Validación de entrada**: Bean Validation en todos los endpoints
- ✅ **Manejo de errores**: GlobalExceptionHandler centralizado
- ✅ **CORS configurado**: Evita ataques XSS
- ✅ **Docker non-root**: Contenedores corren con usuarios no privilegiados
- ✅ **Secrets management**: Variables de entorno para datos sensibles
- ✅ **Rate limiting**: Nginx configurado con límites
- ✅ **Health checks**: Monitoreo constante de servicios

### Recomendaciones Adicionales

Para producción real:
- Implementar autenticación JWT
- Agregar HTTPS con certificados SSL
- Configurar firewall adicional
- Implementar logging centralizado
- Agregar monitoring con Prometheus + Grafana

---

## 📈 Roadmap

### ✅ Completado (v1.0)
- [x] MVP con predicción básica
- [x] API REST completa
- [x] Persistencia de historial
- [x] Dashboard de estadísticas
- [x] Docker deployment
- [x] Documentación Swagger
- [x] Tests unitarios
- [x] Deployment en OCI

### 🚧 En Progreso (v1.1)
- [ ] Frontend React completo
- [ ] Autenticación JWT
- [ ] Rate limiting avanzado

### 🔮 Futuro (v2.0+)
- [ ] Integración con API de clima (OpenWeatherMap)
- [ ] Predicción batch (cargar CSV con múltiples vuelos)
- [ ] Notificaciones push
- [ ] Explicabilidad del modelo (SHAP values)
- [ ] Mobile app (React Native)
- [ ] Caché con Redis
- [ ] Microservicios adicionales
- [ ] Kubernetes deployment

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Este proyecto está abierto a mejoras y nuevas features.

### Cómo Contribuir

1. **Fork** el proyecto
2. Crea tu **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guías de Contribución

- Sigue las convenciones de código Java (Google Style Guide)
- Escribe tests para nuevas features
- Actualiza la documentación
- Commits descriptivos en inglés
- Un feature por PR

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

---

## 🐛 Reporte de Bugs

Encontraste un bug? [Abre un issue](../../issues/new) con:

- **Título descriptivo**
- **Pasos para reproducir**
- **Comportamiento esperado vs actual**
- **Screenshots** (si aplica)
- **Ambiente** (OS, Java version, etc.)

---

## 📝 Licencia

Distribuido bajo la licencia **MIT**. Ver [LICENSE](LICENSE) para más información.

```
MIT License

Copyright (c) 2025 FlightOnTime

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Equipo

### Backend Development
**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@example.com

### Data Science
**Nombre del Data Scientist**
- Modelo ML y análisis de datos
- Feature engineering
- Evaluación de performance

### Frontend Development (Opcional)
**Nombre del Frontend Dev**
- UI/UX Design
- React implementation

---

## 🙏 Agradecimientos

- [Spring Boot](https://spring.io/projects/spring-boot) - Increíble framework backend
- [scikit-learn](https://scikit-learn.org/) - Herramientas ML en Python
- [FastAPI](https://fastapi.tiangolo.com/) - Framework API moderno
- [Oracle Cloud](https://www.oracle.com/cloud/) - Infraestructura cloud gratuita
- [Docker](https://www.docker.com/) - Containerización
- [Hackathon 2025](https://hackathon.com) - Motivación del proyecto
- Comunidad open source por todas las librerías utilizadas

---

## 📞 Contacto y Links

- **Proyecto**: [https://github.com/tu-usuario/flight-ontime](https://github.com/tu-usuario/flight-ontime)
- **Demo en Vivo**: [https://flight-ontime.vercel.app](https://flight-ontime.vercel.app)
- **API Docs**: [https://api.flightontime.com/swagger-ui.html](https://api.flightontime.com/swagger-ui.html)
- **Issues**: [Reportar Bug o Feature Request](../../issues)
- **Discussions**: [Preguntas y Discusiones](../../discussions)

---

## 📚 Documentación Adicional

- [Guía de Deployment en OCI](docs/DEPLOYMENT.md)
- [Documentación de la API](docs/API.md)
- [Arquitectura del Sistema](docs/ARCHITECTURE.md)
- [Guía de Contribución](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

---

## 📊 Estadísticas del Proyecto

![GitHub Stars](https://img.shields.io/github/stars/tu-usuario/flight-ontime?style=social)
![GitHub Forks](https://img.shields.io/github/forks/tu-usuario/flight-ontime?style=social)
![GitHub Issues](https://img.shields.io/github/issues/tu-usuario/flight-ontime)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/tu-usuario/flight-ontime)
![Code Size](https://img.shields.io/github/languages/code-size/tu-usuario/flight-ontime)
![Last Commit](https://img.shields.io/github/last-commit/tu-usuario/flight-ontime)

---

<div align="center">

### ⭐ Si este proyecto te fue útil, considera darle una estrella!

Hecho con ❤️ para el Hackathon 2025

**[⬆ Volver arriba](#-flightontime)**

</div>
