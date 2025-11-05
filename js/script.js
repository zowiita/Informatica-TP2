// Función para inicializar el menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.getElementById('navList');
    
    if (mobileMenuBtn && navList) {
        // Agregar listener al botón
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navList.classList.toggle('hidden');
        });
        
        // Cerrar el menú al hacer clic en un enlace
        const navLinks = navList.querySelectorAll('.nav-link a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.add('hidden');
            });
        });
    } else {
        console.warn('No se encontraron los elementos del menú móvil');
    }
}


//Botón Ver Mas Musica
const verMas = document.getElementById('btnverMusica');
if (verMas) {
    verMas.addEventListener('click', function() {
        window.location.href = 'pages/musica.html'
    });
}

//Botón Ver todas las Fechas
const verFechas = document.getElementById('btnverFechas');
if (verFechas) {
    verFechas.addEventListener('click', function() {
        window.location.href = 'pages/tour.html'
    });
}





// Función para validar email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para limpiar mensajes de error
function limpiarErrores() {
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(error => {
        error.textContent = '';
    });
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Función para mostrar error
function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    const errorElement = document.getElementById(campoId + 'Error');
    
    if (campo) {
        campo.style.borderColor = '#e74c3c';
    }
    
    if (errorElement) {
        errorElement.textContent = mensaje;
    }
}




// Función para validar el formulario de contacto
function validarFormulario() {
    let esValido = true;
    limpiarErrores();
    
    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre === '') {
        mostrarError('nombre', 'El nombre es obligatorio');
        esValido = false;
    } else if (nombre.length < 2) {
        mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres');
        esValido = false;
    }
    
    // Validar email
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        mostrarError('email', 'El email es obligatorio');
        esValido = false;
    } else if (!validarEmail(email)) {
        mostrarError('email', 'Por favor ingresa un email válido');
        esValido = false;
    }
    
    // Validar mensaje
    const mensaje = document.getElementById('mensaje').value.trim();
    if (mensaje === '') {
        mostrarError('mensaje', 'El mensaje es obligatorio');
        esValido = false;
    } else if (mensaje.length < 10) {
        mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    }
    
    return esValido;
}

// Función para manejar el envío del formulario
function manejarEnvioFormulario(e) {
    e.preventDefault();
    
    if (validarFormulario()) {
               
        // Mostrar confirmación con SweetAlert2
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Quieres enviar este mensaje?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#BB8DD6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, enviar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Mostrar mensaje de éxito
                Swal.fire({
                    title: "¡Mensaje enviado con éxito!!!",
                    text: "Gracias por contactar a Phoebe Buffay.",
                    icon: "success",
                    confirmButtonColor: "#BB8DD6"
                });
                
                // Limpiar el formulario
                document.getElementById('contactForm').reset();
                limpiarErrores();
            }
        });
    } else {
        // Mostrar mensaje de error general
        const primerError = document.querySelector('.error-message:not(:empty)');
        if (primerError) {
            primerError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Función para inicializar el formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', manejarEnvioFormulario);
        
        // Validación en tiempo real
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('mensaje');
        
        if (nombreInput) {
            nombreInput.addEventListener('blur', function() {
                const valor = this.value.trim();
                if (valor !== '' && valor.length < 2) {
                    mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres');
                }
            });
            
            nombreInput.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(231, 76, 60)') {
                    const valor = this.value.trim();
                    if (valor.length >= 2) {
                        limpiarErrores();
                        this.style.borderColor = '';
                        document.getElementById('nombreError').textContent = '';
                    }
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const valor = this.value.trim();
                if (valor !== '' && !validarEmail(valor)) {
                    mostrarError('email', 'Por favor ingresa un email válido');
                }
            });
            
            emailInput.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(231, 76, 60)') {
                    const valor = this.value.trim();
                    if (validarEmail(valor)) {
                        limpiarErrores();
                        this.style.borderColor = '';
                        document.getElementById('emailError').textContent = '';
                    }
                }
            });
        }
        
        if (mensajeInput) {
            mensajeInput.addEventListener('blur', function() {
                const valor = this.value.trim();
                if (valor !== '' && valor.length < 10) {
                    mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
                }
            });
            
            mensajeInput.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(231, 76, 60)') {
                    const valor = this.value.trim();
                    if (valor.length >= 10) {
                        limpiarErrores();
                        this.style.borderColor = '';
                        document.getElementById('mensajeError').textContent = '';
                    }
                }
            });
        }
    }
}

// Función para scroll suave en enlaces de navegación
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si es solo #, no hacer nada
            if (href === '#') {
            e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.album-card, .performance-card, .video-card, .relacion-card, .show-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}


// Función para agregar interactividad a las tarjetas de video
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const playOverlay = card.querySelector('.play-overlay');
        
        if (playOverlay) {
            card.addEventListener('click', function() {
                // En una implementación real, aquí se abriría un modal o se redirigiría al video
                console.log('Video clickeado:', card.querySelector('h3').textContent);
                // Puedes agregar lógica para abrir un modal con el video aquí
            });
        }
    });
}

// Función principal de inicialización
function init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
    initVideoCards();
    
    // Agregar clase para indicar que JavaScript está activo
    document.body.classList.add('js-enabled');
    
    console.log('Phoebe Buffay - Sitio web inicializado correctamente');
}

// Inicializar cuando el script se carga
init();

// Manejar errores globalmente
window.addEventListener('error', function(e) {
    console.log('Error en JavaScript:', e.message);
});
