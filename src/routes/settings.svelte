<script>
  import { network } from "../stores";
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<h1>Settings</h1>

<select bind:value={$network}>
  <option value="homestead">homestead</option>
  <option value="rinkeby">rinkeby</option>
</select>

<ul>
  <li>
    <a href="about">About</a>
  </li>
</ul>
