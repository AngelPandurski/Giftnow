/** Страница за редактиране на артикули – изглежда като каталога, но с опция за редакция */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import {
  loadProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  type Product,
} from "@/lib/productsStore";
import { fileToDataUrl } from "@/lib/utils";

export default function AdminProductsPage() {
  const { user: authUser, isLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (authUser?.userRole?.toLowerCase() !== "admin") router.replace("/", { scroll: false });
  }, [authUser, isLoading, router]);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  const refreshProducts = () => setProducts(loadProducts());

  if (isLoading) return <>Loading...</>;
  if (authUser?.userRole?.toLowerCase() !== "admin") return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Замъглена снимка като фон – като на product catalog */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: "url(/login-bg.png)",
          filter: "blur(4px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/60 to-teal-50/40" aria-hidden />
      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Обратно в админ
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Редактиране на артикули</h1>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добави артикул
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <AdminProductCard
                key={product.id}
                product={product}
                onEdit={() => setEditingProduct(product)}
                onDelete={() => {
                  if (confirm("Изтриване на този артикул?")) {
                    deleteProduct(product.id);
                    refreshProducts();
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Диалог за добавяне */}
      <AddProductDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => {
          refreshProducts();
          setShowAddDialog(false);
        }}
      />

      {/* Диалог за редакция */}
      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onSuccess={() => {
            refreshProducts();
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

function AdminProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100/80 hover:shadow-lg hover:border-emerald-200/80 transition-all duration-300"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="aspect-square w-full relative bg-gradient-to-br from-emerald-50 to-teal-50/50 overflow-hidden">
        {product.imageUrl ? (
          <>
            <div className="absolute inset-0 scale-110" aria-hidden>
              <Image
                src={product.imageUrl}
                alt=""
                fill
                className="object-cover blur-md"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized={product.imageUrl.startsWith("data:")}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white/20 to-teal-50/30" aria-hidden />
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover relative z-10"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized={product.imageUrl.startsWith("data:")}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-emerald-300/80">
            <span className="text-4xl">📷</span>
          </div>
        )}
        {/* Overlay с бутони за редакция */}
        {showActions && (
          <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center gap-2 transition-opacity">
            <Button size="sm" variant="secondary" onClick={onEdit} className="bg-white/90">
              <Pencil className="w-4 h-4 mr-1" />
              Редактирай
            </Button>
            <Button size="sm" variant="destructive" onClick={onDelete} className="bg-red-500/90 hover:bg-red-600">
              <Trash2 className="w-4 h-4 mr-1" />
              Изтрий
            </Button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">{product.title}</h3>
        <p className="text-sm text-emerald-700/80 mt-1">{product.shortDescription}</p>
      </div>
    </div>
  );
}

function AddProductDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addProduct({
      title: title.trim(),
      shortDescription: desc.trim() || "—",
      imageUrl: imageUrl || undefined,
    });
    setTitle("");
    setDesc("");
    setImageUrl(null);
    onSuccess();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добави артикул</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Заглавие</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заглавие на артикула"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label>Кратко описание</Label>
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="напр. 2 бр."
              className="mt-1"
            />
          </div>
          <div>
            <Label>Снимка</Label>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <Input type="file" accept="image/*" onChange={handleImageSelect} className="max-w-[200px]" />
              {imageUrl && (
                <>
                  <div className="w-14 h-14 rounded overflow-hidden border flex-shrink-0">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => setImageUrl(null)}>
                    Махни
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Запази
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отказ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditProductDialog({
  product,
  open,
  onOpenChange,
  onSuccess,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.shortDescription);
  const [imageUrl, setImageUrl] = useState<string | undefined>(product.imageUrl);

  useEffect(() => {
    setTitle(product.title);
    setDesc(product.shortDescription);
    setImageUrl(product.imageUrl);
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    updateProduct(product.id, {
      title: title.trim(),
      shortDescription: desc.trim() || "—",
      imageUrl: imageUrl || undefined,
    });
    onSuccess();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Редактирай артикул</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Заглавие</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1" />
          </div>
          <div>
            <Label>Кратко описание</Label>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Снимка</Label>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <Input type="file" accept="image/*" onChange={handleImageSelect} className="max-w-[200px]" />
              {imageUrl && (
                <>
                  <div className="w-14 h-14 rounded overflow-hidden border flex-shrink-0">
                    <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => setImageUrl(undefined)}>
                    Махни снимка
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Запази
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отказ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
