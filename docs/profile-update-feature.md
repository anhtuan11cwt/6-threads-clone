# Real-time Image Synchronization Documentation

## Overview
Chức năng đồng bộ ảnh đại diện real-time giữa EditProfileModal và ProfileCard, cho phép người dùng thấy ảnh cập nhật ngay lập tức mà không cần reload trang.

## Problem & Solution

### Problem
Khi user upload ảnh mới trong EditProfileModal và nhấn "Lưu hồ sơ":
- Phải reload trang mới thấy ảnh được cập nhật trong ProfileCard

### Solution
Sử dụng ProfileContext để đồng bộ dữ liệu ảnh real-time giữa 2 components:
1. **EditProfileModal** - Form upload và cập nhật ảnh
2. **ProfileCard** - Hiển thị ảnh đại diện trong profile page

## Technical Implementation

### Architecture
```
Protected Layout (ProfileProvider)
├── EditProfileModal ←→ ProfileContext ←→ ProfileCard
└── Other Protected Routes
```

### Key Components

#### 1. ProfileContext (`app/contexts/ProfileContext.tsx`)
```tsx
// Global state cho profile data
const [profile, setProfile] = useState<UserProfile | null>(null);

// Update function cho real-time sync
const updateProfile = (updates: Partial<UserProfile>) => {
  if (profile) {
    setProfile({ ...profile, ...updates });
  }
};
```

#### 2. EditProfileModal (`app/components/modals/EditProfileModal.tsx`)
```tsx
const { updateProfile } = useProfile();

const handleSubmit = async (e: React.MouseEvent) => {
  await axios.patch("/api/profile/update", formData);
  
  // Đồng bộ ảnh ngay lập tức
  updateProfile({
    image: imagePreview, // URL ảnh mới
    name, username, bio
  });
  
  toast.success("Cập nhật hồ sơ thành công");
};
```

#### 3. ProfileCard (`app/components/profile/profile-card.tsx`)
```tsx
// Hiển thị ảnh từ ProfileContext
<Image
  src={userProfile.image || "/avatar.png"}
  alt={userProfile.name || "Avatar"}
  className="object-cover"
  fill
/>
```

### Data Flow for Image Sync

1. **User uploads ảnh mới** trong EditProfileModal
2. **Form submission** gửi đến `/api/profile/update`
3. **API updates** database với ảnh mới
4. **updateProfile()** được gọi với `imagePreview` URL
5. **ProfileContext** updates global state
6. **ProfileCard** re-renders với ảnh mới **ngay lập tức**

## File Structure

```
app/
├── contexts/
│   └── ProfileContext.tsx          # Global state management
├── components/
│   ├── modals/
│   │   └── EditProfileModal.tsx    # Upload form + updateProfile()
│   └── profile/
│       └── profile-card.tsx        # Display image from context
├── (protected)/
│   └── layout.tsx                  # ProfileProvider wrapper
└── api/
    └── profile/update/
        └── route.ts                # Image upload API
```

## Key Benefits

1. **Instant Visual Feedback** - Ảnh cập nhật ngay lập tức trong ProfileCard
2. **No Page Reload** - Trải nghiệm mượt mà, không gián đoạn
3. **Real-time Sync** - Dữ liệu đồng bộ giữa tất cả components
4. **Type Safety** - Full TypeScript support

## Usage Example

```tsx
// Trong EditProfileModal
const { updateProfile } = useProfile();

// Sau khi upload thành công
updateProfile({ image: newImageUrl });

// ProfileCard tự động cập nhật
<Image src={profile.image} />
```

## Notes

- Image preview hiển thị ngay khi user chọn file
- Context được bọc trong protected layout để global access
- Server-side data được sync với client-side state
