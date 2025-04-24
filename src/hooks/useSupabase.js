import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// Hook: Buscar imóveis da tabela "imoveis"
export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let allData = [];
      let from = 0;
      const limit = 1000;

      while (true) {
        const { data, error } = await supabase
          .from("imoveis")
          .select("*")
          .order("address", { ascending: true })
          .range(from, from + limit - 1);

        if (error) throw error;

        if (!data || data.length === 0) break;

        allData = allData.concat(data);
        from += limit;

        if (data.length < limit) break; // Fim dos dados
      }

      setProperties(allData);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar imóveis:", err);
      setError(err.message);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    loading,
    error,
    refresh: fetchProperties,
  };
};

// Hook: Buscar nomes dos prédios da tabela "prédios"
export const useCompleteBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("prédios")
      .select("nome");

    if (error) {
      console.error("Erro ao buscar prédios:", error);
      setBuildings([]);
    } else {
      console.log("🔍 Dados dos prédios:", data);
      setBuildings(data.map((b) => b.nome));
    }

    setLoading(false);
  };

  const addBuilding = async (nome) => {
    const { error } = await supabase.from("prédios").insert([{ nome }]);
    if (!error) {
      setBuildings((prev) => [...prev, nome]);
      return { success: true };
    }
    return { success: false, error };
  };

  const removeBuilding = async (nome) => {
    const { error } = await supabase.from("prédios").delete().eq("nome", nome);
    if (!error) {
      setBuildings((prev) => prev.filter((b) => b !== nome));
      return { success: true };
    }
    return { success: false, error };
  };

  return {
    buildings,
    loading,
    addBuilding,
    removeBuilding,
    refresh: fetchBuildings,
  };
};

// Hook: Buscar e-mails autorizados da tabela "emails_autorizados"
export const useAuthorizedEmails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("emails_autorizados")
      .select("email");

    if (error) {
      console.error("Erro ao buscar e-mails autorizados:", error);
      setEmails([]);
    } else {
      setEmails(data.map((e) => e.email));
    }

    setLoading(false);
  };

  const addEmail = async (email) => {
    const { error } = await supabase.from("emails_autorizados").insert([{ email }]);
    if (!error) {
      setEmails((prev) => [...prev, email]);
      return { success: true };
    }
    return { success: false, error };
  };

  const removeEmail = async (email) => {
    const { error } = await supabase.from("emails_autorizados").delete().eq("email", email);
    if (!error) {
      setEmails((prev) => prev.filter((e) => e !== email));
      return { success: true };
    }
    return { success: false, error };
  };

  return {
    emails,
    loading,
    addEmail,
    removeEmail,
    refresh: fetchEmails,
  };
};
