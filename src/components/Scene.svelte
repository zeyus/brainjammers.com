<script lang="ts">
    import { T, useThrelte } from '@threlte/core'
    import { useGltf, OrbitControls } from '@threlte/extras'
    import { Color } from 'three'

    const { scene } = useThrelte()
    scene.background = new Color(0x100010)
</script>
{#await useGltf('/models/scene.gltf') then gltf}
    <T.PerspectiveCamera
        makeDefault
        position={[3, 1, 3]}
        on:create={({ ref }) => {
        ref.lookAt(0, 0, 0)
        }}
    >
        <OrbitControls
            autoRotate
            autoRotateSpeed={0.7}
            enableDamping
            enableZoom={false}
            target={[0, -0.2, 0]}
        />
    </T.PerspectiveCamera>
    <T.AmbientLight intensity={0.25} />
    <T.DirectionalLight position={[0, 10, 0]} intensity={1} castShadow />
    <T is={gltf.scene} castShadow position={[-0.6, -1.0, 0]} />
    <T.GridHelper args={[20, 20, 0xff0000, 'teal']} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
    <T.GridHelper args={[20, 20, 0xff0000, 'teal']} />
{/await}
