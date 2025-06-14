// Variables globales
let currentCustomizingCard = null;

// Cargar datos personalizados desde localStorage
function loadCustomButtons() {
    console.log('Cargando botones personalizados...');
    const savedButtons = localStorage.getItem('customButtons');
    if (savedButtons) {
        try {
            const customButtons = JSON.parse(savedButtons);
            console.log('Botones encontrados:', customButtons);
            customButtons.forEach(buttonData => {
                const card = document.querySelector(`[data-custom-id="${buttonData.id}"]`);
                if (card) {
                    updateCardContent(card, buttonData);
                }
            });
        } catch (error) {
            console.error('Error al cargar botones personalizados:', error);
        }
    }
}

// Guardar datos personalizados en localStorage
function saveCustomButton(buttonData) {
    console.log('Guardando botón:', buttonData);
    try {
        const savedButtons = localStorage.getItem('customButtons');
        let customButtons = savedButtons ? JSON.parse(savedButtons) : [];
        
        // Buscar si ya existe un botón con el mismo ID
        const existingIndex = customButtons.findIndex(btn => btn.id === buttonData.id);
        
        if (existingIndex !== -1) {
            customButtons[existingIndex] = buttonData;
            console.log('Botón actualizado');
        } else {
            customButtons.push(buttonData);
            console.log('Botón agregado');
        }
        
        localStorage.setItem('customButtons', JSON.stringify(customButtons));
        console.log('Datos guardados en localStorage');
        return true;
    } catch (error) {
        console.error('Error al guardar botón:', error);
        return false;
    }
}

// Actualizar el contenido visual de una tarjeta
function updateCardContent(card, buttonData) {
    console.log('Actualizando tarjeta:', buttonData);
    const icon = card.querySelector('.icon, .icon-placeholder');
    const title = card.querySelector('.card-title');
    
    if (!icon || !title) {
        console.error('No se encontraron elementos icon o title en la tarjeta');
        return;
    }
    
    // Actualizar icono
    icon.className = `${buttonData.icon} icon`;
    
    // Actualizar título
    title.textContent = buttonData.name;
    
    // Agregar URL como data attribute
    card.setAttribute('data-url', buttonData.url);
    
    // Remover clase empty y agregar clase custom
    card.classList.remove('empty');
    card.classList.add('custom');
    
    // Limpiar event listeners previos
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Agregar nuevo evento de click
    newCard.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Abriendo URL:', buttonData.url);
        window.open(buttonData.url, '_blank');
    });
    
    console.log('Tarjeta actualizada exitosamente');
}

// Obtener todos los botones con data-url (excluyendo vacíos)
function setupExistingButtons() {
    const buttons = document.querySelectorAll('.card[data-url]:not(.empty):not(.custom)');
    console.log(`Configurando ${buttons.length} botones existentes`);
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            if (url) {
                console.log('Abriendo URL existente:', url);
                window.open(url, '_blank');
                
                // Efecto visual
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    return buttons;
}

// Configurar botones vacíos para personalización
function setupEmptyButtons() {
    const emptyCards = document.querySelectorAll('.card.empty');
    console.log(`Configurando ${emptyCards.length} botones vacíos`);
    
    emptyCards.forEach((card, index) => {
        // Agregar ID único para identificar la tarjeta
        const customId = `custom-${index}`;
        card.setAttribute('data-custom-id', customId);
        console.log(`Botón vacío configurado con ID: ${customId}`);
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Abriendo modal para personalizar botón:', customId);
            openCustomizeModal(this);
        });
    });
}

// Abrir modal de personalización
function openCustomizeModal(card) {
    console.log('Abriendo modal de personalización');
    currentCustomizingCard = card;
    const modal = document.getElementById('customizeModal');
    
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    
    // Limpiar formulario
    const form = document.getElementById('customizeForm');
    if (form) {
        form.reset();
    }
    
    // Verificar si la tarjeta ya tiene datos personalizados
    const savedButtons = localStorage.getItem('customButtons');
    if (savedButtons) {
        try {
            const customButtons = JSON.parse(savedButtons);
            const customId = card.getAttribute('data-custom-id');
            const existingData = customButtons.find(btn => btn.id === customId);
            
            if (existingData) {
                console.log('Cargando datos existentes:', existingData);
                document.getElementById('buttonName').value = existingData.name;
                document.getElementById('buttonUrl').value = existingData.url;
                document.getElementById('buttonIcon').value = existingData.icon;
            }
        } catch (error) {
            console.error('Error al cargar datos existentes:', error);
        }
    }
    
    modal.style.display = 'block';
    console.log('Modal abierto');
}

