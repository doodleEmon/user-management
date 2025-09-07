import UserDirectory from "@/components/userDirectory";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <Link href="/" className="text-2xl font-semibold">User Management</Link>
      <UserDirectory />
    </div>
  );
}
