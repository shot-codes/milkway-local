<script>
  import { Pass } from "@threlte/core";
  import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

  let fx = new FilmPass(1, 0, 256);
  fx.renderToScreen = true;
</script>

<Pass pass={fx} />
