import Image from "next/image";
import React from "react";

const AvailableActions = ({
  availableActions,
  selectedAction,
  onActionSelect,
  setActionOpen,
}: {
  availableActions: AvailableAction[];
  selectedAction?: AvailableAction;
  onActionSelect: (action: AvailableAction) => void;
  setActionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {availableActions.map((item) => (
        <div
          onClick={() => {
            onActionSelect(item);
            setActionOpen(false);
          }}
          key={item.id}
          className={`flex items-center gap-3 p-2 cursor-pointer ${
            selectedAction?.id === item.id
              ? "border-2 rounded-lg border-primary"
              : ""
          }`}
        >
          <Image
            width={25}
            height={25}
            alt={item.name}
            src={item.image}
            unoptimized
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AvailableActions;
