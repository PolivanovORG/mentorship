// Основные функции: модальные окна, глоссарий, тёмная тема, поиск, анимации
(function() {
    'use strict';

    // Глоссарий терминов
    window.glossary = {
        'тьютор': {
            title: 'Тьютор',
            text: 'Педагог, сопровождающий индивидуальную образовательную программу (ИОП) студента, помогающий в самоопределении, постановке целей, поиске ресурсов и рефлексии результатов. Основная задача тьютора — не передавать знания, а создавать условия для самостоятельного образовательного движения студента.'
        },
        'тьюториал': {
            title: 'Тьюториал',
            text: 'Активное групповое занятие под руководством тьютора, направленное на развитие навыков целеполагания, планирования, рефлексии и коммуникации. В отличие от традиционного урока, тьюториал строится вокруг образовательных запросов участников.'
        },
        'образовательное событие': {
            title: 'Образовательное событие',
            text: 'Формат совместной деятельности, в котором создаётся ситуация неопределённости, побуждающая участников к исследованию, пробам, открытиям и осмыслению собственного опыта. Примеры: хакатон, проектная сессия, форсайт-игра.'
        },
        'иоп': {
            title: 'Индивидуальная образовательная программа (ИОП)',
            text: 'Персонализированный маршрут обучения, разработанный тьютором совместно со студентом на основе диагностики его интересов, дефицитов и профессиональных перспектив. ИОП включает цели, ресурсы, способы деятельности и критерии оценки.'
        },
        'наставник': {
            title: 'Наставник',
            text: 'Опытный специалист (как правило, от работодателя), который передаёт профессиональные знания и навыки, помогает адаптироваться в профессиональной среде, консультирует по практическим вопросам. В отличие от тьютора, наставник больше сфокусирован на профессиональной, а не образовательной траектории.'
        },
        'тьюторант': {
            title: 'Тьюторант',
            text: 'Студент (обучающийся), находящийся в позиции тьюторского сопровождения. Активный участник построения собственной образовательной траектории.'
        },
        'рефлексия': {
            title: 'Рефлексия',
            text: 'Осознанный анализ собственной деятельности и её результатов. В тьюторском сопровождении рефлексия — обязательный этап, позволяющий студенту зафиксировать изменения, осмыслить опыт и скорректировать дальнейший маршрут.'
        },
        'образовательный дефицит': {
            title: 'Образовательный дефицит',
            text: 'Разрыв между актуальным состоянием знаний/умений студента и требуемым для решения профессиональных задач. Выявление дефицита — первый шаг в проектировании ИОП.'
        },
        'субъектность': {
            title: 'Субъектность',
            text: 'Способность быть автором собственной жизни: самостоятельно ставить цели, делать осознанный выбор, нести ответственность за результаты. Формирование субъектности — ключевая цель тьюторского сопровождения.'
        }
    };

    // ===== MODAL WINDOW =====

    window.openGlossary = function(termKey) {
        const term = window.glossary[termKey];
        if (!term) return;

        const overlay = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const text = document.getElementById('modal-text');

        if (overlay && title && text) {
            title.textContent = term.title;
            text.textContent = term.text;
            overlay.classList.add('active');
        }
    };

    window.closeModal = function() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    };

    // ===== CONFETTI SYSTEM =====

    var confettiPieces = [];
    var confettiAnimId = null;

    window.launchConfetti = function() {
        var canvas = document.getElementById('confetti-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'confetti-canvas';
            document.body.appendChild(canvas);
        }
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b9d', '#845ef7', '#ff922b'];
        confettiPieces = [];
        for (var i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                rotSpeed: Math.random() * 10 - 5,
                speed: Math.random() * 3 + 2,
                drift: Math.random() * 2 - 1
            });
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var done = true;
            confettiPieces.forEach(function(p) {
                p.y += p.speed;
                p.x += p.drift;
                p.rot += p.rotSpeed;
                if (p.y < canvas.height + 20) done = false;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (!done) {
                confettiAnimId = requestAnimationFrame(animateConfetti);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
        animateConfetti();

        setTimeout(function() {
            if (confettiAnimId) {
                cancelAnimationFrame(confettiAnimId);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }, 4000);
    };

    // ===== DARK THEME TOGGLE =====

    function initTheme() {
        try {
            var saved = localStorage.getItem('eup_theme');
            if (saved === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        } catch(e) {}
        updateThemeIcon();
    }

    window.toggleTheme = function() {
        var html = document.documentElement;
        var isDark = html.getAttribute('data-theme') === 'dark';
        if (isDark) {
            html.removeAttribute('data-theme');
            try { localStorage.setItem('eup_theme', 'light'); } catch(e) {}
        } else {
            html.setAttribute('data-theme', 'dark');
            try { localStorage.setItem('eup_theme', 'dark'); } catch(e) {}
        }
        updateThemeIcon();
    };

    function updateThemeIcon() {
        var toggles = document.querySelectorAll('.theme-toggle');
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        toggles.forEach(function(btn) {
            btn.innerHTML = isDark ? '☀️ <span class="label">Светлая</span>' : '🌙 <span class="label">Тёмная</span>';
        });
    }

    // ===== READING MODE =====

    window.toggleReadingMode = function() {
        document.body.classList.toggle('reading-mode');
        var btns = document.querySelectorAll('.reading-mode-btn');
        var isActive = document.body.classList.contains('reading-mode');
        btns.forEach(function(btn) {
            btn.classList.toggle('active', isActive);
            btn.innerHTML = isActive ? '📖 <span class="label">Обычный</span>' : '📖 <span class="label">Чтение</span>';
        });
        try {
            localStorage.setItem('eup_reading_mode', isActive ? 'on' : 'off');
        } catch(e) {}
    };

    function initReadingMode() {
        try {
            if (localStorage.getItem('eup_reading_mode') === 'on') {
                document.body.classList.add('reading-mode');
                var btns = document.querySelectorAll('.reading-mode-btn');
                btns.forEach(function(btn) {
                    btn.classList.add('active');
                    btn.innerHTML = '📖 <span class="label">Обычный</span>';
                });
            }
        } catch(e) {}
    }

    // ===== READING TIME =====

    window.showReadingTime = function() {
        var container = document.getElementById('reading-time-container');
        if (!container) return;
        var mainEl = document.querySelector('.main');
        if (!mainEl) return;
        var text = mainEl.innerText || '';
        var words = text.split(/\s+/).length;
        var minutes = Math.max(1, Math.round(words / 200));
        container.textContent = '⏱ ' + minutes + ' мин на чтение';
    };

    // ===== READING PROGRESS =====

    function initReadingProgress() {
        var bar = document.getElementById('reading-progress');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'reading-progress';
            document.body.prepend(bar);
        }
        window.addEventListener('scroll', function() {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                var progress = (scrollTop / docHeight) * 100;
                bar.style.width = progress + '%';
            }
        });
    }

    // ===== SEARCH =====

    window.searchInPage = function() {
        var input = document.getElementById('search-input');
        if (!input) return;
        var query = input.value.trim().toLowerCase();
        // Убираем старые подсветки
        document.querySelectorAll('.search-highlight').forEach(function(el) {
            var parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });

        if (query.length < 2) return;

        var sections = document.querySelectorAll('.section p, .section li, .section h2, .section h3, .section h4, .section td');
        var found = false;
        sections.forEach(function(el) {
            var text = el.textContent.toLowerCase();
            var idx = text.indexOf(query);
            if (idx !== -1) {
                found = true;
                var original = el.textContent;
                var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
                el.innerHTML = original.replace(regex, '<span class="search-highlight">$1</span>');
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        if (!found && typeof window.showNotification === 'function') {
            window.showNotification('🔍 Ничего не найдено для "' + query + '"', 'warning');
        }
    };

    // ===== KEYBOARD SHORTCUTS =====

    window.showKeyboardShortcuts = function() {
        var overlay = document.getElementById('modal-overlay');
        var title = document.getElementById('modal-title');
        var text = document.getElementById('modal-text');
        if (!overlay || !title || !text) return;

        title.textContent = '⌨️ Клавиатурные шпаргалки';
        text.innerHTML = '' +
            '<div class="shortcuts-grid">' +
            '  <span class="kbd-shortcut">?</span><span>Показать эту шпаргалку</span>' +
            '  <span class="kbd-shortcut">Esc</span><span>Закрыть модальное окно</span>' +
            '  <span class="kbd-shortcut">t</span><span>Перейти в Теорию</span>' +
            '  <span class="kbd-shortcut">p</span><span>Перейти в Практикум</span>' +
            '  <span class="kbd-shortcut">z</span><span>Перейти к Тестам</span>' +
            '  <span class="kbd-shortcut">m</span><span>Перейти к Материалам</span>' +
            '  <span class="kbd-shortcut">r</span><span>Перейти к Рекомендациям</span>' +
            '  <span class="kbd-shortcut">d</span><span>Переключить тёмную тему</span>' +
            '  <span class="kbd-shortcut">f</span><span>Фокус на поиск</span>' +
            '  <span class="kbd-shortcut">Ctrl+Enter</span><span>Проверить тест / упражнение</span>' +
            '</div>';
        overlay.classList.add('active');
    };

    // ===== RIPPLE EFFECT =====

    function initRippleEffect() {
        document.querySelectorAll('.btn, .btn-check, .btn-success, .btn-outline').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var rect = btn.getBoundingClientRect();
                var ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                var size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                btn.appendChild(ripple);
                ripple.addEventListener('animationend', function() { ripple.remove(); });
            });
        });
    }

    // ===== NOTIFICATION SYSTEM =====

    window.showNotification = function(message, type) {
        type = type || 'info';
        var existing = document.querySelector('.eup-notification');
        if (existing) existing.remove();

        var notif = document.createElement('div');
        notif.className = 'eup-notification';
        notif.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;padding:0.8rem 1.5rem;border-radius:12px;color:white;font-size:0.95rem;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.2);animation:fadeIn 0.3s ease-out;max-width:400px;line-height:1.4;';
        if (type === 'success') notif.style.background = '#27ae60';
        else if (type === 'warning') notif.style.background = '#f39c12';
        else if (type === 'error') notif.style.background = '#e74c3c';
        else notif.style.background = '#3498db';
        notif.textContent = message;
        document.body.appendChild(notif);

        notif.addEventListener('click', function() { notif.remove(); });
        setTimeout(function() {
            notif.style.opacity = '0';
            notif.style.transition = 'opacity 0.3s';
            setTimeout(function() { notif.remove(); }, 300);
        }, 3000);
    };

    // ===== NAVIGATION KEYBOARD SHORTCUTS =====

    function initKeyboardNav() {
        var pageMap = {
            't': 'teoriya.html',
            'p': 'praktikum.html',
            'z': 'testy.html',
            'm': 'materialy.html',
            'r': 'rekomendacii.html'
        };
        document.addEventListener('keydown', function(e) {
            // Не обрабатываем, если фокус на поле ввода
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

            if (e.key === 'Escape') {
                window.closeModal();
                return;
            }
            if (e.key === '?') {
                e.preventDefault();
                window.showKeyboardShortcuts();
                return;
            }
            if (e.key === 'd') {
                e.preventDefault();
                window.toggleTheme();
                return;
            }
            if (e.key === 'f') {
                e.preventDefault();
                var searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.focus();
                return;
            }
            // Буквенные клавиши — навигация по разделам
            var key = e.key.toLowerCase();
            if (pageMap[key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                // Определяем, находимся ли мы в pages/ или в корне ЭУП
                var target = window.location.href.indexOf('/pages/') !== -1
                    ? '../' + pageMap[key]
                    : pageMap[key];
                window.location.href = target;
            }
        });
    }

    // ===== MOBILE HAMBURGER =====

    function initHamburger() {
        var hamburger = document.getElementById('hamburger-btn');
        var nav = document.querySelector('.top-nav');
        if (hamburger && nav) {
            hamburger.addEventListener('click', function() {
                nav.classList.toggle('open');
            });
            // Закрывать меню при клике на ссылку
            nav.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    nav.classList.remove('open');
                });
            });
        }
    }

    // ===== SEARCH BY ENTER =====

    function initSearchEnter() {
        var input = document.getElementById('search-input');
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    window.searchInPage();
                }
            });
        }
    }

    // ===== BADGE SYSTEM =====

    window.badgeDefinitions = [
        { id: 'teoretik', title: 'Теоретик', icon: '📖', desc: 'Посетить раздел «Теория»', check: function() { return isPageVisited('teoriya.html'); } },
        { id: 'praktik', title: 'Практик', icon: '🔧', desc: 'Выполнить все упражнения', check: function() { return isPageVisited('praktikum.html'); } },
        { id: 'znatok', title: 'Знаток', icon: '🏆', desc: 'Сдать тест на 90%+', check: function() { return hasTestScore(90); } },
        { id: 'nastojchivyj', title: 'Настойчивый', icon: '💪', desc: 'Пройти тест 3+ раза', check: function() { return getTestAttempts() >= 3; } },
        { id: 'issledovatel', title: 'Исследователь', icon: '🧭', desc: 'Посетить все 5 разделов', check: function() { return getAllPagesVisited(); } },
        { id: 'master', title: 'Мастер рефлексии', icon: '📝', desc: 'Заполнить рефлексивный дневник', check: function() { return isPageVisited('praktikum.html'); } },
        { id: 'subjektnost', title: 'Субъектность', icon: '⭐', desc: 'Тест на 100%', check: function() { return hasTestScore(100); } }
    ];

    function isPageVisited(page) {
        try {
            var stats = JSON.parse(localStorage.getItem('eup_stats'));
            return stats && stats.pagesVisited && stats.pagesVisited.indexOf(page) !== -1;
        } catch(e) { return false; }
    }

    function getAllPagesVisited() {
        var allPages = ['teoriya.html', 'praktikum.html', 'testy.html', 'materialy.html', 'rekomendacii.html'];
        try {
            var stats = JSON.parse(localStorage.getItem('eup_stats'));
            if (!stats || !stats.pagesVisited) return false;
            return allPages.every(function(p) { return stats.pagesVisited.indexOf(p) !== -1; });
        } catch(e) { return false; }
    }

    function hasTestScore(minPercent) {
        try {
            var stats = JSON.parse(localStorage.getItem('eup_stats'));
            if (!stats || !stats.testResults || stats.testResults.length === 0) return false;
            return stats.testResults.some(function(r) { return r.percentage >= minPercent; });
        } catch(e) { return false; }
    }

    function getTestAttempts() {
        try {
            var stats = JSON.parse(localStorage.getItem('eup_stats'));
            return stats && stats.testResults ? stats.testResults.length : 0;
        } catch(e) { return 0; }
    }

    window.getUnlockedBadges = function() {
        return window.badgeDefinitions.filter(function(b) { return b.check(); });
    };

    window.getLockedBadges = function() {
        return window.badgeDefinitions.filter(function(b) { return !b.check(); });
    };

    window.renderBadges = function(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var html = '<h3>🏅 Мои достижения</h3><div class="badge-container">';
        window.badgeDefinitions.forEach(function(badge) {
            var unlocked = badge.check();
            html += '<div class="badge-item ' + (unlocked ? 'unlocked' : 'locked') + '">';
            html += '<div class="badge-icon">' + badge.icon + '</div>';
            html += '<div class="badge-title">' + badge.title + '</div>';
            html += '<div class="badge-status">' + (unlocked ? '✅ Получено' : '🔒 ' + badge.desc) + '</div>';
            html += '</div>';
        });
        html += '</div>';
        container.innerHTML = html;
    };

    // ===== GLOBAL OVERALL PROGRESS (делегировано в stats.js) =====

    // ===== PROGRESS CHART (canvas) =====

    window.drawProgressChart = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;
        try {
            var stats = JSON.parse(localStorage.getItem('eup_stats'));
            if (!stats || !stats.testResults || stats.testResults.length < 2) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#666';
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Пройдите тест 2+ раза для графика', canvas.width / 2, canvas.height / 2);
                return;
            }
        } catch(e) { return; }

        var ctx = canvas.getContext('2d');
        var data = stats.testResults;
        var w = canvas.width, h = canvas.height;
        var pad = { top: 20, right: 20, bottom: 40, left: 50 };
        var chartW = w - pad.left - pad.right;
        var chartH = h - pad.top - pad.bottom;

        // Фон
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#1a1a2e' : '#f8f9fa';
        ctx.fillRect(0, 0, w, h);

        // Оси
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.left, pad.top);
        ctx.lineTo(pad.left, pad.top + chartH);
        ctx.lineTo(pad.left + chartW, pad.top + chartH);
        ctx.stroke();

        var minP = 0, maxP = 105;
        var xScale = chartW / Math.max(data.length - 1, 1);
        var yScale = chartH / maxP;

        // Сетка
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 3]);
        for (var pct = 20; pct <= 100; pct += 20) {
            var y = pad.top + chartH - pct * yScale;
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(pad.left + chartW, y);
            ctx.stroke();
            ctx.fillStyle = '#999';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(pct + '%', pad.left - 8, y + 4);
        }
        ctx.setLineDash([]);

        // Линия прогресса
        ctx.beginPath();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        data.forEach(function(d, i) {
            var x = pad.left + (data.length > 1 ? i * xScale : chartW / 2);
            var y = pad.top + chartH - d.percentage * yScale;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Точки
        data.forEach(function(d, i) {
            var x = pad.left + (data.length > 1 ? i * xScale : chartW / 2);
            var y = pad.top + chartH - d.percentage * yScale;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = d.percentage === Math.max.apply(Math, data.map(function(r) { return r.percentage; })) ? '#27ae60' : '#3498db';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Подпись даты
            ctx.fillStyle = '#999';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            var date = new Date(d.date);
            ctx.fillText(date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }), x, pad.top + chartH + 16);
        });

        // Анимация появления
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 0.6s ease';
        setTimeout(function() { canvas.style.opacity = '1'; }, 100);
    };

    // ===== BEST SCORE INDICATOR =====

    window.getBestScore = function() {
        try {
            var stats = JSON.parse(localStorage.getItem('eup_stats'));
            if (!stats || !stats.testResults || stats.testResults.length === 0) return null;
            var best = Math.max.apply(Math, stats.testResults.map(function(r) { return r.percentage; }));
            return best;
        } catch(e) { return null; }
    };

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', function() {
        // Modal close outside
        var overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    window.closeModal();
                }
            });
        }

        // Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.closeModal();
            }
        });

        // Smooth scroll for anchors
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = anchor.getAttribute('href');
                if (href === '#') return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Back to top
        var backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.style.display = 'block';
                } else {
                    backToTop.style.display = 'none';
                }
            });
            backToTop.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Init all features
        initTheme();
        initReadingProgress();
        initReadingMode();
        initRippleEffect();
        initKeyboardNav();
        initHamburger();
        initSearchEnter();

        // Reading time
        window.showReadingTime();

        // Close notification on click anywhere
        document.addEventListener('click', function(e) {
            if (e.target.closest('.eup-notification')) {
                var notif = document.querySelector('.eup-notification');
                if (notif) notif.remove();
            }
        });
    });

})();
