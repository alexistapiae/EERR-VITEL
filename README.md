# Calculadora de Estructuras FV para Fuerza de Ventas

Aplicación web estática para calcular materiales de montaje fotovoltaico coplanar y con ángulo, basada en los Excel originales.

## Uso

Abrir `index.html` en el navegador o publicar el repositorio en GitHub Pages, Netlify o Vercel.

## Lógica de cálculo

- 1 kit cada 4 paneles.
- Kits requeridos = redondeo hacia arriba de `paneles / 4`.
- Los accesorios se multiplican por la cantidad de kits requeridos.

## Publicación rápida en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir estos archivos: `index.html`, `styles.css`, `app.js` y `README.md`.
3. Ir a **Settings > Pages**.
4. En **Build and deployment**, elegir **Deploy from a branch**.
5. Seleccionar branch `main` y carpeta `/root`.
6. Guardar.

GitHub entregará una URL pública para compartir con la fuerza de ventas.

## Personalización

La lógica está en `app.js`, dentro del objeto `DATA`. Ahí se pueden agregar nuevos SKU, accesorios, valores por kit o nuevas configuraciones comerciales.
