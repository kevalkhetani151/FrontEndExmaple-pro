import { environment } from "@src/config/config";

export const ROLES = {
  admin: "ADMIN",
  customer: "CUSTOMER",
} as const;

interface User {
  id: number;
  name: string;
  totalPoints: number;
  rank: number;
}

export const usersData: User[] = [
  { id: 1, name: "Alice", totalPoints: 120, rank: 2 },
  { id: 2, name: "Bob", totalPoints: 150, rank: 1 },
  { id: 3, name: "Charlie", totalPoints: 80, rank: 3 },
  { id: 4, name: "David", totalPoints: 60, rank: 4 },
];

export const sortOptions = [
  { label: "Sort by Day", value: "day" },
  { label: "Sort by Month", value: "month" },
  { label: "Sort by Year", value: "year" },
];

export type RoleType = keyof typeof ROLES;

export const isDevEnv: boolean = environment === "development";
