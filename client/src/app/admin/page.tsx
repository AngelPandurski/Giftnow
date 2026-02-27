/** Админ страница – регистрация, статистика, управление на продукти */
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
import {
  UserPlus,
  Users,
  Eye,
  Package,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  loadProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  type Product,
} from "@/lib/productsStore";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  const viewCount = getViewCount(viewPeriod);

  const refreshProducts = () => setProducts(loadProducts());

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

        {/* Управление на артикули */}
        <section className="mt-8 bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            Артикули (подаръци)
          </h2>
          <ProductsManager
            products={products}
            onRefresh={refreshProducts}
            editingId={editingId}
            onEdit={setEditingId}
          />
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

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ProductsManager({
  products,
  onRefresh,
  editingId,
  onEdit,
}: {
  products: Product[];
  onRefresh: () => void;
  editingId: string | null;
  onEdit: (id: string | null) => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addProduct({
      title: newTitle.trim(),
      shortDescription: newDesc.trim() || "—",
      imageUrl: newImage || undefined,
    });
    setNewTitle("");
    setNewDesc("");
    setNewImage(null);
    setShowAdd(false);
    onRefresh();
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 800 * 1024) {
      alert("Макс. 800 KB за снимка.");
      return;
    }
    setNewImage(await fileToDataUrl(file));
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setShowAdd(!showAdd)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Добави артикул
      </Button>

      {showAdd && (
        <form onSubmit={handleAdd} className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-3">
          <Input
            placeholder="Заглавие на артикула"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <Input
            placeholder="Кратко описание (напр. 2 бр.)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <div>
            <Label className="text-sm">Снимка</Label>
            <div className="mt-1 flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="max-w-[200px]"
              />
              {newImage && (
                <>
                  <div className="w-12 h-12 rounded overflow-hidden border flex-shrink-0">
                    <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => setNewImage(null)}>
                    Махни
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">Запази</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowAdd(false)}>Отказ</Button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {products.map((p) => (
          <ProductRow
            key={p.id}
            product={p}
            isEditing={editingId === p.id}
            onEdit={() => onEdit(editingId === p.id ? null : p.id)}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  );
}

function ProductRow({
  product,
  isEditing,
  onEdit,
  onRefresh,
}: {
  product: Product;
  isEditing: boolean;
  onEdit: () => void;
  onRefresh: () => void;
}) {
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.shortDescription);
  const [imageUrl, setImageUrl] = useState<string | undefined>(product.imageUrl);

  useEffect(() => {
    setTitle(product.title);
    setDesc(product.shortDescription);
    setImageUrl(product.imageUrl);
  }, [product.title, product.shortDescription, product.imageUrl]);

  const handleSave = () => {
    updateProduct(product.id, { title, shortDescription: desc, imageUrl: imageUrl || undefined });
    onRefresh();
    onEdit();
  };

  const handleDeleteProduct = () => {
    if (confirm("Изтриване на този артикул?")) {
      deleteProduct(product.id);
      onRefresh();
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 800 * 1024) {
      alert("Макс. 800 KB за снимка.");
      return;
    }
    setImageUrl(await fileToDataUrl(file));
  };

  if (isEditing) {
    return (
      <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 min-w-[200px]" placeholder="Заглавие" />
          <Input value={desc} onChange={(e) => setDesc(e.target.value)} className="w-28" placeholder="Описание" />
        </div>
        <div className="flex items-center gap-3">
          <Label className="text-sm">Снимка</Label>
          <Input type="file" accept="image/*" onChange={handleImageSelect} className="max-w-[200px]" />
          {imageUrl && (
            <>
              <div className="w-16 h-16 rounded overflow-hidden border flex-shrink-0">
                <img src={imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setImageUrl(undefined)}>
                Махни снимка
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}>Запази</Button>
          <Button type="button" variant="outline" size="sm" onClick={onEdit}>Отказ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-emerald-50/50 border border-emerald-100 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {product.imageUrl ? (
          <div className="w-14 h-14 rounded overflow-hidden border flex-shrink-0">
            <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded bg-emerald-100/50 flex-shrink-0 flex items-center justify-center text-emerald-400 text-xs">—</div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{product.title}</p>
          <p className="text-sm text-emerald-700">{product.shortDescription}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={handleDeleteProduct}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default AdminPage;
