# Amigulove – E-commerce (React + Firebase)

Proyecto final de un **curso de React**.  
SPA con catálogo de productos, detalle, carrito con Context y **checkout** que crea órdenes en **Firestore**.

## Tech
- React (Create React App) · React Router  
- Context API (carrito)  
- Firebase **Firestore**

## Correr el proyecto
    # instalar
    npm install
    # variables de entorno (crear este archivo)
    cp .env.example .env.local
    # iniciar
    npm start
    # build prod
    npm run build

## Variables de entorno (`.env.local`)
> CRA requiere el prefijo `REACT_APP_`.

    REACT_APP_FIREBASE_API_KEY=...
    REACT_APP_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID=tu-proyecto
    REACT_APP_FIREBASE_APP_ID=1:xxxx:web:yyyy

## Rutas
- `/` catálogo  
- `/categoria/:slug`  
- `/item/:id`  
- `/cart`  
- `/checkout`

## Firestore
**Colecciones**
- `Items`  
  Campos: `nombre`, `descripcion`, `precio`, `slugCategoria`, `stock`, `imagenUrl`
- `orders`  
  Campos: `buyer{nombre,email,telefono}`, `items[{productId,nombre,precio,cantidad}]`, `total`, `createdAt`

**Reglas (demo/entrega)**

    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {

        // Productos públicos (permitir solo actualizar stock)
        match /Items/{id} {
          allow read: if true;
          allow update: if request.resource.data.diff(resource.data).changedKeys().hasOnly(['stock']);
          allow create, delete: if false;
        }

        // Crear órdenes
        match /orders/{id} {
          allow create: if true;
          allow read, update, delete: if false;
        }
      }
    }

## Flujo
1. Catálogo y detalle desde Firestore.  
2. `ItemCount` controla cantidad y stock; al agregar se oculta.  
3. Carrito con Context (`CartProvider`), totales y acciones.  
4. Checkout crea la orden en `orders` y muestra **ID**.

## Notas
- Imágenes servidas desde `/public/Img` usando `imagenUrl` (o URLs públicas).  
- Enviar los **valores** de `.env.local` al docente para correr el proyecto.
