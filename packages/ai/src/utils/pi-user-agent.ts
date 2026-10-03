import type * as NodeOs from "node:os";

type ProcessWithOsBuiltinModule = typeof process & {
	getBuiltinModule?: (id: "node:os") => typeof NodeOs;
};

function loadNodeOs(): typeof NodeOs | null {
	if (typeof process === "undefined" || !(process.versions?.node || process.versions?.bun)) {
		return null;
	}
	return (process as ProcessWithOsBuiltinModule).getBuiltinModule?.("node:os") ?? null;
}

// Keep runtime OS loading browser-safe. A top-level runtime import of node:os breaks browser/Vite builds.
const nodeOs = loadNodeOs();

let clientName = "pi";

/**
 * Set the client name pi-ai reports to providers: the User-Agent product name and the
 * OpenAI Codex `originator`. Defaults to "pi".
 */
export function setClientName(name: string): void {
	clientName = name;
}

export function getClientName(): string {
	return clientName;
}

export function getPiUserAgent(): string {
	return nodeOs
		? `${clientName} (${nodeOs.platform()} ${nodeOs.release()}; ${nodeOs.arch()})`
		: `${clientName} (browser)`;
}
