# Анализ ошибок и план улучшений проекта

> Проанализировано: 20.05.2026  
> Модули: портал (index.html), ЭУП (6 страниц), презентация (7 слайдов), JS (4 модуля), CSS (2 файла)

---

## 🐞 Найденные ошибки (критические)

### 🔴 Ошибка 1: Некорректные ссылки на PDF-файлы в `materialy.html`

**Файл:** [`eup/pages/materialy.html`](../eup/pages/materialy.html)

**Проблема:** В разделе «Фрагменты научных статей» (строки 82, 88, 94, 100) ссылки ведут на PDF-файлы в папке [`material/`](../material/), однако в этой папке находятся только файлы `.md` (`material1.md`, `material2.md`). PDF-файлы физически отсутствуют.

**Затронутые ссылки:**
- `../../material/Лабзина, П. Г. Тьюторское сопровождение ... .pdf` → **битая**
- `../../material/Тьюторское сопровождение в современном образовании.pdf` → **битая**
- `../../material/Фомичева, Н. В. Содержательно-организационные аспекты ... .pdf` → **битая**
- `../../material/Поздеева, Дмитриева Подготовка педагога ... .pdf` → **битая**

---

### 🔴 Ошибка 2: Двойной слеш в пути к `фгос.md` в `materialy.html`

**Файл:** [`eup/pages/materialy.html`](../eup/pages/materialy.html), строка 149

```html
<a href="../..//фгос.md">ФГОС СПО 09.02.07 (локальная копия)</a>
```
**Проблема:** Двойной слеш `..//фгос.md` вместо одинарного `../../фгос.md`. Приводит к некорректному разрешению пути.

---

### 🔴 Ошибка 3: Стили вариантов ответов в тестах не применяются

**Файлы:** [`eup/pages/testy.html`](../eup/pages/testy.html) (строки 67–79), [`eup/css/style.css`](../eup/css/style.css) (строки 322–341)

**Проблема:** HTML генерирует варианты ответов с классом `options`:
```html
<div class="options">
    <label><input type="radio" name="q0" value="0"> текст</label>
</div>
```

Однако в CSS стили для `.options label` определены **только** внутри родителя `.exercise`:
```css
.exercise .options label { ... }
```

В тестах контейнер не имеет класса `exercise` — используется `section`. В результате:
- ❌ Нет отступов и рамок у `label`
- ❌ Нет hover-эффекта (подсветка при наведении)
- ❌ Нет скругления углов
- Варианты ответа выглядят как обычный текст без интерактивного оформления

---

### 🔴 Ошибка 4: Битая ссылка "ЭУП" в хлебных крошках (`navigation.js`)

**Файл:** [`eup/js/navigation.js`](../eup/js/navigation.js), строка 39

```javascript
html += '<a href="index.html">ЭУП</a>';
```

**Проблема:** JS-скрипт выполняется на страницах внутри папки `eup/pages/`. Относительный путь `index.html` из `eup/pages/testy.html` ведёт в `eup/pages/index.html`, который **не существует**. Правильный путь: `../index.html` (ведёт в `eup/index.html`).

**Затронуты все 5 страниц разделов (теория, практикум, тесты, материалы, рекомендации).**

---

### 🟡 Ошибка 5: Потенциальная проблема с localStorage — несовместимость ключей

**Файлы:** [`eup/js/navigation.js`](../eup/js/navigation.js) (строка 61), [`eup/js/stats.js`](../eup/js/stats.js) (строка 5)

**Проблема:** Навигация сохраняет посещённые страницы в ключ `eup_progress`, а статистика использует ключ `eup_stats`. Массив `pagesVisited` в статистике инициализируется, но **никогда не заполняется** — нет кода, который бы добавлял страницы в этот массив. Два независимых хранилища могут рассинхронизироваться.

- `navigation.js` → `localStorage.setItem('eup_progress', ...)` 
- `stats.js` → `localStorage.getItem('eup_stats')`
- `stats.js` → массив `pagesVisited: []` объявлен, но никогда не пополняется

---

### 🟡 Ошибка 6: Плейсхолдеры RuTube-видео без ID

**Файл:** [`eup/pages/teoriya.html`](../eup/pages/teoriya.html), строки 248, 256

```html
<iframe src="https://rutube.ru/play/embed/"></iframe>
```
**Проблема:** В URL отсутствует ID видео после `/embed/`. Плеер отображается пустым. В коде есть комментарий: «укажите ID видео после /embed/».

---

## 📋 План улучшений

### 1. Исправить битые ссылки на PDF-файлы

