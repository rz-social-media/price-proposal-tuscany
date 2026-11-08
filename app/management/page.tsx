"use client";

import { useEffect, useState } from "react";

type Language = "en" | "it" | "es";
type PackageCopy = {
  title: string;
  coverageLabel: string;
  coverage: string;
  includesLabel: string;
  items: readonly string[];
  note: string;
};

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${publicBasePath}${path}`;

const translations = {
  en: {
    nav: ["The rhythm", "The proposal", "Next steps"],
    languageLabel: "Choose language",
    brandLine: "RZ social media · The House of Content Creation",
    date: "ONGOING INSTAGRAM MANAGEMENT",
    enter: "Enter the story",
    introEyebrow: "The story continues",
    introTitle: ["One wedding.", "A living page."],
    introLead: "Your wedding weekend proved what La Torre di Celle can be on screen: a place people save, share and dream about.",
    introBody: "This proposal turns that moment into a rhythm. We manage your Instagram page end to end — curating the feed, shaping the Highlights, and publishing content that speaks directly to the couples you want to attract for the seasons ahead.",
    weekendEyebrow: "A year on the page",
    weekendTitle: ["Every season,", "one visual language."],
    days: [
      { date: "Winter · off-season", title: "A calm, steady presence" },
      { date: "Summer · wedding season", title: "The page comes alive" },
      { date: "All year round", title: "Creative & marketing direction" },
    ],
    priceTitle: "PRICE LIST",
    weddingPackage: {
      title: "Monthly Management",
      coverageLabel: "Coverage:",
      coverage: "Full remote management of the La Torre di Celle Instagram page",
      includesLabel: "Package includes:",
      items: [
        "End-to-end page management: feed curation, Highlights structure, scheduling of posts and Stories",
        "Winter rhythm: one dedicated Stories drop per week and a feed post every week or two, based on the available archive",
        "Summer rhythm: two to three Stories drops per week and one feed post per week, scaling as fresh content flows in",
        "Editing and publishing of content from your archive and from the photographers of events held at the venue",
        "Creative and marketing direction focused on attracting high-intent couples for weddings and venue experiences",
        "A publishing plan reviewed together as the seasons and the content library evolve",
      ],
      note: "On-site production visits are quoted separately per trip",
    },
    nextEyebrow: "The next chapter",
    nextTitle: ["Let’s make every month", "look like October."],
    nextBody: "The wedding weekend showed what this place can say in three days. Now we give it a voice all year long — so every couple who finds the page already knows they have found their place.",
    footer: "Content creation · Social media · Wedding stories",
  },
  it: {
    nav: ["Il ritmo", "La proposta", "Prossimi passi"],
    languageLabel: "Scegli la lingua",
    brandLine: "RZ social media · La casa della creazione di contenuti",
    date: "GESTIONE CONTINUATIVA DI INSTAGRAM",
    enter: "Entra nella storia",
    introEyebrow: "La storia continua",
    introTitle: ["Un matrimonio.", "Una pagina viva."],
    introLead: "Il vostro weekend di nozze ha dimostrato cosa può essere La Torre di Celle sullo schermo: un luogo che le persone salvano, condividono e sognano.",
    introBody: "Questa proposta trasforma quel momento in un ritmo. Gestiamo la vostra pagina Instagram dall'inizio alla fine — curando il feed, dando forma agli Highlights e pubblicando contenuti che parlano direttamente alle coppie che volete attrarre per le prossime stagioni.",
    weekendEyebrow: "Un anno sulla pagina",
    weekendTitle: ["Ogni stagione,", "un solo linguaggio visivo."],
    days: [
      { date: "Inverno · bassa stagione", title: "Una presenza calma e costante" },
      { date: "Estate · stagione dei matrimoni", title: "La pagina prende vita" },
      { date: "Tutto l'anno", title: "Direzione creativa e marketing" },
    ],
    priceTitle: "LISTINO PREZZI",
    weddingPackage: {
      title: "Gestione mensile",
      coverageLabel: "Copertura:",
      coverage: "Gestione completa da remoto della pagina Instagram di La Torre di Celle",
      includesLabel: "Il pacchetto comprende:",
      items: [
        "Gestione completa della pagina: cura del feed, struttura degli Highlights, programmazione di post e Storie",
        "Ritmo invernale: un drop di Storie dedicato a settimana e un post nel feed ogni una o due settimane, in base all'archivio disponibile",
        "Ritmo estivo: da due a tre drop di Storie a settimana e un post nel feed a settimana, crescendo con l'arrivo di nuovi contenuti",
        "Editing e pubblicazione dei contenuti del vostro archivio e dei fotografi degli eventi ospitati nella location",
        "Direzione creativa e di marketing orientata ad attrarre coppie di alto profilo per matrimoni ed esperienze nella location",
        "Un piano editoriale rivisto insieme man mano che le stagioni e la libreria di contenuti evolvono",
      ],
      note: "Le trasferte di produzione in loco vengono quotate separatamente per ogni viaggio",
    },
    nextEyebrow: "Il prossimo capitolo",
    nextTitle: ["Facciamo che ogni mese", "somigli a ottobre."],
    nextBody: "Il weekend di nozze ha mostrato cosa può raccontare questo luogo in tre giorni. Ora gli diamo una voce per tutto l'anno — così ogni coppia che trova la pagina sa già di aver trovato il proprio posto.",
    footer: "Creazione di contenuti · Social media · Storie di matrimonio",
  },
  es: {
    nav: ["El ritmo", "La propuesta", "Próximos pasos"],
    languageLabel: "Elegir idioma",
    brandLine: "RZ social media · La casa de la creación de contenido",
    date: "GESTIÓN CONTINUA DE INSTAGRAM",
    enter: "Entra en la historia",
    introEyebrow: "La historia continúa",
    introTitle: ["Una boda.", "Una página viva."],
    introLead: "Vuestro fin de semana de boda demostró lo que La Torre di Celle puede ser en pantalla: un lugar que la gente guarda, comparte y sueña.",
    introBody: "Esta propuesta convierte ese momento en un ritmo. Gestionamos vuestra página de Instagram de principio a fin — cuidando el feed, dando forma a los Highlights y publicando contenido que habla directamente a las parejas que queréis atraer para las próximas temporadas.",
    weekendEyebrow: "Un año en la página",
    weekendTitle: ["Cada temporada,", "un solo lenguaje visual."],
    days: [
      { date: "Invierno · temporada baja", title: "Una presencia serena y constante" },
      { date: "Verano · temporada de bodas", title: "La página cobra vida" },
      { date: "Todo el año", title: "Dirección creativa y de marketing" },
    ],
    priceTitle: "LISTA DE PRECIOS",
    weddingPackage: {
      title: "Gestión mensual",
      coverageLabel: "Cobertura:",
      coverage: "Gestión completa en remoto de la página de Instagram de La Torre di Celle",
      includesLabel: "El paquete incluye:",
      items: [
        "Gestión integral de la página: curación del feed, estructura de los Highlights, programación de posts y Stories",
        "Ritmo de invierno: un drop de Stories dedicado por semana y un post en el feed cada una o dos semanas, según el archivo disponible",
        "Ritmo de verano: de dos a tres drops de Stories por semana y un post en el feed semanal, creciendo a medida que llega contenido nuevo",
        "Edición y publicación de contenido de vuestro archivo y de los fotógrafos de los eventos celebrados en el espacio",
        "Dirección creativa y de marketing enfocada en atraer parejas de alto nivel para bodas y experiencias en el espacio",
        "Un plan de publicación revisado juntas a medida que evolucionan las temporadas y la biblioteca de contenido",
      ],
      note: "Las visitas de producción in situ se presupuestan por separado para cada viaje",
    },
    nextEyebrow: "El próximo capítulo",
    nextTitle: ["Hagamos que cada mes", "se parezca a octubre."],
    nextBody: "El fin de semana de boda mostró lo que este lugar puede contar en tres días. Ahora le damos una voz durante todo el año — para que cada pareja que encuentre la página sepa que ya ha encontrado su lugar.",
    footer: "Creación de contenido · Redes sociales · Historias de boda",
  },
} as const;

const dayImages = [
  "/images/pasta-workshop.jpg",
  "/images/pizza-evening.jpg",
  "/images/wedding-day.jpg",
];

export default function Management() {
  const [language, setLanguage] = useState<Language>("es");
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const renderPackage = (
    packageCopy: PackageCopy,
    price: string,
    originalPrice?: string,
    priceSuffix?: string,
  ) => (
    <article className="card">
      <img className="crest" src={asset("/images/key-burgundy.png")} alt="" loading="lazy" decoding="async" />
      <div className="pkg-en">{packageCopy.title}</div>
      <div className="amount">
        {originalPrice && <span className="was">€{originalPrice}</span>}
        <span className="now"><small>€</small>{price}{priceSuffix && <small> {priceSuffix}</small>}</span>
      </div>
      <ul className="package-summary">
        <li><b>{packageCopy.coverageLabel}</b> {packageCopy.coverage}</li>
        <li><b>{packageCopy.includesLabel}</b></li>
      </ul>
      <div className="package-detail">
        <ul className="package-lines">
          {packageCopy.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="option-coverage">{packageCopy.note}</div>
    </article>
  );

  const monthSuffix = language === "es" ? "/ mes" : language === "it" ? "/ mese" : "/ month";

  return (
    <main>
      <header className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-shade" />
        <nav className="nav">
          <a className="nav-mark" href="#top" aria-label="Back to top">RZ</a>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#weekend">{copy.nav[0]}</a>
              <a href="#proposal">{copy.nav[1]}</a>
              <a href="#next-steps">{copy.nav[2]}</a>
            </div>
            <div className="language-switcher" role="group" aria-label={copy.languageLabel}>
              {(["es", "it", "en"] as Language[]).map((code) => (
                <button key={code} type="button" className={language === code ? "active" : ""} onClick={() => setLanguage(code)} aria-pressed={language === code}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="kicker">{copy.brandLine}</p>
            <div className="keyline" aria-hidden="true"><span>✦</span></div>
            <h1>La Torre<br /><em>di Celle</em></h1>
            <p className="hero-date">{copy.date}</p>
          </div>
          <figure className="hero-board"><img src={asset("/images/vision-board.png")} alt="La Torre di Celle Tuscan wedding vision board" /></figure>
          <a className="scroll-cue" href="#intro">{copy.enter} <span>↓</span></a>
        </div>
      </header>

      <section className="intro dark" id="intro">
        <div className="section-grid intro-grid">
          <div>
            <p className="eyebrow">{copy.introEyebrow}</p>
            <h2>{copy.introTitle[0]}<br /><span>{copy.introTitle[1]}</span></h2>
          </div>
          <div className="intro-copy">
            <p className="lead">{copy.introLead}</p>
            <p>{copy.introBody}</p>
          </div>
        </div>
      </section>

      <section className="weekend" id="weekend">
        <div className="section-heading">
          <p className="eyebrow">{copy.weekendEyebrow}</p>
          <h2>{copy.weekendTitle[0]}<br />{copy.weekendTitle[1]}</h2>
        </div>
        <div className="day-grid">
          {copy.days.map((day, index) => (
            <article className="day-card" key={day.date}>
              <div className="day-image" style={{ backgroundImage: `url(${asset(dayImages[index])})` }} />
              <div className="day-overlay" />
              <div className="day-card-content">
                <span className="day-number">0{index + 1}</span>
                <p className="day-date">{day.date}</p>
                <h3>{day.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="price-section" id="proposal">
        <div className="price-head">
          <h2>{copy.priceTitle}</h2>
          <div className="ornament" aria-hidden="true"><i /></div>
        </div>
        <div className="cards">
          {renderPackage(copy.weddingPackage, "1,000", undefined, monthSuffix)}
        </div>
      </section>

      <section className="next-steps" id="next-steps">
        <div className="mobile-transition-image" aria-hidden="true">
          <img src={asset("/images/final-bride.webp")} alt="" loading="lazy" decoding="async" />
        </div>
        <p className="eyebrow">{copy.nextEyebrow}</p>
        <h2>{copy.nextTitle[0]}<br /><em>{copy.nextTitle[1]}</em></h2>
        <p className="next-copy">{copy.nextBody}</p>
      </section>

      <footer><span>RZ / LA TORRE DI CELLE</span><span>{copy.footer}</span></footer>
    </main>
  );
}
