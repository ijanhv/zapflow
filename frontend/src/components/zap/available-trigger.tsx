import Image from "next/image";
import React from "react";

const AvailableTriggers = ({
  availableTriggers,
  setSelectedTrigger,
  selectedTrigger,
  setTriggerOpen,
}: {
  availableTriggers: AvailableTrigger[];
  setSelectedTrigger: React.Dispatch<
    React.SetStateAction<AvailableTrigger | undefined>
  >;
  selectedTrigger: AvailableTrigger | undefined;
  setTriggerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  return (
    <div className="grid grid-cols-2 gap-3">
      {availableTriggers.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 p-2 cursor-pointer ${selectedTrigger === item && "border-2 rounded-lg border-primary "}`}
          onClick={() => {
            setSelectedTrigger(item);
            setTriggerOpen(false);
          }}
        >
          <Image
            width={20}
            height={20}
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

export default AvailableTriggers;
