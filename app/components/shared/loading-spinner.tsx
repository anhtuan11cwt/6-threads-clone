export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="size-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}
