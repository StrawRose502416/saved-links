// Clase para manejar los enlaces
class LinkManager {
    constructor() {
        this.links = JSON.parse(localStorage.getItem('links')) || [];
        this.isAdmin = false;
        this.init();
    }

    init() {
        this.loadLinks();
        this.setupEventListeners();
        this.toggleAdminMode(false);
    }

    setupEventListeners() {
        // Formulario para agregar enlaces
        document.getElementById('linkForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addLink();
        });

        // Botón FAB para modo admin
        document.getElementById('adminFab').addEventListener('click', () => {
            this.toggleAdminMode(true);
        });

        // Botón para ocultar panel admin
        document.getElementById('toggleAdminBtn').addEventListener('click', () => {
            this.toggleAdminMode(false);
        });

        // Clic en ESC para salir del modo admin
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isAdmin) {
                this.toggleAdminMode(false);
            }
        });
    }

    addLink() {
        const title = document.getElementById('linkTitle').value;
        const url = document.getElementById('linkUrl').value;
        const icon = document.getElementById('linkIcon').value;

        const newLink = {
            id: Date.now(),
            title,
            url,
            icon,
            createdAt: new Date().toISOString()
        };

        this.links.push(newLink);
        this.saveLinks();
        this.loadLinks();
        
        // Limpiar formulario
        document.getElementById('linkForm').reset();
        
        // Mostrar notificación
        this.showNotification('¡Enlace agregado correctamente!', 'success');
    }

    deleteLink(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este enlace?')) {
            this.links = this.links.filter(link => link.id !== id);
            this.saveLinks();
            this.loadLinks();
            this.showNotification('Enlace eliminado', 'info');
        }
    }

    editLink(id) {
        const link = this.links.find(l => l.id === id);
        if (!link) return;

        // Aquí podrías implementar un modal de edición
        const newTitle = prompt('Editar título:', link.title);
        if (newTitle !== null) {
            link.title = newTitle;
        }

        const newUrl = prompt('Editar URL:', link.url);
        if (newUrl !== null) {
            link.url = newUrl;
        }

        this.saveLinks();
        this.loadLinks();
        this.showNotification('Enlace actualizado', 'success');
    }

    loadLinks() {
        const container = document.getElementById('linksContainer');
        
        if (this.links.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-link"></i>
                    <p>No hay enlaces aún. Agrega tu primer enlace usando el botón de editar.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.links.map(link => `
            <div class="link-card" data-id="${link.id}">
                <i class="${link.icon}"></i>
                <div class="link-content">
                    <div class="link-title">${this.escapeHtml(link.title)}</div>
                    <div class="link-url">${this.escapeHtml(link.url)}</div>
                </div>
                <div class="link-actions ${this.isAdmin ? 'visible' : ''}">
                    <button class="btn-icon edit" onclick="linkManager.editLink(${link.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="linkManager.deleteLink(${link.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Agregar event listeners para abrir enlaces en modo público
        if (!this.isAdmin) {
            document.querySelectorAll('.link-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    // Evitar que se active al hacer clic en los botones de acción
                    if (!e.target.closest('.link-actions')) {
                        const link = this.links.find(l => l.id === parseInt(card.dataset.id));
                        if (link) {
                            window.open(link.url, '_blank');
                        }
                    }
                });
            });
        }
    }

    toggleAdminMode(show) {
        this.isAdmin = show;
        const adminPanel = document.getElementById('adminPanel');
        const adminFab = document.getElementById('adminFab');
        const body = document.body;

        if (show) {
            adminPanel.style.display = 'block';
            adminFab.style.display = 'none';
            body.classList.add('admin-mode');
            
            // Scroll suave al panel
            adminPanel.scrollIntoView({ behavior: 'smooth' });
        } else {
            adminPanel.style.display = 'none';
            adminFab.style.display = 'flex';
            body.classList.remove('admin-mode');
        }

        // Recargar enlaces para mostrar/ocultar botones de acción
        this.loadLinks();
    }

    saveLinks() {
        localStorage.setItem('links', JSON.stringify(this.links));
    }

    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar la aplicación
const linkManager = new LinkManager();

// Agregar estilos adicionales para notificaciones y empty state
const style = document.createElement('style');
style.textContent = `
    .empty-state {
        text-align: center;
        padding: 40px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: white;
    }
    
    .empty-state i {
        font-size: 48px;
        margin-bottom: 15px;
        opacity: 0.8;
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        transition: all 0.3s ease;
    }
    
    .link-actions.visible {
        opacity: 1 !important;
    }
`;

document.head.appendChild(style);