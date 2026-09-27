# Design System: lấy cảm hứng từ Money and Marriage Getaway

> Bản hoàn chỉnh, đã điền các phần "AI Analysis Required" và sửa những token trích xuất bị lệch.
> Dùng làm đầu vào cho AI/agent hoặc cho dev khi dựng Landing Page.

---

## 0. Các lỗi đã sửa so với bản trích xuất

| Bản trích xuất | Vấn đề | Đã sửa thành |
|---|---|---|
| Primary Accent = `#f5f7f8` | Đây là màu nền phụ, không phải màu nhấn | **Primary Accent = `#0073b9`** |
| Primary CTA = `#f5f7f8` | CTA màu xám nhạt trên nền trắng sẽ không nhìn thấy | **CTA = `#0073b9` nền, chữ `#ffffff`** |
| Text Tier 1 = `#0073b9` | Xanh là màu link/nhấn, không phải màu chữ chính | Chữ chính = `#1f2426`; `#0073b9` chỉ dùng cho link và nhấn |
| Body line-height 20px (1.25) | Quá chặt cho tiếng Việt có dấu, dễ dính dấu giữa các dòng | **24–26px (1.5–1.6)** |
| Font `canada-type-gibson` | Font trả phí (Adobe Fonts), hỗ trợ tiếng Việt không đầy đủ | Thay bằng **Be Vietnam Pro** (xem mục 3) |

---

## 1. Visual Theme & Atmosphere

**Tinh thần:** *Đáng tin, ấm áp, thực tế.* Đây là phong cách của một sự kiện/khóa học về tài chính gia đình: phải tạo cảm giác **an toàn và chuyên nghiệp** như một tổ chức tài chính, nhưng vẫn **gần gũi và giàu hy vọng** như một buổi hội thảo dành cho các cặp đôi.

- **Tông cảm xúc:** bình tĩnh, rõ ràng, không phô trương. Không bán hàng gắt, không tạo cảm giác "khẩn cấp giả".
- **Ẩn dụ hình ảnh:** *bầu trời trong / mặt nước yên*. Màu xanh `#0073b9` gợi sự tin cậy và ổn định (ngôn ngữ màu quen thuộc của ngân hàng), còn nền trắng và xám rất nhạt tạo nhiều khoảng thở.
- **Triết lý:** nội dung là trung tâm. Giao diện chỉ có **một màu nhấn duy nhất**, còn lại là trắng, xám và gần đen. Ảnh chụp người thật (cặp đôi, khoảnh khắc sự kiện) đảm nhận phần cảm xúc, UI không cần trang trí thêm.
- **Từ khóa:** Clean · Trustworthy · Friendly · Practical · Airy.

---

## 2. Color Palette & Roles

### Core (từ bản trích xuất)

| Token | Hex | Vai trò |
|---|---|---|
| `--color-canvas` | `#ffffff` | Nền trang chính, nền card |
| `--color-surface` | `#f5f7f8` | Nền section xen kẽ, nền input, khối FAQ |
| `--color-primary` | `#0073b9` | CTA, link, icon nhấn, viền focus, số liệu nổi bật |
| `--color-text` | `#1f2426` | Heading và chữ chính |
| `--color-text-muted` | `#495257` | Mô tả, caption, chữ phụ |
| `--color-on-primary` | `#ffffff` | Chữ trên nền xanh hoặc nền tối |

### Mở rộng (suy ra để đủ dùng cho Landing Page)

| Token | Hex | Vai trò |
|---|---|---|
| `--color-primary-hover` | `#005f99` | Hover/active của nút |
| `--color-primary-pressed` | `#004d7d` | Trạng thái nhấn |
| `--color-primary-tint` | `#e6f1f8` | Nền badge, highlight nhẹ, nền icon tròn |
| `--color-border` | `#d9dfe2` | Viền card, divider, viền input |
| `--color-dark-section` | `#1f2426` | Footer, section tương phản (chữ trắng) |
| `--color-success` | `#2e8540` | Thông báo đăng ký thành công |
| `--color-error` | `#c62828` | Lỗi form |

