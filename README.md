# Vendo - E-commerce Web Application

Vendo este o aplicație web de tip e-commerce dezvoltată pentru proiect universitar. Aplicația permite utilizatorilor să vizualizeze produse, să se autentifice, să adauge produse în coș, să plaseze comenzi și să adauge review-uri. Administratorii pot gestiona produsele și categoriile.

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

* Înregistrare utilizator
* Autentificare cu Basic Authentication
* Roluri: `ROLE_USER`, `ROLE_ADMIN`
* Rutare protejată în frontend
* Navbar dinamic în funcție de autentificare
* CRUD produse
* CRUD categorii
* Administrare produse pentru utilizatorii admin
* Coș de cumpărături
* Checkout
* Comenzi
* Review-uri pentru produse
* Rating 1-5 pentru produse
* Comentarii pentru produse
* Pagination pentru lista de produse
* Sorting după id, nume, preț și stoc
* Search produse după nume
* Protejarea endpoint-urilor de admin în backend

## Structura proiectului

```text
AWBD-project/
│
├── backend/
│   ├── src/main/java/com/vendo/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
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
            ├── api/
            ├── components/
            ├── context/
            ├── pages/
            └── utils/
```

## Entități principale

Aplicația folosește următoarele entități:

* `User`
* `Role`
* `UserProfile`
* `Product`
* `Category`
* `Order`
* `OrderItem`
* `Review`

## Relații între entități

* `Product` ↔ `Category`: Many-to-Many
* `User` ↔ `Role`: Many-to-Many
* `User` ↔ `UserProfile`: One-to-One
* `User` ↔ `Order`: One-to-Many
* `Order` ↔ `OrderItem`: One-to-Many
* `Product` ↔ `OrderItem`: Many-to-One
* `Product` ↔ `Review`: One-to-Many
* `User` ↔ `Review`: One-to-Many

## Configurare bază de date

Aplicația folosește PostgreSQL local.

Trebuie să existe o bază de date cu numele:

```sql
vendo_db
```

Configurația pentru profilul `dev` se află în:

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

Profilul activ folosit pentru dezvoltare este:

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

Scriptul poate rula la fiecare pornire fără să dubleze rolurile existente.

## Rulare backend

Din folderul proiectului:

```bash
cd backend
mvn spring-boot:run
```

Backend-ul pornește pe:

```text
http://localhost:8080
```

Exemplu endpoint:

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

Frontend-ul pornește pe:

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

Exemplu body pentru adăugarea unui review:

```json
{
  "rating": 5,
  "comment": "Foarte bun produsul"
}
```

## Securitate

Aplicația folosește Spring Security și Basic Authentication.

Reguli principale:

* `GET /api/products/**` este public
* `GET /api/categories/**` este public
* `POST /api/products/**` este permis doar pentru `ROLE_ADMIN`
* `PUT /api/products/**` este permis doar pentru `ROLE_ADMIN`
* `DELETE /api/products/**` este permis doar pentru `ROLE_ADMIN`
* `POST /api/categories/**` este permis doar pentru `ROLE_ADMIN`
* `PUT /api/categories/**` este permis doar pentru `ROLE_ADMIN`
* `DELETE /api/categories/**` este permis doar pentru `ROLE_ADMIN`
* `POST /api/products/{id}/reviews` este permis pentru utilizatori autentificați
* `GET /api/products/{id}/reviews` este public
* `GET /api/orders/**` și `POST /api/orders/**` necesită autentificare

Frontend-ul folosește rute protejate pentru paginile care necesită autentificare și rute separate pentru zona de administrare.

## Pagini frontend

Aplicația conține următoarele pagini principale:

* `LoginPage`
* `RegisterPage`
* `ProductsPage`
* `CartPage`
* `OrdersPage`
* `AdminProductsPage`
* `AddProductPage`
* `EditProductPage`

Componente importante:

* `Navbar`
* `ProtectedRoute`
* `AdminRoute`
* `ProductReviews`

Context API:

* `AuthContext`
* `CartContext`

## Flux utilizator

Un utilizator normal poate:

1. să se înregistreze;
2. să se autentifice;
3. să vadă lista de produse;
4. să caute și să sorteze produse;
5. să adauge produse în coș;
6. să finalizeze checkout-ul;
7. să vadă comenzile;
8. să adauge review-uri la produse.

## Flux administrator

Un administrator poate:

1. să se autentifice;
2. să acceseze pagina de administrare produse;
3. să adauge produse;
4. să editeze produse;
5. să șteargă produse;
6. să gestioneze categoriile, dacă endpoint-urile sunt folosite din interfață sau din API.

## Observații despre Docker

Aplicația este rulată local fără Docker, deoarece mediul de lucru nu permite utilizarea Docker Desktop. PostgreSQL rulează local, iar backend-ul și frontend-ul sunt pornite separat din terminal.

Pentru dezvoltare și prezentare locală, această variantă este suficientă și stabilă.

## Dezvoltări viitoare

Funcționalități care pot fi adăugate ulterior:

* integrare plată online;
* wishlist;
* filtre avansate pe categorii și preț;
* upload imagini pentru produse;
* dashboard admin cu statistici;
* deployment folosind Docker/Kubernetes într-un mediu unde acestea sunt permise;
* testare automată backend și frontend.
