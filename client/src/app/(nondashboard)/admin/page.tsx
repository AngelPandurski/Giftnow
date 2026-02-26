/** Админ страница – регистрация на потребители (само за роля admin) */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminPage = () => {
  const { user: authUser, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
    const role = authUser?.userRole?.toLowerCase();
    if (role !== "admin") router.replace("/", { scroll: false });
  }, [authUser, isLoading, router]);

  if (isLoading) return <>Loading...</>;
  if (authUser?.userRole?.toLowerCase() !== "admin") return null;

  return <AdminContent />;
};

function AdminContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !password || !role) {
      setMessage({ type: "error", text: "Попълнете всички полета." });
      return;
    }

    // Mock – ще се свърже с backend API
    setMessage({
      type: "success",
      text: "Потребителят ще се създаде чрез backend API. (Mock)",
    });
    setEmail("");
    setPassword("");
    setRole("");
  };

  const mockUsers = [
    { id: 1, email: "user1@example.com", role: "tenant" },
    { id: 2, email: "user2@example.com", role: "manager" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Админ панел</h1>

        {/* Регистрация на потребител */}
        <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            Регистрирай потребител
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Парола</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="role">Роля</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Избери роля" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {message && (
              <p
                className={`text-sm ${
                  message.type === "success" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Създай потребител
            </Button>
          </form>
        </section>

        {/* Списък потребители (mock) */}
        <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Регистрирани потребители
          </h2>
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center py-3 px-4 rounded-lg bg-emerald-50/50 border border-emerald-100"
              >
                <span className="text-gray-700">{user.email}</span>
                <span className="text-sm text-emerald-700 font-medium capitalize">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Данните ще идват от backend API.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
