export type BuildMode = "development" | "production"
export interface BuildEnv {
  mode: BuildMode
  port: number
}
