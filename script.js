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
    
    // Bloquear scroll do body quando menu estiver aberto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        // Criar overlay se não existir
        if (!document.querySelector('.menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', () => hamburger.click());
        }
    } else {
        document.body.style.overflow = 'auto';
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) overlay.remove();
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) overlay.remove();
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
    threshold: 0.05, // Mais sensível para mobile
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Pequeno delay baseado na posição para efeito cascata
            const delay = (index % 3) * 100; 
            setTimeout(() => {
                entry.target.classList.add('active');
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                
                if (entry.target.querySelector('.counter')) {
                    animateCounters(entry.target);
                }
            }, delay);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os cards e seções
// Removi a configuração de opacidade zero via JS para garantir que o conteúdo apareça sempre
document.querySelectorAll('.card, .info-card, .region-card, .festival-card, .tradition-card, .gallery-item, .section-header, .leader-card').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
});

// ============================================
// EFEITO DE NAVBAR AO SCROLL
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('nav.navbar');
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Barra de progresso de leitura
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + "%";

    // Adicionar sombra quando scrollar
    if (scrollTop > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// ANIMAÇÃO DE CONTADORES
// ============================================

function animateCounters(parent) {
    const counters = parent.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = target / 50;

        const updateCount = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + speed);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        if (count === 0) updateCount();
    });
}

// ============================================
// MODAL DE GALERIA (ZOOM)
// ============================================

const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.gallery-item, .card-image').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlayText = item.querySelector('.gallery-overlay p, .card-overlay p');
        
        if (img && modal) {
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.innerHTML = overlayText ? overlayText.innerHTML : (img.alt || "Visualização");
            document.body.style.overflow = 'hidden'; // Trava o scroll do site
        }
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Destrava o scroll
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
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
    
    if (window.scrollY > 300) {
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
                background: #ed1c24;
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
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksNav.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Removi a função lazyLoadImages() pois o navegador já faz isso 
// nativamente com o atributo loading="lazy" no seu HTML.
// Isso resolve o problema das imagens "sumidas".

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

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

const darkToggle = document.getElementById('dark-mode-toggle');
if (darkToggle) {
    darkToggle.addEventListener('click', toggleDarkMode);
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }
}

// ============================================
// PRELOAD DE RECURSOS
// ============================================

// Precarregar as principais imagens
function preloadImages() {
    const images = [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mansu_Hill_Grand_Monument_2014.jpg/800px-Mansu_Hill_Grand_Monument_2014.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Pyongyang_Arc_de_Triomphe.jpg/800px-Pyongyang_Arc_de_Triomphe.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Juche_Tower_Pyongyang.jpg/800px-Juche_Tower_Pyongyang.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ryugyong_Hotel_March_2014.jpg/800px-Ryugyong_Hotel_March_2014.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Monument_to_Party_Founding_Pyongyang.jpg/800px-Monument_to_Party_Founding_Pyongyang.jpg'
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