**Вариант А (рекомендуемый):** 
- Заменить ссылки с PDF на соответствующие `.md`-файлы в папке `material/`
- Или добавить настоящие PDF-файлы в папку `material/`

**Вариант Б:** 
- Удалить ссылки и оставить только цитаты, если файлы не нужны

---

### 2. Исправить двойной слеш в `фгос.md`

- В файле [`eup/pages/materialy.html`](../eup/pages/materialy.html), строка 149:
  - `../..//фгос.md` → `../../фгос.md`

---

### 3. Добавить CSS-стили для вариантов ответов в тестах

Добавить в [`eup/css/style.css`](../eup/css/style.css) глобальные стили для `.options label` **без** родителя `.exercise`:

```css
/* Стили для options вне exercise (тесты) */
.section .options label {
    display: block;
    padding: 0.7rem 1rem;
    margin-bottom: 0.5rem;
    background: white;
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
}

.section .options label:hover {
    background: var(--secondary-light);
    border-color: var(--secondary);
}

.section .options input[type="radio"],
.section .options input[type="checkbox"] {
    margin-right: 0.6rem;
}
```

---

### 4. Исправить путь в хлебных крошках (`navigation.js`)

**[`eup/js/navigation.js`](../eup/js/navigation.js), строка 39:**

```javascript
// Было:
html += '<a href="index.html">ЭУП</a>';

// Стало:
html += '<a href="../index.html">ЭУП</a>';
```

---

### 5. Объединить localStorage-статистику

**Вариант:** 
- В [`eup/js/navigation.js`](../eup/js/navigation.js) добавить вызов `addVisitedPage()` из `stats.js` при посещении страницы
- Либо пополнять массив `pagesVisited` в `navigation.js` через единый ключ `eup_stats`

---

### 6. Заменить плейсхолдеры видео на реальные ссылки

- Вставить актуальные ID видео с RuTube в URL iframe
- Либо временно скрыть блоки с видео, если ссылки ещё не готовы

---

### 7. Добавить проверку match-вопроса на случай пустого выбора

**[`eup/js/tests.js`](../eup/js/tests.js), функция `getUserAnswer` для match (строка 204):**

После получения значений select'ов стоит проверять, не вернули ли они `-1` (значение по умолчанию "— выберите —"). Если хотя бы один select не выбран, возвращать `null` или помечать как неотвеченный.

---

### 8. Улучшить UX тестов

- Добавить индикацию неотвеченных вопросов при проверке
- Показывать номер текущего вопроса и прогресс-бар
- При сбросе теста скроллить страницу к началу

---

### 9. Связать `pagesVisited` в статистике с реальным отслеживанием

**[`eup/js/stats.js`](../eup/js/stats.js), добавить функцию:**

```javascript
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
```

И вызывать её из [`navigation.js`](../eup/js/navigation.js) в функции `trackPageVisit()`.

---

## 📊 Приоритетность исправлений

| № | Описание | Приоритет | Сложность |
|---|----------|-----------|-----------|
| 1 | Битая ссылка на `фгос.md` (двойной слеш) | 🔴 Критический | 🟢 1 мин |
| 2 | CSS-стили вариантов ответов в тестах | 🔴 Критический | 🟢 5 мин |
| 3 | Битая ссылка "ЭУП" в breadcrumbs (`navigation.js`) | 🔴 Критический | 🟢 1 мин |
| 4 | Битая ссылки на PDF (4 шт.) | 🔴 Критический | 🟡 10 мин |
| 5 | RuTube-видео без ID | 🟡 Важный | 🟡 10 мин |
| 6 | Объединение localStorage-ключей | 🟡 Важный | 🟡 15 мин |
| 7 | Match-вопрос: проверка пустого выбора | 🟢 Желательно | 🟢 5 мин |
| 8 | Улучшение UX тестов | 🟢 Желательно | 🟡 20 мин |

---

## ✅ Checklist итоговый

- [ ] Исправить двойной слеш `../..//фгос.md` → `../../фгос.md`
- [ ] Добавить CSS-стили для `.section .options label`
- [ ] Исправить `href="index.html"` → `href="../index.html"` в `navigation.js`
- [ ] Исправить/удалить битые ссылки на PDF (4 шт.)
- [ ] Добавить ID видео в RuTube-плееры
- [ ] Объединить `eup_progress` и `eup_stats`
- [ ] Добавить проверку `value === -1` в match-вопросах
- [ ] Улучшить UX тестов (индикация неотвеченных, прогресс-бар)
