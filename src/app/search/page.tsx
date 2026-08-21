"use client";

import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
  return (
    <div>
      <section className="hero-gradient-subtle relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Search
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Find subjects, units, and topics.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <SearchBar />
      </div>
    </div>
  );
}
