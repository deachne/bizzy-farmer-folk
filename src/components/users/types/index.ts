
// User type definition
export interface User {
  id: number;
  displayName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  status: string;
  created: string;
  initial: string;
}

// Default users if no users in localStorage
export const defaultUsers: User[] = [
  {
    id: 1,
    displayName: "Admin User",
    username: "admin",
    email: "admin@example.com",
    phoneNumber: "",
    password: "password123",
    role: "admin",
    status: "active",
    created: "12/31/2022",
    initial: "A"
  },
  {
    id: 2,
    displayName: "Regular User",
    username: "user",
    email: "user@example.com",
    phoneNumber: "",
    password: "password123",
    role: "user",
    status: "active",
    created: "2/14/2023",
    initial: "R"
  },
  {
    id: 3,
    displayName: "Moderator User",
    username: "moderator",
    email: "moderator@example.com",
    phoneNumber: "",
    password: "password123",
    role: "moderator",
    status: "active",
    created: "3/19/2023",
    initial: "M"
  }
];
