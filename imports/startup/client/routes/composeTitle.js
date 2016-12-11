export const siteBaseTitle = "Открытая психология";

export function composeTitle(title) {
  return title ? title + " — " + siteBaseTitle : siteBaseTitle;
}
