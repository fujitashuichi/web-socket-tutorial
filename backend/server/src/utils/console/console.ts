import { styleText } from "node:util";


type ProcessRole = "SERVER" | "SYSTEM";
const THEMES = {
  SERVER: ["bgBlack", "magenta", "bold"],
  SYSTEM: ["bgBlack", "green", "bold"]
} as const;


export const appConsole = {
  log: (role: ProcessRole, message: string) => {
    const label = `[${role}] `;

    process.stdout.write(
      "\n" +
      styleText(THEMES[role], label) +
      message +
      "\n\n"
    );
  }
};
