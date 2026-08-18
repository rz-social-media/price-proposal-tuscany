import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Torre di Celle | Content Partnership Proposal",
  description:
    "A cinematic content proposal for La Torre di Celle, Tuscany, October 8 to 10, 2026.",
};

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${publicBasePath}${path}`;

const days = [
  {
    number: "01",
    date: "Thursday · October 8",
    title: "Pasta, hands in the dough",
    image: "/images/pasta-workshop.jpg",
  },
  {
    number: "02",
    date: "Friday · October 9",
    title: "Fire, flour & celebration",
    image: "/images/pizza-evening.jpg",
  },
  {
    number: "03",
    date: "Saturday · October 10",
    title: "The wedding day",
    image: "/images/wedding-day.jpg",
  },
];

export default function Home() {
  return (
    <main>
      <header className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-shade" />
        <nav className="nav">
          <a className="nav-mark" href="#top" aria-label="Back to top">RZ</a>
          <div className="nav-links">
            <a href="#weekend">The weekend</a>
            <a href="#proposal">The proposal</a>
            <a href="#next-steps">Next steps</a>
          </div>
        </nav>
        <div className="hero-content">
          <div className="hero-copy">
          <p className="kicker">RZ social media · The House of Content Creation</p>
          <div className="keyline" aria-hidden="true"><span>✦</span></div>
          <h1>La Torre<br /><em>di Celle</em></h1>
          <p className="hero-date">08 TO 10 OCTOBER 2026</p>
          </div>
          <figure className="hero-board"><img src={asset("/images/vision-board.png")} alt="La Torre di Celle Tuscan wedding vision board" /></figure>
          <a className="scroll-cue" href="#intro">Enter the story <span>↓</span></a>
        </div>
      </header>

      <section className="intro dark" id="intro">
        <div className="section-grid intro-grid">
          <div>
            <p className="eyebrow">A beautiful beginning</p>
            <h2>One weekend.<br /><span>Many stories.</span></h2>
          </div>
          <div className="intro-copy">
            <p className="lead">La Torre di Celle is more than a venue. It is a world where food, landscape, hospitality and celebration naturally become content people want to save.</p>
            <p>This proposal is designed to turn your own wedding weekend into a living content library: personal memories for you, a refined visual identity for the venue, and a clear example of what future couples can experience here.</p>
          </div>
        </div>
      </section>

      <section className="weekend" id="weekend">
        <div className="section-heading">
          <p className="eyebrow">The wedding weekend</p>
          <h2>Three days,<br />one visual language.</h2>
        </div>
        <div className="day-grid">
          {days.map((day) => (
            <article className="day-card" key={day.number}>
              <div className="day-image" style={{ backgroundImage: `url(${asset(day.image)})` }} />
              <div className="day-overlay" />
              <div className="day-card-content">
                <span className="day-number">{day.number}</span>
                <p className="day-date">{day.date}</p>
                <h3>{day.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="price-section" id="proposal">
        <div className="price-head">
          <h2>PRICE LIST</h2>
          <div className="ornament" aria-hidden="true"><i /></div>
        </div>
        <div className="cards">
          <article className="card">
            <img className="crest" src={asset("/images/key-burgundy.png")} alt="" loading="lazy" decoding="async" />
            <div className="pkg-en">Wedding Weekend</div>
            <div className="amount"><span className="now"><small>€</small>2,000</span></div>
            <ul className="package-summary">
              <li><b>Coverage:</b> Three days</li>
              <li><b>Package includes:</b></li>
            </ul>
            <div className="package-detail">
              <ul className="package-lines">
                <li>Live Instagram account management, including real-time Stories and feed posts</li>
                <li>Unlimited edited still photography across the full weekend</li>
                <li>Two short Thursday Reels: one featuring the venue, landscape and guest arrivals, and one featuring the pasta workshop</li>
                <li>Two Friday Reels: one showing a morning and day at the venue, and one featuring the pizza evening</li>
                <li>Three wedding-day Reels shaped around the day, including the Vespa arrival, getting ready, ceremony and dinner</li>
                <li>One highlight Reel bringing all three days together</li>
                <li>Professional cinema cameras, vintage cameras and drone footage</li>
              </ul>
            </div>
            <div className="option-coverage">October 8 to 10, 2026</div>
          </article>
          <article className="card">
            <img className="crest" src={asset("/images/key-burgundy.png")} alt="" loading="lazy" decoding="async" />
            <div className="pkg-en">Partner Shoot</div>
            <div className="amount"><span className="now"><small>€</small>1,500 to 3,000</span></div>
            <ul className="package-summary">
              <li><b>Coverage:</b> Tailored to each event</li>
              <li><b>Package includes:</b></li>
            </ul>
            <div className="package-detail">
              <ul className="package-lines">
                <li>A tailored RZ content package for each couple</li>
                <li>Pricing based on the event and selected package</li>
                <li>Final scope agreed in coordination with La Torre</li>
                <li>20% commission for La Torre on every confirmed booking</li>
              </ul>
            </div>
            <div className="option-coverage">Final pricing coordinated with La Torre</div>
          </article>
        </div>
      </section>

      <section className="next-steps" id="next-steps">
        <p className="eyebrow">The next chapter</p>
        <h2>Let’s make October<br /><em>the beginning.</em></h2>
        <p className="next-copy">The wedding is already going to be extraordinary. Our role is to make sure its energy, beauty and possibility continue long after the weekend ends.</p>
      </section>

      <footer><span>RZ / LA TORRE DI CELLE</span><span>Content creation · Social media · Wedding stories</span></footer>
    </main>
  );
}
