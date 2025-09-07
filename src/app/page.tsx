import UserDirectory from "@/components/userDirectory";

export default function Home() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <a href="/" className="text-2xl font-semibold">User Management</a>
      <UserDirectory />
    </div>
  );
}
