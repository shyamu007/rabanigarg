export interface PortfolioProject {
  id: string;
  title: string;
  year: string;
  role: string;
  type: string;
  duration?: string;
  link?: string;
  password?: string;
  description: string;
  category: "video" | "curation" | "participatory";
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "when-we-play",
    title: "When We Play",
    year: "2022",
    role: "Camera, Director & Editor",
    type: "Documentary Short (7 Minutes)",
    link: "https://vimeo.com/1048682071?share=copy",
    password: "PLAY",
    category: "video",
    description: `At Penn, a group of undergraduate students played with the text and expression of Amitav Ghosh's new book, Jungle-Nama, which is a translation and adaptation of the Bon Bibi Johuranama. Curious about its origins, graduate students followed the play to the Sundarbans to see its original version performed by both a professional acting troupe and locals. In both contexts, people played with the plays and the filmmaking process became playful engagement. This documentary short is a playful compilation of footage from filming these multiple explorations of the play across contexts.`,
  },
  {
    id: "retold",
    title: "Retold",
    year: "2023",
    role: "Camera, Director & Editor",
    type: "Documentary (25 Minutes)",
    link: "https://vimeo.com/1048688800?share=copy",
    password: "RETOLD",
    category: "video",
    description: `"Retold" is a documentary on the production of "Jungle-nama: A Story of the Sundarbans," the first English-language production of Amitav Ghosh's text by the same name, set to singer/songwriting sensation Ali Sethi's music, and performed by Penn students directed by Brooke O'Harra. Jungle Nama is Amitav Ghosh's verse adaptation of an episode from the legend of Bon Bibi, a tale popular in the villages of the Sundarban.`,
  },
  {
    id: "ssmf-2022",
    title: "Screening Scholarship Media Festival",
    year: "2022",
    role: "Festival Director",
    type: "The Tenth Annual SSMF",
    link: "https://ssmf2022.camrapenn.org/",
    category: "curation",
    description: `SSMF 2022 brought together a community of scholars, students, activists, artists, and educators to critically explore notions of "PAUSE." The festival theme raised questions around who can pause, for whom pause is a privilege, and how our practices respond to the notions of pause. Projects ranged from film, audio, animations, performances, photographs, installations, immersive media, and other media forms over two days of sharing and discussion.`,
  },
  {
    id: "humanizing-stories",
    title: "Humanizing Stories Initiative",
    year: "2016–2021",
    role: "Curator",
    type: "Dispatches on children's & YA lit, media & comics",
    category: "curation",
    description: `From 2016 to 2021, alongside Prof. Ebony Thomas, we created an extensive repository of diverse children's and YA Lit shared on Twitter (@healingfictions), sharing a book a day. This project culminated in annual book lists that were shared with thousands of parents, educators, schools, and researchers.`,
  },
  {
    id: "behind-the-beats",
    title: "Behind the Beats Podcast",
    year: "Ongoing",
    role: "Podcast Creator and Host",
    type: "Serialized Podcast",
    category: "participatory",
    description: `"Behind the Beats" is a podcast set up in collaboration with 6 members of a youth-led hip hop collective in New Delhi, India that focuses on the practices of local hip hop artists. Through interviews with an intergenerational community of hip hop practitioners, this serialized podcast focuses on the five elements of hip hop — MCing, DJing, breakdancing, graffiti, and knowledge — and the uptake of these practices by local hip hop artists. This podcast project is building a resource for aspiring youth artists and historicising the emergence of hip hop in Delhi.`,
  },
];
