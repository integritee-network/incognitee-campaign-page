import { defineStore } from "pinia";
import { formatBalance } from "@polkadot/util";
import type {AddressOrPair} from "@polkadot/api-base/types";
import { asString } from "@encointer/util"
import type {InjectedExtension} from "@polkadot/extension-inject/types";

formatBalance.setDefaults({
  decimals: 10,
  unit: "",
});
export const useAccount = defineStore("account", {
  state: () => ({
    account: <AddressOrPair | null>null,
    injected: <InjectedExtension |null>null,
    paseoBalance: 0,
    incogniteeBalance: 0,
  }),
  getters: {
    getShortAddress({ account }): string {
      return account ? asString(account as AddressOrPair).slice(0, 8) + "..." : "none";
    },
    getAddress({ account }): string {
      return account ? asString(account as AddressOrPair) : "none";
    },
    isInjected({ injected }): boolean {
      // if the account is not a pair we assume that it is injected
      return injected != null;
    },
    getIncogniteeHumanBalance({ incogniteeBalance }): number {
      return formatBalance(incogniteeBalance);
    },
    getPaseoHumanBalance({ paseoBalance }): number {
      return formatBalance(paseoBalance);
    },
  },
  actions: {
    setAccount(account: AddressOrPair) {
      this.account = account;
    },
    setInjected(injected: InjectedExtension) {
      this.injected = injected;
    },
    setPaseoBalance(balance: number) {
      this.paseoBalance = balance;
    },
    setIncogniteeBalance(balance: number) {
      this.incogniteeBalance = balance;
    },
  },
});
