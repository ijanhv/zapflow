import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ZapState {
  selectedTrigger?: AvailableTrigger;
  selectedActions: AvailableAction[]; 
  triggerOpen: boolean;
  actionOpen: boolean;
  editingActionIndex: number | null;
  selectedAction: AvailableAction | null;
  removeAction: (index: number) => void;
  setSelectedTrigger: (trigger: AvailableTrigger | undefined) => void;
  setSelectedActions: (actions: AvailableAction[]) => void;
  setTriggerOpen: (open: boolean) => void;
  setActionOpen: (open: boolean) => void;
  setEditingActionIndex: (index: number | null) => void;
  setSelectedAction: (action: AvailableAction | null) => void;
  updateActionMetadata: (index: number, metadata: Partial<AvailableAction["metadata"]>) => void;  // New method
}

export const useZapStore = create(
  persist<ZapState>(
    (set, get) => ({
      selectedTrigger: undefined,
      selectedActions: [],
      triggerOpen: false,
      actionOpen: false,
      editingActionIndex: null,
      selectedAction: null,
      removeAction: (index) => {
        const actions = get().selectedActions;
        set({ selectedActions: actions.filter((_, i) => i !== index) });
      },
      setSelectedTrigger: (trigger) => set({ selectedTrigger: trigger }),
      setSelectedActions: (actions) => set({ selectedActions: actions }),
      setTriggerOpen: (open: boolean) => set({ triggerOpen: open }),
      setActionOpen: (open) => set({ actionOpen: open }),
      setEditingActionIndex: (index) => set({ editingActionIndex: index }),
      setSelectedAction: (action) => set({ selectedAction: action }),
      updateActionMetadata: (index, metadata) => {
        const actions = get().selectedActions;
        actions[index] = {
          ...actions[index],
          metadata: {
            ...actions[index].metadata,
            ...metadata,
          },
        };
        set({ selectedActions: [...actions] });
      },
    }),
    {
      name: "zap-store", 
      getStorage: () => localStorage, 
    }
  )
);