**Tỉ lệ sử dụng gợi ý:** 70% trắng · 20% xám `#f5f7f8` · 8% chữ đậm · **~2% xanh**. Màu xanh hiếm thì mới "đắt".

**Độ tương phản (WCAG):** `#0073b9` trên `#fff` ≈ 5.0:1 (đạt AA). `#495257` trên `#fff` ≈ 8:1. `#fff` trên `#0073b9` đạt AA cho chữ ≥16px.

---

## 3. Typography Rules

### Font

- **Gốc:** `canada-type-gibson`, một sans-serif hình học–nhân văn: chữ tròn, thân thiện, dễ đọc.
- **Thay thế khuyến nghị cho tiếng Việt:** **`Be Vietnam Pro`** (Google Fonts, hỗ trợ đầy đủ dấu tiếng Việt, cá tính gần với Gibson).
- Phương án khác: `Mulish`, `Lexend`.

```css
font-family: "Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", sans-serif;
```

### Thang chữ (tỉ lệ ~1.25, gốc 16px)

| Role | Size (Desktop / Mobile) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Display / H1 Hero | 52px / 34px | 700 | 1.15 | -0.02em |
| H2 Section | 38px / 28px | 700 | 1.2 | -0.01em |
| H3 Card title | 24px / 20px | 600 | 1.3 | 0 |
| Eyebrow / Label | 14px | 600 | 1.4 | 0.08em, **UPPERCASE** |
| Lead (đoạn mở) | 20px / 18px | 400 | 1.6 | 0 |
| Body | 16–18px | 400 | 1.6 | 0 |
| Link nav | 16px | 400 (active 600) | 1.5 | 0 |
| Button | 16px | 600 | 1 | 0.01em |
| Caption / small | 14px | 400 | 1.5 | 0 |

### Quy tắc

- Heading **Sentence case** (chỉ viết hoa chữ đầu). **Không** viết hoa toàn bộ heading.
- **Chỉ** eyebrow/label nhỏ phía trên H2 mới dùng UPPERCASE và giãn chữ.
- Chỉ dùng 3 weight: **400 / 600 / 700**.
- Độ dài dòng body tối đa **~65 ký tự** (`max-width: 640px`).
- Heading màu `#1f2426`. Có thể tô xanh `#0073b9` cho **một cụm từ khóa** trong H1.

---

## 4. Component Stylings

### Buttons

| Variant | Style |
|---|---|
| **Primary** | Nền `#0073b9`, chữ `#fff`, radius `4px`, padding `14px 28px`, cao tối thiểu `48px`, font 16/600. Hover `#005f99` + shadow Level 2. |
| **Secondary (outline)** | Nền trong suốt, chữ `#0073b9`, viền dùng shadow Level 1 `inset 0 0 0 1px #0073b9`. Hover nền `#e6f1f8`. |
| **Ghost / Text link** | Chữ `#0073b9` 600, gạch chân khi hover, có thể thêm mũi tên → |
| **On dark** | Nền `#fff`, chữ `#0073b9` |

- Focus: `outline: 2px solid #0073b9; outline-offset: 2px;`
- Nút full-width trên mobile.

### Radius scale

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--radius-sm` | `4px` | Nút, input, badge, card |
| `--radius-drop` | `0 0 16px 16px` | **Dấu ấn riêng:** header dính/mega-menu/dropdown xổ từ mép trên, bo 2 góc dưới |
| `--radius-pill` | `999px` | Chip/tag (dùng rất hạn chế) |

→ Hệ thống **gần như vuông vức**. Tránh bo tròn lớn (16–24px) cho card: nó sẽ phá vỡ cảm giác chuyên nghiệp.

### Cards & Containers

- **Card tiêu chuẩn:** nền `#fff`, viền `1px solid #d9dfe2` **hoặc** shadow Level 2 (chọn một, không dùng cả hai), radius `4px`, padding `32px` (mobile `24px`).
- **Card trên nền xám:** nền `#fff` + shadow Level 2, không viền.
- **Card nổi bật (gói giá đề xuất):** viền trên dày `4px solid #0073b9` hoặc shadow Level 1 (viền xanh inset), kèm badge "Phổ biến nhất".
- **Hover card có link:** nâng lên Level 4 + `translateY(-2px)`, transition 200ms.
- **Section:** xen kẽ nền `#fff` và `#f5f7f8` để phân tách, **không** dùng đường kẻ.

