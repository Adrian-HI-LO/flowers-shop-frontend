# Flowers Shop - Admin Panel

Panel de administración.

## Características

- **Dashboard** - Estadísticas de ventas, gráficos y métricas
- **Gestión de Productos** - CRUD completo de productos con filtros y búsqueda
- **Gestión de Paquetes** - Crear y administrar paquetes predefinidos
- **Gestión de Categorías** - Organizar productos por categorías
- **Gestión de Pedidos** - Ver y actualizar estados de pedidos
- **Gestión de Clientes** NUEVO - Monitorear y suspender/activar cuentas de clientes
- **Configuración** - Ajustes generales de la tienda



### Configuración de Imágenes (Local Storage)

Para desarrollo local, las imágenes se almacenan en:

```
server/
└── uploads/
    └── images/
        ├── products/       # Imágenes de productos
        ├── packages/       # Imágenes de paquetes  
        ├── categories/     # Iconos de categorías
        └── general/        # Otros archivos
```

## Tecnologías

- **React 18.3** - Biblioteca de UI
- **Vite 6** - Build tool y dev server
- **React Router 6** - Enrutamiento
- **Tailwind CSS v4** - Estilos
- **Lucide React** - Iconos
- **Recharts** - Gráficos y visualizaciones


## Estructura del Proyecto

```
admin/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── AdminLayout.jsx
│   │       ├── Sidebar.jsx
│   │       └── Header.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Packages.jsx
│   │   ├── Categories.jsx
│   │   ├── Orders.jsx
│   │   ├── Customers.jsx       
│   │   ├── Settings.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json

```

## Autenticación en modO pRueba

Por ahora la autenticación está deshabilitada para desarrollo. 
Para habilitarla, hay qu cambiar `isAuthenticated` a `false` en `App.jsx`.

## APIs disponibles para producción

Esta sección documenta las APIs que consume (o contempla consumir) el panel de administración.

### Base URL

- Producción: `https://api.tudominio.com`
- Prefijo de API: `/api`

Ejemplo completo: `https://api.tudominio.com/api/products`

### Autenticación y headers

Para endpoints protegidos:

- Header requerido: `Authorization: Bearer <JWT>`
- Header recomendado: `Content-Type: application/json`

Para upload de imágenes:

- `Content-Type: multipart/form-data`

### Formato de respuesta recomendado

```json
{
    "success": true,
    "data": {},
    "message": "Operación exitosa"
}
```

Errores:

```json
{
    "success": false,
    "error": "Descripción del error",
    "code": "ERROR_CODE"
}
```

---

### 1) Autenticación Admin

#### `POST /api/admin/login`

Inicia sesión del administrador.

Body:

```json
{
    "email": "admin@flowers.com",
    "password": "******"
}
```

Respuesta esperada:

```json
{
    "success": true,
    "data": {
        "token": "jwt_token",
        "admin": {
            "id": "adm_123",
            "name": "Admin",
            "email": "admin@flowers.com"
        }
    }
}
```

#### `POST /api/admin/forgot-password`

Solicita recuperación de contraseña.

Body:

```json
{
    "email": "admin@flowers.com"
}
```

---

### 2) Dashboard

#### `GET /api/dashboard/stats`

Devuelve métricas principales, información para gráficas y pedidos recientes.

Respuesta esperada:

```json
{
    "success": true,
    "data": {
        "stats": {
            "totalSales": 45231,
            "orders": 234,
            "products": 89,
            "customers": 1234
        },
        "salesChart": [
            { "name": "Ene", "ventas": 4200 }
        ],
        "productDistribution": [
            { "name": "Rosas", "value": 400 }
        ],
        "recentOrders": [
            {
                "id": "#001",
                "customer": "María García",
                "product": "Paquete Romántico",
                "amount": 950,
                "status": "Completado"
            }
        ]
    }
}
```

---

### 3) Productos

#### `GET /api/products`

Obtiene listado de productos con filtros y paginación.

Query params sugeridos:

- `page`, `limit`
- `search`
- `category`
- `status` (`Activo`, `Agotado`)
- `sortBy`, `sortOrder`

#### `GET /api/products/:id`

Obtiene detalle de un producto.

#### `POST /api/products`

Crea producto.

Body sugerido:

