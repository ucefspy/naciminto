/**
 * Upserts a meta tag in the document head.
 * If the tag exists, it updates its content. If not, it creates it.
 */
export function upsertMeta(nameOrProperty: string, content: string, isOpengraph: boolean = false) {
  const attribute = isOpengraph ? "property" : "name";
  let tag = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`) as HTMLMetaElement | null;
  
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, nameOrProperty);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

export function updateDynamicSeo(title: string, description: string) {
  // Page Title
  document.title = title;
  
  // Standard Meta
  upsertMeta("description", description);
  
  // Open Graph (Facebook, LinkedIn, iMessage...)
  upsertMeta("og:title", title, true);
  upsertMeta("og:description", description, true);
  upsertMeta("og:type", "website", true);
}
