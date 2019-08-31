<script>
  import { network, mnemonic } from "../stores";

  let localMnemonic = $mnemonic;

  function handleMnemonicSubmit() {
    $mnemonic = localMnemonic;
  }
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<h1>Settings</h1>

<label>
  Network:
  <select bind:value={$network}>
    <option value="homestead">homestead</option>
    <option value="rinkeby">rinkeby</option>
  </select>
</label>

<form on:submit|preventDefault={handleMnemonicSubmit}>
  <label>
    Seed phrase
    <input bind:value={localMnemonic} />
  </label>
  <input type="submit" />
</form>

<ul>
  <li>
    <a href="about">About</a>
  </li>
</ul>
