import { produce } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SettingsState {
    passwordComplexity: string;
    bannedEmailDomains: string[];
    setPasswordComplexity: (complexity: string) => void;
    setBannedEmailDomains: (domains: string[]) => void;
}

const useSettingsStore = create<SettingsState>()(devtools((set) => ({
    passwordComplexity: 'medium',
    bannedEmailDomains: [],
    setPasswordComplexity: (complexity) => set(produce((draft) => { draft.passwordComplexity = complexity })),
    setBannedEmailDomains: (domains) => set(produce((draft) => { draft.setBannedEmailDomains = domains })),
})));

export default useSettingsStore;
