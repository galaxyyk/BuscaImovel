
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuthorizedEmails, useCompleteBuildings } from "@/hooks/useSupabase";

const ADMIN_EMAIL = "kauabiruel@proton.me";

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newEmail, setNewEmail] = useState("");
  const [newBuilding, setNewBuilding] = useState("");
  
  const { 
    emails: authorizedUsers, 
    loading: emailsLoading, 
    addEmail, 
    removeEmail 
  } = useAuthorizedEmails();
  
  const { 
    buildings: completeBuildings, 
    loading: buildingsLoading, 
    addBuilding, 
    removeBuilding 
  } = useCompleteBuildings();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail !== ADMIN_EMAIL) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Apenas o administrador pode acessar esta página.",
      });
      navigate("/dashboard");
    }
  }, [navigate, toast]);

  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (!newEmail) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, insira um email válido.",
      });
      return;
    }
    if (authorizedUsers.includes(newEmail)) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Este email já está autorizado.",
      });
      return;
    }

    const { success, error } = await addEmail(newEmail);
    
    if (success) {
      setNewEmail("");
      toast({
        title: "Email adicionado com sucesso!",
        description: `${newEmail} foi autorizado.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar email",
        description: error?.message || "Tente novamente mais tarde.",
      });
    }
  };

  const handleAddBuilding = async (e) => {
    e.preventDefault();
    if (!newBuilding) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, insira um nome de prédio válido.",
      });
      return;
    }
    if (completeBuildings.includes(newBuilding)) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Este prédio já está na lista.",
      });
      return;
    }

    const { success, error } = await addBuilding(newBuilding);
    
    if (success) {
      setNewBuilding("");
      toast({
        title: "Prédio adicionado com sucesso!",
        description: `${newBuilding} foi adicionado à lista.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar prédio",
        description: error?.message || "Tente novamente mais tarde.",
      });
    }
  };

  const handleRemoveEmail = async (email) => {
    if (email === ADMIN_EMAIL) {
      toast({
        variant: "destructive",
        title: "Operação não permitida",
        description: "O email do administrador não pode ser removido.",
      });
      return;
    }

    const { success, error } = await removeEmail(email);
    
    if (success) {
      toast({
        title: "Email removido",
        description: `${email} foi removido da lista.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao remover email",
        description: error?.message || "Tente novamente mais tarde.",
      });
    }
  };

  const handleRemoveBuilding = async (building) => {
    const { success, error } = await removeBuilding(building);
    
    if (success) {
      toast({
        title: "Prédio removido",
        description: `${building} foi removido da lista.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao remover prédio",
        description: error?.message || "Tente novamente mais tarde.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  if (emailsLoading || buildingsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37a76f] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold gradient-text">Painel Administrativo</h1>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Dashboard
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Authorized Users Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Emails Autorizados</h2>
            <form onSubmit={handleAddEmail} className="mb-6">
              <div className="flex gap-4">
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Adicionar novo email"
                  className="flex-1"
                />
                <Button type="submit" className="hero-gradient text-white">
                  Adicionar
                </Button>
              </div>
            </form>
            <div className="space-y-2">
              {authorizedUsers.map((email, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span>{email}</span>
                  <Button
                    onClick={() => handleRemoveEmail(email)}
                    variant="destructive"
                    size="sm"
                    disabled={email === ADMIN_EMAIL}
                  >
                    Remover
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Complete Buildings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Prédios Completos</h2>
            <form onSubmit={handleAddBuilding} className="mb-6">
              <div className="flex gap-4">
                <Input
                  type="text"
                  value={newBuilding}
                  onChange={(e) => setNewBuilding(e.target.value)}
                  placeholder="Adicionar novo prédio"
                  className="flex-1"
                />
                <Button type="submit" className="hero-gradient text-white">
                  Adicionar
                </Button>
              </div>
            </form>
            <div className="space-y-2">
              {completeBuildings.map((building, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span>{building}</span>
                  <Button
                    onClick={() => handleRemoveBuilding(building)}
                    variant="destructive"
                    size="sm"
                  >
                    Remover
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
