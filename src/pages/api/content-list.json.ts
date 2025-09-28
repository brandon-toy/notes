import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  try {
    const docs = await getCollection("docs");
    console.log("Docs found:", docs.length);
    docs.forEach((doc, index) => {
      console.log(`Doc ${index}:`, {
        slug: doc.slug,
        id: doc.id,
        title: doc.data.title,
        collection: doc.collection,
      });
    });

    const contentItems = docs
      .filter((doc) => {
        const identifier = doc.slug || doc.id;
        return (
          identifier && identifier !== "index" && identifier !== "contents"
        );
      }) // Exclude index and contents pages, and ensure identifier exists
      .map((doc) => {
        const identifier = doc.slug || doc.id;

        // Determine content type based on the identifier path
        let type: "book" | "note" | "guide" = "note";
        if (identifier && identifier.startsWith("books/")) {
          type = "book";
        } else if (identifier && identifier.startsWith("guides/")) {
          type = "guide";
        }

        return {
          title: doc.data.title || "Untitled",
          slug: identifier || "",
          type,
          description: doc.data.description || undefined,
        };
      });

    return new Response(JSON.stringify(contentItems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch content" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
