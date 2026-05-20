// Сбор статистики о продвижении обучающегося (localStorage)
(function() {
    'use strict';

    var STORAGE_KEY = 'eup_stats';

    // Инициализация статистики
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

    // Сохранить результат теста
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
        } catch(e) {
            // localStorage недоступен
        }
    };

    // Получить статистику для отображения
    window.getStats = function() {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats) stats = initStats();
            return stats;
        } catch(e) {
            return null;
        }
    };

    // Отобразить статистику на странице
    window.displayStats = function(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var stats = window.getStats();
        if (!stats) {
            container.innerHTML = '<p>Статистика пока не собрана. Пройдите тесты и посетите разделы пособия.</p>';
            return;
        }

        var html = '<div class="section"><h3>📊 Ваш прогресс</h3>';

        // Последние результаты тестов
        if (stats.testResults && stats.testResults.length > 0) {
            html += '<h4>Результаты тестов:</h4><ul>';
            var lastResults = stats.testResults.slice(-5).reverse();
            lastResults.forEach(function(r) {
                var date = new Date(r.date);
                var dateStr = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
                html += '<li>' + dateStr + ' — <strong>' + r.score + '/' + r.total + ' (' + r.percentage + '%)</strong></li>';
            });
            html += '</ul>';

            // Средний результат
            var total = 0;
            stats.testResults.forEach(function(r) { total += r.percentage; });
            var avg = Math.round(total / stats.testResults.length);
            html += '<p>Средний результат: <strong>' + avg + '%</strong></p>';
        } else {
            html += '<p>Тесты пока не пройдены.</p>';
        }

        // Последний визит
        if (stats.lastVisit) {
            var lastDate = new Date(stats.lastVisit);
            html += '<p>Последнее посещение: ' + lastDate.toLocaleDateString('ru-RU') + ' ' + lastDate.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}) + '</p>';
        }

        html += '</div>';
        container.innerHTML = html;
    };

    // Добавить посещённую страницу в статистику
    window.addVisitedPage = function(page) {
        try {
            var stats = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!stats) return;
            if (!stats.pagesVisited.includes(page)) {
                stats.pagesVisited.push(page);
                stats.lastVisit = new Date().toISOString();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
            }
        } catch(e) {}
    };

    // Инициализация при загрузке
    initStats();
})();
