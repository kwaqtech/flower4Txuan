# Thiết kế cải thiện chuyển động hoa

## Mục tiêu

Cải thiện chuyển động hiện tại để hoa có cảm giác đung đưa theo gió nhẹ, tự nhiên và lãng mạn hơn. Web dùng làm thiệp tặng người yêu.

## Phạm vi

- Giữ concept nền đêm, hoa phát sáng.
- Giữ HTML/CSS/JS thuần.
- Không thêm backend.
- Không chuyển sang React, Vue, Canvas hoặc WebGL.
- Tối ưu điện thoại và máy tính.
- Không thêm tài khoản, lưu dữ liệu hoặc tính năng tương tác phức tạp.

## Hiểu đúng yêu cầu

- Animation hiện tại đã mượt.
- Vấn đề chính: các chuyển động lặp và đồng bộ, chưa giống gió thật.
- Gió cần rất nhẹ, lãng mạn; không lắc mạnh, không gây chóng mặt.
- Mỗi lần mở trang có biến thiên nhỏ.
- Hiệu năng và pin điện thoại cần được giữ tốt.

## Thiết kế đề xuất

### Phân chia trách nhiệm

CSS tiếp tục xử lý animation liên tục. JavaScript chỉ chạy một lần sau khi DOM sẵn sàng để gán các biến CSS ngẫu nhiên có giới hạn cho từng hoa và nhóm lá.

JavaScript không dùng `setInterval`, `requestAnimationFrame` hoặc vòng lặp chạy liên tục. Các giá trị sinh ra gồm tốc độ, độ trễ và góc nghiêng nhỏ. Random có giới hạn để kết quả luôn đẹp và ổn định.

### Chuyển động

- Thân mỗi hoa nghiêng lệch nhịp khoảng 1–2 độ.
- Mỗi hoa dùng chu kỳ và delay riêng.
- Lá rung nhẹ, lệch pha với thân.
- Cánh hoa chuyển động chậm hơn thân, biên độ nhỏ hơn.
- Chu kỳ dài, easing mềm.
- Không để ba hoa chuyển động đồng bộ.

### Responsive

Giữ đơn vị `vmin` hiện tại. Bổ sung giới hạn kích thước và khoảng cách để:

- Màn hình điện thoại dọc không bị cắt hoa.
- Màn hình điện thoại nhỏ không làm hoa quá lớn.
- Màn hình máy tính vẫn giữ cụm hoa ở giữa.
- Nội dung không tạo thanh cuộn ngang.

### Accessibility

Thêm `@media (prefers-reduced-motion: reduce)` để giảm hoặc tắt animation. Trang vẫn hiển thị đầy đủ hoa khi animation bị tắt.

### Hiệu năng

- Chỉ dùng CSS transforms và opacity cho chuyển động.
- Không đọc/ghi layout liên tục.
- Không thêm thư viện.
- JS chạy một lần khi tải trang.
- Kiểm tra trên viewport điện thoại và máy tính.

## Kiểm tra nghiệm thu

1. Mở lại trang nhiều lần; tốc độ và delay thay đổi nhẹ nhưng không có chuyển động bất thường.
2. Quan sát ba hoa; không hoa nào lắc mạnh hoặc cùng nhịp hoàn toàn.
3. Kiểm tra màn hình điện thoại dọc; không cắt hoa, không cuộn ngang.
4. Kiểm tra màn hình máy tính; cụm hoa cân giữa và vẫn rõ.
5. Bật `prefers-reduced-motion`; animation giảm hoặc dừng, hoa vẫn hiển thị.
6. Kiểm tra console; không có lỗi JavaScript.
7. Theo dõi CPU khi trang đứng yên; không có vòng lặp JavaScript liên tục.

## Giai đoạn 2: Làm thiệp lãng mạn, cá nhân hóa

### Mục tiêu

Thiệp tặng đúng 1 người (người yêu). Thêm cá nhân hóa, nhạc nền, tương tác hoa, bộ đếm ngày yêu và sao băng.

### Tính năng

#### 1. Cá nhân hóa

Object config đầu `main.js`:

```js
const CONFIG = {
  to: "Tên em",
  message: "Lời nhắn của anh",
  startDate: "2026-05-08", // ngày bắt đầu yêu
  music: "music.mp3", // file mp3 đặt cạnh index.html
};
```

