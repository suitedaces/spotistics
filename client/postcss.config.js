export enum PluginName {
  TailwindCSS = 'tailwindcss',
  Autoprefixer = 'autoprefixer',
}

export interface PluginConfig {
  [PluginName.TailwindCSS]: Record<string, unknown>;
  [PluginName.Autoprefixer]: Record<string, unknown>;
}

const config: { plugins: PluginConfig } = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;