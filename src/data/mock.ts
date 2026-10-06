export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  prepTime: string;
  color: string;
};

export const products: Product[] = [
  {
    id: "brownie",
    name: "Brownie de Nutella",
    description:
      "Massa cremosa, chocolate belga e um centro generoso de Nutella.",
    price: 22,
    category: "Brownies",
    prepTime: "15 min",
    color: "#704332",
  },
  {
    id: "morango",
    name: "Bombom de Morango",
    description: "Morango fresco envolvido em brigadeiro branco e chocolate.",
    price: 18,
    category: "Doces",
    prepTime: "10 min",
    color: "#c9575b",
  },
  {
    id: "cookie",
    name: "Cookie de Chocolate",
    description: "Cookie macio com gotas de chocolate meio amargo.",
    price: 20,
    category: "Cookies",
    prepTime: "12 min",
    color: "#a66b43",
  },
  {
    id: "cupcake",
    name: "Cupcake de Baunilha",
    description: "Massa leve, cobertura cremosa e toque de baunilha.",
    price: 16,
    category: "Bolos",
    prepTime: "8 min",
    color: "#d29a67",
  },
];

export const orders = [
  {
    id: "1048",
    customer: "Maria Oliveira",
    item: "2 Brownies de Nutella",
    status: "Em preparo",
    total: 48,
    time: "Hoje, 10:24",
    color: "#f3c45e",
  },
  {
    id: "1047",
    customer: "Rafael Lima",
    item: "1 Cupcake de morango",
    status: "Pronto",
    total: 33,
    time: "Hoje, 09:48",
    color: "#78b58a",
  },
  {
    id: "1046",
    customer: "Laura Mendes",
    item: "1 Cookie de chocolate",
    status: "A caminho",
    total: 29,
    time: "Ontem, 18:12",
    color: "#8baed0",
  },
];

export const money = (value: number) =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;
