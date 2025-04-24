
import React from "react";
import { FixedSizeList as List } from "react-window";

const BuildingsList = ({ buildings, selectedBuilding, onBuildingSelect }) => {
  const Row = React.memo(({ index, style }) => {
    const building = buildings[index];
    const isSelected = selectedBuilding === building;

    return (
      <div
        style={style}
        onClick={() => onBuildingSelect(building)}
        className={`cursor-pointer w-full text-left px-4 py-2 transition-colors duration-150 ${
          isSelected ? "bg-[#37a76f]/10 text-[#37a76f] font-medium" : "hover:bg-gray-50"
        }`}
      >
        {building}
      </div>
    );
  });

  return (
    <div className="space-y-2">
      <div
        onClick={() => onBuildingSelect(null)}
        className={`cursor-pointer w-full text-left px-4 py-2 transition-colors duration-150 ${
          !selectedBuilding ? "bg-[#37a76f]/10 text-[#37a76f] font-medium" : "hover:bg-gray-50"
        }`}
      >
        Todos os prédios
      </div>
      <div className="rounded-lg overflow-hidden">
        <List
          height={300}
          itemCount={buildings.length}
          itemSize={40}
          width="100%"
          overscanCount={5}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default React.memo(BuildingsList);