Hiển thị tên + lời nhắn dạng chữ mờ nhẹ trên nền đêm, xuất hiện sau khi hoa nở xong (fade in chậm).

#### 2. Nhạc nền

- File `music.mp3` do người tặng cung cấp, đặt cạnh `index.html`.
- Trình duyệt chặn autoplay: phát khi có touch/click đầu tiên trên trang (chính là cú "mở thiệp").
- Nút bật/tắt tiếng góc trên trái, icon 🔊/🔇, nhỏ, mờ.

#### 3. Tương tác hoa

- Chạm/click vào hoa → hoa đó phát sáng mạnh hơn trong ~1.5s rồi trở lại bình thường.
- CSS class `.flower--glow` gán/bỏ bởi JS, transition opacity/filter, không loop mới.

#### 4. Bộ đếm ngày yêu

- Tính từ `CONFIG.startDate` (8/5/2026).
- Hiển thị góc trên phải, font nhỏ mờ: `X ngày Y giờ Z phút`.
- `setInterval` cập nhật mỗi phút — chi phí không đáng kể.
- Font `vmin`, không lấn át hoa.

#### 5. Sao băng

- 2–3 sao băng CSS thuần, vị trí/delay ngẫu nhiên do JS gán một lần (giống cách gió).
- Tần suất thưa, chạy chéo góc trên trời đêm, tự lặp lại với chu kỳ dài (CSS `animation-iteration-count: infinite`, delay lớn).

### Ràng buộc giữ nguyên

- Vanilla HTML/CSS/JS, không backend, không thư viện.
- Chỉ dùng transform/opacity/filter cho animation.
- `prefers-reduced-motion`: tắt sao băng và glow, nội dung vẫn hiện.
- Bộ đếm là vòng lặp JS duy nhất chạy liên tục (1 lần/phút, không phải rAF).

### Kiểm tra nghiệm thu giai đoạn 2

1. Chạm lần đầu → nhạc phát; nút góc trái bật/tắt được.
2. Click từng hoa → glow lên rồi tắt, không lỗi console.
3. Bộ đếm hiển thị đúng ngày/giờ/phút từ 8/5/2026, tăng sau mỗi phút.
4. Sao băng thưa, mượt, không cháy GPU trên điện thoại.
5. Tên + lời nhắn hiện đúng nội dung trong CONFIG.
6. `prefers-reduced-motion`: sao băng/glow tắt, chữ + đếm vẫn hiện.
7. Điện thoại: không cuộn ngang, không bị chữ đè lên hoa.

### Decision log (giai đoạn 2)

| Quyết định | Lựa chọn | Lý do |
|---|---|---|
| Cá nhân hóa | Config trong file | Chỉ người tặng chỉnh, không cần backend hay URL param |
| Nhạc | First-touch play + nút mute | Trình duyệt chặn autoplay; cú chạm đầu thành "mở thiệp" |
| Tương tác | Click hoa → glow | Đơn giản, đẹp, không cần rAF |
| Đếm ngày | setInterval 1 phút | Duy nhất 1 vòng lặp, chi phí không đáng kể |
| Sao băng | CSS thuần + JS gán delay 1 lần | Không thêm loop JS, tận dụng compositor |
| Ngày bắt đầu | 8/5/2026 | Do người tặng cung cấp |

## Decision log

| Quyết định | Lựa chọn | Lý do |
|---|---|---|
| Công nghệ | Vanilla HTML/CSS/JS | Project nhỏ; framework không làm chuyển động tự nhiên hơn |
| Random | JS gán biến CSS một lần | Có biến thiên mỗi lần mở, không tốn CPU liên tục |
| Animation | CSS transforms/opacity | Mượt, tận dụng compositor, phù hợp điện thoại |
| Mức gió | Rất nhẹ | Giữ cảm giác lãng mạn, tránh chóng mặt |
| Rendering | Giữ DOM hiện tại | Giảm rủi ro và số file thay đổi |
| Backend | Không dùng | Thiệp tĩnh không cần dữ liệu hay tài khoản |
| Accessibility | Hỗ trợ `prefers-reduced-motion` | Tôn trọng cài đặt chuyển động của người xem |
| Responsive | Điện thoại và máy tính | Người nhận có thể xem trên cả hai loại thiết bị |
