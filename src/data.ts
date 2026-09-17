import type { LucideIcon } from 'lucide-react';
import { Brain, Cloud, Code2, Database, Github, Globe2, Instagram, Linkedin, ShieldCheck, Twitter } from 'lucide-react';

export type IconType = LucideIcon;

export type Project = { number: string; title: string; description: string; category: string; stack: string[]; features: string[]; result: string; accent: string; github: string; demo: string };
export type SocialLink = { label: string; icon: string; url: string; accent: string; position: string };
export type SkillCategory = { title: string; icon: string; accent: string; items: string[] };
export type JourneyEntry = { year: string; role: string; org: string; text: string; tags: string[] };
export type Certification = { name: string; issuer: string; date: string; skills: string; accent: string; image?: string; link?: string };
export type Achievement = { number: string; title: string; category: string; year: string; description: string; accent: string; link: string };
export type BlogPost = { date: string; category: string; title: string; description: string; image?: string; link?: string };
export type GalleryItem = { title: string; category: string; className: string; label: string; image?: string };

export const contactEmail = 'work.himanshubarman@gmail.com';

export const socialLinks: SocialLink[] = [
  { label: 'GITHUB', icon: 'github', url: 'https://github.com/himanshuatwork21', accent: 'yellow', position: 's1' },
  { label: 'LINKEDIN', icon: 'linkedin', url: 'https://www.linkedin.com/in/himanshu-barman-1503a2408/', accent: 'cyan', position: 's2' },
  { label: 'TWITTER', icon: 'twitter', url: '', accent: 'pink', position: 's3' },
  { label: 'INSTAGRAM', icon: 'instagram', url: '', accent: 'green', position: 's4' },
];

export const socialIcons: Record<string, IconType> = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram };

export const floatingBadges = [
  { label: 'OPEN TO WORK', icon: 'briefcase', accent: 'green', position: 'b1' },
  { label: 'COLLABORATION', icon: 'handshake', accent: 'blue', position: 'b2' },
  { label: 'CTF PLAYER', icon: 'flag', accent: 'purple', position: 'b3' },
  { label: 'AI SECURITY', icon: 'shield', accent: 'orange', position: 'b4' },
];

export const projects: Project[] = [
  { number: '01', title: 'Sentinel / AI', category: 'AI / ML', description: 'An AI security dashboard for inspecting prompts, risky model outputs, and suspicious workflow events.', stack: ['Python', 'FastAPI', 'React', 'LLMs'], features: ['Prompt-risk scoring', 'Traceable model responses', 'SOC-style incident timeline'], result: 'Turns opaque AI behavior into reviewable security signals.', accent: 'yellow', github: 'https://github.com/himanshubarman', demo: '#' },
  { number: '02', title: 'Packet / Zero', category: 'CYBERSECURITY', description: 'A vulnerable lab environment for practicing modern web attack paths and defensive remediation.', stack: ['TypeScript', 'Node.js', 'Docker', 'Burp Suite'], features: ['Guided exploit paths', 'Request replay console', 'Defensive fix notes'], result: 'Built as a repeatable playground for ethical security practice.', accent: 'cyan', github: 'https://github.com/himanshubarman', demo: '#' },
  { number: '03', title: 'Phish / Lens', category: 'AI / ML', description: 'A lightweight classifier and analyst view for suspicious messages, URLs, and social engineering signals.', stack: ['Python', 'NLP', 'React', 'OSINT'], features: ['URL risk breakdown', 'Language anomaly cues', 'Manual analyst verdicts'], result: 'Designed to support human judgment instead of replacing it.', accent: 'pink', github: 'https://github.com/himanshubarman', demo: '#' },
];

