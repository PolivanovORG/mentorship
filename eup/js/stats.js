// Сбор статистики о продвижении обучающегося (localStorage)
// Версия 2.0 — с графиками, бейджами и расширенной аналитикой
(function() {
    'use strict';

    var STORAGE_KEY = 'eup_stats';

    // ===== INIT =====
    function initStats() {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats) {
                stats = {
                    testResults: [],
                    pagesVisited: [],
                    lastVisit: null,
                    totalTime: 0
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
            }
            return stats;
        } catch(e) {
            return null;
        }
    }

    // ===== SAVE TEST RESULT =====
    window.saveTestResult = function(score, total, percentage) {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats) stats = initStats();
            if (!stats) return;

            stats.testResults.push({
                date: new Date().toISOString(),
                score: score,
                total: total,
                percentage: percentage
            });

            stats.lastVisit = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

            // Показать confetti при 100%
            if (percentage === 100 && typeof window.launchConfetti === 'function') {
                setTimeout(function() {
                    window.launchConfetti();
                    if (typeof window.showNotification === 'function') {
                        window.showNotification('🎉 Поздравляем! 100% правильных ответов!', 'success');
                    }
                }, 300);
            }

            // Показать уведомление о результате
            if (typeof window.showNotification === 'function') {
                var grade = '';
                if (percentage >= 90) grade = 'Отлично';
                else if (percentage >= 70) grade = 'Хорошо';
                else if (percentage >= 50) grade = 'Удовлетворительно';
                else grade = 'Нужно повторить';
                window.showNotification('📊 Результат: ' + percentage + '% — ' + grade, percentage >= 70 ? 'success' : 'warning');
            }
        } catch(e) {
            // localStorage недоступен
        }
    };

    // ===== GET STATS =====
    window.getStats = function() {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats) stats = initStats();
            return stats;
        } catch(e) {
            return null;
        }
    };

    // ===== BEST SCORE =====
    window.getBestScore = function() {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats || !stats.testResults || stats.testResults.length === 0) return null;
            var best = Math.max.apply(Math, stats.testResults.map(function(r) { return r.percentage; }));
            return best;
        } catch(e) {
            return null;
        }
    };

    // ===== OVERALL PROGRESS =====
    window.calculateOverallProgress = function() {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats) return 0;
            var pagesScore = Math.min(stats.pagesVisited.length / 5 * 40, 40);
            var testScore = 0;
            if (stats.testResults && stats.testResults.length > 0) {
                var total = stats.testResults.reduce(function(s, r) { return s + r.percentage; }, 0);
                testScore = (total / stats.testResults.length) * 0.6;
            }
            return Math.min(Math.round(pagesScore + testScore), 100);
        } catch(e) { return 0; }
    };

    // ===== DISPLAY STATS =====
    window.displayStats = function(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var stats = window.getStats();
        if (!stats) {
            container.innerHTML = '<p>Статистика пока не собрана. Пройдите тесты и посетите разделы пособия.</p>';
            return;
        }

        var html = '<div class="section"><h3>📊 Ваш прогресс</h3>';

        // Stats cards
        html += '<div class="stats-grid">';
        // Общий прогресс
        var overall = window.calculateOverallProgress();
        html += '<div class="stat-card"><div class="stat-value">' + overall + '%</div><div class="stat-label">Общий прогресс</div></div>';
        // Тесты пройдены
        var testCount = stats.testResults ? stats.testResults.length : 0;
        html += '<div class="stat-card"><div class="stat-value">' + testCount + '</div><div class="stat-label">Тестов пройдено</div></div>';
        // Лучший результат
        var best = window.getBestScore();
        if (best !== null) {
            html += '<div class="stat-card"><div class="stat-value" style="color:#27ae60;">' + best + '%</div><div class="stat-label">🏆 Лучший результат</div></div>';
        }
        // Средний результат
        if (stats.testResults && stats.testResults.length > 0) {
            var totalPct = 0;
            stats.testResults.forEach(function(r) { totalPct += r.percentage; });
            var avg = Math.round(totalPct / stats.testResults.length);
            html += '<div class="stat-card"><div class="stat-value" style="color:#f39c12;">' + avg + '%</div><div class="stat-label">Средний балл</div></div>';
        }
        // Посещено разделов
        var pages = stats.pagesVisited ? stats.pagesVisited.length : 0;
        html += '<div class="stat-card"><div class="stat-value">' + pages + '/5</div><div class="stat-label">Разделов посещено</div></div>';
        html += '</div>';

        // Progress bar
        html += '<div class="progress-bar" style="margin:1rem 0;"><div class="progress-fill" style="width:' + overall + '%;"></div></div>';
        html += '<p style="text-align:center;font-size:0.9rem;color:var(--text-light);">Освоено ' + overall + '% курса</p>';

        // Best score highlight
        if (best !== null) {
            html += '<h4>🏆 Лучший результат: <strong style="color:#27ae60;font-size:1.3rem;">' + best + '%</strong></h4>';
        }

        // Chart
        if (stats.testResults && stats.testResults.length >= 1) {
            html += '<div class="chart-container">';
            html += '<h4>📈 Динамика результатов</h4>';
            html += '<canvas id="progress-chart" width="600" height="250" style="width:100%;height:auto;"></canvas>';
            html += '</div>';
        }

        // Recent results
        if (stats.testResults && stats.testResults.length > 0) {
            html += '<h4>📋 Последние результаты:</h4><ul>';
            var lastResults = stats.testResults.slice(-5).reverse();
            lastResults.forEach(function(r) {
                var date = new Date(r.date);
                var dateStr = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
                var emoji = r.percentage >= 90 ? '🌟' : r.percentage >= 70 ? '✅' : r.percentage >= 50 ? '⚠️' : '❌';
                html += '<li>' + emoji + ' ' + dateStr + ' — <strong>' + r.score + '/' + r.total + ' (' + r.percentage + '%)</strong></li>';
            });
            html += '</ul>';
        } else {
            html += '<p>Тесты пока не пройдены.</p>';
        }

        // Last visit
        if (stats.lastVisit) {
            var lastDate = new Date(stats.lastVisit);
            html += '<p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-light);">Последнее посещение: ' +
                lastDate.toLocaleDateString('ru-RU') + ' ' +
                lastDate.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}) + '</p>';
        }

        // Badges
        html += '<div id="badges-stats-container"></div>';

        html += '</div>';
        container.innerHTML = html;

        // Draw chart after DOM update
        if (stats.testResults && stats.testResults.length >= 1) {
            setTimeout(function() {
                // Use the chart function from main.js
                if (typeof window.drawProgressChart === 'function') {
                    window.drawProgressChart('progress-chart');
                }
            }, 100);
        }

        // Render badges
        if (typeof window.renderBadges === 'function') {
            setTimeout(function() {
                window.renderBadges('badges-stats-container');
            }, 150);
        }
    };

    // ===== ADD VISITED PAGE =====
    window.addVisitedPage = function(page) {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats) return;
            if (!stats.pagesVisited.includes(page)) {
                stats.pagesVisited.push(page);
                stats.lastVisit = new Date().toISOString();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

                // Сhекнуть бейджи после посещения
                if (typeof window.renderBadges === 'function') {
                    // Бейджи обновятся при следующем рендере
                }
            }
        } catch(e) {}
    };

    // ===== INIT =====
    initStats();
})();
