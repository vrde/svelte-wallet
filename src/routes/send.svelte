<script>
  import Dialog from "../components/Dialog.svelte";
  import { provider, walletWithProvider } from "../stores";
  import ethers from "ethers";
  import { goto } from "@sapper/app";

  let receiver = "",
    amount = "0",
    state;

  async function handleSubmit() {
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amount)
    };
    const txSent = await $walletWithProvider.sendTransaction(tx);
    state = "Waiting for confirmation...";

    $provider.once(txSent.hash, receipt => {
      state = "Transaction confirmed!";
      console.log("Transaction mined!", receipt);
      setTimeout(() => goto(""), 1500);
    });
  }
</script>

<svelte:head>
  <title>Send</title>
</svelte:head>

<div>
  {#if state}
    <Dialog title={state} />
  {/if}

  <h1>Send</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <label>Receiving address</label>
    <input bind:value={receiver} required />
    <label>Amount</label>
    <input bind:value={amount} required />
    <input type="submit" />
  </form>
</div>
