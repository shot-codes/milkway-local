export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","ambience.mp3","favicon.png","fonts/space.woff","logos/.DS_Store","logos/moons/.DS_Store","logos/moons/bregneroodaard.png","logos/moons/byon8.png","logos/moons/cortrium.png","logos/moons/deimos.png","logos/moons/hub.png","logos/moons/inniti.png","logos/moons/life_with_artificials.png","logos/moons/lt_health.png","logos/moons/mindfuture_tech.png","logos/moons/motus.png","logos/moons/mxney.png","logos/moons/next11.png","logos/moons/nguvu.png","logos/moons/nordisk_innovation.png","logos/moons/onomondo.png","logos/moons/passendo.png","logos/moons/pv_sentispec.png","logos/moons/quinta_da_vaarzea.png","logos/moons/radiobotics.png","logos/moons/saninudge.png","logos/moons/son_of_a_tailor.png","logos/moons/spiio.png","logos/moons/tiimo.png","logos/moons/zibrasport_equest.png","logos/moons/zoios.png","logos/moons/zybersafe.png","logos/planets/.DS_Store","logos/planets/confinze.png","logos/planets/csr.png","logos/planets/equestrian.png","logos/planets/inqvation.png","logos/planets/lactobio.png","logos/planets/mindfuture.png","logos/planets/partner_equity.png","logos/planets/people_ventures.png","logos/planets/some_company.png","logos/planets/zibra_as.png","mf_video.mp4","models/.DS_Store","models/Horse.glb","models/ferrari/.DS_Store","models/ferrari/scene-transformed.glb","models/ferrari/scene.bin","models/ferrari/scene.gltf","models/ferrari_812_superfast.glb","models/projector/.DS_Store","models/projector/scene.bin","models/projector/scene.gltf","models/projector/textures/Material.047_baseColor.jpeg","models/projector/textures/Material.047_normal.jpeg","models/projector/textures/Material.054_baseColor.jpeg","models/projector/textures/Material.054_normal.png","models/projector/textures/Material.058_baseColor.png","models/projector/textures/Material.058_emissive.png","models/projector-screen/scene.bin","models/projector-screen/scene.gltf","textures/.DS_Store","textures/MindFuture/diffuse.png","textures/MindFuture/diffuse2.png","textures/MindFuture/height.png","textures/MindFuture/height2.png","textures/MindFuture/normal.png","textures/MindFuture/normal2.png","textures/Moons/.DS_Store","textures/Moons/branches/branches-diffuse.png","textures/Moons/branches/branches-displace.png","textures/Moons/branches/branches-normal.png","textures/Moons/bricks/bricks-diffuse.png","textures/Moons/bricks/bricks-displace.png","textures/Moons/bricks/bricks-normal.png","textures/Moons/cracks/cracks-diffuse.png","textures/Moons/cracks/cracks-displace.png","textures/Moons/cracks/cracks-normal.png","textures/Moons/leaf/leaf-diffuse.png","textures/Moons/leaf/leaf-displace.png","textures/Moons/leaf/leaf-normal.png","textures/Moons/leaf2/leaf2-diffuse.png","textures/Moons/leaf2/leaf2-displace.png","textures/Moons/leaf2/leaf2-normal.png","textures/Moons/metal/metal-diffuse.png","textures/Moons/metal/metal-displace.png","textures/Moons/metal/metal-normal.png","textures/Moons/moss/moss-diffuse.png","textures/Moons/moss/moss-displace.png","textures/Moons/moss/moss-normal.png","textures/Moons/pebbles/pebbles-diffuse.png","textures/Moons/pebbles/pebbles-displace.png","textures/Moons/pebbles/pebbles-normal.png","textures/Moons/rust/rust-diffuse.png","textures/Moons/rust/rust-displace.png","textures/Moons/rust/rust-normal.png","textures/Moons/sandstone/sandstone-diffuse.png","textures/Moons/sandstone/sandstone-displace.png","textures/Moons/sandstone/sandstone-normal.png","textures/Moons/snow/snow-diffuse.png","textures/Moons/snow/snow-displace.png","textures/Moons/snow/snow-normal.png","zg_video.mp4","zg_video1.mp4","zg_video2.mp4"]),
	mimeTypes: {".mp3":"audio/mpeg",".png":"image/png",".woff":"font/woff",".mp4":"video/mp4",".glb":"model/gltf-binary",".bin":"application/octet-stream",".gltf":"model/gltf+json",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.77ca4306.js","app":"_app/immutable/entry/app.b0befbfe.js","imports":["_app/immutable/entry/start.77ca4306.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/singletons.a723794f.js","_app/immutable/chunks/index.b6975e4a.js","_app/immutable/entry/app.b0befbfe.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js'))
		],
		routes: [
			{
				id: "/(desktop)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/chatv2",
				pattern: /^\/api\/chatv2\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/chatv2/_server.ts.js'))
			},
			{
				id: "/api/chat",
				pattern: /^\/api\/chat\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/chat/_server.ts.js'))
			},
			{
				id: "/chat",
				pattern: /^\/chat\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/m",
				pattern: /^\/m\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/m/[company]",
				pattern: /^\/m\/([^/]+?)\/?$/,
				params: [{"name":"company","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/m/[company]/[subcompany]",
				pattern: /^\/m\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"company","optional":false,"rest":false,"chained":false},{"name":"subcompany","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
