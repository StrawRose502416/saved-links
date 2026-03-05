// Enlaces estáticos
class LinkManager {
    constructor() {
        this.links = [
            {
                id: 1,
                title: "Streams",
                url: "https://kick.com/jhony_96",
                icon: "fas fa-microphone-alt"
            },
            {
                id: 2,
                title: "Mi LinkedIn",
                url: "https://linkedin.com/in/tuusuario",
                icon: "fab fa-linkedin"
            },
            {
                id: 3,
                title: "Mi Tiktok",
                url: "https://www.tiktok.com/@eljhony_96",
                icon: "fab fa-tiktok"
            },
            {
                id: 4,
                title: "Canal de YouTube",
                url: "https://www.youtube.com/Jhony_96",
                icon: "fab fa-youtube"
            },
            {
                id: 5,
                title: "Instagram",
                url: "https://www.instagram.com/eljhony_96",
                icon: "fab fa-instagram"
            },
            {
                id: 6,
                title: "Twitter/X",
                url: "https://x.com/eljhony_96",
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
        
        if (!container) {
            console.error('No se encontró el contenedor linksContainer');
            return;
        }
        
        container.innerHTML = this.links.map(link => `
            <a href="${link.url}" target="_blank" class="link-card" data-id="${link.id}">
                <i class="${link.icon}"></i>
                <div class="link-content">
                    <div class="link-title">${this.escapeHtml(link.title)}</div>
                    <div class="link-url">${this.escapeHtml(link.url)}</div>
                </div>
            </a>
        `).join('');
        
        console.log('Enlaces cargados correctamente');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando LinkManager...');
    const linkManager = new LinkManager();
});