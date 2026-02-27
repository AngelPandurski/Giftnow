/** Mock акаунти за тест (без backend). Премахва се при добавяне на база. */
export const MOCK_ACCOUNTS = [
  { email: "angel@test.com", password: "admin123", role: "admin" as const },
  { email: "ramona@test.com", password: "user123", role: "tenant" as const },
];
