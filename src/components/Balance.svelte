<script>
  import { wallet, balance } from "../stores";
  import ethers from "ethers";
</script>

<div>
  <p>Your address is {$wallet.address}</p>
  <p>Balance: {ethers.utils.formatEther($balance || 0)} ETH</p>
</div>
