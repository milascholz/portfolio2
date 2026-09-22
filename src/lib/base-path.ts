// With `output: "export"` + a non-root `basePath`, next/link auto-prefixes
// hrefs, but next/image (in unoptimized mode) and raw <img>/<video> src
// strings do not — so any root-relative asset path needs this prepended.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
