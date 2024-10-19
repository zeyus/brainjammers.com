<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from '../components/Scene.svelte'
</script>
<svelte:head>
    <title>Brainjammers: Neurodisruptors 4 U</title> 
</svelte:head>
<div>
    <Canvas>
    <Scene />
    </Canvas>
</div>

<style>
    div {
      height: 100vh;
    }
</style>
