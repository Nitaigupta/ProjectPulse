import { countries } from "countries-list";

// e.g. using flagcdn.com (or any other flag CDN you prefer)
const getFlagUrl = (code: string) =>
  `https://flagcdn.com/24x18/${code.toLowerCase()}.png`; // 24x18 is size
// Check the CDN docs for available sizes and formats. [web:62][web:65]

export const countryList = Object.entries(countries).map(([code, value]) => ({
  code,
  name: value.name,
  flag: getFlagUrl(code),
}));
