// Навигация, хлебные крошки, подсветка активного раздела
(function() {
    'use strict';

    // Маппинг страниц для хлебных крошек
    const pageMap = {
        'index.html': { title: 'Титульная', parent: null },
        'teoriya.html': { title: 'Теория', parent: 'index.html' },
        'praktikum.html': { title: 'Практикум', parent: 'index.html' },
        'testy.html': { title: 'Тесты', parent: 'index.html' },
        'materialy.html': { title: 'Дополнительные материалы', parent: 'index.html' },
        'rekomendacii.html': { title: 'Рекомендации тьютора', parent: 'index.html' }
    };

    // Подсветка активной ссылки в меню
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

    // Хлебные крошки
    function buildBreadcrumbs() {
        const container = document.getElementById('breadcrumbs');
        if (!container) return;

        const currentPage = window.location.pathname.split('/').pop();
        const info = pageMap[currentPage];
        if (!info) return;

        let html = '<a href="../index.html">Главная</a><span class="sep">›</span>';
        html += '<a href="../index.html">ЭУП</a>';

        if (info.parent) {
            const parentInfo = pageMap[info.parent];
            if (parentInfo) {
                html += '<span class="sep">›</span>';
                html += '<a href="' + info.parent + '">' + parentInfo.title + '</a>';
            }
        }

        if (info.title !== 'Титульная') {
            html += '<span class="sep">›</span>';
            html += '<span>' + info.title + '</span>';
        }

        container.innerHTML = html;
    }

    // Отметка посещённых страниц (для статистики)
    function trackPageVisit() {
        try {
            const currentPage = window.location.pathname.split('/').pop();
            // Используем единую статистику из stats.js
            if (typeof window.addVisitedPage === 'function') {
                window.addVisitedPage(currentPage);
            }
        } catch(e) {
            // localStorage недоступен
        }
    }

    // Инициализация
    document.addEventListener('DOMContentLoaded', function() {
        highlightActiveNav();
        buildBreadcrumbs();
        trackPageVisit();
    });
})();
