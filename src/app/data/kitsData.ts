import { Kit } from "@/components/Product/Kit";

const kit1: Kit = {
  id: 1,
  name: "Kit Festa Infantil",
  description: "Kit completo para festas infantis com 50 docinhos variados, bolo decorado e cupcakes",
  price: "R$ 180,00",
  image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  category: "Festa Infantil",
  items: ["1 Bolo decorado", "30 Brigadeiros", "20 Cupcakes", "Decoração especial"],
  serves: "Serve até 25 pessoas"
};

const kit2: Kit = {
  id: 2,
  name: "Kit Casamento Elegante",
  description: "Kit sofisticado para casamentos com doces finos, bem-casados e bolo de noiva",
  price: "R$ 450,00",
  image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  category: "Casamento",
  items: ["1 Bolo de noiva", "100 Bem-casados", "50 Doces finos", "Decoração luxuosa"],
  serves: "Serve até 60 pessoas"
};

const kit3: Kit = {
  id: 3,
  name: "Kit Aniversário Adulto",
  description: "Kit especial para aniversários adultos com tortas, trufas e doces gourmet",
  price: "R$ 220,00",
  image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  category: "Aniversário",
  items: ["1 Torta especial", "40 Trufas", "30 Doces gourmet", "Velas especiais"],
  serves: "Serve até 30 pessoas"
};

const kit4: Kit = {
  id: 4,
  name: "Kit Chá de Bebê",
  description: "Kit delicado para chá de bebê com mini bolos, docinhos temáticos e decoração",
  price: "R$ 160,00",
  image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  category: "Chá de Bebê",
  items: ["6 Mini bolos", "40 Docinhos temáticos", "20 Cupcakes", "Decoração temática"],
  serves: "Serve até 20 pessoas"
};

const kit5: Kit = {
  id: 5,
  name: "Kit Corporativo",
  description: "Kit profissional para eventos corporativos com doces sofisticados e apresentação elegante",
  price: "R$ 320,00",
  image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  category: "Corporativo",
  items: ["80 Doces finos", "40 Mini tortas", "20 Éclairs", "Embalagem premium"],
  serves: "Serve até 40 pessoas"
};

const kit6: Kit = {
  id: 6,
  name: "Kit Romântico",
  description: "Kit especial para momentos românticos com doces afrodisíacos e decoração temática",
  price: "R$ 120,00",
  image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  category: "Romântico",
  items: ["1 Bolo coração", "20 Morangos cobertos", "15 Trufas especiais", "Decoração romântica"],
  serves: "Serve até 2 pessoas"
};



export const kitsData: Kit[] = [
 kit1, kit2, kit3, kit4, kit5, kit6
];