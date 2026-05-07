# Setup Username API – Tài liệu Postman

**Base URL**: `http://localhost:3000`  
**Prefix**: `/api/setup-username`

---

## 1. Thiết lập username

- **Method**: POST
- **URL**: `http://localhost:3000/api/setup-username`
- **Authorization**: Có (yêu cầu đăng nhập)
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {JWT_TOKEN}` (token từ đăng nhập)
- **Body** (raw JSON):

```json
{
  "username": "nguyenvana"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "success": true
}
```

  - 400 (thiếu username):

```json
{
  "error": "Username là bắt buộc"
}
```

  - 400 (username chứa ký tự không hợp lệ):

```json
{
  "error": "Username chỉ được chứa chữ thường, số và dấu _"
}
```

  - 400 (username đã tồn tại):

```json
{
  "error": "Username đã tồn tại"
}
```

  - 401 (chưa đăng nhập):

```json
{
  "error": "Chưa được xác thực"
}
```

  - 500 (lỗi máy chủ):

```json
{
  "error": "Lỗi máy chủ nội bộ"
}
```

---

## Ghi chú

- **Username**: Chỉ chấp nhận chữ thường (a-z), số (0-9), và dấu gạch dưới (`_`).
- **Xác thực**: Gửi token qua header `Authorization: Bearer {token}`.
- **Luồng**: API này dùng để user thiết lập username sau khi đăng ký tài khoản thành công.
- **Ràng buộc**: Username phải duy nhất trong hệ thống.