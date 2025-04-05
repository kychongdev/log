export function provider(provider_code: string) {
  switch (provider_code) {
    case "jdb":
      return "Jdb";
    case "ace333":
      return "Ace333";
    case "pegasus":
      return "Pegasus";
    case "besoft":
      return "BeSoft";
    case "pt":
      return "PlayTech";
    case "cq9":
      return "Cq9";
    case "ap":
      return "Advant Play";
    case "live22":
      return "Live22";
    default:
      return provider_code;
  }
}

export const providerList = [
  { code: "jdb", name: "Jdb" },
  { code: "ace333", name: "Ace333" },
  { code: "pegasus", name: "Pegasus" },
  { code: "besoft", name: "BeSoft" },
  { code: "pt", name: "PlayTech" },
  { code: "cq9", name: "Cq9" },
  { code: "ap", name: "Advant Play" },
  { code: "live22", name: "Live22" },
];
