<script>
  export let title;
</script>

<style>
  article {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  section {
    border: 1px solid black;
    padding: 20px 40px;
  }
</style>

<article>
  <section>
    <h1>{title}</h1>
  </section>
</article>
