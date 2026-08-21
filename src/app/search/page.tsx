"use client";

import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight text-foreground">
        Search
      </h1>
      <p className="mb-6 text-sm text-muted">
        Find subjects, units, and topics.
      </p>
      <SearchBar />
    </div>
  );
}
