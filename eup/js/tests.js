// Тестовые задания с автоматической проверкой
(function() {
    'use strict';

    window.testData = [
        {
            id: 1,
            type: 'single',
            question: 'Что такое тьюторское сопровождение?',
            options: [
                'Процесс передачи профессиональных знаний от опытного сотрудника новичку',
                'Педагогическая технология индивидуализации образования, направленная на сопровождение построения и реализации индивидуальной образовательной программы студента',
                'Система контроля успеваемости студентов в образовательной организации',
                'Форма групповой работы, направленная на сплочение коллектива'
            ],
            correct: 1,
            hint: 'Тьюторское сопровождение — это технология индивидуализации, а не просто передача знаний или контроль.'
        },
        {
            id: 2,
            type: 'multiple',
            question: 'Какие этапы включает тьюторское сопровождение проектной деятельности?',
            options: [
                'Диагностический',
                'Проектный (проектировочный)',
                'Реализация',
                'Контрольный',
                'Рефлексия'
            ],
            correct: [0, 1, 2, 4],
            hint: 'Четыре основных этапа: диагностика → проектирование → реализация → рефлексия. Контроль не является отдельным этапом тьюторского сопровождения.'
        },
        {
            id: 3,
            type: 'single',
            question: 'Чем тьюториал отличается от традиционного учебного занятия?',
            options: [
                'Тьюториал проводится только онлайн',
                'Тьюториал строится вокруг образовательных запросов участников, а не вокруг готового содержания',
                'Тьюториал всегда длиннее обычного занятия',
                'В тьюториале не используется оценка'
            ],
            correct: 1,
            hint: 'Ключевое отличие тьюториала — его содержание определяется запросами участников, а не жёсткой программой.'
        },
        {
            id: 4,
            type: 'multiple',
            question: 'Какие формы работы использует тьютор в своей деятельности?',
            options: [
                'Тьюториал',
                'Лекция',
                'Индивидуальная консультация',
                'Образовательное событие',
                'Экзамен'
            ],
            correct: [0, 2, 3],
            hint: 'Основные формы работы тьютора: тьюториал (групповая работа), индивидуальная консультация и образовательное событие.'
        },
        {
            id: 5,
            type: 'single',
            question: 'Какова роль наставника от работодателя в проектной деятельности студентов?',
            options: [
                'Полностью руководит проектом вместо студента',
                'Оценивает результаты проекта по пятибалльной шкале',
                'Выступает в роли эксперта, консультирует по практическим вопросам, участвует в оценке результатов',
                'Только присутствует на защите проекта'
            ],
            correct: 2,
            hint: 'Наставник от работодателя — эксперт, который консультирует, даёт обратную связь и участвует в оценке, но не руководит проектом.'
        },
        {
            id: 6,
            type: 'single',
            question: 'Что такое ИОП в контексте тьюторского сопровождения?',
            options: [
                'Интерактивная образовательная платформа',
                'Индивидуальная образовательная программа — персонализированный маршрут обучения студента',
                'Институт оценки персонала',
                'Интегрированная обучающая программа'
            ],
            correct: 1,
            hint: 'ИОП — это индивидуальный маршрут, разработанный совместно тьютором и студентом на основе диагностики его запросов.'
        },
        {
            id: 7,
            type: 'multiple',
            question: 'Какие компетенции развиваются у студента в ходе тьюторского сопровождения?',
            options: [
                'Субъектность — способность самостоятельно ставить цели и принимать решения',
                'Навыки рефлексии и самоанализа',
                'Умение работать по готовому алгоритму без отклонений',
                'Коммуникативные навыки и работа в команде',
                'Способность к профессиональному самоопределению'
            ],
            correct: [0, 1, 3, 4],
            hint: 'Тьюторское сопровождение развивает субъектность, рефлексию, коммуникацию и самоопределение, а не шаблонное выполнение алгоритмов.'
        },
        {
            id: 8,
            type: 'match',
            question: 'Сопоставьте инструмент диагностики с его назначением:',
            pairs: [
                { left: 'Анкета интересов', right: 'Выявление профессиональных предпочтений' },
                { left: 'Интервью', right: 'Глубинное исследование образовательного запроса' },
                { left: 'Карта проектных идей', right: 'Визуализация возможных тем проектов' },
                { left: 'Шкала готовности', right: 'Самооценка уровня подготовленности' }
            ]
        },
        {
            id: 9,
            type: 'single',
            question: 'Что такое "образовательное событие"?',
            options: [
                'Любое мероприятие в образовательной организации',
                'Формат совместной деятельности с ситуацией неопределённости, побуждающей к исследованию и открытиям',
                'Традиционный урок с использованием ИКТ',
                'Внеклассное мероприятие развлекательного характера'
            ],
            correct: 1,
            hint: 'Образовательное событие создаёт ситуацию неопределённости, в которой студенты совершают собственные открытия.'
        },
        {
            id: 10,
            type: 'multiple',
            question: 'Какие критерии эффективности тьюторского сопровождения можно выделить?',
            options: [
                'Сформированность субъектной позиции студента',
                'Количество проведённых консультаций',
                'Уровень рефлексивных навыков студента',
                'Длительность сопровождения в месяцах',
                'Качество разработанного проектного продукта'
            ],
            correct: [0, 2, 4],
            hint: 'Эффективность оценивается по качественным изменениям в студенте и его продукте, а не по количественным показателям.'
        }
    ];

    // Функция проверки теста
    window.checkTest = function() {
        let score = 0;
        const total = window.testData.length;
        const results = [];

        window.testData.forEach(function(item, index) {
            const userAnswer = window.getUserAnswer(index);
            const isCorrect = window.checkAnswer(item, userAnswer);
            if (isCorrect) {
                score++;
            }
            results.push({
                id: item.id,
                correct: isCorrect,
                userAnswer: userAnswer,
                correctAnswer: item.correct,
                hint: item.hint || ''
            });
        });

        // Показываем результат
        const resultDiv = document.getElementById('test-result');
        if (resultDiv) {
            const percentage = Math.round((score / total) * 100);
            let grade = '';
            if (percentage >= 90) grade = 'Отлично';
            else if (percentage >= 70) grade = 'Хорошо';
            else if (percentage >= 50) grade = 'Удовлетворительно';
            else grade = 'Требуется повторение';

            resultDiv.innerHTML = '<h3>Результат тестирования</h3>' +
                '<p>Правильных ответов: <strong>' + score + '</strong> из ' + total +
                ' (' + percentage + '%)</p>' +
                '<p class="grade">Оценка: <strong>' + grade + '</strong></p>';

            // Сохраняем в статистику
            if (typeof window.saveTestResult === 'function') {
                window.saveTestResult(score, total, percentage);
            }

            // Подсвечиваем ответы
            results.forEach(function(r, idx) {
                window.showQuestionFeedback(idx, r);
            });

            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Получение ответа пользователя на вопрос
    window.getUserAnswer = function(index) {
        const question = window.testData[index];

        if (question.type === 'single') {
            const selected = document.querySelector('input[name="q' + index + '"]:checked');
            return selected ? parseInt(selected.value) : -1;
        }

        if (question.type === 'multiple') {
            const selected = document.querySelectorAll('input[name="q' + index + '"]:checked');
            return Array.from(selected).map(function(el) { return parseInt(el.value); }).sort();
        }

        if (question.type === 'match') {
            const selects = document.querySelectorAll('#match-q' + index + ' select');
            return Array.from(selects).map(function(sel) { return parseInt(sel.value); });
        }

        return null;
    };

    // Проверка ответа
    window.checkAnswer = function(question, userAnswer) {
        if (question.type === 'single') {
            return userAnswer === question.correct;
        }

        if (question.type === 'multiple') {
            if (!userAnswer || userAnswer.length !== question.correct.length) return false;
            const sortedCorrect = question.correct.slice().sort();
            return JSON.stringify(userAnswer) === JSON.stringify(sortedCorrect);
        }

        if (question.type === 'match') {
            if (!userAnswer) return false;
            for (let i = 0; i < userAnswer.length; i++) {
                if (userAnswer[i] !== i) return false;
            }
            return true;
        }

        return false;
    };

    // Показать обратную связь для вопроса
    window.showQuestionFeedback = function(index, result) {
        const feedbackEl = document.getElementById('feedback-q' + index);
        if (!feedbackEl) return;

        if (result.correct) {
            feedbackEl.className = 'feedback correct';
            feedbackEl.style.display = 'block';
            feedbackEl.innerHTML = '✅ Верно!';
        } else {
            feedbackEl.className = 'feedback incorrect';
            feedbackEl.style.display = 'block';
            let hintText = result.hint || 'Попробуйте ещё раз.';
            feedbackEl.innerHTML = '❌ Неверно.<br><em>' + hintText + '</em>';
        }
    };

    // Сброс теста
    window.resetTest = function() {
        // Очищаем радио и чекбоксы
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(el) {
            el.checked = false;
        });

        // Сбрасываем селекты
        document.querySelectorAll('select').forEach(function(el) {
            el.selectedIndex = 0;
        });

        // Скрываем обратную связь
        document.querySelectorAll('.feedback').forEach(function(el) {
            el.style.display = 'none';
        });

        // Скрываем результат
        const resultDiv = document.getElementById('test-result');
        if (resultDiv) {
            resultDiv.innerHTML = '';
        }
    };
})();
