/**
 * Приём ответов гостей (RSVP) в Google Таблицу.
 *
 * НАСТРОЙКА (≈10 минут, один раз):
 *  1. Создайте новую Google Таблицу (sheets.new).
 *  2. Меню «Расширения» → «Apps Script».
 *  3. Удалите всё в редакторе и вставьте этот файл целиком. Сохраните (Ctrl+S).
 *  4. «Начать развёртывание» (Deploy) → «Новое развёртывание» → тип «Веб-приложение»:
 *       – Выполнять от имени: «От моего имени» (Me)
 *       – У кого есть доступ: «Все» (Anyone)
 *     Нажмите «Развернуть» и разрешите доступ к таблице (Google покажет предупреждение —
 *     «Дополнительно» → «Перейти к проекту»; это ваш собственный скрипт).
 *  5. Скопируйте «URL веб-приложения» (заканчивается на /exec) и вставьте его
 *     в src/config.js → rsvp.endpoint.
 *
 * Если потом измените этот скрипт: «Развёртывание» → «Управление развёртываниями» →
 * карандаш → Версия: «Новая версия» → «Развернуть». Ссылка останется прежней.
 *
 * Уведомления на почту о каждом ответе: в таблице «Инструменты» → «Правила уведомлений»
 * → «Пользователь отправил форму / Внесены любые изменения» → «Сразу».
 */

const SHEET_NAME = 'Ответы';
const HEADERS = ['Дата', 'Имя и фамилия', 'Придёт?', 'Гостей', 'Комментарий'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // несколько гостей одновременно — строки не перепутаются

  try {
    const p = (e && e.parameter) || {};
    const name = clean(p.name, 120);
    if (name.length < 2) return json({ ok: false, error: 'name' });

    const guests = Math.max(0, Math.min(50, parseInt(p.guests, 10) || 0));
    const sheet = getSheet();
    sheet.appendRow([new Date(), name, clean(p.attend, 20), guests, clean(p.comment, 600)]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Открыв ссылку /exec в браузере, можно проверить, что скрипт работает
function doGet() {
  return json({ ok: true, message: 'RSVP endpoint is running' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('dd.MM.yyyy HH:mm');
    // Итог в шапке справа: сколько всего гостей придёт
    sheet.getRange('G1').setValue('Всего гостей:').setFontWeight('bold');
    sheet.getRange('H1').setFormula('=SUM(D2:D)');
  }
  return sheet;
}

// Обрезает длину и не даёт тексту стать формулой (=, +, -, @ в начале)
function clean(value, max) {
  let s = String(value || '').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
