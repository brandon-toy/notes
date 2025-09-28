import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  getContentSlug,
  shouldExcludeFromContentList,
} from "../../utils/paths";

export const GET: APIRoute = async () => {
  try {
    const docs = await getCollection("docs");
    console.log("Docs found:", docs.length);
    docs.forEach((doc, index) => {
      console.log(`Doc ${index}:`, {
        slug: getContentSlug(doc),
        title: doc.data.title,
        collection: doc.collection,
      });
    });

    const contentItems = docs
      .filter((doc) => {
        const slug = getContentSlug(doc);
        return !shouldExcludeFromContentList(slug);
      })
      .map((doc) => {
        const slug = getContentSlug(doc);

        return {
          title: doc.data.title || "Untitled",
          slug,
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
