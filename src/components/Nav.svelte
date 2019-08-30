<script>
  export let segment;
</script>

<nav>
  <ul>
    <li>
      <a class:active={segment === undefined} href=".">home</a>
    </li>
    <li>
      <a class:active={segment === 'history'} href="history">history</a>
    </li>
    <li>
      <a class:active={segment === 'settings'} href="settings">settings</a>
    </li>
  </ul>
</nav>
