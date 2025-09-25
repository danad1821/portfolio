"use client";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();
  return (
    <main>
      <section>
        <h1>Visitors to the Website in the past week</h1>
      </section>
      <section>
        <button
          onClick={() => {
            router.push("/admin/projects");
          }}
        >
          Change Projects
        </button>
        <button
          onClick={() => {
            router.push("/admin/resume");
          }}
        >
          Change Resume
        </button>
      </section>
    </main>
  );
}
