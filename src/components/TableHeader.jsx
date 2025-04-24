
import React from "react";

const TableHeader = React.memo(() => (
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
));

export default TableHeader;
