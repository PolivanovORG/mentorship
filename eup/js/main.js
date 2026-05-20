// Основные функции: модальные окна, глоссарий, плавная прокрутка
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

    // Открыть модальное окно с термином
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

    // Закрыть модальное окно
    window.closeModal = function() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    };

    // Закрытие модалки по клику вне окна
    document.addEventListener('DOMContentLoaded', function() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    window.closeModal();
                }
            });
        }

        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.closeModal();
            }
        });

        // Плавная прокрутка для якорей
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Кнопка "Наверх"
        const backToTop = document.getElementById('back-to-top');
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
    });
})();
