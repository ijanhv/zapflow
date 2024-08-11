interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    trigger: Trigger | null;
    actions: Action[];
    zapRuns: ZapRun[];
    user: User;
  }
  
  interface Trigger {
    id: string;
    zapId: string;
    triggerId: string;
    metadata: any; // or you can use a more specific type if you know the structure
    type: AvailableTrigger;
    zap: Zap;
  }
  
  interface Action {
    id: string;
    zapId: string;
    zap: Zap;
    actionId: string;
    metadata: any; // or you can use a more specific type if you know the structure
    type: AvailableAction;
    sortingOrder: number;
  }
  
  interface AvailableTrigger {
    id: string;
    name: string;
    image: string;
    triggers: Trigger[];
  }
  
  interface AvailableAction {
    id: string;
    name: string;
    image: string;
    service: string;
    actionType: string;
    actions: Action[];
  }
  
  interface ZapRun {
    id: string;
    zapId: string;
    metadata: any; // or you can use a more specific type if you know the structure
    zap: Zap;
    zapRunOutbox: ZapRunOutbox | null;
  }
  
  interface ZapRunOutbox {
    id: string;
    zapRunId: string;
    zapRun: ZapRun;
  }
  
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    zaps: Zap[];
  }