### Form

- Input cao `48px`, nền `#fff`, viền `1px solid #d9dfe2`, radius `4px`, padding `12px 16px`.
- Focus: viền `#0073b9` + `box-shadow: 0 0 0 3px #e6f1f8`.
- Label ở trên input, 14px/600, màu `#1f2426`.

### Khác

- **FAQ accordion:** nền `#f5f7f8`, mỗi item cách nhau bằng divider `#d9dfe2`, icon +/− màu xanh.
- **Testimonial:** trích dẫn 20px italic nhẹ hoặc 400, ảnh tròn 56px, tên 600, vai trò `#495257`.
- **Icon:** line icon nét 1.5–2px, màu `#0073b9`, có thể đặt trong vòng tròn nền `#e6f1f8`.

---

## 5. Layout Principles

- **Container:** `max-width: 1200px`, padding ngang `24px` (mobile `16px`). Khối chữ hẹp: `max-width: 720px`, căn giữa.
- **Grid:** 12 cột, gutter `24px` (desktop 32px).
  - Hero: 2 cột 6/6 (chữ + ảnh), hoặc 1 cột căn giữa có ảnh nền.
  - Lợi ích/tính năng: 3 cột.
  - Lịch trình/diễn giả: 2–4 cột.
  - Bảng giá: 2–3 cột.
- **Spacing:** hệ 8px: `4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
  - Padding dọc section: **96px desktop / 64px mobile**.
  - Eyebrow → H2: 12px · H2 → lead: 16px · lead → nội dung: 48px.
- **Triết lý khoảng trắng:** **Thoáng nhưng không "điện ảnh"**. Đủ rộng để người đọc thấy bình tĩnh, nhưng vẫn gọn để thông tin thực tế (ngày, địa điểm, giá) dễ quét.
- **Căn lề:** heading section căn giữa; nội dung dài căn trái.

### Cấu trúc Landing Page gợi ý

1. Header dính (logo trái, nav, CTA phải), khi cuộn thì dùng shadow Level 2
2. Hero: eyebrow, H1, lead, CTA chính và phụ, dòng tin cậy (ngày/địa điểm/số người đã tham gia)
3. Vấn đề và đồng cảm (nền xám)
4. Bạn sẽ nhận được gì: 3–6 card lợi ích
5. Lịch trình / Nội dung chương trình
6. Diễn giả / Người hướng dẫn
7. Cảm nhận học viên (nền xám)
8. Bảng giá + CTA
9. FAQ
10. CTA cuối (nền xanh `#0073b9` hoặc nền tối `#1f2426`)
11. Footer tối

---

## 6. Depth & Elevation

**Kết luận:** hệ thống **chủ yếu phẳng**, dựa vào tương phản màu (trắng/xám) để phân lớp. Shadow **rất nhẹ, lạnh** (luôn dùng màu gốc `#1f2426` với độ mờ 10–15%, không dùng đen thuần) và chỉ xuất hiện khi có lý do chức năng.

