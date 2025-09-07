import UserDirectory from "@/components/userDirectory";

export default function Home() {
  return (
    <div className="mx-12 my-8 shadow-md rounded-lg bg-white p-6">
      <a href="/" className="text-2xl font-semibold">User Management</a>
      <UserDirectory />
    </div>
  );
}
