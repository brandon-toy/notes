import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async () => {
  try {
    // Get all content from the docs collection
    const allDocs = await getCollection("docs");

    // Debug: log what we're getting
    console.log(
      "All docs:",
      allDocs.map((doc) => ({ id: doc.id, slug: doc.slug }))
    );

    // Filter out index and contents pages (note: IDs don't include extensions)
    const contentDocs = allDocs.filter(
      (doc) => doc.id !== "index" && doc.id !== "contents"
    );

    console.log(
      "Filtered docs:",
      contentDocs.map((doc) => ({ id: doc.id, slug: doc.slug }))
    );

    // Get file stats for each document
    const docsWithStats = await Promise.all(
      contentDocs.map(async (doc) => {
        // Try different file extensions since the collection ID doesn't include them
        const basePath = path.join(process.cwd(), "src/content/docs", doc.id);
        const possiblePaths = [basePath + ".md", basePath + ".mdx"];

        for (const filePath of possiblePaths) {
          console.log(`Checking file: ${filePath}`);
          try {
            if (fs.existsSync(filePath)) {
              const stats = fs.statSync(filePath);
              console.log(`Found file: ${filePath}, modified: ${stats.mtime}`);
              return {
                title: doc.data.title,
                slug: `/${doc.id}/`,
                lastModified: stats.mtime.toISOString(),
                description: doc.data.description,
                type: doc.id.startsWith("books/") ? "book" : "note",
              };
            }
          } catch (error) {
            console.warn(`Could not get stats for ${filePath}:`, error);
            continue;
          }
        }

        console.warn(`No file found for any of: ${possiblePaths.join(", ")}`);
        return null;
      })
    );

    // Filter out null results and sort by modification time
    const validDocs = docsWithStats
      .filter((doc) => doc !== null)
      .sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
      )
      .slice(0, 2); // Get the 2 most recent

    return new Response(JSON.stringify(validDocs), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching recent notes:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch recent notes" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
