import { Kit } from "@/components/Product/Kit";

const kit1: Kit = new Kit(
  1,
  "Kit Festa Infantil",
  "Kit completo para festas infantis com 50 docinhos variados, bolo decorado e cupcakes",
  "R$ 180,00",
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  "Festa Infantil",
  ["1 Bolo decorado", "30 Brigadeiros", "20 Cupcakes", "Decoração especial"],
  "Serve até 25 pessoas"
);

const kit2: Kit = new Kit(
    2,
    "Kit Casamento Elegante",
    "Kit sofisticado para casamentos com doces finos, bem-casados e bolo de noiva",
    "R$ 450,00",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    "Casamento",
    ["1 Bolo de noiva", "100 Bem-casados", "50 Doces finos", "Decoração luxuosa"],
    "Serve até 60 pessoas"
);

const kit3: Kit = new Kit(
    3,
    "Kit Aniversário Adulto",
    "Kit especial para aniversários adultos com tortas, trufas e doces gourmet",
    "R$ 220,00",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    "Aniversário",
    ["1 Torta especial", "40 Trufas", "30 Doces gourmet", "Velas especiais"],
    "Serve até 30 pessoas"
);

const kit4: Kit = new Kit(
    4,
    "Kit Chá de Bebê",
    "Kit delicado para chá de bebê com mini bolos, docinhos temáticos e decoração",
    "R$ 160,00",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    "Chá de Bebê",
    ["6 Mini bolos", "40 Docinhos temáticos", "20 Cupcakes", "Decoração temática"],
    "Serve até 20 pessoas"
);

const kit5: Kit = new Kit(
    5,
    "Kit Corporativo",
    "Kit profissional para eventos corporativos com doces sofisticados e apresentação elegante",
    "R$ 320,00",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    "Corporativo",
    ["80 Doces finos", "40 Mini tortas", "20 Éclairs", "Embalagem premium"],
    "Serve até 40 pessoas"
);

const kit6: Kit = new Kit(
    6,
    "Kit Romântico",
    "Kit especial para momentos românticos com doces afrodisíacos e decoração temática",
    "R$ 120,00",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    "Romântico",
    ["1 Bolo coração", "20 Morangos cobertos", "15 Trufas especiais", "Decoração romântica"],
    "Serve até 2 pessoas"
);



export const kitsData: Kit[] = [
 kit1, kit2, kit3, kit4, kit4, kit6
];