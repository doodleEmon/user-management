import SearchBar from "@/components/searchBar";

export default function Home() {
  return (
    <div className="mx-12 my-8 shadow rounded bg-white p-6">
      <h3 className="text-2xl font-semibold">User Management</h3>
      <SearchBar />
    </div>
  );
}
