// Obtener todos los botones con data-url
const buttons = document.querySelectorAll('.card[data-url]');

// Añadir event listener a cada botón
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url) {
            // Abrir en una nueva pestaña
            window.open(url, '_blank');
            
            // Añadir efecto visual al botón clickeado
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
    
    // Añadir efecto de hover adicional
    button.addEventListener('mouseenter', function() {
        this.style.borderColor = '#667eea';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.borderColor = '#333';
    });
});

// Mostrar información en consola
console.log('NOC Tools Dashboard loaded successfully');
console.log(`Found ${buttons.length} active buttons`);

// Función para mostrar un tooltip opcional (se puede expandir)
function showTooltip(element, text) {
    // Esta función se puede expandir para mostrar tooltips
    console.log(`Tooltip for ${element}: ${text}`);
}

// Event listeners adicionales para mejorar la experiencia de usuario
document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada para el header
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animación para el dashboard
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) {
        dashboard.style.opacity = '0';
        dashboard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            dashboard.style.transition = 'all 0.8s ease';
            dashboard.style.opacity = '1';
            dashboard.style.transform = 'scale(1)';
        }, 400);
    }
});

// Prevenir el comportamiento por defecto en botones vacíos
const emptyCards = document.querySelectorAll('.card.empty');
emptyCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Empty card clicked - no action defined');
    });
});

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamiento en móviles
if (isMobile()) {
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
}

// Mostrar estadísticas en consola para debugging
const stats = {
    totalCards: document.querySelectorAll('.card').length,
    activeCards: buttons.length,
    emptyCards: emptyCards.length,
    isMobile: isMobile(),
    userAgent: navigator.userAgent
};

console.table(stats); 