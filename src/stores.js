import { readable, derived } from "svelte/store";
import ethers from "ethers";
import db from "./db";

const Wallet = ethers.Wallet;
const CURRENT_WALLET = { seed: undefined, wallet: undefined };

export const network = db.writable("network", "homestead");
export const mnemonic = db.writable(
  "mnemonic",
  () => Wallet.createRandom().mnemonic
);

export const wallet = derived(mnemonic, $mnemonic => {
  // Wallet.fromMnemonic takes some time to create the wallet, so we cache it.
  if (CURRENT_WALLET.mnemonic !== $mnemonic) {
    CURRENT_WALLET.mnemonic = $mnemonic;
    CURRENT_WALLET.wallet = Wallet.fromMnemonic($mnemonic);
  }
  return CURRENT_WALLET.wallet;
});

export const provider = derived(network, $network =>
  ethers.getDefaultProvider($network)
);

export const walletWithProvider = derived(
  [provider, wallet],
  ([$provider, $wallet]) => $wallet.connect($provider)
);

export const balance = derived(
  [provider, wallet],
  ([$provider, $wallet], set) => {
    const updateBalance = balance => set(balance);
    $provider.on($wallet.address, updateBalance);
    return () => $provider.removeListener($wallet.address, updateBalance);
  }
);
