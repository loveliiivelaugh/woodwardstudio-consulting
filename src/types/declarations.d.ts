declare module "*.md" {
    const content: string;
    export default content;
}


interface ImportMetaEnv {
    readonly VITE_WP_API_KEY: string
    readonly VITE_WP_API_URL: string
    // Add more as needed...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}