import { AppException } from "@shopping/domain";

export const toUserMessage = (err: unknown): string => {
  if (err instanceof AppException) {
    switch (err.status) {
      case 400:
        return "Die Eingabe ist ungültig.";
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
