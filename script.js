// ============================================
// MENU RESPONSIVO
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu ao clicar no hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// EFEITO DE SCROLL SUAVE PARA NAVEGAÇÃO
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// ANIMAÇÕES AO SCROLLAR (Intersection Observer)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os cards e seções
document.querySelectorAll('.card, .info-card, .region-card, .festival-card, .tradition-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============================================
// EFEITO DE NAVBAR AO SCROLL
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('nav.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Adicionar sombra quando scrollar
    if (scrollTop > 0) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// GALERIA - EFEITO DE ZOOM AO HOVER
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// ============================================
// CONTAGEM DE ELEMENTOS (Função auxiliar)
// ============================================

function countElements() {
    const stats = {
        sections: document.querySelectorAll('section').length,
        cards: document.querySelectorAll('.card').length,
        images: document.querySelectorAll('img').length,
    };
    
    console.log('Estatísticas do Site:');
    console.log(`Seções: ${stats.sections}`);
    console.log(`Cards: ${stats.cards}`);
    console.log(`Imagens: ${stats.images}`);
    
    return stats;
}

// ============================================
// VOLTAR AO TOPO (Função Útil)
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar botão "Voltar ao Topo" quando scroll for grande
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (window.pageYOffset > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const btn = document.createElement('button');
            btn.className = 'scroll-to-top';
            btn.innerHTML = '↑';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.5rem;
                z-index: 999;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
            `;
            
            btn.addEventListener('click', scrollToTop);
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-5px)';
                btn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            });
            
            document.body.appendChild(btn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) scrollBtn.remove();
    }
});

// ============================================
// ATIVAR NAVEGAÇÃO ATIVA NO SCROLL
// ============================================

const sections = document.querySelectorAll('section');
const navLinksNav = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksNav.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Adicionar CSS para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background-color: #667eea;
        color: white;
    }
`;
document.head.appendChild(style);

// ============================================
// CARREGAMENTO PROGRESSIVO DE IMAGENS
// ============================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

lazyLoadImages();

// ============================================
// NOTIFICAÇÃO DE CARREGAMENTO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌏 Guia da Coreia do Norte carregado com sucesso!');
    console.log('Total de elementos: ', document.querySelectorAll('*').length);
    
    // Remover classe de carregamento se existir
    document.body.classList.remove('loading');
});

// ============================================
// FUNÇÃO DE BUSCA SIMPLES (Opcional)
// ============================================

function searchContent(query) {
    const sections = document.querySelectorAll('section');
    const results = [];
    
    sections.forEach(section => {
        if (section.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                id: section.id,
                title: section.querySelector('h2')?.textContent || 'Sem título',
                content: section.textContent.substring(0, 100) + '...'
            });
        }
    });
    
    return results;
}

// ============================================
// CONFIGURAÇÕES DE ACESSIBILIDADE
// ============================================

// Permitir navegação por teclado
document.addEventListener('keydown', (e) => {
    // Alt + Home: Volta ao topo
    if (e.altKey && e.key === 'Home') {
        scrollToTop();
    }
    
    // Alt + End: Vai para o rodapé
    if (e.altKey && e.key === 'End') {
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// ESTATÍSTICAS DO SITE (Console)
// ============================================

console.log(`
╔════════════════════════════════════════════╗
║     🌏 GUIA DA COREIA DO NORTE 🌏          ║
║                                            ║
║  Um guia completo e educacional sobre      ║
║  a Coreia do Norte                         ║
║                                            ║
║  📍 Localização: Península Coreana        ║
║  👥 População: ~25 milhões                ║
║  🗣️ Idioma: Coreano                        ║
║  📏 Área: 120.540 km²                     ║
║                                            ║
╚════════════════════════════════════════════╝
`);

// ============================================
// MODO ESCURO (Opcional - Descomentár para ativar)
// ============================================

/*
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferência salva
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
*/

// ============================================
// PRELOAD DE RECURSOS
// ============================================

// Precarregar as principais imagens
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1578470078519-71a47495d5d0?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop',
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// ============================================
// EVENT LISTENERS PARA ELEMENTOS INTERATIVOS
// ============================================

// Adicionar efeito ripple ao clicar em cards
document.querySelectorAll('.card, .btn').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Adicionar animação ripple ao CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
