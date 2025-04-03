export function provider(provider_code: string) {
  switch (provider_code) {
    case "jdb":
      return "JDB";
    case "ace333":
      return "ACE333";
    case "pegasus":
      return "Pegasus";
    case "besoft":
      return "BeSoft";
    case "pt":
      return "PlayTech";
  }
}

export const providerList = [
  { code: "jdb", name: "JDB" },
  { code: "ace333", name: "ACE333" },
  { code: "pegasus", name: "PEGASUS" },
  { code: "besoft", name: "BeSoft" },
  { code: "pt", name: "PlayTech" },
];
