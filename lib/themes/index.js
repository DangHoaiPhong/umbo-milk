import pinkClassic from "./pinkClassic";
import trungThu from "./trungThu";

export const themes = [pinkClassic, trungThu];
export const DEFAULT_THEME_ID = pinkClassic.id;

export function getThemeById(id) {
  return themes.find((theme) => theme.id === id) || themes[0];
}
