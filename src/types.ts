export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  priceEst: string;
  benefits: string[];
  details: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "residential" | "commercial" | "painting" | "waterproofing" | "interior";
  status: "completed" | "ongoing";
  location: string;
  year: string;
  imageBefore?: string;
  imageAfter: string;
  description: string;
  area: string;
  client: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: "construction" | "painting" | "maintenance" | "interior";
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  project: string;
  location: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "construction" | "painting" | "warranty";
}
