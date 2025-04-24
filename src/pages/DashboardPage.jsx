import React, { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BuildingsList from "@/components/BuildingsList";
import { useCompleteBuildings, useProperties } from "@/hooks/useSupabase"; // Adicionamos um novo hook
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 100;

const TableRow = React.memo(({ item, onCopy }) => {
  if (!item) return null;

  const CopyButton = React.memo(({ text, label }) => (
    <button
      onClick={() => onCopy(text)}
      className="ml-2 text-gray-400 hover:text-gray-600 focus:text-gray-600"
      aria-label={`Copiar ${label}`}
    >
      <Copy className="h-4 w-4" />
    </button>
  ));

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center group">
          <span className="pointer-events-none">{item.address}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center group">
          <span className="pointer-events-none">{item.building}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center group">
          <span className="pointer-events-none">{item.complement}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center group">
          <span className="pointer-events-none">{item.inscription}</span>
          <CopyButton text={item.inscription} label="inscrição" />
        </div>
      </td>
    </tr>
  );
});

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("address");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [buildingSearch, setBuildingSearch] = useState("");

  // Usando o hook para buscar os dados do Supabase
  const { properties: data, loading } = useProperties();
  const { buildings: completeBuildings, loading: buildingsLoading } = useCompleteBuildings();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (!searchTerm && !selectedBuilding) return data;

    return data.filter((item) => {
      if (!item) return false;
      const matchesSearch = !searchTerm || String(item[searchType] || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBuilding = !selectedBuilding || item.building === selectedBuilding;
      return matchesSearch && matchesBuilding;
    });
  }, [data, searchTerm, searchType, selectedBuilding]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  }, [navigate]);

  const handleCopy = useCallback((text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência",
      duration: 2000,
    });
  }, [toast]);

  const userEmail = localStorage.getItem("userEmail");

  const filteredBuildings = useMemo(() => {
    return completeBuildings.filter((building) =>
      building.toLowerCase().includes(buildingSearch.toLowerCase())
    );
  }, [completeBuildings, buildingSearch]);

  if (loading || buildingsLoading) {
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
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-2 justify-between items-center">
          <h1 className="text-xl font-bold gradient-text">Dashboard Imobiliário</h1>
          <div className="flex flex-wrap gap-2 justify-end">
            {userEmail === "kauabiruel@proton.me" && (
              <Button
                onClick={() => navigate("/admin")}
                className="hero-gradient text-white"
              >
                Painel Admin
              </Button>
            )}
            <a
              href="https://portal.londrina.pr.gov.br/iptu/certidao-narrativa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="hero-gradient text-white">Certidão Narrativa</Button>
            </a>
            <a
              href="https://portal.londrina.pr.gov.br/iptu/autenticidade-da-certidao-narrativa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="hero-gradient text-white">Autenticidade C.N</Button>
            </a>
            <a
              href="https://www2.londrina.pr.gov.br/sistemas/iptu/segundavia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="hero-gradient text-white">IPTU Segunda Via</Button>
            </a>
            <a
              href="https://painel.assertivasolucoes.com.br/inicio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="hero-gradient text-white">Assertiva</Button>
            </a>
            <Button onClick={handleLogout} variant="outline">Sair</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Select
                  value={searchType}
                  onValueChange={setSearchType}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Tipo de busca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="address">Endereço</SelectItem>
                    <SelectItem value="building">Prédio</SelectItem>
                    <SelectItem value="complement">Complemento</SelectItem>
                    <SelectItem value="inscription">Inscrição</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1"
                />
              </div>

              <Suspense fallback={<div>Carregando...</div>}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Endereço
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prédio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Complemento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inscrição
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedData.map((item, index) => (
                        <TableRow 
                          key={`${item.inscription}-${index}`} 
                          item={item}
                          onCopy={handleCopy}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    <Button
                      onClick={() => handlePageChange(1)}
                      variant="outline"
                      disabled={currentPage === 1}
                    >
                      Primeira
                    </Button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          className={currentPage === pageNum ? "bg-[#37a76f]" : ""}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button
                      onClick={() => handlePageChange(totalPages)}
                      variant="outline"
                      disabled={currentPage === totalPages}
                    >
                      Última
                    </Button>
                  </div>
                )}

                <div className="mt-4 text-center text-sm text-gray-600">
                  Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} até{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} de{" "}
                  {filteredData.length} registros
                </div>
              </Suspense>
            </div>
          </div>

          <div className="md:w-80 w-full bg-white rounded-xl shadow-lg p-6 md:sticky md:top-24 h-fit">
            <h2 className="text-xl font-bold mb-4 gradient-text">
              Prédios Completos
              <span className="ml-2 text-sm text-gray-500">({filteredBuildings.length})</span>
            </h2>
            <Input
              type="text"
              placeholder="Buscar prédio..."
              value={buildingSearch}
              onChange={(e) => setBuildingSearch(e.target.value)}
              className="mb-4"
            />
            <BuildingsList
              buildings={filteredBuildings}
              selectedBuilding={selectedBuilding}
              onBuildingSelect={setSelectedBuilding}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
