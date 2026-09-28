// ============================================================
// HỆ THỐNG THU LEAD TÂM GIAO - POWERED BY FIDT
// Google Sheet ID: 1naZB23OOI5pfGQiknkKJuNVIUauY31Zec-OrZnBhjxg
// ============================================================
var SPREADSHEET_ID = '1naZB23OOI5pfGQiknkKJuNVIUauY31Zec-OrZnBhjxg';
var SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var p = JSON.parse(raw);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    }

    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheetByName('Trang tính1') || ss.getSheetByName('Sheet1') || ss.getSheets()[0];
    if (sheet.getName() !== SHEET_NAME) {
      sheet.setName(SHEET_NAME);
    }

    // 1. Tạo tiêu đề chuyên nghiệp nếu bảng còn trống
    if (sheet.getLastRow() === 0) {
      var headers = [
        'Thời gian gửi', 'Họ và tên', 'Số điện thoại',
        'Bận tâm lớn nhất', 'Mục tiêu ưu tiên', 'Hình thức đồng hành',
        'Nguồn (UTM Source)', 'Chiến dịch (UTM Campaign)', 'UTM Medium',
        'Mã tra cứu', 'Dữ liệu thêm'
      ];
      var hRange = sheet.getRange(1, 1, 1, headers.length);
      hRange.setValues([headers]);
      hRange.setBackground('#0C1B26')
            .setFontColor('#FFFFFF')
            .setFontWeight('bold')
            .setFontSize(10.5)
            .setHorizontalAlignment('center')
            .setVerticalAlignment('middle')
            .setWrap(true);

      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1);

      // Cài độ rộng cột đẹp mắt
      var widths = [160, 200, 140, 320, 320, 260, 140, 160, 120, 130, 220];
      widths.forEach(function(w, i){ sheet.setColumnWidth(i + 1, w); });

      // Định dạng cột SĐT dạng text
      sheet.getRange(2, 3, Math.max(50, sheet.getMaxRows() - 1), 1).setNumberFormat('@');
    }

    // 2. Chuẩn bị dữ liệu ghi
    var timeVn = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var phone = p.phone ? ("'" + String(p.phone).trim()) : '';

    var extra = {};
    ['agree', 'timestamp', 'utm_content', 'utm_term', 'ref', 'gclid', 'fbclid'].forEach(function(k){
      if (p[k]) extra[k] = p[k];
    });

    var row = [
      timeVn,
      p.fullname || '',
      phone,
      p.ban_tam || '',
      p.muc_tieu || '',
      p.hinh_thuc || '',
      p.utm_source || '',
      p.utm_campaign || '',
      p.utm_medium || '',
      p.code || '',
      Object.keys(extra).length ? JSON.stringify(extra) : ''
    ];

    // 3. Ghi dòng mới vào Sheet
    sheet.appendRow(row);

    var lr = sheet.getLastRow();
    sheet.setRowHeight(lr, 32);
    sheet.getRange(lr, 1, 1, row.length).setVerticalAlignment('middle');
    sheet.getRange(lr, 1).setHorizontalAlignment('center');
    sheet.getRange(lr, 3).setHorizontalAlignment('center');

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Lưu thành công' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Tâm Giao Lead API đang hoạt động.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
