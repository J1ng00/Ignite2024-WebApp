const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

esbuild
    .build({
        entryPoints: ["frontend/Application.tsx", "frontend/style.scss"],
        outdir: "public/assets",
        bundle: true,
        minify: true,
        plugins: [sassPlugin()],
    })
    .then(() => {
        console.log("⚡ Build complete! ⚡");

        // Watch for file changes
        esbuild
            .build({
                entryPoints: ["frontend/Application.tsx", "frontend/style.scss"],
                outdir: "public/assets",
                bundle: true,
                minify: true,
                plugins: [sassPlugin()],
            })
            .watch({
                onRebuild(error, result) {
                    if (error) {
                        console.error("❌ Rebuild failed:", error);
                    } else {
                        console.log("⚡ Rebuild complete! ⚡");
                    }
                },
            });

        console.log("👀 Watching for changes...");
    })
    .catch(() => process.exit(1));
