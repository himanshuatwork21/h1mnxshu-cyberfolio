import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Link2,
  Mail,
  Menu,
  Pause,
  Play,
  Plus,
  Send,
  SkipForward,
  Terminal,
  Twitter,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

import {
  type Project,
  type GalleryItem,
  type BlogPost,
  socialLinks,
  socialIcons,
  projects,
  skills,
  skillIcons,
  journey,
  certifications,
  achievements,
  blogs,
  gallery,
  terminalCommands,
  contactEmail,
} from '@/data';

import portraitImage from './assets/pfp.jpeg';


/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({
  children,
  number,
}: {
  children: string;
  number?: string;
}) {
  return (
    <div className="section-label">
      <span>{number ?? '///'}</span>
      {children}
    </div>
  );
}


/* =========================================================
   HERO TYPEWRITER
========================================================= */

function useTypewriterLine(
  lines: string[],
  holdMs = 2400,
  typeSpeed = 55
): string {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<
    'typing' | 'holding' | 'deleting'
  >('typing');

  useEffect(() => {
    const full = lines[index];

    if (phase === 'typing') {
      if (typed.length < full.length) {
        const timer = window.setTimeout(() => {
          setTyped(full.slice(0, typed.length + 1));
        }, typeSpeed);

        return () => window.clearTimeout(timer);
      }

      const timer = window.setTimeout(() => {
        setPhase('holding');
      }, holdMs);

      return () => window.clearTimeout(timer);
    }

    if (phase === 'holding') {
      setPhase('deleting');
      return;
    }

    if (phase === 'deleting') {
      if (typed.length > 0) {
        const timer = window.setTimeout(() => {
          setTyped(typed.slice(0, -1));
        }, 25);

        return () => window.clearTimeout(timer);
      }

      setIndex((current) => (current + 1) % lines.length);
      setPhase('typing');
    }
  }, [
    typed,
    phase,
    index,
    lines,
    holdMs,
    typeSpeed,
  ]);

  return typed;
}


/* =========================================================
   ABOUT TERMINAL
========================================================= */

