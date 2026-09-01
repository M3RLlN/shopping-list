import { z } from "zod";

/**
 * Checks that an id has the right shape: exactly 24 characters from `0-9` and `a-f`.
 *
 * The pattern from left to right:
 *   ^        the match starts at the beginning
 *   [0-9]    a digit, or
 *   [a-f]    a small letter from a to f, or
 *   [A-F]    a capital letter from A to F
 *   {24}     exactly 24 of those
 *   $        and the text ends there
 *
 * `^` and `$` matter: without them `"xxx6a76302fe56bd87ab0d36545xxx"` would pass,
 * because 24 fitting characters sit somewhere inside it.
 */
export const itemIdSchema = z.string().regex(/^([0-9]|[a-f]|[A-F]){24}$/, "Invalid Id format");