```json
{
    "name": "Rosas Rojas Premium",
    "description": "Ramo de 24 rosas",
    "categoryId": "cat_flowers",
    "price": 450,
    "stock": 25,
    "images": [
        "https://cdn.tudominio.com/uploads/images/products/a.jpg"
    ],
    "status": "Activo"
}
```

#### `PUT /api/products/:id`

Actualiza producto.

#### `DELETE /api/products/:id`

Elimina producto.

---

### 4) Paquetes

#### `GET /api/packages`

Lista paquetes.

#### `GET /api/packages/:id`

Detalle de paquete.

#### `POST /api/packages`

Crea paquete.

Body sugerido:

```json
{
    "name": "Paquete Romántico",
    "description": "Flores + chocolates + globo",
    "itemIds": ["prod_1", "prod_2"],
    "price": 950,
    "status": "Activo"
}
```

#### `PUT /api/packages/:id`

Actualiza paquete.

#### `DELETE /api/packages/:id`

Elimina paquete.

---

### 5) Categorías

#### `GET /api/categories`

Lista categorías.

#### `POST /api/categories`

Crea categoría.

#### `PUT /api/categories/:id`

Actualiza categoría.

#### `DELETE /api/categories/:id`

Elimina categoría.

---

### 6) Pedidos

#### `GET /api/orders`

Lista pedidos con filtros.

Query params sugeridos:

- `page`, `limit`
- `search`
- `status` (`Pendiente`, `En proceso`, `Enviado`, `Completado`, `Cancelado`)
- `dateFrom`, `dateTo`

#### `GET /api/orders/:id`

Detalle de pedido.

#### `PATCH /api/orders/:id/status`

Actualiza estado de pedido.

Body sugerido:

```json
{
    "status": "Enviado"
}
```

#### `GET /api/orders/export`

Exporta pedidos.

Query params sugeridos:

- `format=csv|xlsx`
- `status`
- `dateFrom`, `dateTo`

---

### 7) Clientes

#### `GET /api/customers`

Lista clientes con búsqueda y filtros.

Query params sugeridos:

- `page`, `limit`
- `search`
- `status=active|suspended`

#### `GET /api/customers/:id`

Detalle de cliente.

#### `POST /api/customers/:id/suspend`

Suspende cuenta de cliente.

#### `POST /api/customers/:id/activate`

Reactiva cuenta de cliente.

#### `GET /api/customers/:id/orders`

Obtiene historial de pedidos del cliente.

---

### 8) Configuración

#### `GET /api/settings`

Obtiene configuración general de la tienda.

#### `PUT /api/settings`

Actualiza configuración.

Body sugerido:

```json
{
    "storeName": "Flowers Shop",
    "contactEmail": "contact@flowers.com",
    "phone": "+52 55 1234 5678",
    "address": "CDMX",
    "businessHours": {
        "mondayToFriday": "9:00 AM - 7:00 PM",
        "saturday": "10:00 AM - 6:00 PM",
        "sunday": "10:00 AM - 2:00 PM"
    },
    "shipping": {
        "standardCost": 150,
        "freeFrom": 1000,
        "sameDayEnabled": true
    }
}
```

---

### 9) Uploads de imágenes

#### `POST /api/uploads/images`

Sube una o múltiples imágenes.

Body (`multipart/form-data`):

- `images[]`: archivos
- `folder`: `products | packages | categories | general`

Respuesta esperada:

```json
{
    "success": true,
    "images": [
        {
            "id": "img_1234567890",
            "filename": "1234567890_uuid.jpg",
            "originalName": "rosa-roja.jpg",
            "url": "https://api.tudominio.com/uploads/images/products/1234567890_uuid.jpg",
            "path": "/uploads/images/products/1234567890_uuid.jpg",
            "size": 234567,
            "mimeType": "image/jpeg",
            "uploadedAt": "2026-03-29T10:30:00Z"
        }
    ]
}
```

#### `DELETE /api/uploads/images/:id`

Elimina una imagen previamente subida.

---

### Códigos HTTP sugeridos

- `200` OK
- `201` Created
- `204` No Content
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `409` Conflict
- `422` Unprocessable Entity
- `500` Internal Server Error

### Checklist de salida a producción

- Definir `API_BASE_URL` por ambiente (`dev`, `staging`, `prod`).
- Habilitar CORS para dominio del panel admin.
- Implementar rate limit para login y uploads.
- Forzar HTTPS.
- Versionar API (`/api/v1`) cuando se estabilice contrato.

