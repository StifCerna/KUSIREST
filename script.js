// Navegacion suave y efectos del navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto de scroll en navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
   navbar.classList.add('scrolled');
   } else {
navbar.classList.remove('scrolled');
        }
    });
    
    // Navegacion suave a secciones
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
 e.preventDefault();
   const targetId = this.getAttribute('href').substring(1);
  const targetSection = document.getElementById(targetId);
   
            if (targetSection) {
           const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
    top: offsetTop,
         behavior: 'smooth'
          });
  }
        });
    });
    
    // Sistema de modales
    initModals();
    
    // Validacion del formulario
    initFormValidation();
});

// Funcion para mostrar mensaje de reserva
function mostrarMensajeReserva() {
  // Crear un div temporal para interpretar las entidades HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = '&iexcl;Gracias por tu inter&eacute;s! La funcionalidad de reservas estar&aacute; disponible pr&oacute;ximamente.';
    alert(tempDiv.textContent);
}

// Sistema de modales
function initModals() {
    const servicioItems = document.querySelectorAll('.servicio-item[data-modal]');
    const serviciosMini = document.querySelectorAll('.servicio-mini[data-servicio]');
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Abrir modal principal (solo cuartos)
    servicioItems.forEach(item => {
        item.addEventListener('click', function() {
const modalId = this.getAttribute('data-modal');
 const modal = document.getElementById(modalId);
     
         if (modal) {
            openModal(modal);
            }
  });
    });

    // Manejar clics en servicios mini
    serviciosMini.forEach(mini => {
 mini.addEventListener('click', function(e) {
            e.stopPropagation();
          const servicio = this.getAttribute('data-servicio');
 mostrarServicioIndividual(servicio);
        });
    });

    // Cerrar modal con boton
    closeButtons.forEach(button => {
  button.addEventListener('click', function() {
 const modal = this.closest('.modal');
     closeModal(modal);
        });
    });
    
    // Cerrar modal con overlay
    overlay.addEventListener('click', function() {
        closeAllModals();
    });
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
            closeAllModals();
     }
    });
}

// Funcion para mostrar servicio individual
function mostrarServicioIndividual(servicio) {
    const serviciosData = {
        'cafe': {
            titulo: 'Caf&eacute; y Snacks',
            imagen: 'assets/cafe.jpg',
descripcion: 'Complementa tu descanso con nuestros deliciosos caf&eacute;s reci&eacute;n preparados, t&eacute; de hierbas relajantes y snacks saludables. Perfecto para recargar energ&iacute;as antes de continuar con tus clases.'
  },
        'cargador': {
            titulo: 'Cargadores',
    imagen: 'assets/cargador.jpg',
            descripcion: 'Nunca te quedes sin bater&iacute;a. Disponemos de cargadores para todos los tipos de dispositivos: iPhone, Android, laptops y tablets. Mant&eacute;n tus dispositivos siempre listos para el estudio.'
        },
        'manta': {
            titulo: 'Mantas Extras',
          imagen: 'assets/manta.jpg',
            descripcion: 'Para aquellos que buscan comodidad adicional, ofrecemos mantas extra suaves y c&aacute;lidas. Perfectas para crear el ambiente perfecto de descanso y relajaci&oacute;n total.'
 },
        'antifaz': {
            titulo: 'Antifaz y Accesorios',
    imagen: 'assets/antifaz.jpg',
            descripcion: 'Logra un descanso m&aacute;s profundo con nuestros antifaces de calidad premium y tapones para los o&iacute;dos. Te ayudar&aacute;n a desconectarte completamente del mundo exterior.'
        },
    'aromaterapia': {
     titulo: 'Aromaterapia',
   imagen: 'assets/aromaterapia.jpg',
    descripcion: 'Sum&eacute;rgete en una experiencia de relajaci&oacute;n completa con nuestros aceites esenciales naturales. Lavanda para la calma, eucalipto para la claridad mental y otras fragancias.'
        }
    };

    const data = serviciosData[servicio];
    if (data) {
   const modalHTML = `
            <div class="modal-content">
           <button class="modal-close" aria-label="Cerrar modal">&times;</button>
              <img src="${data.imagen}" alt="${data.titulo}" class="modal-img">
          <h3>${data.titulo}</h3>
     <p>${data.descripcion}</p>
            </div>
   `;
        
    const tempModal = document.createElement('div');
  tempModal.className = 'modal';
        tempModal.id = 'temp-modal-' + servicio;
        tempModal.innerHTML = modalHTML;
        document.body.appendChild(tempModal);
        
const closeBtn = tempModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
    closeModal(tempModal);
            setTimeout(() => tempModal.remove(), 300);
        });
        
        openModal(tempModal);
    }
}

