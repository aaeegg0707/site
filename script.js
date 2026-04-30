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
// Removi a configuração de opacidade zero via JS para garantir que o conteúdo apareça sempre
document.querySelectorAll('.card, .info-card, .region-card, .festival-card, .tradition-card, .gallery-item').forEach(element => {
    observer.observe(element);
});

// ============================================
// EFEITO DE NAVBAR AO SCROLL
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('nav.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    
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

// Adicionar CSS para link ativo
const style = document.createElement('style');
style.textContent = `
    /* Navbar Escura */
    .navbar {
        position: sticky;
        top: 0;
        width: 100%;
        background: #024fa2 !important; /* Azul escuro oficial */
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        display: block !important;
    }
    .nav-text { color: white !important; }

    .nav-link.active {
        color: #ffd700 !important; /* Dourado para link ativo */
        font-weight: bold;
    }

    /* Correção para o Menu Mobile que não aparecia */
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #024fa2;
            padding: 20px;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            list-style: none;
        }

        .nav-menu.active {
            display: flex !important;
        }

        .hamburger {
            display: flex !important;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
        }

        .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            background: white;
            transition: 0.3s;
        }
        
        .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
    }

    .nav-flag {
        width: 35px;
        height: auto;
        margin-right: 10px;
    }
`;
document.head.appendChild(style);

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
// SISTEMA DE TRADUÇÃO (i18n)
// ============================================

const translations = {
    pt: {
        nav_overview: "Visão Geral",
        nav_history: "História",
        nav_geography: "Geografia",
        nav_culture: "Cultura",
        nav_leadership: "Liderança",
        nav_gallery: "Galeria",
        nav_info: "Info",
        hero_title: "COREIA DO NORTE",
        hero_subtitle: "Uma Jornada pela História, Cultura e Tradições",
        btn_explore: "Explorar",
        btn_gallery: "Galeria",
        header_overview: "📊 Visão Geral"
    },
    en: {
        nav_overview: "Overview",
        nav_history: "History",
        nav_geography: "Geography",
        nav_culture: "Culture",
        nav_leadership: "Leadership",
        nav_gallery: "Gallery",
        nav_info: "Info",
        hero_title: "NORTH KOREA",
        hero_subtitle: "A Journey Through History, Culture, and Traditions",
        btn_explore: "Explore",
        btn_gallery: "Gallery",
        header_overview: "📊 Overview"
    },
    es: {
        nav_overview: "Visión General",
        nav_history: "Historia",
        nav_geography: "Geografía",
        nav_culture: "Cultura",
        nav_leadership: "Liderazgo",
        nav_gallery: "Galería",
        nav_info: "Info",
        hero_title: "COREA DEL NORTE",
        hero_subtitle: "Un viaje por la historia, la cultura y las tradiciones",
        btn_explore: "Explorar",
        btn_gallery: "Galería",
        header_overview: "📊 Visión General"
    },
    fr: {
        nav_overview: "Aperçu",
        nav_history: "Histoire",
        nav_geography: "Géographie",
        nav_culture: "Culture",
        nav_leadership: "Direction",
        nav_gallery: "Galerie",
        nav_info: "Info",
        hero_title: "CORÉE DU NORD",
        hero_subtitle: "Un voyage à travers l'histoire, la culture et les traditions",
        btn_explore: "Explorer",
        btn_gallery: "Galerie",
        header_overview: "📊 Aperçu"
    },
    "pt-pt": {
        nav_overview: "Visão Geral",
        nav_history: "História",
        nav_geography: "Geografia",
        nav_culture: "Cultura",
        nav_leadership: "Liderança",
        nav_gallery: "Galeria",
        nav_info: "Info",
        hero_title: "COREIA DO NORTE",
        hero_subtitle: "Uma Jornada pela História, Cultura e Tradições",
        btn_explore: "Explorar",
        btn_gallery: "Galeria",
        header_overview: "📊 Visão Geral"
    },
    ko: {
        nav_overview: "개요",
        nav_history: "역사",
        nav_geography: "지리",
        nav_culture: "문화",
        nav_leadership: "지도부",
        nav_gallery: "갤러리",
        nav_info: "정보",
        hero_title: "조선민주주의인민공화국",
        hero_subtitle: "역사, 문화, 전통을 통해 보는 여정",
        btn_explore: "탐험하기",
        btn_gallery: "갤러리",
        header_overview: "📊 개요"
    },
    ja: {
        nav_overview: "概要",
        nav_history: "歴史",
        nav_geography: "地理",
        nav_culture: "文化",
        nav_leadership: "指導部",
        nav_gallery: "ギャラリー",
        nav_info: "情報",
        hero_title: "北朝鮮",
        hero_subtitle: "歴史、文化、伝統を巡る旅",
        btn_explore: "探索する",
        btn_gallery: "ギャラリー",
        header_overview: "📊 概要"
    },
    zh: {
        nav_overview: "概览",
        nav_history: "历史",
        nav_geography: "地理",
        nav_culture: "文化",
        nav_leadership: "领导层",
        nav_gallery: "画廊",
        nav_info: "信息",
        hero_title: "朝鲜",
        hero_subtitle: "穿越历史、文化和传统的旅程",
        btn_explore: "探索",
        btn_gallery: "画廊",
        header_overview: "📊 概览"
    },
    ru: {
        nav_overview: "Обзор",
        nav_history: "История",
        nav_geography: "География",
        nav_culture: "Культура",
        nav_leadership: "Руководство",
        nav_gallery: "Галерея",
        nav_info: "Инфо",
        hero_title: "СЕВЕРНАЯ КОРЕЯ",
        hero_subtitle: "Путешествие через историю, культуру и традиции",
        btn_explore: "Исследовать",
        btn_gallery: "Галерея",
        header_overview: "📊 Обзор"
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang][key];
        
        if (translation) {
            const icon = el.querySelector('i');
            if (icon) {
                // Preserva o ícone e atualiza o texto
                el.innerHTML = `${icon.outerHTML} ${translation}`;
            } else {
                el.textContent = translation;
            }
        }
    });
    localStorage.setItem('preferredLang', lang);
}

const langSelect = document.getElementById('language-select');
if (langSelect) {
    // Carregar preferência salva
    const savedLang = localStorage.getItem('preferredLang') || 'pt';
    langSelect.value = savedLang;
    updateLanguage(savedLang);

    langSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
}

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