| Level | Token | Giá trị | Dùng cho |
|---|---|---|---|
| 0 | `--elev-0` | none | Nền, section, card trên nền xám nhạt có viền |
| 1 | `--elev-outline` | `inset 0 0 0 1px #0073b9` | Viền nút outline, card được chọn, trạng thái active. **Đây là "viền giả" chứ không phải bóng** |
| 2 | `--elev-sm` | `0 2px 4px rgba(31,36,38,.10)` | Card, header khi cuộn, nút hover |
| 3 | `--elev-pressed` | `inset 0 2px 4px rgba(31,36,38,.10), 0 2px 4px rgba(31,36,38,.10)` | Input đang focus/nút đang nhấn |
| 4 | `--elev-lg` | `0 6px 16px rgba(31,36,38,.15)` | Dropdown, modal, popover, card hover |

---

## 7. Do's and Don'ts

✅ **Do**
1. **Chỉ dùng một màu nhấn `#0073b9`** cho mọi thứ có thể bấm hoặc cần chú ý. Mỗi màn hình chỉ có một CTA chính.
2. **Giữ radius 4px** cho nút, input, card. Chỉ dropdown/menu xổ xuống mới dùng `0 0 16px 16px`.
3. **Dùng ảnh người thật** (cặp đôi, gia đình, khoảnh khắc sự kiện), ánh sáng tự nhiên, tông ấm để cân bằng với UI lạnh.
4. **Phân tách section bằng màu nền** (`#fff` ↔ `#f5f7f8`), không dùng đường kẻ ngang.
5. **Viết heading sentence case**, câu ngắn, giọng thân thiện và thực tế.

❌ **Don't**
1. **Không dùng gradient**, glassmorphism, neon hay nền họa tiết. Chỉ dùng màu phẳng.
2. **Không dùng đen thuần `#000`** cho chữ hoặc shadow. Dùng `#1f2426`.
3. **Không thêm màu nhấn thứ hai** (cam, đỏ, tím…) cho CTA. Đỏ/xanh lá chỉ dùng cho trạng thái lỗi/thành công.
4. **Không bo tròn lớn** (>8px) cho card/nút và không dùng nút pill.
5. **Không dùng urgency gắt** (đồng hồ đếm ngược nhấp nháy, chữ đỏ in hoa). Nếu cần countdown, hãy trình bày trung tính, cùng tông xanh/xám.

---

## 8. Responsive Behavior

| Breakpoint | Width | Hành vi |
|---|---|---|
| Mobile | `< 600px` | 1 cột; H1 34px; section padding 64px; nút full-width; nav chuyển thành hamburger mở panel full-width bo `0 0 16px 16px` |
| Tablet | `600–959px` | Lưới 2 cột; hero xếp chồng (chữ trên, ảnh dưới) |
| Desktop | `960–1199px` | Lưới 3 cột; hero 2 cột |
| Wide | `≥ 1200px` | Container khóa ở 1200px, căn giữa |

- **Chiến lược thu gọn:** hero 2 cột → xếp chồng; lưới 3 → 2 → 1; bảng giá thành cuộn ngang hoặc xếp chồng, **gói nổi bật lên đầu**; lịch trình dạng bảng → dạng timeline dọc.
- **Touch target:** tối thiểu **48×48px** cho nút, link nav, icon; khoảng cách giữa các target ≥ 8px.
- **Sticky CTA mobile:** thanh dưới cùng nền `#fff`, shadow Level 4, chứa 1 nút primary full-width (xuất hiện sau khi cuộn qua hero).
- Dùng `clamp()` cho chữ: `font-size: clamp(34px, 5vw, 52px);`.

---

## 9. Agent Prompt Guide

### Reference Tokens (đã sửa)

- **Primary CTA:** `#0073b9` (chữ `#ffffff`)
- **Canvas:** `#ffffff` · **Surface:** `#f5f7f8`
- **Text:** `#1f2426` · **Muted:** `#495257` · **Link:** `#0073b9`
- **Font:** Be Vietnam Pro · **Radius:** 4px · **Shadow:** `0 2px 4px rgba(31,36,38,.1)`

### CSS Variables

