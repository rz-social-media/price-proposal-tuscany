"use client";

import { useEffect, useState } from "react";
import SiteEffects from "../site-effects";
import StoriesSection from "./stories";

type Language = "en" | "it" | "es";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${publicBasePath}${path}`;

const translations = {
  en: {
    nav: ["Our approach", "The proposal", "Next steps"],
    languageLabel: "Choose language",
    brandLine: "RZ social media · The House of Content Creation",
    date: "ONGOING INSTAGRAM MANAGEMENT",
    enter: "Enter the story",
    introEyebrow: "Continuing our work together",
    introTitle: ["Showcase the experience.", "Attract the right couples."],
    introLead: "Following the content we created for your wedding weekend, we will continue developing an Instagram page that showcases La Torre di Celle as a venue for weddings and the experiences surrounding them.",
    introBody: "Through ongoing management and content from your archive and new events, our aim is to attract couples who appreciate the venue and are interested in the range of services you offer.",
    areasEyebrow: "Our approach",
    areasTitle: ["What we showcase.", "How we publish.", "Who we reach."],
    areas: [
      {
        subtitle: "The venue and its experiences",
        title: "Weddings and everything around them",
        description: "Showcase weddings, pasta masterclasses, and pizza nights to help couples understand what a full wedding weekend at your venue could include.",
      },
      {
        subtitle: "Content management",
        title: "From your archive to regular publishing",
        description: "Select and edit existing and new material into Reels, posts, and Stories, while organizing the feed and Highlights to introduce the venue clearly.",
      },
      {
        subtitle: "Marketing direction",
        title: "Attract high-end couples",
        description: "We lead the strategic and creative direction of the account, shaping content that positions La Torre di Celle as a premium destination and attracts quality couples with higher budgets.",
      },
    ],
    priceTitle: "MANAGEMENT PROPOSAL",
    monthSuffix: "/ month",
    packageTitle: "Instagram & Content Management",
    coverageLabel: "Scope:",
    coverage: "Remote content management for La Torre di Celle’s Instagram account, focused on weddings and related experiences.",
    includesLabel: "The package includes:",
    items: [
      "Content planning: choose topics and services to promote and build a publishing calendar around the season and the venue’s activities.",
      "Editing and preparation: use material from your archive and event photographers, including editing, caption writing, and adaptation into Reels, carousels, and Stories.",
      "Profile organization: plan the feed’s visual presentation and organize Highlights around weddings, experiences, and venue services.",
      "Winter publishing: one dedicated Stories series per week and one feed post every one to two weeks, depending on available material.",
      "Summer publishing: two to three Stories series per week and one feed post per week, depending on available material.",
      "Ongoing refinement: review content performance and feedback from enquiries together, using these insights to adjust future topics and posts.",
      "Audience interaction: respond to content-related comments and general messages, such as compliments on posts and reactions to Stories.",
    ],
    notes: [
      "Feed posts may take the form of Reels, carousels, or individual images, depending on the material and the purpose of each post.",
      "Business enquiries — including availability, pricing, quotations, and event bookings — remain your responsibility. These enquiries will be directed to you for follow-up.",
      "On-site filming and content production visits are quoted separately for each trip.",
    ],
    nextEyebrow: "Next steps",
    nextTitle: ["Start with your content.", "Build the first publishing plan."],
    nextBody: "During our next call, we will identify the services and events to prioritize, review your available content, and agree on how materials will be shared and posts approved. We will then use this to build the first month’s publishing plan.",
    footer: "Content creation · Social media · Wedding stories",
  },
  it: {
    nav: ["Il nostro approccio", "La proposta", "Prossimi passi"],
    languageLabel: "Scegli la lingua",
    brandLine: "RZ social media · La casa della creazione di contenuti",
    date: "GESTIONE CONTINUATIVA DI INSTAGRAM",
    enter: "Entra nella storia",
    introEyebrow: "Il nostro lavoro insieme continua",
    introTitle: ["Mostrare l'esperienza.", "Attrarre le coppie giuste."],
    introLead: "Dopo i contenuti creati per il vostro weekend di nozze, continueremo a sviluppare una pagina Instagram che presenta La Torre di Celle come location per matrimoni e per le esperienze che li accompagnano.",
    introBody: "Attraverso una gestione continuativa e contenuti provenienti dal vostro archivio e dai nuovi eventi, il nostro obiettivo è attrarre coppie che apprezzano la location e sono interessate alla gamma di servizi che offrite.",
    areasEyebrow: "Il nostro approccio",
    areasTitle: ["Cosa mostriamo.", "Come pubblichiamo.", "Chi raggiungiamo."],
    areas: [
      {
        subtitle: "La location e le sue esperienze",
        title: "I matrimoni e tutto ciò che li circonda",
        description: "Mostriamo matrimoni, masterclass di pasta e serate pizza per aiutare le coppie a capire cosa può includere un intero weekend di nozze nella vostra location.",
      },
      {
        subtitle: "Gestione dei contenuti",
        title: "Dal vostro archivio a una pubblicazione regolare",
        description: "Selezioniamo e montiamo materiale esistente e nuovo in Reel, post e Storie, organizzando il feed e gli Highlights per presentare la location con chiarezza.",
      },
      {
        subtitle: "Direzione marketing",
        title: "Attirare coppie di alto livello",
        description: "Guidiamo la direzione strategica e creativa dell'account, creando contenuti che posizionano La Torre di Celle come destinazione premium e attraggono coppie di qualità con budget più alti.",
      },
    ],
    priceTitle: "PROPOSTA DI GESTIONE",
    monthSuffix: "/ mese",
    packageTitle: "Gestione di Instagram e dei contenuti",
    coverageLabel: "Ambito:",
    coverage: "Gestione da remoto dei contenuti dell'account Instagram di La Torre di Celle, con focus su matrimoni ed esperienze correlate.",
    includesLabel: "Il pacchetto comprende:",
    items: [
      "Pianificazione dei contenuti: scegliamo i temi e i servizi da promuovere e costruiamo un calendario editoriale in base alla stagione e alle attività della location.",
      "Montaggio e preparazione: utilizziamo materiale del vostro archivio e dei fotografi degli eventi, con montaggio, scrittura delle caption e adattamento in Reel, caroselli e Storie.",
      "Organizzazione del profilo: progettiamo la presentazione visiva del feed e organizziamo gli Highlights intorno a matrimoni, esperienze e servizi della location.",
      "Pubblicazione invernale: una serie di Storie dedicata a settimana e un post nel feed ogni una o due settimane, in base al materiale disponibile.",
      "Pubblicazione estiva: da due a tre serie di Storie a settimana e un post nel feed a settimana, in base al materiale disponibile.",
      "Perfezionamento continuo: esaminiamo insieme le performance dei contenuti e i riscontri dalle richieste ricevute, usando queste indicazioni per orientare temi e post futuri.",
      "Interazione con il pubblico: rispondiamo ai commenti sui contenuti e ai messaggi generici, come i complimenti ai post e le reazioni alle Storie.",
    ],
    notes: [
      "I post nel feed possono essere Reel, caroselli o immagini singole, in base al materiale e allo scopo di ogni pubblicazione.",
      "Le richieste commerciali — disponibilità, prezzi, preventivi e prenotazioni di eventi — restano di vostra competenza e vi verranno inoltrate per il seguito.",
      "Le trasferte di riprese e produzione di contenuti in loco vengono quotate separatamente per ogni viaggio.",
    ],
    nextEyebrow: "Prossimi passi",
    nextTitle: ["Partiamo dai vostri contenuti.", "Costruiamo il primo piano editoriale."],
    nextBody: "Nella nostra prossima call individueremo i servizi e gli eventi a cui dare priorità, esamineremo i contenuti disponibili e concorderemo come condividere i materiali e approvare le pubblicazioni. Su questa base costruiremo il piano editoriale del primo mese.",
    footer: "Creazione di contenuti · Social media · Storie di matrimonio",
  },
  es: {
    nav: ["Nuestro enfoque", "La propuesta", "Próximos pasos"],
    languageLabel: "Elegir idioma",
    brandLine: "RZ social media · La casa de la creación de contenido",
    date: "GESTIÓN CONTINUA DE INSTAGRAM",
    enter: "Entra en la historia",
    introEyebrow: "Continuamos nuestro trabajo juntos",
    introTitle: ["Mostrar la experiencia.", "Atraer a las parejas adecuadas."],
    introLead: "Tras el contenido que creamos para vuestro fin de semana de boda, seguiremos desarrollando una página de Instagram que muestre La Torre di Celle como un espacio para bodas y para las experiencias que las acompañan.",
    introBody: "A través de la gestión continua y de contenido procedente de vuestro archivo y de nuevos eventos, nuestro objetivo es atraer a parejas que aprecien el lugar y se interesen por la gama de servicios que ofrecéis.",
    areasEyebrow: "Nuestro enfoque",
    areasTitle: ["Qué mostramos.", "Cómo publicamos.", "A quién llegamos."],
    areas: [
      {
        subtitle: "El lugar y sus experiencias",
        title: "Bodas y todo lo que las rodea",
        description: "Mostramos bodas, masterclasses de pasta y noches de pizza para ayudar a las parejas a entender todo lo que puede incluir un fin de semana de boda completo en vuestro espacio.",
      },
      {
        subtitle: "Gestión de contenido",
        title: "De vuestro archivo a una publicación regular",
        description: "Seleccionamos y editamos material existente y nuevo en Reels, posts y Stories, organizando el feed y los Highlights para presentar el lugar con claridad.",
      },
      {
        subtitle: "Dirección de marketing",
        title: "Atraer a parejas de alto nivel",
        description: "Lideramos la dirección estratégica y creativa de la cuenta, creando contenido que posiciona La Torre di Celle como un destino premium y atrae a parejas de calidad con presupuestos más altos.",
      },
    ],
    priceTitle: "PROPUESTA DE GESTIÓN",
    monthSuffix: "/ mes",
    packageTitle: "Gestión de Instagram y de contenido",
    coverageLabel: "Alcance:",
    coverage: "Gestión remota del contenido de la cuenta de Instagram de La Torre di Celle, centrada en bodas y experiencias relacionadas.",
    includesLabel: "El paquete incluye:",
    items: [
      "Planificación de contenido: elegimos los temas y servicios a promocionar y construimos un calendario de publicación en torno a la temporada y la actividad del lugar.",
      "Edición y preparación: utilizamos material de vuestro archivo y de los fotógrafos de los eventos, incluyendo edición, redacción de captions y adaptación a Reels, carruseles y Stories.",
      "Organización del perfil: planificamos la presentación visual del feed y organizamos los Highlights en torno a bodas, experiencias y servicios del lugar.",
      "Publicación en invierno: una serie de Stories dedicada por semana y un post en el feed cada una o dos semanas, según el material disponible.",
      "Publicación en verano: de dos a tres series de Stories por semana y un post en el feed semanal, según el material disponible.",
      "Mejora continua: revisamos juntos el rendimiento del contenido y las respuestas a las consultas, y usamos esas conclusiones para ajustar los próximos temas y publicaciones.",
      "Interacción con la audiencia: respondemos a comentarios sobre el contenido y a mensajes generales, como elogios a los posts y reacciones a las Stories.",
    ],
    notes: [
      "Los posts del feed pueden ser Reels, carruseles o imágenes individuales, según el material y el objetivo de cada publicación.",
      "Las consultas comerciales — disponibilidad, precios, presupuestos y reservas de eventos — siguen siendo vuestra responsabilidad y se os derivarán para su seguimiento.",
      "Las visitas de rodaje y producción de contenido in situ se presupuestan por separado para cada viaje.",
    ],
    nextEyebrow: "Próximos pasos",
    nextTitle: ["Empezamos con vuestro contenido.", "Construimos el primer plan de publicación."],
    nextBody: "En nuestra próxima llamada identificaremos los servicios y eventos a priorizar, revisaremos el contenido disponible y acordaremos cómo se compartirá el material y cómo se aprobarán las publicaciones. Con eso construiremos el plan de publicación del primer mes.",
    footer: "Creación de contenido · Redes sociales · Historias de boda",
  },
} as const;

const areaImages = [
  "/images/area-weddings.jpg",
  "/images/area-content.jpg",
  "/images/area-marketing.jpg",
];

export default function Management() {
  const [language, setLanguage] = useState<Language>("es");
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main>
      <SiteEffects preload={["/images/mood-000.jpg", "/images/vision-board.png", ...areaImages]} />
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
          <div className="reveal">
            <p className="eyebrow">{copy.introEyebrow}</p>
            <h2>{copy.introTitle[0]}<br /><span>{copy.introTitle[1]}</span></h2>
          </div>
          <div className="intro-copy reveal d1">
            <p className="lead">{copy.introLead}</p>
            <p>{copy.introBody}</p>
          </div>
        </div>
      </section>

      <section className="weekend" id="weekend">
        <div className="section-heading reveal">
          <p className="eyebrow">{copy.areasEyebrow}</p>
          <h2>{copy.areasTitle[0]}<br />{copy.areasTitle[1]}<br />{copy.areasTitle[2]}</h2>
        </div>
        <div className="day-grid area-grid">
          {copy.areas.map((area, index) => (
            <article className={`day-card area-card reveal${index > 0 ? ` d${index}` : ""}`} key={area.title}>
              <img
                className="day-video"
                src={asset(areaImages[index])}
                alt=""
                loading="lazy"
              />
              <div className="day-overlay" />
              <div className="day-card-content">
                <span className="day-number">0{index + 1}</span>
                <p className="day-date">{area.subtitle}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <StoriesSection />

      <section className="price-section" id="proposal">
        <div className="price-head reveal">
          <h2>{copy.priceTitle}</h2>
          <div className="ornament" aria-hidden="true"><i /></div>
        </div>
        <div className="cards cards-single reveal d1">
          <article className="card card-wide">
            <img className="crest" src={asset("/images/key-burgundy.png")} alt="" loading="lazy" decoding="async" />
            <div className="pkg-en">{copy.packageTitle}</div>
            <div className="amount">
              <span className="was">€1,500</span>
              <span className="now"><small>€</small>1,000<small> {copy.monthSuffix}</small></span>
            </div>
            <ul className="package-summary">
              <li><b>{copy.coverageLabel}</b> {copy.coverage}</li>
              <li><b>{copy.includesLabel}</b></li>
            </ul>
            <div className="package-detail">
              <ul className="package-lines">
                {copy.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="package-notes">
              {copy.notes.map((note) => <p className="option-coverage" key={note}>{note}</p>)}
            </div>
          </article>
        </div>
      </section>

      <section className="next-steps" id="next-steps">
        <div className="mobile-transition-image reveal" aria-hidden="true">
          <img src={asset("/images/final-bride.webp")} alt="" loading="lazy" decoding="async" />
        </div>
        <p className="eyebrow reveal">{copy.nextEyebrow}</p>
        <h2 className="reveal d1">{copy.nextTitle[0]}<br /><em>{copy.nextTitle[1]}</em></h2>
        <p className="next-copy reveal d2">{copy.nextBody}</p>
      </section>

      <footer><span>RZ / LA TORRE DI CELLE</span><span>{copy.footer}</span></footer>
    </main>
  );
}
