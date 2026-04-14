export const OSC133_ZONE_START = "\x1b]133;A\x07";
export const OSC133_ZONE_END = "\x1b]133;B\x07";
export const OSC133_ZONE_FINAL = "\x1b]133;C\x07";

interface Osc133ZoneOptions {
	close?: boolean;
}

/**
 * Marks a rendered line block as an OSC 133 navigation region.
 */
export function markOsc133Zone(lines: string[], options: Osc133ZoneOptions = {}): string[] {
	if (lines.length === 0) {
		return lines;
	}

	lines[0] = OSC133_ZONE_START + lines[0];
	if (options.close ?? true) {
		lines[lines.length - 1] = lines[lines.length - 1] + OSC133_ZONE_END + OSC133_ZONE_FINAL;
	}
	return lines;
}
