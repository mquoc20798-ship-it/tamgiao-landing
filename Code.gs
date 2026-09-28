// Code.gs - Hanh trinh An Tam (FIDT) - luu lead vao Google Sheet
// Huong dan deploy: xem tin nhan ban giao / HUONG-DAN.md

// ============================================================
// LANDING PAGE — STORAGE TO GOOGLE SHEET (LEAD ONLY)
// Receives POST { event: 'lead', secret, ... } from frontend
// Append 1 row to 'Leads' sheet voi schema: form fields + URL params.
//
// KHONG forward, KHONG goi CAPI, KHONG luu tracking cookies/IP/UA.
// Storage nay la diem cuoi - data dung o Sheet.
// KHONG ho tro thanh toan QR / check_pay - landing co QR phai dung Webhook backend.
// ============================================================

// ===== CONFIG - DOI 2 BIEN NAY TRUOC KHI DEPLOY =====
// SECRET_TOKEN: chuoi random it nhat 32 ky tu - frontend gui field `secret` khop voi cai nay.
// LUU Y: token nay van LO o frontend (xem source view) - day chi la "friction layer"
// chan bot script kid, KHONG phai authentication that. Xem muc 7 ve han che.
var SECRET_TOKEN = 'CHANGE-ME-TO-RANDOM-32-CHAR-STRING';

// Rate limit: so request toi da tu 1 phone trong 1 gio (chong spam re-submit).
// 0 = tat rate limit. Khuyen nghi 10 cho landing thuong.
var RATE_LIMIT_PER_HOUR = 10;

// Ten sheet (tab) - PHAI KHOP CHINH XAC (case-sensitive) ten trong spreadsheet.
// Neu khong tim thay -> tra error thay vi tu tao (tranh tao tab nham lam user nhau lan).
var SHEET_LEADS = 'Leads';

// Thu tu cot trong sheet 'Leads' - giu trung voi mo ta o muc 4.
// Schema = form fields + URL params + extra_json.
// Them cot tuy chinh ([CUSTOM-FIELDS]) TRUOC 'extra_json' - GAS tu map theo header.
var LEAD_HEADERS = [
  'timestamp_server',
  // Form fields (user dien)
  'fullname', 'phone', 'ban_tam', 'muc_tieu', 'hinh_thuc', 'agree', 'code', 'timestamp',
  // URL parameters (query string khi user vao landing)
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref',
  'fbclid', 'gclid', 'ttclid', 'msclkid',
  'extra_json'
];

// Truong DROP - khong luu Sheet, khong nem vao extra_json (storage Sheet
// khong dung tracking metadata CAPI).
var DROPPED_KEYS = {
  'event': true,
  'event_id': true, 'event_time': true,
  'event_name_meta': true, 'event_name_tiktok': true, 'event_name': true,
  'event_source_url': true, 'page_url': true, 'page_referrer': true, 'referrer_raw': true,
  'action_source': true,
  'fbc': true, 'fbp': true, 'ttp': true,
  'client_user_agent': true, 'client_ip_address': true
};

function doPost(e) {
  try {
    // Parse body - frontend gui Content-Type: text/plain de tranh CORS preflight,
    // nhung noi dung van la JSON nguyen
    var payload = JSON.parse(e.postData.contents || '{}');
    var event = payload.event || '';

    // ===== SECRET TOKEN check (friction layer chong bot/script kid) =====
    // Frontend BAT BUOC gui field `secret` khop SECRET_TOKEN moi duoc xu ly.
    if (!SECRET_TOKEN || SECRET_TOKEN === 'CHANGE-ME-TO-RANDOM-32-CHAR-STRING') {
      return json({ status: 'error', message: 'Server chua cau hinh SECRET_TOKEN' });
    }
    if (payload.secret !== SECRET_TOKEN) {
      return json({ status: 'error', message: 'Invalid secret' });
    }
    // Khong de field `secret` lot vao sheet
    delete payload.secret;

    if (event === 'lead') {
      // ===== RATE LIMIT theo phone (chong spam re-submit) =====
      if (RATE_LIMIT_PER_HOUR > 0 && payload.phone) {
        var rl = checkRateLimit(String(payload.phone).trim());
        if (!rl.ok) {
          return json({
            status: 'error',
            message: 'Too many submissions from this phone. Try again later.',
            retry_after: rl.retryAfter
          });
        }
      }
      return handleLead(payload);
    } else if (event === 'check_pay') {
      // Storage Google Sheet KHONG ho tro thanh toan QR
      return json({
        status: 'error',
        message: 'check_pay khong duoc ho tro voi storage Google Sheet. Doi sang Webhook backend hoac bo thanh toan QR.'
      });
    } else {
      return json({ status: 'error', message: 'Unknown event: ' + event });
    }
  } catch (err) {
    return json({ status: 'error', message: String(err) });
  }
}

