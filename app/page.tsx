'use client'
import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, X } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

// TODO: ganti semua link di bawah ini dengan akun asli Pasha sebelum deploy
const socials = {
  instagram: 'https://instagram.com/',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  email: 'mailto:hello@example.com'
}

type Project = {
  name: string
  cat: string
  status: string
  desc: string
  tech: string[]
}

const projects: Project[] = [
  { name: 'RafzDeploy', cat: 'Web', status: 'Building', desc: 'A personal web deployment experiment designed to upload and publish static websites through a simple workflow.', tech: ['Next.js', 'Supabase', 'Vercel', 'JavaScript'] },
  { name: 'SnapStudy AI', cat: 'AI', status: 'Concept', desc: 'An experimental concept for an AI-powered study assistant to help students learn and organize study materials.', tech: ['AI', 'Web', 'Database'] },
  { name: 'Mandarin AI Tutor', cat: 'AI', status: 'Concept', desc: 'An experimental AI learning concept for practicing Mandarin through interactive conversations.', tech: ['AI', 'Language Learning', 'Web'] },
  { name: 'Personal Creative Projects', cat: 'Creative', status: 'Ongoing', desc: 'Visual experiments, photo editing, digital concepts, and other creative projects.', tech: ['Photo Editing', 'Design', 'AI Tools'] }
]

const navItems = ['home', 'about', 'projects', 'skills', 'experience', 'contact']

const skillGroups: [string, string[]][] = [
  ['Technology', ['HTML', 'CSS', 'JavaScript', 'Next.js', 'GitHub', 'Supabase', 'Vercel']],
  ['Creative', ['Photo Editing', 'Visual Design', 'Content Creation', 'UI/UX Exploration']],
  ['AI', ['AI Tools', 'Prompt Engineering', 'AI-assisted Development']],
  ['Business', ['Digital Business', 'E-commerce', 'Digital Marketing', 'Product Thinking']]
]

// FIX 1: dikasih tipe Variants supaya 'easeOut' dianggap easing valid, bukan string biasa
const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