```css
:root {
  --color-canvas: #ffffff;
  --color-surface: #f5f7f8;
  --color-primary: #0073b9;
  --color-primary-hover: #005f99;
  --color-primary-pressed: #004d7d;
  --color-primary-tint: #e6f1f8;
  --color-text: #1f2426;
  --color-text-muted: #495257;
  --color-on-primary: #ffffff;
  --color-border: #d9dfe2;

  --font-sans: "Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", sans-serif;

  --radius-sm: 4px;
  --radius-drop: 0 0 16px 16px;

  --elev-outline: inset 0 0 0 1px var(--color-primary);
  --elev-sm: 0 2px 4px rgba(31, 36, 38, 0.10);
  --elev-pressed: inset 0 2px 4px rgba(31, 36, 38, 0.10), 0 2px 4px rgba(31, 36, 38, 0.10);
  --elev-lg: 0 6px 16px rgba(31, 36, 38, 0.15);

  --container: 1200px;
  --section-y: 96px;
}
@media (max-width: 599px) { :root { --section-y: 64px; } }
```

### Prompt mẫu 1: Hero section

> Tạo hero section cho landing page sự kiện "Hội thảo Tài chính cho Vợ chồng". Nền `#ffffff`, bố cục 2 cột (6/6) trong container 1200px. Cột trái gồm eyebrow 14px/600 UPPERCASE giãn chữ 0.08em màu `#0073b9`; H1 52px/700 line-height 1.15 màu `#1f2426` (tô cụm từ khóa chính bằng `#0073b9`); lead 20px/400 line-height 1.6 màu `#495257`; 2 nút gồm primary (nền `#0073b9`, chữ trắng, radius 4px, cao 48px, padding 14px 28px) và outline (box-shadow `inset 0 0 0 1px #0073b9`); dưới cùng là một hàng thông tin ngày, địa điểm, số chỗ với icon line màu xanh. Cột phải là ảnh cặp đôi, radius 4px. Font Be Vietnam Pro. Không gradient. Trên mobile xếp chồng, nút full-width.

### Prompt mẫu 2: Card lợi ích + bảng giá

> Tạo section "Bạn sẽ nhận được gì" nền `#f5f7f8`, padding dọc 96px. Tiêu đề căn giữa (eyebrow xanh + H2 38px/700 `#1f2426` + lead `#495257`, max-width 720px). Bên dưới là lưới 3 cột gap 24px gồm 6 card: nền `#fff`, radius 4px, padding 32px, shadow `0 2px 4px rgba(31,36,38,.1)`; mỗi card có icon line trong vòng tròn 48px nền `#e6f1f8` màu `#0073b9`, H3 24px/600, mô tả 16px/1.6 `#495257`. Khi hover, card nâng lên `0 6px 16px rgba(31,36,38,.15)` và translateY(-2px) trong 200ms. Tablet 2 cột, mobile 1 cột.

### Prompt mẫu 3: Form đăng ký + FAQ

> Tạo form đăng ký trong card trắng radius 4px, shadow Level 2, padding 32px, đặt trên nền `#f5f7f8`. Input cao 48px, viền `1px solid #d9dfe2`, radius 4px; khi focus thì viền `#0073b9` + `box-shadow 0 0 0 3px #e6f1f8`. Label 14px/600 nằm trên input. Nút submit primary full-width `#0073b9`, hover `#005f99`. Thông báo lỗi `#c62828`, thành công `#2e8540`. Bên dưới là FAQ accordion: mỗi item có câu hỏi 18px/600 `#1f2426`, icon +/− `#0073b9`, câu trả lời 16px/1.6 `#495257`, các item ngăn cách bằng divider `#d9dfe2`. Toàn bộ nội dung tiếng Việt có dấu, font Be Vietnam Pro, không dùng màu nhấn nào khác ngoài `#0073b9`.

---

> **Lưu ý bản quyền:** Đây là phong cách *lấy cảm hứng*. Khi làm Landing Page, hãy dùng logo, tên, ảnh và nội dung của chính bạn, không sao chép nhận diện thương hiệu của sự kiện gốc.
