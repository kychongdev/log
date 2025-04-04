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
    case "cq9":
      return "CQ9";
    case "ap":
      return "Advant Play";
    case "live22":
      return "Live22";
    default:
      return provider_code;
  }
}

export const providerList = [
  { code: "jdb", name: "JDB" },
  { code: "ace333", name: "ACE333" },
  { code: "pegasus", name: "PEGASUS" },
  { code: "besoft", name: "BeSoft" },
  { code: "pt", name: "PlayTech" },
  { code: "cq9", name: "CQ9" },
  { code: "ap", name: "Advant Play" },
  { code: "live22", name: "Live22" },
];
