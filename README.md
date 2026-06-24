# Vendo - E-commerce Web Application

Vendo este o aplicație web de tip e-commerce dezvoltată pentru proiect universitar. Aplicația permite vizualizarea produselor, autentificarea utilizatorilor, administrarea produselor, adăugarea produselor în coș, plasarea comenzilor și adăugarea de review-uri pentru produse.

## Tehnologii folosite

### Backend

* Java
* Spring Boot 3
* Spring Security
* Spring Data JPA
* PostgreSQL
* Maven

### Frontend

* React
* Vite
* Bootstrap
* Axios

### Bază de date

* PostgreSQL local

## Funcționalități implementate

* Register
* Login cu Basic Authentication
* Roluri: `ROLE_USER`, `ROLE_ADMIN`
* Rutare protejată în frontend
* Navbar dinamic în funcție de autentificare
* CRUD produse
* CRUD categorii
* Administrare produse pentru admin
* Coș de cumpărături
* Checkout
* Comenzi
* Review-uri pentru produse
* Rating 1-5
* Comentarii pentru produse
* Pagination pentru produse
* Sorting după id, nume, preț și stoc
* Search produse după nume

## Structura proiectului

```text
AWBD-project/
│
├── backend/
│   ├── src/main/java/com/vendo/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   └── service/impl/
│   │
│   └── src/main/resources/
│       ├── application-dev.yml
│       └── data.sql
│
└── frontend/
    └── vendo/
        └── src/
            ├── components/
            ├── context/
            ├── pages/
            ├── api/
            └── utils/
```

## Configurare bază de date

Aplicația folosește PostgreSQL local.

Trebuie să existe o bază de date cu numele:

```sql
vendo_db
```

Configurarea pentru profilul `dev` se află în:

```text
backend/src/main/resources/application-dev.yml
```

Configurația folosită:

```yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/vendo_db}
    username: ${SPRING_DATASOURCE_USERNAME:postgres}
    password: ${SPRING_DATASOURCE_PASSWORD:postgres}

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    defer-datasource-initialization: true
    properties:
      hibernate:
        format_sql: true

  sql:
    init:
      mode: always

server:
  port: 8080
```

Aplicația folosește profilul activ:

```text
dev
```

## Date inițiale

Fișierul:

```text
backend/src/main/resources/data.sql
```

conține inserarea rolurilor de bază:

```sql
INSERT INTO roles (name)
SELECT 'ROLE_USER'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = 'ROLE_USER'
);

INSERT INTO roles (name)
SELECT 'ROLE_ADMIN'
WHERE NOT EXISTS (
    SELECT 1 FROM roles WHERE name = 'ROLE_ADMIN'
);
```

Acest script poate rula la fiecare pornire a aplicației fără să dubleze rolurile.

## Rulare backend

Din folderul proiectului:

```bash
cd backend
mvn spring-boot:run
```

Backend-ul va porni pe:

```text
http://localhost:8080
```

Exemplu endpoint produse:

```text
http://localhost:8080/api/products
```

## Rulare frontend

Din folderul frontend:

```bash
cd frontend/vendo
npm install
npm run dev
```

Frontend-ul va porni pe:

```text
http://localhost:5173
```

## Endpoint-uri principale

### Auth

```http
POST /api/auth/register
GET /api/auth/me
```

### Products

```http
GET /api/products
GET /api/products/{id}
POST /api/products
PUT /api/products/{id}
DELETE /api/products/{id}
```

Endpoint-ul de produse suportă pagination, sorting și search:

```http
GET /api/products?page=0&size=6&sortBy=price&direction=asc&search=laptop
```

### Categories

```http
GET /api/categories
POST /api/categories
PUT /api/categories/{id}
DELETE /api/categories/{id}
```

### Orders

```http
POST /api/orders
GET /api/orders
```

### Reviews

```http
GET /api/products/{productId}/reviews
POST /api/products/{productId}/reviews
```

Pentru adăugarea unui review, utilizatorul trebuie să fie autentificat.

Exemplu request:

```json
{
  "rating": 5,
  "comment": "Foarte bun produsul"
}
```

## Observații

Aplicația este rulată local, fără Docker, deoarece mediul de lucru nu permite utilizarea Docker Desktop. PostgreSQL rulează local, iar backend-ul și frontend-ul sunt pornite separat din terminal.

Pentru dezvoltare locală, această variantă este suficientă și stabilă.
