import { AppException } from "@shopping/domain";

/**
 * Turns an error into German text a user can read.
 *
 * @param err - The error caught from a repository call
 * @returns A short German message for the UI
 */
export const toUserMessage = (err: unknown): string => {
  if (err instanceof AppException) {
    switch (err.status) {
      case 400:
        return "Die Eingabe ist ungültig.";
      case 404:
        return "Dieser Eintrag existiert nicht mehr.";
      case 502:
      case 503:
      case 504:
        return "Der Server ist nicht erreichbar.";
      default:
        return "Beim Server ist etwas schiefgegangen.";
    }
  }

  return "Der Server ist nicht erreichbar.";
};
