"use client";

import { Suspense } from "react";
import FalhaPageContent from "./failedPageContent";

export default function FalhaPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <FalhaPageContent />
    </Suspense>
  );
}