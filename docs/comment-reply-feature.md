# Tài liệu Chức năng Bình luận/Trả lời (Comment/Reply)

## Tổng quan

Chức năng bình luận và trả lời cho phép người dùng tương tác với các bài đăng thông qua hệ thống bình luận đa cấp. Người dùng có thể bình luận vào bài đăng và trả lời các bình luận khác.

## Cấu trúc Component

### 1. Backend Components

#### `app/actions/comment.action.ts`
- **`getComments(postId: string)`**: Lấy danh sách bình luận của một bài đăng
- Xử lý cấu trúc dữ liệu phẳng thành dạng cây (nested comments)
- Sắp xếp bình luận theo thời gian tăng dần, sau đó đảo ngược để bình luận mới nhất lên đầu

#### `app/api/comments/route.ts`
- **POST `/api/comments`**: API endpoint tạo bình luận mới
- Xác thực người dùng và validate dữ liệu đầu vào
- Hỗ trợ cả bình luận gốc và trả lời bình luận (thông qua `parentId`)

### 2. Frontend Components

#### `app/components/post/CommentCard.tsx`
Component hiển thị một bình luận với các tính năng:
- Hiển thị thông tin tác giả (avatar, tên, username)
- Hiển thị nội dung bình luận
- Hiển thị thời gian đăng (dùng moment.js với locale vi)
- Nút trả lời
- Hỗ trợ hiển thị các bình luận con (replies) với độ sâu lồng nhau
- Xử lý thụt lề cho các cấp bình luận khác nhau

**Cấu trúc độ sâu:**
- `depth = 0`: Bình luận gốc
- `depth = 1`: Trả lời cấp 1 (thụt lề qua flex-1)
- `depth > 1`: Trả lời lồng nhau (căn chỉnh với depth 1)

#### `app/components/post/comments.tsx`
Component hiển thị danh sách bình luận của một bài đăng:
- Lấy dữ liệu từ server action `getComments`
- Hiển thị thông báo khi chưa có bình luận
- Hiển thị bình luận gốc với các bình luận con

#### `app/components/post/comment-reply-button.tsx`
Nút "Trả lời" cho mỗi bình luận:
- Mở modal trả lời
- Truyền thông tin bình luận hiện tại vào modal

#### `app/components/modals/reply-modal.tsx`
Modal trả lời bình luận và bài đăng:
- Hiển thị thông tin bài đăng/bình luận đang trả lời
- Form nhập nội dung trả lời
- Xử lý submit đến API `/api/comments`
- Hiển thị loading state và thông báo success/error
- Tự động đóng modal và refresh dữ liệu sau khi thành công

#### `app/components/post/post-actions.tsx`
Các hành động cho bài đăng:
- Nút thích (chưa triển khai logic)
- Nút bình luận (mở modal trả lời)

#### `app/components/post/PostCard.tsx`
Component hiển thị bài đăng với:
- Thông tin bài đăng và tác giả
- Nút hành động (thích, bình luận)
- Hiển thị/ẩn danh sách bình luận
- Tải bình luận khi cần

#### `app/components/post/PostLoader.tsx`
Component server-side để tải bài đăng chi tiết:
- Lấy bài đăng theo ID
- Hiển thị PostCard ở chế độ chi tiết

### 3. State Management

#### `app/store/use-post-store.ts`
Zustand store quản lý trạng thái bài đăng được chọn:
- `selectedPost`: Lưu trữ thông tin bài đăng/bình luận đang được chọn để trả lời
- `setSelectedPost`: Cập nhật bài đăng được chọn

#### `app/store/useModalStore.ts`
Zustand store quản lý trạng thái modal:
- `isReplyModalOpen`: Trạng thái mở/đóng modal trả lời
- `setIsReplyModalOpen`: Cập nhật trạng thái modal

## Luồng hoạt động

### 1. Bình luận vào bài đăng
1. Người dùng click nút bình luận (icon MessageCircle) trên PostCard
2. `handleComment()` trong PostActions được gọi
3. `setSelectedPost(post)` lưu thông tin bài đăng
4. `setIsReplyModalOpen(true)` mở modal trả lời
5. ReplyModal hiển thị với thông tin bài đăng
6. Người dùng nhập nội dung và click "Đăng"
7. `handleSubmit()` gửi request đến `/api/comments` với `parentId: null`
8. Server tạo bình luận mới và trả về dữ liệu
9. Modal đóng, toast thông báo thành công, refresh dữ liệu

### 2. Trả lời bình luận
1. Người dùng click nút "Trả lời" trên CommentCard
2. `handleReply()` trong CommentReplyButton được gọi
3. `setSelectedPost()` lưu thông tin bình luận (bao gồm `postId`)
4. `setIsReplyModalOpen(true)` mở modal trả lời
5. ReplyModal hiển thị với thông tin bình luận đang trả lời
6. Người dùng nhập nội dung và click "Đăng"
7. `handleSubmit()` gửi request đến `/api/comments` với `parentId: commentId`
8. Server tạo bình luận trả lời và trả về dữ liệu
9. Modal đóng, toast thông báo thành công, refresh dữ liệu

### 3. Hiển thị bình luận
1. Component Comments/PostCard gọi `getComments(postId)`
2. Server action lấy dữ liệu từ database
3. Dữ liệu phẳng được cấu trúc thành dạng cây
4. CommentCard render đệ quy các bình luận con
5. UI hiển thị với thụt lề theo độ sâu

## Database Schema

### Comment Model
```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
  
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  parentId  String?
  replies   Comment[] @relation("CommentReplies")
}
```

## Validation và Error Handling

### Client-side Validation
- Kiểm tra nội dung không được rỗng trước khi submit
- Disable nút đăng khi đang loading hoặc nội dung rỗng

### Server-side Validation
- Kiểm tra người dùng đã đăng nhập
- Kiểm tra nội dung không được rỗng
- Kiểm tra postId có hợp lệ

### Error Messages
- 401: "Không được phép" - Chưa đăng nhập
- 400: "Nội dung là bắt buộc" - Nội dung rỗng
- 400: "Post ID là bắt buộc" - Thiếu postId
- 500: "Lỗi máy chủ nội bộ" - Lỗi server

## UI/UX Features

### Responsive Design
- Avatar size thay đổi theo độ sâu bình luận (40px cho gốc, 32px cho replies)
- Thụt lề hợp lý cho các cấp bình luận
- Mobile-friendly layout

### Loading States
- Hiển thị "Đang tải..." khi fetch bình luận
- Hiển thị spinner khi submit bình luận
- Disable buttons trong quá trình xử lý

### Feedback
- Toast notifications cho success/error
- Hover states cho các interactive elements
- Smooth transitions

### Localization
- Sử dụng tiếng Việt cho tất cả UI text
- Moment.js với locale "vi" cho định dạng thời gian
- Error messages bằng tiếng Việt

## Performance Considerations

### Caching
- Sử dụng React Query cache cho comments data
- Invalidate cache khi có bình luận mới

### Lazy Loading
- Comments chỉ được tải khi người dùng click để xem
- Server-side rendering cho initial page load

### Database Optimization
- Index trên `postId` và `parentId` cho query nhanh
- N+1 query prevention với Prisma includes

## Future Enhancements

### Planned Features
- Like/unlike comments
- Edit/delete comments
- Rich text editor for comments
- Image attachments in comments
- Comment pagination
- Real-time comment updates

### Technical Improvements
- WebSocket integration for real-time updates
- Optimistic UI updates
- Infinite scroll for comments
- Comment moderation tools
