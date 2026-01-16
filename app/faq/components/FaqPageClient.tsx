"use client";

import { useState, useMemo } from "react";
import { FaqHero } from "./FaqHero";
import { FaqTwoColumn, FaqCategory } from "./FaqTwoColumn";
import Padding from "@/app/components/ui/Padding";

interface FaqPageClientProps {
  categories: FaqCategory[];
}

export function FaqPageClient({ categories }: FaqPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return null;

    const allItems = categories.flatMap(category => category.items);
    return allItems.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  return (
    <>
      <FaqHero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Padding desktop="40px" mobile="20px" />
      <Padding desktop="0px" mobile="20px" />
      <FaqTwoColumn categories={categories} searchResults={filteredItems} />
    </>
  );
}
