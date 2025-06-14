# NOC Tools Dashboard

Una aplicación web moderna para centralizar herramientas NOC (Network Operations Center) con una interfaz intuitiva de botones accionables con iconos representativos.

## Características

- 🎯 **Interfaz intuitiva**: Diseño de cuadrícula 4x4 con botones claramente identificados
- 🎨 **Iconos representativos**: Cada herramienta tiene su icono específico para fácil identificación
- 🚀 **Navegación rápida**: Cada botón abre su herramienta correspondiente en una nueva pestaña
- 📱 **Diseño responsivo**: Optimizado para desktop, tablet y móvil
- ✨ **Animaciones fluidas**: Efectos visuales modernos para mejor experiencia de usuario
- 🔗 **Enlaces directos**: Acceso inmediato a todas las herramientas NOC
- 🚨 **Indicadores visuales**: Colores específicos y animaciones especiales (como el pulso del botón de pánico)

## Herramientas Incluidas

### Fila 1
- **☁️ FURY** - Plataforma de aplicaciones cloud
- **📊 GRAFANA** - Monitoreo y visualización de métricas
- **🛡️ COSUBI** - Sistema de administración
- **👥 GATHER** - Plataforma de colaboración virtual

### Fila 2
- **⚠️ IM INCIDENT** - Gestión de incidentes
- **📖 GUIA DE OPERADORES NOC** - Documentación operativa
- **🐛 MOODY** - Sistema de incidentes
- **📡 ICC** - Centro de comandos de incidentes

### Fila 3
- **✋ PANIC BUTON** - Botón de emergencia SME (con animación de pulso)
- **📞 SME-ONCALL** - Sistema de guardias
- **🔔 opsgenie** - Gestión de alertas
- **📊 métricas** - Documentación de métricas

## Iconos y Colores

Cada herramienta tiene su propio icono y color representativo:

| Herramienta | Icono | Color | Descripción |
|-------------|-------|-------|-------------|
| FURY | `fa-cloud` | Naranja | Representa cloud computing |
| GRAFANA | `fa-chart-line` | Naranja oscuro | Representa análisis de datos |
| COSUBI | `fa-user-shield` | Verde | Representa seguridad y administración |
| GATHER | `fa-users` | Púrpura | Representa colaboración en equipo |
| IM INCIDENT | `fa-exclamation-triangle` | Rojo | Representa alertas y incidentes |
| GUIA NOC | `fa-book` | Azul Google | Representa documentación |
| MOODY | `fa-bug` | Naranja | Representa debugging y resolución |
| ICC | `fa-broadcast-tower` | Verde azulado | Representa centro de comunicaciones |
| PANIC BUTON | `fa-hand-paper` | Rojo (pulsante) | Representa emergencia |
| SME-ONCALL | `fa-phone` | Verde | Representa comunicación de guardia |
| opsgenie | `fa-bell` | Naranja | Representa sistema de alertas |
| métricas | `fa-chart-bar` | Azul Google | Representa análisis de métricas |

## Uso

1. **Abrir la aplicación**: Simplemente abre `index.html` en tu navegador web
2. **Identificar herramientas**: Usa los iconos para identificar rápidamente cada herramienta
3. **Navegar**: Haz clic en cualquier botón para abrir la herramienta correspondiente
4. **Nueva pestaña**: Todas las herramientas se abren en pestañas nuevas para mantener el dashboard disponible

## Estructura del Proyecto

```
├── index.html          # Página principal con iconos
├── styles.css          # Estilos, diseño y animaciones
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## Dependencias Externas

- **Font Awesome 6.4.0**: Para los iconos (CDN)
  - URL: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`

## Personalización

### Agregar nuevas herramientas

Para agregar un nuevo botón con icono:

1. **HTML**: Añade un nuevo botón en `index.html`
```html
<button class="card" data-url="https://tu-nueva-herramienta.com">
    <i class="fas fa-tu-icono icon"></i>
    <span class="card-title">NOMBRE HERRAMIENTA</span>
</button>
```

2. **CSS**: Opcionalmente, añade un color específico
```css
.card[data-url*="tu-herramienta"] .icon {
    color: #tu-color;
}
```

### Cambiar iconos

Para cambiar un icono, modifica la clase del elemento `<i>`:
- Visita [Font Awesome Icons](https://fontawesome.com/icons) para ver todos los iconos disponibles
- Cambia `fa-nombre-actual` por `fa-nuevo-icono`

### Cambiar enlaces

Para modificar un enlace existente, simplemente cambia el valor del atributo `data-url` en el botón correspondiente.

## Características Especiales

### Animaciones
- **Entrada**: Cada botón aparece con una animación staggered
- **Hover**: Los iconos se agrandan y cambian de color al pasar el mouse
- **Click**: Efecto de escala al hacer clic
- **Emergencia**: El botón de pánico tiene una animación de pulso constante

### Responsivo
- **Desktop**: Cuadrícula 4x4 con iconos grandes
- **Tablet**: Cuadrícula 2x8 con iconos medianos
- **Móvil**: Cuadrícula 1x16 con iconos pequeños

## Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles
- ⚠️ Requiere conexión a internet para cargar los iconos de Font Awesome

## Características Técnicas

- **CSS Grid**: Para el layout responsivo
- **Flexbox**: Para el diseño interno de las cards
- **CSS Animations**: Para efectos visuales
- **Font Awesome**: Para iconos profesionales
- **Vanilla JavaScript**: Sin dependencias externas adicionales
- **Mobile-first**: Diseño optimizado para móviles

## Soporte

Para problemas o sugerencias:
1. Revisa la consola del navegador para mensajes de debug
2. Verifica que todos los enlaces estén actualizados
3. Asegúrate de tener una conexión a internet estable (para cargar iconos)
4. Comprueba que Font Awesome se esté cargando correctamente

---

**Desarrollado para optimizar el flujo de trabajo del equipo NOC** 🛠️✨ 