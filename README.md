# Threads Clone

Một ứng dụng mạng xã hội đầy đủ tính năng được xây dựng với Next.js 16, sao chép các tính năng cốt lõi của Threads với các công nghệ web hiện đại.

## Tech Stack

- **Framework**: Next.js 16.2.5 (App Router)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS v4
- **Xác thực**: Better Auth với email/password
- **Database ORM**: Prisma với PostgreSQL
- **Quản lý state**: Zustand
- **Data fetching**: TanStack Query (React Query)
- **Upload ảnh**: Cloudinary
- **UI Components**: Custom components với Lucide React icons
- **Thư viện bổ sung**:
  - emoji-picker-react
  - moment (thời gian tương đối)
  - react-hot-toast (thông báo)
  - react-intersection-observer (infinite scroll)

## Cấu Trúc Dự Án

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes (login, register, setup-username)
│   ├── (protected)/      # Protected routes (feed, profile, search, favorites)
│   │   ├── feed/         # Feed page with infinite scroll
│   │   ├── profile/     # User profile page
│   │   ├── search/      # User search page
│   │   ├── favorites/   # Liked posts page
│   │   └── [username]/ # Dynamic user profile route
│   ├── api/             # API routes
│   ├── components/      # Shared React components
│   │   ├── post/       # Post-related components (PostCard, Feed, LikeButton, etc.)
│   │   ├── profile/   # Profile components
│   │   ├── search/    # Search components
│   │   ├── shared/    # Shared UI components
│   │   ├── modals/    # Modal components
│   │   └── layout/    # Layout components
│   └── providers/      # React providers (QueryProvider)
├── lib/                 # Utility libraries
│   ├── auth.ts         # Better Auth configuration
│   ├── auth-client.ts # Auth client for frontend
│   ├── prisma.ts      # Prisma client instance
│   └── cloudinary.ts  # Cloudinary configuration
├── prisma/             # Prisma schema
│   └── schema.prisma  # Database schema
└── package.json       # Dependencies and scripts
```

## Tính Năng

### Xác Thực
- Đăng ký tài khoản với email/password
- Đăng nhập với email/password
- Luồng thiết lập username sau đăng ký
- Bảo vệ route với middleware

### Quản Lý Profile
- Xem profile người dùng (của mình và người khác)
- Chỉnh sửa profile (tên, bio, avatar)
- Thống kê profile (số bài viết, followers, following)
- Follow/Unfollow người dùng

### Bài Viết & Feed
- Tạo bài viết với text và ảnh
- Upload ảnh qua Cloudinary
- Tích hợp emoji picker
- Feed với infinite scroll
- Like/Unlike bài viết với optimistic updates
- Comment/Reply bài viết

### Tìm Kiếm & Khám Phá
- Tìm kiếm người dùng theo username hoặc name
- Tìm kiếm real-time với debounce

### Tính Năng Khác
- Trang Favorites (xem tất cả bài viết đã like)
- Responsive design với mobile menu
- Toast notifications
- Loading states và skeletons

## Bắt Đầu

### Yêu Cầu

- Node.js 18+
- Database PostgreSQL
- Tài khoản Cloudinary (cho upload ảnh)

### Cài Đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Cấu hình biến môi trường trong `.env`:
```env
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

3. Generate Prisma Client và push schema lên database:
```bash
npx prisma generate
npx prisma db push
```

4. Chạy development server:
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## Các Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production (bao gồm Prisma generate)
- `npm run start` - Chạy production server
- `npm run lint` - Chạy ESLint
- `npm run check` - Chạy Biome check với fixes

## Database Schema

Dự án sử dụng Prisma ORM với các models chính:

- **User** - Mở rộng từ Better Auth với các trường tùy chỉnh (username, bio, image)
- **Post** - Bài viết của người dùng với content, images
- **Comment** - Comments trên bài viết
- **Like** - User likes trên bài viết
- **Follow** - Quan hệ follow giữa các users

## API Routes

- `POST /api/auth/[...all]` - Better Auth endpoints
- `POST /api/setup-username` - Thiết lập username
- `PATCH /api/profile/update` - Cập nhật profile
- `GET /api/users/search` - Tìm kiếm users
- `POST /api/users/follow` - Follow/Unfollow user
- `GET /api/post` - Lấy danh sách bài viết (có pagination)
- `POST /api/post` - Tạo bài viết mới
- `POST /api/post/like` - Like/Unlike bài viết
- `POST /api/comments` - Tạo comment

## Deployment

Dự án được cấu hình sẵn cho deployment lên Vercel. Sau khi deploy, cập nhật biến môi trường `BETTER_AUTH_URL` thành URL production của bạn.

## License

MIT