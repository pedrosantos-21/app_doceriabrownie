import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  orders as initialOrders,
  type Order,
  type OrderStatus,
} from "../data/mock";

const ORDERS_STORAGE_KEY = "@doceriabrownie/orders";
const validStoredStatuses = [
  "Em preparo",
  "Pronto",
  "Enviado para entrega",
  "Entregue",
  "A caminho",
  "Enviado para entrega...",
];

type NewOrder = {
  item: string;
  quantity: number;
  total: number;
  notes: string;
};

type OrdersContextValue = {
  orders: Order[];
  isOrdersLoaded: boolean;
  createOrder: (order: NewOrder) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
};

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

function isOrder(value: unknown): value is Order {
  if (!value || typeof value !== "object") return false;
  const order = value as Record<string, unknown>;
  return (
    typeof order.id === "string" &&
    typeof order.customer === "string" &&
    typeof order.item === "string" &&
    validStoredStatuses.includes(String(order.status)) &&
    typeof order.total === "number" &&
    typeof order.time === "string" &&
    typeof order.color === "string" &&
    (order.notes === undefined || typeof order.notes === "string")
  );
}

function normalizeOrderStatus(status: string): OrderStatus {
  switch (status) {
    case "Em preparo":
    case "Pronto":
    case "Enviado para entrega":
    case "Entregue":
      return status;
    case "A caminho":
    case "Enviado para entrega...":
      return "Enviado para entrega";
    default:
      throw new Error(`Status de pedido desconhecido: ${status}`);
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isOrdersLoaded, setIsOrdersLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
        if (storedOrders) {
          const parsedOrders: unknown = JSON.parse(storedOrders);
          if (!Array.isArray(parsedOrders) || !parsedOrders.every(isOrder)) {
            throw new Error("Os pedidos salvos estão em um formato inválido.");
          }
          const migratedOrders = parsedOrders.map((order) => ({
            ...order,
            status: normalizeOrderStatus(order.status),
          }));
          if (isMounted) setOrders(migratedOrders);
        }
      } catch (error) {
        console.error("Não foi possível carregar os pedidos salvos:", error);
      } finally {
        if (isMounted) setIsOrdersLoaded(true);
      }
    };

    void loadOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  const createOrder = async (request: NewOrder) => {
    if (!isOrdersLoaded) {
      throw new Error("Os pedidos ainda estão carregando. Tente novamente.");
    }

    const now = new Date();
    const lastUsedId = orders.reduce((maxId, order) => {
      const numericId = Number(order.id);
      return Number.isSafeInteger(numericId) ? Math.max(maxId, numericId) : maxId;
    }, now.getTime());
    const newOrder: Order = {
      id: `${lastUsedId + 1}`,
      customer: "Ana Carolina",
      item: `${request.quantity} ${request.item}`,
      status: "Em preparo",
      total: request.total,
      time: `Hoje, ${now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      color: "#7f263f",
      ...(request.notes.trim() ? { notes: request.notes.trim() } : {}),
    };
    const updatedOrders = [newOrder, ...orders];

    await AsyncStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(updatedOrders),
    );
    setOrders(updatedOrders);
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    if (!isOrdersLoaded) {
      throw new Error("Os pedidos ainda estão carregando. Tente novamente.");
    }

    if (!orders.some((order) => order.id === orderId)) {
      throw new Error("O pedido não foi encontrado.");
    }

    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order,
    );
    await AsyncStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(updatedOrders),
    );
    setOrders(updatedOrders);
  };

  return (
    <OrdersContext.Provider
      value={{ orders, isOrdersLoaded, createOrder, updateOrderStatus }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders deve ser usado dentro de OrdersProvider.");
  }
  return context;
}