export default function Home() {
  const [menu, setMenu] = useState(false)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [egg, setEgg] = useState(0)
  const [sent, setSent] = useState(false)

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter(p => p.cat === filter)),
    [filter]
  )

  // FIX 2: progress bar scroll, dijaga biar gak bagi nol
  useEffect(() => {
    const f = () => {
      const max = document.body.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      document.documentElement.style.setProperty('--scroll', `${pct}%`)
    }
    window.addEventListener('scroll', f)
    f()
    return () => window.removeEventListener('scroll', f)
  }, [])

  // FIX 3: easter egg. Setelah 4 klik, pesan tampil 3 detik lalu reset
  useEffect(() => {
    if (egg >= 4) {
      const t = setTimeout(() => setEgg(0), 3000)
      return () => clearTimeout(t)
    }
  }, [egg])

  const nav = (id: string) => {
    setMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="progress" />
      <header className="nav">
        <button className="logo" onClick={() => setEgg(e => e + 1)}>PASHA</button>
        <nav>
          {navItems.map(x => (
            <button key={x} onClick={() => nav(x)}>{x}</button>
          ))}
        </nav>
        <button className="talk" onClick={() => nav('contact')}>Let&apos;s Talk <ArrowUpRight size={15} /></button>
        <button className="menuBtn" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="mobileMenu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {navItems.map(x => (
              <button key={x} onClick={() => nav(x)}>{x}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {egg >= 4 && <div className="egg">you found the unnecessary button. congratulations.</div>}

      <main>
        <section id="home" className="hero wrap">
          <motion.div initial="hidden" animate="show" variants={reveal}>
            <div className="eyebrow"><span className="dot" /> Available for opportunities</div>
            <p className="mini">Based in Indonesia 🇮🇩</p>
            <h1>
              Hi, I&apos;m <span>Pasha.</span>
              <br />
              <strong>I build digital things with curiosity, creativity, and code.</strong>
            </h1>
            <p className="lead">I&apos;m a student and creative tech enthusiast exploring web development, digital business, AI, and visual design. I enjoy turning ideas into simple digital experiences.</p>
            <div className="actions">
              <button className="primary" onClick={() => nav('projects')}>View My Work <ArrowUpRight size={17} /></button>
              <button className="secondary" onClick={() => nav('contact')}>Let&apos;s Connect</button>
            </div>
            <div className="socials">
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17} /></a>
              <a href={socials.github} target="_blank" rel="noopener noreferrer"><Github size={17} /></a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} /></a>
              <a href={socials.email}><Mail size={17} /></a>
            </div>
          </motion.div>
          <motion.div className="heroVisual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="codeCard"><span>01</span><b>curiosity →</b><small>ideas / build / learn</small><i>●</i></div>
            <div className="floatTag">Still learning.<br />Still building.</div>
          </motion.div>
        </section>

        <section className="strip wrap">
          <span>TECHNOLOGY</span><span>CREATIVITY</span><span>AI</span><span>DIGITAL BUSINESS</span><span>WEB</span>
        </section>

        <Section id="about" kicker="A little about me." title="More than just a portfolio.">
          <p className="bigCopy">I&apos;m exploring the intersection between technology, business, and creativity. I like learning by building things, experimenting with ideas, and figuring out how digital products actually work.</p>
          <div className="chips">
            {['Curious', 'Creative', 'Always Learning', 'Problem Solver', 'Tech Explorer'].map(x => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <div className="journey">
            <div><b>2024</b><p>Started exploring digital creativity.</p></div>
            <div><b>2025</b><p>Experimented with technology, AI and digital projects.</p></div>
            <div><b>2026</b><p>Studying Information Systems and exploring web development, business and technology.</p></div>
          </div>
        </Section>

        <Section id="projects" kicker="Some things I've been messing around with." title="Things I've built.">
          <div className="filters">
            {['All', 'Web', 'AI', 'Creative', 'Business'].map(x => (
              <button className={filter === x ? 'active' : ''} onClick={() => setFilter(x)} key={x}>{x}</button>
            ))}
          </div>
          {/* FIX 4: kalau kategori kosong (mis. Business), tampilkan pesan, bukan area kosong */}
          {visible.length === 0 ? (
            <p style={{ color: '#858d99', fontSize: 14 }}>Nothing here yet. Still building.</p>
          ) : (
            <div className="projects">
              {visible.map(p => (
                <motion.article layout key={p.name} className="project" onClick={() => setSelected(p)} whileHover={{ y: -6 }}>
                  <div className="projectTop"><span>{p.cat}</span><span className="status">{p.status}</span></div>
                  <h3>{p.name}<ArrowUpRight size={19} /></h3>
                  <p>{p.desc}</p>
                  <div className="tech">
                    {p.tech.map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="view">View project <ArrowUpRight size={15} /></div>
                </motion.article>
              ))}
            </div>
          )}
        </Section>

        <Section id="skills" kicker="What I work with." title="Tools, interests, and things I'm learning.">
          <div className="skillGrid">
            {skillGroups.map(([title, items]) => (
              <div className="skill" key={title}>
                <h3>{title}</h3>
                <div>
                  {items.map(x => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" kicker="The journey so far." title="Still becoming.">
          <div className="timeline">
            <div><b>2026 — Present</b><h3>Information Systems Student</h3><p>Exploring technology, business, and digital systems.</p></div>
            <div><b>2026</b><h3>Web &amp; AI Projects</h3><p>Experimenting with personal digital products and AI concepts.</p></div>
            <div><b>2025</b><h3>Creative &amp; Digital Exploration</h3><p>Started exploring design, editing, digital business, and technology.</p></div>
          </div>
        </Section>

        <section className="explore wrap">
          <div>
            <span className="kicker">Things I&apos;m curious about lately.</span>
            <h2>Currently exploring<span>.</span></h2>
          </div>
          <div className="marquee">
            {['Web Development', 'Artificial Intelligence', 'Digital Business', 'Information Systems', 'UI/UX', 'Mandarin', 'New Digital Ideas'].map(x => (
              <span key={x}>→ {x}</span>
            ))}
          </div>
        </section>

        <section className="beyond wrap">
          <div>
            <span className="kicker">Beyond the screen.</span>
            <h2>There is a life outside the browser.</h2>
          </div>
          <p>Outside of building things, I enjoy discovering new ideas, meeting people, exploring technology, editing visuals, listening to music, and figuring out what I want to build next.</p>
          <div className="tags">
            {['🎧 Music', '📸 Visuals', '💻 Tech', '🚀 Ideas', '🤝 People', '🌏 Learning'].map(x => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </section>

        <Section id="contact" kicker="Have an idea?" title="Let's build something interesting.">
          <div className="contactGrid">
            <div>
              <p className="bigCopy">Whether it&apos;s a project, collaboration, or just a good conversation, I&apos;m open to interesting ideas.</p>
              <div className="contactLinks">
                <a href={socials.email}><Mail /> Email</a>
                <a href={socials.github} target="_blank" rel="noopener noreferrer"><Github /> GitHub</a>
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram /> Instagram</a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /> LinkedIn</a>
              </div>
            </div>
            <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
              <input required placeholder="Name" />
              <input required type="email" placeholder="Email" />
              <textarea required placeholder="Message" rows={5} />
              <button className="primary" type="submit">{sent ? 'Message validated ✓' : 'Send Message'} <ArrowUpRight size={17} /></button>
              {sent && <small className="note">Frontend demo only. No email was sent because no backend is connected.</small>}
            </form>
          </div>
        </Section>
      </main>

      <footer>
        <div className="wrap foot">
          <div><b>PASHA</b><p>Building, learning, experimenting.</p></div>
          <div className="footLinks">
            {['home', 'about', 'projects', 'contact'].map(x => (
              <button key={x} onClick={() => nav(x)}>{x}</button>
            ))}
          </div>
          <small>© 2026 Rafi Pasha. Built with curiosity.<br />Designed &amp; built by Pasha.</small>
        </div>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="modalBox" onClick={e => e.stopPropagation()} initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }}>
              <button className="close" onClick={() => setSelected(null)}><X /></button>
              <span className="kicker">{selected.cat} / {selected.status}</span>
              <h2>{selected.name}</h2>
              <p>{selected.desc}</p>
              <h4>Technology</h4>
              <div className="tech">
                {selected.tech.map(x => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <div className="case">
                <b>Case study</b>
                <p>Overview, idea, challenges and what I learned will live here as this project develops. No made-up metrics and no fake screenshots.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section wrap">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={reveal}>
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
        {children}
      </motion.div>
    </section>
  )
}
