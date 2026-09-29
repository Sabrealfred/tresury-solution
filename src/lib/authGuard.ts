// Demo accounts are client-side only (no backend session). They are off
// unless the build explicitly sets VITE_ENABLE_DEMO_LOGIN=true.
export const DEMO_LOGIN_ENABLED = import.meta.env.VITE_ENABLE_DEMO_LOGIN === "true";

export function isAccessAllowed(opts: {
  hasSession: boolean;
  hasDemoUser: boolean;
  demoEnabled: boolean;
}): boolean {
  if (opts.hasSession) return true;
  return opts.demoEnabled && opts.hasDemoUser;
}
