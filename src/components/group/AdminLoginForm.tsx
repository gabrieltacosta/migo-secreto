"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { loginAdmin } from "@/actions/admin.actions";

export function AdminLoginForm({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await loginAdmin(groupId, password);
    if (res.success) {
      router.refresh(); // Recarrega a página para o Server Component ler o novo cookie
    } else {
      setError(res.error || "Erro ao logar");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-600">
      <CardHeader className="text-center">
        <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
          <Lock className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle>Acesso Restrito</CardTitle>
        <CardDescription>
          Insira a senha de administrador que você criou no passo 3 para
          gerenciar este grupo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Senha de Admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12"
          />
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Acessar Painel"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
