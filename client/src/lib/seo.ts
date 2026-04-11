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

export function upsertCanonical(url: string) {
  let tag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.href = url;
}

export function updateDynamicSeo(title: string, description: string, url?: string) {
  // Page Title
  document.title = title;
  
  // Standard Meta
  upsertMeta("description", description);
  
  // Open Graph (Facebook, LinkedIn, iMessage...)
  upsertMeta("og:title", title, true);
  upsertMeta("og:description", description, true);
  upsertMeta("og:type", "website", true);
  
  // URL canonique pour éviter le duplicate content (fortement recommandé par Google)
  if (url) {
    let finalUrl = url;
    // Nettoyage optionnel des query params (si on ne souhaite pas qu'ils fassent partie de l'URL canonique)
    try {
        const urlObj = new URL(url);
        finalUrl = urlObj.origin + urlObj.pathname;
    } catch(e) {}
    upsertCanonical(finalUrl);
    upsertMeta("og:url", finalUrl, true);
  }
}