export const skills: SkillCategory[] = [
  { title: 'LANGUAGES', icon: 'code', accent: 'yellow', items: ['Python', 'JavaScript', 'TypeScript', 'C / C++', 'SQL','Bash','Rust'] },
  { title: 'AI SECURITY', icon: 'brain', accent: 'pink', items: ['LLM Security', 'Prompt Injection', 'RAG Testing', 'AI Agents', 'Model Evaluation','MCPS','JailBreakings'] },
  { title: 'CYBERSECURITY', icon: 'shield', accent: 'cyan', items: ['Burp Suite', 'Nmap', 'Wireshark', 'EPICFORCE', 'Forensics','KALI'] },
  { title: 'WEB / SOFTWARE', icon: 'globe', accent: 'green', items: ['React', 'Node.js', 'FastAPI', 'REST APIs', 'Git'] },
  { title: 'DATA / STORAGE', icon: 'database', accent: 'orange', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'] },
  { title: 'CLOUD / OPS', icon: 'cloud', accent: 'purple', items: ['Docker', 'Linux', 'CI / CD', 'Vercel', 'Cloud Logs'] },
];

export const skillIcons: Record<string, IconType> = { code: Code2, brain: Brain, shield: ShieldCheck, globe: Globe2, database: Database, cloud: Cloud };

export const journey: JourneyEntry[] = [
  { year: '2026 — NOW', role: 'AI SECURITY ENGINEER', org: 'h1mnxshu.exe Lab', text: 'Designing secure AI workflows, testing LLM failure modes, and building small tools for prompt-risk review and defensive automation.', tags: ['LLM Security', 'Python', 'Threat Modeling'] },
  { year: '2025 — 2026', role: 'CYBERSECURITY INTERN', org: 'Independent Security Practice', text: 'Practiced web security, OSINT, CTF workflows, traffic analysis, and incident-style documentation through repeatable lab work.', tags: ['Burp Suite', 'Linux', 'CTF'] },
];

export const certifications: Certification[] = [
  {
    name: 'Foundations of Cybersecurity',
    issuer: 'Security Credential',
    date: '2025',
    skills: 'Threat models - networks - controls',
    accent: 'yellow',
    image: '/certifications/foundations-cybersecurity.svg',
    link: 'https://example.com/verify/foundations-of-cybersecurity',
  },
  {
    name: 'AI Security Fundamentals',
    issuer: 'AI Security Track',
    date: '2026',
    skills: 'Prompt risks - evaluation - guardrails',
    accent: 'cyan',
    image: '/certifications/ai-security-fundamentals.svg',
    link: 'https://example.com/verify/ai-security-fundamentals',
  },
  {
    name: 'Cloud Security Basics',
    issuer: 'Cloud Practitioner Track',
    date: '2025',
    skills: 'IAM - logging - infrastructure basics',
    accent: 'pink',
    image: '/certifications/cloud-security-basics.svg',
    link: 'https://example.com/verify/cloud-security-basics',
  },
];

export const achievements: Achievement[] = [
  { number: '01', title: 'FIRST SECURITY LAB', category: 'MILESTONE', year: '2024', description: 'Built a local vulnerable app and documented exploit paths plus fixes.', accent: 'yellow', link: 'https://github.com/himanshuatwork21' },
  { number: '02', title: 'THE HARD BUG', category: 'ENGINEERING', year: '2025', description: 'Traced a confusing auth failure from symptom to clean remediation notes.', accent: 'cyan', link: '#' },
  { number: '03', title: 'AI RISK MAP', category: 'RESEARCH', year: '2026', description: 'A growing map of LLM attack surfaces, mitigations, and test prompts.', accent: 'pink', link: '' },
  { number: '04', title: 'THE NEXT REP', category: 'MOMENTUM', year: '2026', description: 'Showing up in labs, notes, and experiments until skill becomes instinct.', accent: 'green', link: 'https://github.com/himanshuatwork21' },
];

export const blogs: BlogPost[] = [
  { date: '18.08.26', category: 'CYBERSECURITY', title: 'The useful anxiety of a good threat model', description: 'A practical way to turn "what could go wrong?" into a stronger design review.', image: 'blogs/1f829d1fe42d151aac16d9c76e59cd40.jpg', link: '' },
  { date: '02.07.26', category: 'AI SECURITY', title: 'Prompt injection is a product bug too', description: 'Why LLM apps need security thinking before the first workflow goes live.', image: '', link: '' },
  { date: '11.05.26', category: 'SYSTEMS', title: 'Notes from the edge of the stack', description: 'A field guide to the layers between a button, a process, and a security event.', image: '', link: '' },
];

export const gallery: GalleryItem[] = [
  { title: 'Packet traces', category: 'CTF', className: 'gallery-dark', label: '01 / TRACE', image: '/home/thealpha/Downloads/finalfolio-formspree/cyberfolio.exe/public/blogs/1f829d1fe42d151aac16d9c76e59cd40.jpg' },
  { title: 'Late night lab', category: 'WORKSPACE', className: 'gallery-yellow', label: '02 / BUILD', image: '' },
  { title: 'Model attack notes', category: 'AI SECURITY', className: 'gallery-grid', label: '03 / LEARN', image: '' },
  { title: 'Security meetup', category: 'EVENTS', className: 'gallery-pink', label: '04 / SHARE', image: '' },
  { title: 'The toolkit', category: 'CERTIFICATIONS', className: 'gallery-lines', label: '05 / KEEP', image: '' },
];

export const terminalCommands: Record<string, string[]> = {
  whoami: ['h1mnxshu.exe - Himanshu Barman.', 'cybersecurity engineer / ai security operator.'],
  stack: ['python / linux / burp / docker', 'llm security / osint / web security / ctf'],
  status: ['SYSTEM ONLINE.', 'LAB STATUS // GREEN', 'defender loop: listening'],
  scan: ['running surface scan...', 'ports: curiosity, discipline, useful paranoia', 'result: no critical weirdness found.'],
  music: ['romantic jazz stream available in the lower-left player.'],
  projects: ['06 security + AI experiments.', 'jump to #projects.'],
  journey: ['AI security labs / CTFs / research / shipped tools.'],
  contact: [`mail: ${contactEmail}`],
  help: ['whoami  stack  status  scan', 'projects  journey  music  contact  clear'],
  about: ['h1mnxshu.exe - ai security + cybersecurity + software.'],
  skills: ['python / react / linux / burp / llm security'],
  clear: [],
};
