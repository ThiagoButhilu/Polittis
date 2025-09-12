"use client";

import { Suspense } from "react";
import SucessoPageContent from "./successPageContent";

export default function SucessoPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <SucessoPageContent />
    </Suspense>
  );
}
