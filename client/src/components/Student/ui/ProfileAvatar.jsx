export default function ProfileAvatar() {
  return (
    <div className="p-[2px] rounded-full bg-[#A7E1B2]/40 hover:bg-[#009846]/30 transition cursor-pointer">
      <img
        src="/src/assets/profile.png"
        alt="User Avatar"
        className="h-8 w-8 rounded-full object-cover"
      />
    </div>
  );
}
