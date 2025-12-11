import Link from "next/link";

export default function Container() {
  return (
    <section className="w-full">
      <div className="mx-auto w-[90%] px-4 py-8">
        <h1>Home</h1>
        <div className="mt-4">
          <Link href="/login">
            <button className="rounded-md bg-blue-500 p-2 px-8 text-white">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
