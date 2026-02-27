/** Админ страница – регистрация, статистика, управление на продукти */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { UserPlus, Users, Eye, Package } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getViewCount, type ViewPeriod } from "@/lib/viewCount";

const PERIOD_LABELS: Record<ViewPeriod, string> = {
  daily: "Дневна",
  weekly: "Седмична",
  monthly: "Месечна",
  yearly: "Годишна",
  all: "Общо",
};

const AdminPage = () => {
  const { user: authUser, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
    if (authUser?.userRole?.toLowerCase() !== "admin") router.replace("/", { scroll: false });
  }, [authUser, isLoading, router]);

  if (isLoading) return <>Loading...</>;
  if (authUser?.userRole?.toLowerCase() !== "admin") return null;

  return <AdminContent />;
};

function AdminContent() {
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>("all");
  const viewCount = getViewCount(viewPeriod);

  return (
    <div className="min-h-screen relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Замъглена снимка като фон – като на hero секцията */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: "url(/login-bg.png)",
          filter: "blur(4px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/60 to-teal-50/40" aria-hidden />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Админ панел</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Регистрация на потребител – горе в ляво */}
          <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-600" />
              Регистрирай потребител
            </h2>
            <UserRegistrationForm />
          </section>

          {/* Статистика – прегледи */}
          <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              Прегледи на сайта
            </h2>
            <div className="space-y-4">
              <Label>Период</Label>
              <Select value={viewPeriod} onValueChange={(v) => setViewPeriod(v as ViewPeriod)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(PERIOD_LABELS) as ViewPeriod[]).map((p) => (
                    <SelectItem key={p} value={p}>
                      {PERIOD_LABELS[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-3xl font-bold text-emerald-600">{viewCount}</div>
              <p className="text-sm text-gray-500">брой посещения</p>
            </div>
          </section>

          {/* Празно или допълнителна секция */}
          <section className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Регистрирани потребители
            </h2>
            <p className="text-sm text-gray-500">Данните ще идват от backend API.</p>
          </section>
        </div>

        {/* Артикули – линк към страница за редактиране */}
        <section className="mt-8">
          <Link
            href="/admin/products"
            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md hover:border-emerald-200 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 flex items-center justify-center group-hover:bg-emerald-200/80 transition-colors">
              <Package className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                Артикули (подаръци)
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Редактиране на артикули, снимки и описания в каталога
              </p>
            </div>
            <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}

function UserRegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!email || !password || !role) {
      setMessage({ type: "error", text: "Попълнете всички полета." });
      return;
    }
    setMessage({ type: "success", text: "Потребителят ще се създаде чрез backend API. (Mock)" });
    setEmail("");
    setPassword("");
    setRole("");
  };

  return (
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
        <Label>Роля</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Избери роля" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {message && (
        <p className={`text-sm ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
        Създай потребител
      </Button>
    </form>
  );
}

export default AdminPage;
