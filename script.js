// VERSIÓN SIMPLIFICADA - Solo muestra enlaces estáticos

class LinkManager {
    constructor() {
        // Aquí van TUS enlaces estáticos
        this.links = [
            {
                id: 1,
                title: "Mi GitHub",
                url: "https://github.com/tuusuario",
                icon: "fab fa-github"
            },
            {
                id: 2,
                title: "Mi LinkedIn",
                url: "https://linkedin.com/in/tuusuario",
                icon: "fab fa-linkedin"
            },
            {
                id: 3,
                title: "Mi Portfolio",
                url: "https://tuportfolio.com",
                icon: "fas fa-globe"
            },
            {
                id: 4,
                title: "Canal de YouTube",
                url: "https://youtube.com/@tucanal",
                icon: "fab fa-youtube"
            },
            {
                id: 5,
                title: "Instagram",
                url: "https://instagram.com/tuusuario",
                icon: "fab fa-instagram"
            },
            {
                id: 6,
                title: "Twitter/X",
                url: "https://twitter.com/tuusuario",
                icon: "fab fa-twitter"
            },
            {
                id: 7,
                title: "Contacto Email",
                url: "mailto:tu@email.com",
                icon: "fas fa-envelope"
            }
        ];
        
        this.init();
    }

    init() {
        this.loadLinks();
    }

    loadLinks() {
        const container = document.getElementById('linksContainer');
        
        container.innerHTML = this.links.map(link => `
            <a href="${link.url}" target="_blank" class="link-card" data-id="${link.id}">
                <i class="${link.icon}"></i>
                <div class="link-content">
                    <div class="link-title">${this.escapeHtml(link.title)}</div>
                    <div class="link-url">${this.escapeHtml(link.url)}</div>
                </div>
            </a>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar la aplicación
const linkManager = new LinkManager();