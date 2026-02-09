"use client";

import { useEffect, useState } from "react";
import { ResourceKey } from "@/lib/i18n/resources";

type ItemsClientProps = {
  dictionary: Record<ResourceKey, string>;
};

type ItemsResponse = {
  items: string[];
  error?: string;
};

export default function ItemsClient({ dictionary }: ItemsClientProps) {
  const [items, setItems] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items", { cache: "no-store" });
        const data = (await response.json()) as ItemsResponse;
        if (!response.ok) {
          throw new Error(data.error ?? "Unknown error");
        }
        setItems(data.items);
      } catch (err) {
        console.error("Failed to load containers", err);
        setError(dictionary.itemsError);
      } finally {
        setLoading(false);
      }
    };

    fetchItems().catch((err) => console.error(err));
  }, [dictionary.itemsError]);

  if (loading) {
    return <p className="text-sm text-ink/70">{dictionary.itemsLoading}</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-ink/70">{dictionary.itemsEmpty}</p>;
  }

  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="rounded-2xl border border-black/10 bg-white/80 p-4">
          {item}
        </li>
      ))}
    </ul>
  );
}
