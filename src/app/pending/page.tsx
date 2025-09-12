"use client";

import { Suspense } from "react";
import PendentePageContent from "./pendingPageContent";

export default function PendentePage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <PendentePageContent />
    </Suspense>
  );
}
