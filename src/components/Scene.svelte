<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { useGltf, OrbitControls, useDraco } from '@threlte/extras';
	import { Color, Material, Mesh } from 'three';

	const { scene } = useThrelte();
	scene.background = new Color(0x100010);
	const dracoLoader = useDraco();

	type GLTFResult = {
		nodes: {
			Lobe_Lobe_0: Mesh;
			Lobe_Cerebllum_1_0: Mesh;
			Lobe_Cerebllum_2_0: Mesh;
		};
		materials: {
			Lobe: Material;
			Cerebllum_1: Material;
			Cerebllum_2: Material;
		};
	};

	const gltf = useGltf<GLTFResult>('/models/scene.glb', {
		dracoLoader
	});
</script>

<T.Group dispose={false}>
	{#await gltf then gltf}
		<T.PerspectiveCamera
			makeDefault
			position={[3, 1, 3]}
			on:create={({ ref }) => {
				ref.lookAt(0, 0, 0);
			}}
		>
			<OrbitControls
				autoRotate
				autoRotateSpeed={0.7}
				enableDamping
				enableZoom={true}
				target={[0, -0.2, 0]}
			/>
		</T.PerspectiveCamera>
		<T.AmbientLight intensity={0.8} />
		<T.DirectionalLight position={[2, 1, -2]} intensity={3.0} castShadow target={gltf.scene} />
		<T.GridHelper args={[20, 20, 0xff0000, 'teal']} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
		<T.GridHelper args={[20, 20, 0xff0000, 'teal']} />
		<T.Group scale={0.01} castShadow position={[-0.6, -1.0, 0]}>
			<T.Mesh geometry={gltf.nodes.Lobe_Lobe_0.geometry} material={gltf.materials.Lobe} />
			<T.Mesh
				geometry={gltf.nodes.Lobe_Cerebllum_1_0.geometry}
				material={gltf.materials.Cerebllum_1}
			/>
			<T.Mesh
				geometry={gltf.nodes.Lobe_Cerebllum_2_0.geometry}
				material={gltf.materials.Cerebllum_2}
			/>
		</T.Group>
	{:catch err}
		<p>Error loading scene: {err}</p>
	{/await}
</T.Group>
