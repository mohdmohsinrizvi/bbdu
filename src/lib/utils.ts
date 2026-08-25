import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case "BSC": return "Basic Science";
    case "ESC": return "Engineering Science";
    case "GP": return "General Proficiency";
    case "PCC": return "Professional Core";
    case "HSMC": return "Humanities & Social Sciences";
    default: return category;
  }
}
