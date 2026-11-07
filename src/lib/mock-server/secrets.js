// SERVER ONLY. In a real project this value lives in the `.env` file as ADMIN_CODE (no PUBLIC_ prefix) and SvelteKit
// refuses to let a browser file import it. This note runs everything in your browser, so the value is visible to anyone who
// opens the page's code: a DEMO value, never a real secret, and nothing here keeps it private.
export const ADMIN_CODE = '1021';
