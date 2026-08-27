"use client";

import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
  return (
    <div>
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Search
          </h1>
          <p className="mt-2 text-sm text-muted">
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