// Cerrar modal
function closeCustomizeModal() {
    console.log('Cerrando modal');
    const modal = document.getElementById('customizeModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentCustomizingCard = null;
}

// Configurar eventos del modal
function setupModalEvents() {
    console.log('Configurando eventos del modal');
    const modal = document.getElementById('customizeModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.btn-cancel');
    const form = document.getElementById('customizeForm');
    
    if (!modal || !closeBtn || !cancelBtn || !form) {
        console.error('Elementos del modal no encontrados');
        return;
    }
    
    // Cerrar modal con X
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Cerrando modal con X');
        closeCustomizeModal();
    });
    
    // Cerrar modal con botón Cancelar
    cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Cerrando modal con Cancelar');
        closeCustomizeModal();
    });
    
    // Cerrar modal haciendo click fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            console.log('Cerrando modal por click fuera');
            closeCustomizeModal();
        }
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulario enviado');
        
        if (!currentCustomizingCard) {
            console.error('No hay tarjeta seleccionada');
            return;
        }
        
        const formData = new FormData(form);
        const buttonData = {
            id: currentCustomizingCard.getAttribute('data-custom-id'),
            name: formData.get('buttonName'),
            url: formData.get('buttonUrl'),
            icon: formData.get('buttonIcon')
        };
        
        console.log('Datos del formulario:', buttonData);
        
        // Validar datos
        if (!buttonData.name || !buttonData.url || !buttonData.icon) {
            console.error('Datos incompletos');
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Actualizar la tarjeta
        updateCardContent(currentCustomizingCard, buttonData);
        
        // Guardar en localStorage
        const saved = saveCustomButton(buttonData);
        
        if (saved) {
            // Cerrar modal
            closeCustomizeModal();
            
            // Mostrar mensaje de éxito
            showSuccessMessage('Botón personalizado guardado exitosamente!');
        } else {
            alert('Error al guardar el botón. Inténtalo de nuevo.');
        }
    });
    
    console.log('Eventos del modal configurados');
}

// Mostrar mensaje de éxito
function showSuccessMessage(message) {
    console.log('Mostrando mensaje:', message);
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFE600 0%, #3483FA 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Agregar estilos de animación para notificaciones
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Inicialización cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando dashboard...');
    
    // Agregar estilos de notificación
    addNotificationStyles();
    
    // Configurar botones existentes
    const existingButtons = setupExistingButtons();
    
    // Configurar botones vacíos
    setupEmptyButtons();
    
    // Configurar eventos del modal
    setupModalEvents();
    
    // Cargar botones personalizados guardados
    loadCustomButtons();
    
    // Animaciones de entrada
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
    
    // Mostrar estadísticas en consola
    const stats = {
        totalCards: document.querySelectorAll('.card').length,
        activeCards: existingButtons.length,
        emptyCards: document.querySelectorAll('.card.empty').length,
        customCards: document.querySelectorAll('.card.custom').length,
        isMobile: isMobile(),
        userAgent: navigator.userAgent
    };
    
    console.log('NOC Tools Dashboard cargado exitosamente');
    console.table(stats);
});

// Función para resetear todos los botones personalizados (para debugging)
function resetCustomButtons() {
    console.log('Reseteando botones personalizados...');
    localStorage.removeItem('customButtons');
    location.reload();
}

// Función para verificar localStorage (para debugging)
function checkLocalStorage() {
    console.log('Verificando localStorage...');
    const saved = localStorage.getItem('customButtons');
    console.log('Datos guardados:', saved);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            console.table(parsed);
        } catch (error) {
            console.error('Error al parsear datos:', error);
        }
    }
}

// Hacer disponibles las funciones de debugging globalmente
window.resetCustomButtons = resetCustomButtons;
window.checkLocalStorage = checkLocalStorage;

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