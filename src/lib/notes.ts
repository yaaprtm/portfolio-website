import fs from "fs";
import path from "path";

export interface Note {
  slug: string;
  title: string;
  date: string;
  category: "Networking" | "Android" | "IT Support";
  summary: string;
  content: string;
}

const notesDirectory = path.join(process.cwd(), "content", "notes");

/**
 * Simple Node.js Frontmatter parser regex helper
 */
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const yamlStr = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  yamlStr.split(/\r?\n/).forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content };
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug: (data.slug as string) || slug,
        title: (data.title as string) || "Tanpa Judul",
        date: (data.date as string) || "2026-01-01",
        category: (data.category as Note["category"]) || "Networking",
        summary: (data.summary as string) || "",
        content,
      };
    });

  // Sort by date descending
  return allNotes.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoteBySlug(slug: string): Note | null {
  const all = getAllNotes();
  return all.find((n) => n.slug === slug) || null;
}
