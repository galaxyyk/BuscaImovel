
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Users, Database, MapPin, Star, Clock, Shield, Key } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-r from-[#37a76f]/20 via-[#333333]/20 to-[#dbae8e]/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-30"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-[#37a76f] mb-2">Busca Imóvel</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#37a76f] to-[#dbae8e] mx-auto"></div>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl font-bold gradient-text mb-6">
              Captação de Imóveis em Londrina
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Acesse mais de 20.000 Inscrições Imobiliárias e 1.000 prédios completos em Londrina
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="hero-gradient text-white px-8 py-6 text-lg shadow-xl"
                onClick={() => navigate("/login")}
              >
                Começar Agora
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Property Registration Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold gradient-text mb-8">A Importância da Inscrição Imobiliária</h2>
            <p className="text-xl text-gray-700 mb-12">
              A inscrição imobiliária é o CPF do imóvel! É o identificador único que garante a legitimidade e o registro oficial da propriedade.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-[#37a76f]/5"
              >
                <Shield className="w-12 h-12 text-[#37a76f] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Segurança Garantida</h3>
                <p className="text-gray-600">Registro oficial e proteção legal do patrimônio</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-[#333333]/5"
              >
                <Clock className="w-12 h-12 text-[#333333] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Acesso Vitalício</h3>
                <p className="text-gray-600">Informações completas disponíveis para sempre</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-white to-[#dbae8e]/5"
              >
                <Key className="w-12 h-12 text-[#dbae8e] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Exclusividade</h3>
                <p className="text-gray-600">Dados únicos e atualizados do imóvel</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#37a76f]/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-4">Nossos Diferenciais</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#37a76f] to-[#dbae8e] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg card-hover bg-gradient-to-br from-white to-[#37a76f]/5"
            >
              <Building2 className="w-12 h-12 text-[#37a76f] mb-4" />
              <h3 className="text-xl font-semibold mb-2">1.000+ Prédios</h3>
              <p className="text-gray-600">Acesso completo a informações de prédios em Londrina</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg card-hover bg-gradient-to-br from-white to-[#333333]/5"
            >
              <Database className="w-12 h-12 text-[#333333] mb-4" />
              <h3 className="text-xl font-semibold mb-2">20.000+ Inscrições</h3>
              <p className="text-gray-600">Base de dados completa de inscrições imobiliárias</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg card-hover bg-gradient-to-br from-white to-[#dbae8e]/5"
            >
              <MapPin className="w-12 h-12 text-[#dbae8e] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Localização Precisa</h3>
              <p className="text-gray-600">Dados detalhados de localização e endereços</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg shadow-lg card-hover bg-gradient-to-br from-white to-[#d6c7b1]/5"
            >
              <Users className="w-12 h-12 text-[#d6c7b1] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Suporte Dedicado</h3>
              <p className="text-gray-600">Assistência especializada para suas necessidades</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold gradient-text text-center mb-16">O Que Dizem Nossos Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">"Ferramenta indispensável para o mercado imobiliário. Economizo horas de trabalho com as informações precisas."</p>
              <div className="font-semibold">Carlos Silva</div>
              <div className="text-sm text-gray-500">Corretor de Imóveis</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">"A melhor base de dados de Londrina. Todas as informações que preciso em um só lugar."</p>
              <div className="font-semibold">Ana Paula</div>
              <div className="text-sm text-gray-500">Investidora Imobiliária</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">"Suporte excepcional e dados sempre atualizados. Fundamental para minha imobiliária."</p>
              <div className="font-semibold">Roberto Santos</div>
              <div className="text-sm text-gray-500">Proprietário de Imobiliária</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto text-center bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#37a76f] to-[#dbae8e] opacity-10 rounded-bl-full"></div>
            <h2 className="text-3xl font-bold mb-2 gradient-text">Plano Premium</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#37a76f] to-[#dbae8e] mx-auto mb-6"></div>
            <div className="text-5xl font-bold mb-6 text-[#37a76f]">R$ 2.500</div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-[#37a76f] mr-2">✓</span>
                Acesso Vitalício a 20.000+ Inscrições
              </li>
              <li className="flex items-center">
                <span className="text-[#37a76f] mr-2">✓</span>
                1.000+ Prédios Completos atualizando constantemente
              </li>
              <li className="flex items-center">
                <span className="text-[#37a76f] mr-2">✓</span>
                Dados Sempre Atualizados
              </li>
              <li className="flex items-center">
                <span className="text-[#37a76f] mr-2">✓</span>
                Suporte Premium
              </li>
            </ul>
            <Button
              size="lg"
              className="w-full hero-gradient text-white shadow-xl"
              onClick={() => navigate("/payment")}
            >
              Assinar Agora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-[#333333] to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 gradient-text">Busca Imóvel</h3>
            <h4 className="text-xl mb-4">Captação de Imóveis Londrina</h4>
            <p className="text-gray-400">
              © 2025 Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