// GET de test endpoint con song khong (mo URL tren browser se thay)
function doGet() {
  return json({ status: 'ok', message: 'Landing page lead storage endpoint is alive' });
}

// ============================================================
// LEAD - ghi 1 hang vao sheet 'Leads'
// ============================================================
function handleLead(p) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_LEADS);

  // M5 fix - KHONG tu insertSheet khi khong tim thay (tranh tao tab moi am tham
  // khi user go ten tab sai case nhu 'leads' / 'Lead'). Tra loi ro rang de debug.
  if (!sheet) {
    return json({
      status: 'error',
      message: 'Sheet/tab "' + SHEET_LEADS + '" khong ton tai trong spreadsheet. ' +
               'Kiem tra ten tab khop CHINH XAC (case-sensitive), hoac doi SHEET_LEADS trong code GAS.'
    });
  }

  ensureHeaders(sheet, LEAD_HEADERS);

  p.timestamp_server = new Date();

  // Tach truong tuy chinh (khong nam trong LEAD_HEADERS, khong bi DROP) vao extra_json.
  // Tracking fields trong DROPPED_KEYS bi drop am tham - khong vao cot, khong vao extra_json.
  var known = {};
  LEAD_HEADERS.forEach(function(h){ known[h] = true; });
  var extra = {};
  Object.keys(p).forEach(function(k){
    if (DROPPED_KEYS[k]) return;        // tracking metadata CAPI - drop
    if (!known[k]) extra[k] = p[k];     // field khong co cot rieng -> extra_json
  });
  p.extra_json = Object.keys(extra).length ? JSON.stringify(extra) : '';

  // Map gia tri theo thu tu LEAD_HEADERS + SANITIZE chong formula injection
  var row = LEAD_HEADERS.map(function(h){
    var v = p[h];
    if (v === null || v === undefined) return '';
    if (typeof v === 'object' && !(v instanceof Date)) return sanitizeCell(JSON.stringify(v));
    if (v instanceof Date) return v;
    if (typeof v === 'boolean') return v;
    return sanitizeCell(v);
  });

  sheet.appendRow(row);

  return json({ status: 'success', message: 'Lead saved', code: p.code || '' });
}

// ============================================================
// SECURITY HELPERS
// ============================================================

// H1 fix - SHEET FORMULA INJECTION protection.
// Khi user nhap value bat dau bang = + - @ \t \r (CR), Google Sheet se eval no nhu
// formula khi mo Sheet (vd =HYPERLINK, =IMPORTXML co the exfil data, hoac CSV
// injection cho Excel DDE: =cmd|'/c calc'!A0). Prefix dau nhay don (') de luc nay
// Sheet luu duoi dang chuoi tho, khong eval.
function sanitizeCell(v) {
  if (typeof v !== 'string') v = String(v);
  // Chi prefix neu ky tu DAU bat dau bang ky tu nguy hiem (sau khi trim whitespace)
  if (/^[=+\-@\t\r]/.test(v)) return "'" + v;
  return v;
}

// H2 fix - RATE LIMIT theo phone su dung PropertiesService (persistent across runs).
// Tra { ok: true } neu OK, { ok: false, retryAfter: <giay> } neu vuot quota.
function checkRateLimit(phone) {
  var cache = CacheService.getScriptCache();  // TTL toi da 6 gio, du cho window 1h
  var key = 'rl_' + phone;
  var raw = cache.get(key);
  var now = Math.floor(Date.now() / 1000);
  var windowSec = 3600;  // 1 gio

  var record;
  if (raw) {
    try { record = JSON.parse(raw); } catch (e) { record = null; }
  }
  if (!record || (now - record.start) > windowSec) {
    record = { start: now, count: 0 };
  }
  record.count += 1;

  if (record.count > RATE_LIMIT_PER_HOUR) {
    return { ok: false, retryAfter: windowSec - (now - record.start) };
  }
  cache.put(key, JSON.stringify(record), windowSec);
  return { ok: true };
}

// ============================================================
// Helpers
// ============================================================
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  } else {
    // Neu user da co header roi, kiem tra co thieu cot nao khong - them vao cuoi
    var existing = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0];
    var missing = headers.filter(function(h){ return existing.indexOf(h) < 0; });
    if (missing.length) {
      var startCol = sheet.getLastColumn() + 1;
      sheet.getRange(1, startCol, 1, missing.length).setValues([missing]);
    }
  }
}
