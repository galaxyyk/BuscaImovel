
import React from "react";
import { Copy } from "lucide-react";

const TableRow = React.memo(({ item, onCopy }) => {
  if (!item) return null;

  const CopyButton = ({ text, label }) => (
    <button
      onClick={() => onCopy(text)}
      className="ml-2 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
      aria-label={label}
    >
      <Copy className="h-4 w-4" />
    </button>
  );

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center">
          <span className="select-text">{item.address}</span>
          <CopyButton text={item.address} label="Copiar endereço" />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center">
          <span className="select-text">{item.building}</span>
          <CopyButton text={item.building} label="Copiar prédio" />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center">
          <span className="select-text">{item.complement}</span>
          <CopyButton text={item.complement} label="Copiar complemento" />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center">
          <span className="select-text">{item.inscription}</span>
          <CopyButton text={item.inscription} label="Copiar inscrição" />
        </div>
      </td>
    </tr>
  );
});

export default TableRow;