function AboutTerminal() {
  const [lines, setLines] = useState<string[]>([
    'h1mnxshu.exe shell v2.6',
    'operator: Himanshu Barman',
    'mode: ai-security / cyber-defense',
    'type "help" for commands',
  ]);

  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const outRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (outRef.current) {
      outRef.current.scrollTop =
        outRef.current.scrollHeight;
    }
  }, [lines, typing]);

  const typeResponse = useCallback(
    (
      responses: string[],
      base: string[]
    ) => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }

      setTyping(true);

      let lineIndex = 0;
      let charIndex = 0;

      setLines([...base, '']);

      const tick = () => {
        if (lineIndex >= responses.length) {
          setTyping(false);
          return;
        }

        const current = responses[lineIndex];

        if (charIndex <= current.length) {
          setLines((previous) => {
            const next = [...previous];

            next[next.length - 1] =
              current.slice(0, charIndex);

            return next;
          });

          charIndex++;

          timer.current = window.setTimeout(
            tick,
            14
          );

          return;
        }

        lineIndex++;
        charIndex = 0;

        setLines((previous) => [
          ...previous,
          '',
        ]);

        timer.current = window.setTimeout(
          tick,
          60
        );
      };

      timer.current = window.setTimeout(
        tick,
        80
      );
    },
    []
  );

  const submit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const command =
      input.trim().toLowerCase();

    if (!command || typing) {
      return;
    }

    setInput('');

    if (command === 'clear') {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }

      setLines([]);
      setTyping(false);

      return;
    }

    const response =
      terminalCommands[command] ??
      [
        `command not found: "${command}"`,
        'type "help" for available commands.',
      ];

    typeResponse(
      response,
      [
        ...lines.filter(Boolean),
        `> ${command}`,
      ]
    );
  };

  return (
    <div className="terminal-card">

      <div className="terminal-bar">

        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>

        <span>
          h1mnxshu@macbook-pro:~/lab
        </span>

        <span className="terminal-live">
          ●
        </span>

      </div>

      <div
        className="terminal-body"
        ref={outRef}
      >
        {lines.map((line, index) => (
          <p
            key={index}
            className={
              line.startsWith('>')
                ? 'input-line'
                : ''
            }
          >
            {line || '\u00A0'}
          </p>
        ))}

        {typing && (
          <p className="terminal-cursor">
            _
          </p>
        )}
      </div>

      <form
        className="terminal-input-row"
        onSubmit={submit}
      >
        <span>h1mnxshu %</span>

        <input
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          placeholder="try whoami, stack, scan, music, contact..."
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
        />
      </form>

    </div>
  );
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const [activeFilter, setActiveFilter] =
    useState('ALL');

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [selectedBlog, setSelectedBlog] =
    useState<BlogPost | null>(null);

  const [terminalOpen, setTerminalOpen] =
    useState(false);

  const [terminalInput, setTerminalInput] =
    useState('');

  const [terminalLines, setTerminalLines] =
    useState([
      'h1mnxshu.exe overlay terminal',
      'static: 01001000 01000010 // Himanshu Barman',
      'type "help" to see available commands.',
    ]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [playing, setPlaying] =
    useState(false);

  const [muted, setMuted] =
    useState(false);

  const [trackIndex, setTrackIndex] =
    useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [lightbox, setLightbox] =
    useState<GalleryItem | null>(null);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [contactStatus, setContactStatus] =
    useState<'idle' | 'submitting' | 'success' | 'error'>('idle');


  /* -------------------------------------------------------
     HERO
  ------------------------------------------------------- */

  const typedHero = useTypewriterLine([
    'ML Systems Builder',
    'Zero-Day Hunter',
    'AI Security',
    'Threat Lab Engineer',
  ]);

  const resumeUrl = '/resume.pdf';

  const jazzTracks = [
    {
      title: 'soundhelix / calm pulse',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      title: 'soundhelix / low drift',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      title: 'soundhelix / midnight code',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  ];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.muted = muted;

    if (playing) {
      audio.play().catch(() => {
        setPlaying(false);
      });
      return;
    }

    audio.pause();
  }, [playing, muted, trackIndex]);


  /* -------------------------------------------------------
     PROJECT FILTER
  ------------------------------------------------------- */

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'ALL'
        ? projects
        : projects.filter(
            (project) =>
              project.category === activeFilter
          ),
    [activeFilter]
  );


  /* -------------------------------------------------------
     FLOATING TERMINAL
  ------------------------------------------------------- */

  const runFloatCmd = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const command =
      terminalInput.trim().toLowerCase();

    if (!command) {
      return;
    }

    const responses: Record<
      string,
      string[]
    > = {
      help: [
        'whoami  stack   scan    projects',
        'notes   music   contact clear',
      ],

      whoami: [
        'h1mnxshu.exe // Himanshu Barman',
        'cybersecurity engineer + AI security builder.',
      ],

      about: [
        'Himanshu builds secure AI workflows, labs, and defensive tooling.',
      ],

      skills: [
        'python / linux / burp / osint / react / llms / docker',
      ],

      stack: [
        'primary stack: python, linux, react, fastapi, docker',
        'security stack: burp, nmap, wireshark, osint, threat modeling',
      ],

      scan: [
        'running local vibe scan...',
        'portfolio integrity: clean',
        'aesthetic signal: neon-paper hacker mode',
      ],

      projects: [
        'six AI security experiments in the lab. scroll to #projects.',
      ],

      journey: [
        'learning in public, shipping in small loops.',
      ],

      notes: [
        'field notes on ai security, threat models, and lab rebuilds.',
      ],

      music: [
        'romantic jazz stream armed. use the bottom-left player.',
      ],

      contact: [
        `open a line: ${contactEmail}`,
      ],

      clear: [],
    };

    setTerminalLines((current) =>
      command === 'clear'
        ? []
        : [
            ...current,
            `> ${command}`,
            ...(
              responses[command] ??
              [
                'command not found — try "help".',
              ]
            ),
          ]
    );

    setTerminalInput('');
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="site-shell">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="topbar">

        <a
          className="brand"
          href="#top"
        >
          <span className="brand-mark">
            HB
          </span>

          <span className="brand-copy">
            h1mnxshu.exe
            <br />
            <b>AI SECURITY</b>
          </span>
        </a>


        <nav
          className={
            menuOpen
              ? 'main-nav is-open'
              : 'main-nav'
          }
        >
          {[
            'about',
            'arsenal',
            'journey',
            'projects',
            'certifications',
            'achievements',
            'blog',
            'gallery',
            'contact',
          ].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              {item.toUpperCase()}
            </a>
          ))}
        </nav>


        <div className="top-actions">

          <span className="availability">
            <i />
            OPEN TO OPPORTUNITIES
          </span>

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>

        </div>

      </header>


      <main id="top">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero section-pad">
          <div className="hero-stage">
            <div className="floating-cards">
              {[
                { label: '2026', accent: 'mint', position: 'card-top-left' },
                { label: 'OPEN TO WORK', accent: 'pink', position: 'card-right-top' },
                { label: 'ML Systems', accent: 'green', position: 'card-left-bottom' },
                { label: 'LLMs', accent: 'purple', position: 'card-right-bottom' },
                
              ].map((card) => (
                <div key={card.position} className={`floating-card ${card.position} ${card.accent}`}>
                  {card.label}
                </div>
              ))}

              {[
                { label: 'GITHUB', icon: Github, url: socialLinks[0].url, accent: 'yellow', position: 's1' },
                { label: 'LINKEDIN', icon: Linkedin, url: socialLinks[1].url, accent: 'cyan', position: 's2' },
                { label: 'TWITTER', icon: Twitter, url: socialLinks[2].url, accent: 'pink', position: 's3' },
                { label: 'INSTAGRAM', icon: Instagram, url: socialLinks[3].url, accent: 'green', position: 's4' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`floating-card social-link ${link.position} ${link.accent}`}
                  aria-label={link.label}
                >
                  <span className="social-mini-icon"><link.icon size={12} /></span>
                  <span className="social-mini-label">{link.label}</span>
                </a>
              ))}
            </div>

            <div className="hero-center">
              <div className="hero-greeting">
                <span className="greeting-dot" />
                HELLO WORLD
              </div>

              <div className="hero-location">📍 Hyderabad, IN</div>

              <h1 className="hero-name">
                <span>HIMANSHU</span>
                <strong>BARMAN</strong>
              </h1>

              <div className="hero-role-line">
                <span className="role-pill">
                  <span className="role-symbol">&gt;</span>
                  <span className="role-text">{typedHero}</span>
                  <span className="role-cursor">_</span>
                </span>
              </div>

              <div className="hero-actions">
                <a className="button button-dark" href="#projects">
                  View Projects
                </a>
                <a className="button button-yellow" href="#contact">
                  Let&apos;s Talk
                </a>
                <a className="button button-outline" href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                  <FileText size={17} />
                  Resume
                </a>
              </div>
            </div>

            <div className="scroll-cue">
              <span>SCROLL</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </section>


        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"
          className="section-pad about-section"
        >

          <div className="section-head">

            <SectionLabel number="01">
              WHO AM I
            </SectionLabel>

            <p className="section-aside">
              Cybersecurity engineer with one foot in the lab
              <br />
              and the other in AI security.
            </p>

          </div>


          <div className="about-grid">

            <div className="about-console-column">

              <div className="about-copy">
                <span className="about-kicker">
                  ACCESS GRANTED // OPERATOR PROFILE
                </span>

                <h2>
                  Himanshu Barman
                  <span>h1mnxshu.exe</span>
                </h2>

                <p>
                  I build and test security-minded AI systems, study attack
                  surfaces, and turn messy logs into decisions a defender can
                  trust.
                </p>

                <div className="about-pills">
                  <span>AI Security</span>
                  <span>Threat Modeling</span>
                  <span>CTF Labs</span>
                  <span>OSINT</span>
                </div>
              </div>

              <AboutTerminal />

            </div>


            <div className="portrait-wrap">

              <div className="portrait-shape ps-1" />
              <div className="portrait-shape ps-2" />

              <div className="portrait-frame">

                <img
                  src={portraitImage}
                  alt="Himanshu Barman"
                />

                <span>
                  H1MNXSHU.EXE
                </span>

                <div className="portrait-grain" />

              </div>


              <div className="portrait-note">

                VISUAL ID //
                <br />

                  <b>
                  HB
                </b>

              </div>

            </div>

          </div>


          <div className="stats-row">

            {[
              ['06+', 'PROJECTS'],
              ['03', 'CERTIFICATIONS'],
              ['12+', 'CTF / LABS'],
              ['∞', 'QUESTIONS'],
            ].map(
              ([value, label]) => (
                <div key={label}>

                  <strong>
                    {value}
                  </strong>

                  <span>
                    {label}
                  </span>

                </div>
              )
            )}

          </div>

        </section>


        {/* =================================================
            ARSENAL
        ================================================= */}

        <section
          id="arsenal"
          className="section-pad arsenal-section"
        >

          <div className="section-head">

            <SectionLabel number="02">
              MY TECHNICAL ARSENAL
            </SectionLabel>

            <p className="section-aside">
              No progress bars.
              <br />
              Just things I like using.
            </p>

          </div>


          <div className="arsenal-grid">

            {skills.map(
              (category, index) => {

                const Icon =
                  skillIcons[
                    category.icon
                  ];

                return (
                  <div
                    className={`skill-card sk-${category.accent}`}
                    key={category.title}
                  >

                    <div className="sk-head">

                      <span className="sk-icon">
                        <Icon size={20} />
                      </span>

                      <span className="sk-num">
                        0{index + 1}
                      </span>

                    </div>


                    <h3>
                      {category.title}
                    </h3>


                    <div className="skill-tags">

                      {category.items.map(
                        (item) => (
                          <span key={item}>

                            <i className="tech-initial">
                              {item
                                .replace(/[^a-z0-9]/gi, '')
                                .slice(0, 2)
                                .toUpperCase()}
                            </i>

                            {item}

                          </span>
                        )
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* =================================================
            JOURNEY
        ================================================= */}

        <section
          id="journey"
          className="section-pad journey-section"
        >

          <div className="section-head">

            <SectionLabel number="03">
              PROFESSIONAL JOURNEY
            </SectionLabel>

            <p className="section-aside">
              The route is not linear.
              <br />
              That is the interesting part.
            </p>

          </div>


          <div className="journey-cards">

            {journey.map(
              (item, index) => (

                <article
                  className={`journey-card jc-${index % 3}`}
                  key={item.year}
                >

                  <span className="timeline-node" />
                  <span className="journey-scan" />

                  <div className="jc-number">
                    0{index + 1}
                  </div>

                  <div className="jc-year">

                    <span className="status-dot" />

                    {item.year}

                  </div>

                  <h3>
                    {item.role}
                  </h3>

                  <p className="jc-org">
                    {item.org}
                  </p>

                  <p className="jc-text">
                    {item.text}
                  </p>

                  <div className="tag-line">

                    {item.tags.map(
                      (tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      )
                    )}

                  </div>

                  <ArrowUpRight
                    size={20}
                    className="jc-arrow"
                  />

                </article>

              )
            )}

          </div>

        </section>


        {/* =================================================
            PROJECTS
        ================================================= */}

        <section
          id="projects"
          className="section-pad projects-section"
        >

          <div className="section-head projects-head">

            <div>

              <SectionLabel number="04">
                SELECTED WORK
              </SectionLabel>

              <h2>
                Experiments,
                <br />

                <span>
                  shipped.
                </span>

              </h2>

            </div>


            <p className="section-aside">
              A selection of things built to
              <br />
              understand the world better.
            </p>

          </div>


          <div className="filter-row">

            {[
              'ALL',
              'AI / ML',
              'CYBERSECURITY',
              'FINTECH',
              'WEB',
              'SYSTEMS',
            ].map((filter) => (

              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? 'filter active'
                    : 'filter'
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>

            ))}

          </div>


          <div className="projects-grid">

            {filteredProjects.map(
              (project, index) => (

                <article
                  className={`project-card card-${index % 3} pa-${project.accent}`}
                  key={project.number}
                  onClick={() =>
                    setSelectedProject(
                      project
                    )
                  }
                >

                  <div
                    className={`project-art art-${project.accent}`}
                  >

                    <span className="project-number">
                      {project.number} / 06
                    </span>

                    <span className="project-category">
                      {project.category}
                    </span>


                    <div className="art-signal">

                      <span />
                      <span />
                      <span />

                    </div>


                    <div className="art-title">

                      {project.title.split(
                        ' / '
                      )[0]}

                      <br />

                      <b>
                        {
                          project.title.split(
                            ' / '
                          )[1] ??
                          'SYSTEM'
                        }
                      </b>

                    </div>


                    <span className="project-open">
                      <ArrowUpRight
                        size={20}
                      />
                    </span>

                  </div>


                  <div className="project-content">

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.description}
                    </p>


                    <div className="project-meta">

                      {project.stack.map(
                        (tech) => (
                          <span key={tech}>
                            {tech}
                          </span>
                        )
                      )}

                    </div>


                    <div className="project-footer">

                      <button>
                        VIEW CASE STUDY
                        <ArrowUpRight
                          size={15}
                        />
                      </button>


                      <div className="project-links">

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          aria-label="GitHub repo"
                        >
                          <Github size={16} />
                        </a>


                        <a
                          href={project.demo}
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          aria-label="Live demo"
                        >
                          <ExternalLink
                            size={16}
                          />
                        </a>

                      </div>

                    </div>

                  </div>

                </article>

              )
            )}

          </div>

        </section>


        {/* =================================================
            CERTIFICATIONS
        ================================================= */}

        <section
          id="certifications"
          className="section-pad cert-section"
        >

          <div className="section-head">

            <SectionLabel number="05">
              CERTIFICATIONS
            </SectionLabel>

            <p className="section-aside">
              Proof of learning,
              <br />
              not a substitute for it.
            </p>

          </div>


          <div className="cert-grid">

            {certifications.map(
              (certificate, index) => (

                <article
                  className={`certificate ca-${certificate.accent}`}
                  key={certificate.name}
                >

                  <div className="cert-image">

                    {certificate.image ? (
                      <img
                        src={certificate.image}
                        alt={certificate.name}
                      />
                    ) : (
                      <span>
                        IMAGE / 0{index + 1}
                      </span>
                    )}

                  </div>


                  <div className="cert-body">

                    <div className="cert-top">

                      <span>
                        ◆ CERTIFICATE
                      </span>

                      <span>
                        0{index + 1}
                      </span>

                    </div>


                    <h3>
                      {certificate.name}
                    </h3>


                    <div className="cert-details">

                      <span>
                        {certificate.issuer}
                      </span>

                      <b>
                        {certificate.date}
                      </b>

                    </div>


                    <p>
                      {certificate.skills}
                    </p>


                    <a
                      className="cert-button"
                      href={certificate.link || '#'}
                      target={certificate.link ? '_blank' : undefined}
                      rel={certificate.link ? 'noreferrer' : undefined}
                      aria-label={`Verify ${certificate.name}`}
                    >
                      VERIFY
                      <ExternalLink
                        size={13}
                      />
                    </a>

                  </div>

                </article>

              )
            )}

          </div>

        </section>


        {/* =================================================
            ACHIEVEMENTS
        ================================================= */}

        <section
          id="achievements"
          className="section-pad proof-section"
        >

          <div className="section-head">

            <SectionLabel number="06">
              PROOF OF WORK
            </SectionLabel>

            <p className="section-aside">
              Not a trophy cabinet.
              <br />
              A record of the reps.
            </p>

          </div>


          <div className="proof-grid">

            {achievements.map(
              (achievement) => (

                <article
                  className={`proof-card pf-${achievement.accent}`}
                  key={achievement.number}
                >

                  <div className="proof-art">
                    <span className="proof-number">
                      {achievement.number}
                    </span>

                    <span className="proof-pill">
                      {achievement.category}
                    </span>

                    <div className="proof-geometry" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>


                  <div className="proof-body">

                    <div className="proof-top">

                      <span>
                        {achievement.category}
                      </span>

                    </div>


                    <h3>
                      {achievement.title}
                    </h3>


                    <p>
                      {achievement.description}
                    </p>


                    {achievement.link ? (

                      <a
                        href={achievement.link}
                        className="proof-link"
                      >
                        READ MORE
                        <Link2 size={13} />
                      </a>

                    ) : (

                      <span className="proof-tag">
                        REPS / 01
                      </span>

                    )}

                  </div>

                </article>

              )
            )}

          </div>

        </section>


        {/* =================================================
            BLOG
        ================================================= */}

        <section
          id="blog"
          className="section-pad blog-section"
        >

          <div className="section-head">

            <SectionLabel number="07">
              FIELD NOTES
            </SectionLabel>

            <p className="section-aside">
              Thoughts from the
              <br />
              open tabs.
            </p>

          </div>


          <article className="featured-note">

            <div className="featured-note-copy">

              <span className="note-kicker">
                FIELD NOTE / 001
              </span>

              <h2>
                Audit the model
                <br />

                <span>
                  before trust.
                </span>
              </h2>

              <p>
                Notes on prompt injection, model behavior, and the tiny
                security checks that keep AI tools honest.
              </p>

              <a
                href="#contact"
                className="text-link"
              >
                REQUEST THE NOTE
                <ArrowUpRight size={16} />
              </a>

            </div>


            <div className="note-photo">
              <span>
                upload/photo slot
              </span>
              <b>SECURITY NOTE</b>
            </div>

          </article>


          <div className="blog-grid">

            {blogs.map(
              (blog) => (

                <article
                  className="note-card"
                  key={blog.title}
                  onClick={() => {
                    if (!blog.link) {
                      setSelectedBlog(blog);
                    }
                  }}
                >

                  <div className="note-card-photo">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt=""
                      />
                    ) : (
                      <>
                        <i />
                        <span>PHOTO / LINK READY</span>
                      </>
                    )}
                  </div>

                  <div className="blog-top">

                    <span>
                      {blog.date}
                    </span>

                    <b>
                      {blog.category}
                    </b>

                  </div>


                  <h3>
                    {blog.title}
                  </h3>


                  <p>
                    {blog.description}
                  </p>


                  {blog.link ? (
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      READ MORE
                      <ArrowUpRight
                        size={14}
                      />
                    </a>
                  ) : (
                    <button
                      className="note-read-button"
                      type="button"
                    >
                      OPEN NOTE
                      <ArrowUpRight
                        size={14}
                      />
                    </button>
                  )}

                </article>

              )
            )}

          </div>

        </section>


        {/* =================================================
            GALLERY
        ================================================= */}

        <section
          id="gallery"
          className="section-pad gallery-section"
        >

          <div className="section-head">

            <SectionLabel number="08">
              THE GALLERY
            </SectionLabel>

            <p className="section-aside">
              Screens, scribbles,
              <br />
              and the in-between.
            </p>

          </div>


          <div className="gallery-grid-wrap">

            {gallery.map(
              (item) => (

                <button
                  className={`gallery-item ${item.className}`}
                  key={item.title}
                  onClick={() =>
                    setLightbox(item)
                  }
                >

                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                    />
                  ) : (
                    <span className="gallery-placeholder">
                      <i />
                      <span>{item.category}</span>
                    </span>
                  )}

                  <span className="gallery-overlay" />

                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.category}
                    <ArrowUpRight
                      size={12}
                    />
                  </small>

                </button>

              )
            )}

          </div>

        </section>


        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="contact"
          className="contact-section"
        >

          <div className="contact-inner">

            <SectionLabel number="09">
              START A CONVERSATION
            </SectionLabel>


            <h2>
              LET'S BUILD
              <br />

              <span>
                SOMETHING
              </span>

              <br />

              INTERESTING.
            </h2>


            <div className="contact-grid">

              <form
                action="https://formspree.io/f/mdekozrk"
                method="POST"
                onSubmit={async (event) => {
                  event.preventDefault();

                  if (contactStatus === 'submitting') {
                    return;
                  }

                  setContactStatus('submitting');

                  try {
                    const response = await fetch(
                      'https://formspree.io/f/mdekozrk',
                      {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                        },
                        body: new FormData(event.currentTarget),
                      }
                    );

                    if (!response.ok) {
                      throw new Error('Form submission failed');
                    }

                    setContactStatus('success');
                    setContactForm({
                      name: '',
                      email: '',
                      message: '',
                    });
                  } catch {
                    setContactStatus('error');
                  }
                }}
              >

                <label>

                  YOUR NAME

                  <input
                    name="name"
                    value={contactForm.name}
                    onChange={(event) => {
                      setContactForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }));
                    }}
                    placeholder="Ada Lovelace"
                    required
                  />

                </label>


                <label>

                  YOUR EMAIL

                  <input
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(event) => {
                      setContactForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }));
                    }}
                    placeholder="hello@example.com"
                    required
                  />

                </label>


                <label>

                  YOUR MESSAGE

                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={(event) => {
                      setContactForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }));
                    }}
                    placeholder="Tell me what you are thinking about..."
                    rows={3}
                    required
                  />

                </label>


                <button
                  className="button button-yellow"
                  type="submit"
                  disabled={contactStatus === 'submitting'}
                >
                  {contactStatus === 'submitting'
                    ? 'SENDING...'
                    : contactStatus === 'success'
                      ? 'MESSAGE SENT'
                      : 'SEND MESSAGE'}
                  {contactStatus === 'success' ? (
                    <Check size={16} />
                  ) : (
                    <Send size={16} />
                  )}
                </button>

                {contactStatus === 'success' && (
                  <p className="contact-form-status">
                    Message sent successfully. I'll get back to you soon.
                  </p>
                )}

                {contactStatus === 'error' && (
                  <p className="contact-form-status">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

              </form>


              <div className="contact-links">

                <p>
                  Have a question, a project,
                  or an interesting problem?
                  The inbox is open.
                </p>


                <a href={`mailto:${contactEmail}`}>

                  <Mail size={17} />

                  EMAIL

                  <ArrowUpRight
                    size={15}
                  />

                </a>


                <a
                  href={socialLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <Github size={17} />

                  GITHUB

                  <ArrowUpRight
                    size={15}
                  />

                </a>


                <a
                  href={socialLinks[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  {(() => {
                    const Icon = socialIcons[socialLinks[1].icon];
                    return <Icon size={17} />;
                  })()}

                  LINKEDIN

                  <ArrowUpRight
                    size={15}
                  />

                </a>

                <a
                  href={socialLinks[2].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  {(() => {
                    const Icon = socialIcons[socialLinks[2].icon];
                    return <Icon size={17} />;
                  })()}

                  TWITTER

                  <ArrowUpRight
                    size={15}
                  />

                </a>

                <a
                  href={socialLinks[3].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  {(() => {
                    const Icon = socialIcons[socialLinks[3].icon];
                    return <Icon size={17} />;
                  })()}

                  INSTAGRAM

                  <ArrowUpRight
                    size={15}
                  />

                </a>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="footer">

        <span>
          © 2026 HIMANSHU BARMAN
        </span>

        <span>
          BUILT WITH
          <b>
            REACT / TYPESCRIPT / THREAT INTEL
          </b>
        </span>

        <span>
          <i />
          SYSTEM STATUS: ONLINE
        </span>

      </footer>


      {/* ===================================================
          MUSIC PLAYER
      =================================================== */}

      <div className="music-player">

        <audio
          ref={audioRef}
          src={jazzTracks[trackIndex].src}
          preload="none"
        />

        <button
          className="music-icon"
          type="button"
          onClick={() =>
            setPlaying(!playing)
          }
          aria-label={
            playing ? 'Pause jazz' : 'Play jazz'
          }
        >

          {playing ? (
            <Pause size={14} />
          ) : (
            <Play size={14} />
          )}

        </button>


        <span>

          <small>
            NOW PLAYING
          </small>

          <b>
            {playing
              ? jazzTracks[trackIndex].title
              : 'soundhelix focus'}
          </b>

        </span>


        <button
          className="music-control"
          type="button"
          onClick={() =>
            setMuted(!muted)
          }
          aria-label={muted ? 'Unmute jazz' : 'Mute jazz'}
        >
          {muted ? (
            <VolumeX size={13} />
          ) : (
            <Volume2 size={13} />
          )}
        </button>


        <button
          className="music-control"
          type="button"
          onClick={() => {
            setTrackIndex(
              (current) =>
                (current + 1) %
                jazzTracks.length
            );
            setPlaying(true);
          }}
          aria-label="Next jazz track"
        >
          <SkipForward size={13} />
        </button>


        <span className="music-bars">

          {[1, 2, 3, 4].map(
            (bar) => (

              <i
                key={bar}
                className={
                  playing
                    ? 'bar playing'
                    : 'bar'
                }
              />

            )
          )}

        </span>

      </div>


      {/* ===================================================
          FLOATING TERMINAL BUTTON
      =================================================== */}

      <button
        className="floating-terminal"
        onClick={() =>
          setTerminalOpen(true)
        }
      >

        <Terminal size={18} />

        <span>
          OPEN TERMINAL
        </span>

      </button>


      {/* ===================================================
          PROJECT MODAL
      =================================================== */}

      {selectedProject && (

        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            className="project-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProject(null)
              }
            >
              <X />
            </button>


            <span className="mono-label">
              CASE STUDY /
              {' '}
              {selectedProject.number}
            </span>


            <h2>
              {selectedProject.title}
            </h2>


            <p className="modal-intro">
              {selectedProject.description}
            </p>


            <div className="modal-grid">

              <div>

                <span className="mono-label">
                  PROBLEM
                </span>

                <p>
                  How might we make a
                  complicated workflow easier
                  to understand, inspect,
                  and improve?
                </p>

              </div>


              <div>

                <span className="mono-label">
                  SOLUTION
                </span>

                <p>
                  {selectedProject.result}
                </p>

              </div>


              <div>

                <span className="mono-label">
                  ARCHITECTURE
                </span>

                <p>
                  {selectedProject.stack.join(
                    ' / '
                  )}
                </p>

              </div>


              <div>

                <span className="mono-label">
                  KEY FEATURES
                </span>

                <ul>

                  {selectedProject.features.map(
                    (feature) => (

                      <li key={feature}>

                        <Check
                          size={14}
                        />

                        {feature}

                      </li>

                    )
                  )}

                </ul>

              </div>

            </div>


            <div className="modal-footer">

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-dark"
              >
                GITHUB
                <Github size={16} />
              </a>


              <a
                href={selectedProject.demo}
                className="button button-yellow"
              >
                LIVE DEMO
                <ExternalLink
                  size={16}
                />
              </a>

            </div>

          </div>

        </div>

      )}


      {/* ===================================================
          FIELD NOTE MODAL
      =================================================== */}

      {selectedBlog && (

        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedBlog(null)
          }
        >

          <div
            className="project-modal note-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedBlog(null)
              }
            >
              <X />
            </button>

            <span className="mono-label">
              FIELD NOTE / {selectedBlog.date}
            </span>

            <h2>
              {selectedBlog.title}
            </h2>

            <p className="modal-intro">
              {selectedBlog.description}
            </p>

            <div className="note-modal-panel">
              <span>
                {selectedBlog.category}
              </span>
              <p>
                Blog link not connected yet. Add a `link` and optional
                `image` for this note in `src/data.ts` when the article is
                live.
              </p>
            </div>

          </div>

        </div>

      )}


      {/* ===================================================
          GALLERY LIGHTBOX
      =================================================== */}

      {lightbox && (

        <div
          className="lightbox"
          onClick={() =>
            setLightbox(null)
          }
        >

          <button
            onClick={() =>
              setLightbox(null)
            }
          >
            <X />
          </button>


          <div
            className={`lightbox-art ${lightbox.className}`}
          >

            {lightbox.image ? (
              <img
                src={lightbox.image}
                alt=""
              />
            ) : (
              <span className="lightbox-placeholder">
                <i />
                <span>ADD PHOTO IN src/data.ts</span>
              </span>
            )}

            <div className="lightbox-copy">
              <span>
                {lightbox.label}
              </span>

              <h2>
                {lightbox.title}
              </h2>

              <small>
                {lightbox.category}
              </small>
            </div>

          </div>

        </div>

      )}


      {/* ===================================================
          INTERACTIVE TERMINAL OVERLAY
      =================================================== */}

      {terminalOpen && (

        <div
          className="terminal-overlay"
          onClick={() =>
            setTerminalOpen(false)
          }
        >

          <div
            className="interactive-terminal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="terminal-bar">

              <span className="window-dots">

                <i />
                <i />
                <i />

              </span>


              <span>
                h1mnxshu@macbook-pro:~/ops
              </span>


              <button
                onClick={() =>
                  setTerminalOpen(false)
                }
              >
                <X size={16} />
              </button>

            </div>


            <div className="interactive-output">

              {terminalLines.map(
                (line, index) => (

                  <p
                    key={`${line}-${index}`}
                    className={
                      line.startsWith('>')
                        ? 'input-line'
                        : ''
                    }
                  >
                    {line}
                  </p>

                )
              )}

            </div>


            <form
              onSubmit={runFloatCmd}
            >

              <span>
                h1mnxshu %
              </span>

              <input
                autoFocus
                value={terminalInput}
                onChange={(event) =>
                  setTerminalInput(
                    event.target.value
                  )
                }
                placeholder="type a command..."
              />

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


export default App;
