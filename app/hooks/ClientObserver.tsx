"use client";

import { useEffect } from "react";

export default function ClientObserver({
  attributes,
}: {
  attributes: string[];
}) {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const { type, attributeName } = mutation || {};
        if (
          type === "attributes" &&
          typeof attributeName === "string" &&
          attributes.includes(attributeName)
        ) {
          document.documentElement.removeAttribute(attributeName);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: attributes,
    });

    return () => {
      observer.disconnect();
    };
  }, [attributes]);

  return null;
}
