
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBar = React.memo(({ searchType, setSearchType, searchTerm, setSearchTerm }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <Select value={searchType} onValueChange={setSearchType}>
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
      }}
      className="flex-1"
    />
  </div>
));

export default SearchBar;