function openModal(modal) {
    const overlay = document.getElementById('modal-overlay');
    
    modal.setAttribute('data-previous-focus', document.activeElement.id || 'body');
    
    overlay.classList.add('show');
    modal.classList.add('show');
    
    document.body.style.overflow = 'hidden';
    
 setTimeout(() => {
const modalContent = modal.querySelector('.modal-content');
        modalContent.focus();
    }, 100);
    
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  const overlay = document.getElementById('modal-overlay');
    
    overlay.classList.remove('show');
    modal.classList.remove('show');
    
    document.body.style.overflow = '';
    
  const previousFocusId = modal.getAttribute('data-previous-focus');
    if (previousFocusId && previousFocusId !== 'body') {
        const previousElement = document.getElementById(previousFocusId);
        if (previousElement) {
            previousElement.focus();
        }
    }
    
    modal.setAttribute('aria-hidden', 'true');
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        closeModal(modal);
      if (modal.id.startsWith('temp-modal-')) {
            setTimeout(() => modal.remove(), 300);
        }
  });
}

// Validacion del formulario
function initFormValidation() {
    const form = document.querySelector('.contacto-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearError);
  });
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    clearError(e);
    
    if (!value && input.hasAttribute('required')) {
      showError(input, 'Este campo es obligatorio');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
    // Usar innerHTML para interpretar entidades HTML
   const tempDiv = document.createElement('div');
     tempDiv.innerHTML = 'Por favor ingresa un email v&aacute;lido';
            showError(input, tempDiv.textContent);
   return false;
        }
    }
    
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
      // Usar innerHTML para interpretar entidades HTML
            const tempDiv = document.createElement('div');
     tempDiv.innerHTML = 'Por favor ingresa un n&uacute;mero de tel&eacute;fono v&aacute;lido';
    showError(input, tempDiv.textContent);
            return false;
    }
    }
    
    return true;
}

function showError(input, message) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
  errorDiv.style.color = '#e74c3c';
errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#e74c3c';
}

function clearError(e) {
  const input = e.target;
    const errorMessage = input.parentNode.querySelector('.error-message');
    
    if (errorMessage) {
  errorMessage.remove();
    }
    
    input.style.borderColor = '#e1e1e1';
}

function mostrarMensajeEnvio() {
    const form = document.querySelector('.contacto-form');
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
    }
    });
    
    if (isValid) {
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Usar innerHTML para interpretar entidades HTML
    const tempDiv = document.createElement('div');
        tempDiv.innerHTML = 'Mensaje enviado &#10003;';
        submitButton.textContent = tempDiv.textContent;
    submitButton.style.backgroundColor = '#27ae60';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = 'var(--primario)';
            submitButton.disabled = false;
          form.reset();
 }, 3000);
        
        console.log('Formulario enviado (simulado)');
}
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
  threshold: 0.1,
 rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
     if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
     }
    });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.card, .servicio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initScrollAnimations, 100);
});

document.addEventListener('keydown', function(e) {
    const activeModal = document.querySelector('.modal.show');
    
    if (activeModal && e.key === 'Tab') {
      const focusableElements = activeModal.querySelectorAll(
         'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
 if (document.activeElement === firstElement) {
          e.preventDefault();
    lastElement.focus();
       }
      } else {
    if (document.activeElement === lastElement) {
             e.preventDefault();
         firstElement.focus();
            }
 }
    }
});