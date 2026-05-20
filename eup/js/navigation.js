// Навигация, хлебные крошки, подсветка активного раздела
(function() {
    'use strict';

    // Маппинг страниц для хлебных крошек с эмодзи
    const pageMap = {
        'index.html': { title: '🏠 Главная', parent: null },
        'teoriya.html': { title: '📖 Теория', parent: 'index.html' },
        'praktikum.html': { title: '🔧 Практикум', parent: 'index.html' },
        'testy.html': { title: '📝 Тесты', parent: 'index.html' },
        'materialy.html': { title: '📚 Материалы', parent: 'index.html' },
        'rekomendacii.html': { title: '💡 Рекомендации', parent: 'index.html' }
    };

    // Иконки для страниц (для навигационных элементов)
    const pageIcons = {
        'index.html': '🏠',
        'teoriya.html': '📖',
        'praktikum.html': '🔧',
        'testy.html': '📝',
        'materialy.html': '📚',
        'rekomendacii.html': '💡'
    };

    // ===== ACTIVE NAV HIGHLIGHT =====
    function highlightActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        const links = document.querySelectorAll('.top-nav a');
        links.forEach(function(link) {
            const href = link.getAttribute('href').split('/').pop();
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ===== BREADCRUMBS WITH EMOJI =====
    function buildBreadcrumbs() {
        const container = document.getElementById('breadcrumbs');
        if (!container) return;

        const currentPage = window.location.pathname.split('/').pop();
        const info = pageMap[currentPage];
        if (!info) return;

        let html = '<a href="../index.html">🏠 Главная</a><span class="sep">›</span>';
        html += '<a href="../index.html">📘 ЭУП</a>';

        if (info.parent) {
            const parentInfo = pageMap[info.parent];
            if (parentInfo) {
                html += '<span class="sep">›</span>';
                html += '<a href="' + info.parent + '">' + parentInfo.title + '</a>';
            }
        }

        if (info.title !== '🏠 Главная') {
            html += '<span class="sep">›</span>';
            html += '<span>' + info.title + '</span>';
        }

        container.innerHTML = html;
    }

    // ===== TRACK PAGE VISIT =====
    function trackPageVisit() {
        try {
            const currentPage = window.location.pathname.split('/').pop();
            if (typeof window.addVisitedPage === 'function') {
                window.addVisitedPage(currentPage);
            }
        } catch(e) {
            // localStorage недоступен
        }
    }

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', function() {
        highlightActiveNav();
        buildBreadcrumbs();
        trackPageVisit();
    });
})();
