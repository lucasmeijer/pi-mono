import type { AssistantMessage } from "@mariozechner/pi-ai";

function hasTextContent(content: unknown): boolean {
	if (typeof content === "string") return content.trim().length > 0;
	if (Array.isArray(content)) {
		for (const c of content) {
			if (typeof c === "object" && c !== null && "type" in c && c.type === "text") {
				const text = (c as { text?: string }).text;
				if (text && text.trim().length > 0) return true;
			}
		}
	}
	return false;
}

/**
 * Whether an assistant message has primary content that should be treated as a
 * navigable/displayed assistant turn, rather than transient thinking/tool-only state.
 *
 * This intentionally mirrors the existing /tree behavior: assistant entries are
 * shown when they contain text, or when they ended in a non-success stop reason.
 */
export function hasPrimaryAssistantContent(message: AssistantMessage): boolean {
	const hasText = hasTextContent(message.content);
	const isErrorOrAborted = !!message.stopReason && message.stopReason !== "stop" && message.stopReason !== "toolUse";
	return hasText || isErrorOrAborted;
}
