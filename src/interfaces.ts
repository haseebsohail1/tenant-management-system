// src/types.ts or src/interfaces.ts
export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  "created At"?: string;
  [key: string]: string | undefined;
}
