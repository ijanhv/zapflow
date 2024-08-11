import { BACKEND_URL } from "@/config";

export const getAvailableActions = async (): Promise<
  AvailableAction[] | null
> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/action/available`);

    const data = await res.json();

    return data.availableActions;
  } catch (error) {
    return null;
  }
};

export const getAvailableTriggers = async (): Promise<
  AvailableTrigger[] | null
> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/trigger/available`);

    const data = await res.json();

    return data.availableTriggers;
  } catch (error) {
    return null;
  }
};
