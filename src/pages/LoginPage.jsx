import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "kauabiruel@proton.me";
const ADMIN_PASSWORD = "sua_senha_admin_segura"; // Defina uma senha forte para o admin

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    localStorage.clear();

    // Validação dos campos
    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
      });
      setIsLoading(false);
      return;
    }

    const email = formData.email.toLowerCase();

    try {
      // Verificação para administrador
      if (email === ADMIN_EMAIL) {
        if (formData.password === ADMIN_PASSWORD) {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userEmail", ADMIN_EMAIL);
          toast({
            title: "Login de administrador realizado com sucesso!",
            description: "Bem-vindo, administrador!",
          });
          navigate("/admin");
        } else {
          throw new Error("Senha do administrador incorreta.");
        }
        return;
      }

      // Verificação para usuários normais
      const { data, error: fetchError } = await supabase
        .from("emails_autorizados")
        .select("email, senha")
        .eq("email", email)
        .single();

      if (fetchError || !data) {
        throw new Error("Email não encontrado ou não autorizado.");
      }

      // Verificação de senha
      if (data.senha !== formData.password) {
        throw new Error("Senha incorreta.");
      }

      // Login bem-sucedido
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#37a76f]/10 via-[#333333]/10 to-[#dbae8e]/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 gradient-text">
          Acesse sua conta
        </h2>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center"
          >
            {error}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setError("");
              }}
              className="w-full"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setError("");
              }}
              className="w-full"
              placeholder="••••••••"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full hero-gradient text-white"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Não tem uma conta?{" "}
          <button
            onClick={() => navigate("/payment")}
            className="text-[#37a76f] hover:underline"
          >
            Assine agora
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
