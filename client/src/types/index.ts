export interface Service {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: ServiceCategory;
  isActive?: boolean;
}

export type ServiceCategory =
  | "automation"
  | "database"
  | "storage"
  | "messaging"
  | "infrastructure"
  | "support"
  | "bot"
  | "other";
