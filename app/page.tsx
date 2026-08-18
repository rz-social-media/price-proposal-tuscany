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
    nav: ["The weekend", "The proposal", "Next steps"],
    languageLabel: "Choose language",
    brandLine: "RZ social media · The House of Content Creation",
    date: "08 TO 10 OCTOBER 2026",
    enter: "Enter the story",
    introEyebrow: "A beautiful beginning",
    introTitle: ["One weekend.", "Many stories."],
    introLead: "La Torre di Celle is more than a venue. It is a world where food, landscape, hospitality and celebration naturally become content people want to save.",
    introBody: "This proposal is designed to turn your own wedding weekend into a living content library: personal memories for you, a refined visual identity for the venue, and a clear example of what future couples can experience here.",
    weekendEyebrow: "The wedding weekend",
    weekendTitle: ["Three days,", "one visual language."],
    days: [
      { date: "Thursday · October 8", title: "Pasta, hands in the dough" },
      { date: "Friday · October 9", title: "Pizza & a red-and-white celebration" },
      { date: "Saturday · October 10", title: "The wedding day" },
    ],
    priceTitle: "PRICE LIST",
    weddingPackage: {
      title: "Wedding Weekend",
      coverageLabel: "Coverage:",
      coverage: "Three days",
      includesLabel: "Package includes:",
      items: [
        "Live Instagram account management, including real-time Stories and feed posts",
        "Unlimited edited still photography across the full weekend",
        "Two short Thursday Reels: one featuring the venue, landscape and guest arrivals, and one featuring the pasta workshop",
        "Two Friday Reels: one showing a morning and day at the venue, and one featuring the pizza evening",
        "Three wedding-day Reels shaped around the day, including the Vespa arrival, getting ready, ceremony and dinner",
        "One highlight Reel bringing all three days together",
        "Professional cinema cameras, vintage cameras and drone footage",
      ],
      note: "October 8 to 10, 2026",
    },
    partnerPackage: {
      title: "Partner Shoot",
      coverageLabel: "Coverage:",
      coverage: "Tailored to each event",
      includesLabel: "Package includes:",
      items: [
        "A tailored RZ content package for each couple",
        "Pricing based on the event and selected package",
        "Final scope agreed in coordination with La Torre",
        "20% commission for La Torre on every confirmed booking",
      ],
      note: "Final pricing coordinated with La Torre",
    },
    nextEyebrow: "The next chapter",
    nextTitle: ["Let’s make October", "the beginning."],
    nextBody: "The wedding is already going to be extraordinary. Our role is to make sure its energy, beauty and possibility continue long after the weekend ends.",
    footer: "Content creation · Social media · Wedding stories",
  },
  it: {
    nav: ["Il weekend", "La proposta", "Prossimi passi"],
    languageLabel: "Scegli la lingua",
    brandLine: "RZ social media · La casa della creazione di contenuti",
    date: "DALL'8 AL 10 OTTOBRE 2026",
    enter: "Entra nella storia",
    introEyebrow: "Un bellissimo inizio",
    introTitle: ["Un fine settimana.", "Tante storie."],
    introLead: "La Torre di Celle è molto più di una location. È un mondo in cui cucina, paesaggio, ospitalità e festa si trasformano naturalmente in contenuti che viene voglia di salvare.",
    introBody: "Questa proposta nasce per trasformare il vostro weekend di nozze in una libreria di contenuti viva: ricordi personali per voi, un'identità visiva raffinata per la location e un esempio concreto di ciò che le future coppie potranno vivere qui.",
    weekendEyebrow: "Il weekend di nozze",
    weekendTitle: ["Tre giorni,", "un solo linguaggio visivo."],
    days: [
      { date: "Giovedì · 8 ottobre", title: "Pasta, le mani in pasta" },
      { date: "Venerdì · 9 ottobre", title: "Pizza e festa in bianco e rosso" },
      { date: "Sabato · 10 ottobre", title: "Il giorno delle nozze" },
    ],
    priceTitle: "LISTINO PREZZI",
    weddingPackage: {
      title: "Weekend di nozze",
      coverageLabel: "Copertura:",
      coverage: "Tre giorni",
      includesLabel: "Il pacchetto comprende:",
      items: [
        "Gestione live dell'account Instagram, con pubblicazione in tempo reale di Storie e post nel feed",
        "Fotografie editate senza limiti per l'intero weekend",
        "Due Reel brevi il giovedì: uno dedicato alla location, al paesaggio e all'arrivo degli ospiti, e uno dedicato al laboratorio di pasta",
        "Due Reel il venerdì: uno dedicato alla mattina e alla giornata nella location, e uno dedicato alla serata pizza",
        "Tre Reel il giorno delle nozze, costruiti sui momenti della giornata, tra cui l'arrivo in Vespa, i preparativi, la cerimonia e la cena",
        "Un Reel highlight che riunisce il racconto di tutti e tre i giorni",
        "Videocamere professionali, videocamere vintage e riprese con drone",
      ],
      note: "Dall'8 al 10 ottobre 2026",
    },
    partnerPackage: {
      title: "Servizio Partner",
      coverageLabel: "Copertura:",
      coverage: "Su misura per ogni evento",
      includesLabel: "Il pacchetto comprende:",
      items: [
        "Un pacchetto di contenuti RZ personalizzato per ogni coppia",
        "Prezzo definito in base all'evento e al pacchetto selezionato",
        "Contenuti e modalità finali concordati insieme a La Torre",
        "Commissione del 20% a La Torre per ogni prenotazione confermata",
      ],
      note: "Prezzo finale concordato insieme a La Torre",
    },
    nextEyebrow: "Il prossimo capitolo",
    nextTitle: ["Facciamo di ottobre", "l'inizio."],
    nextBody: "Il matrimonio sarà già straordinario. Il nostro ruolo è fare in modo che la sua energia, la sua bellezza e tutte le sue possibilità continuino a vivere ben oltre la fine del weekend.",
    footer: "Creazione di contenuti · Social media · Storie di matrimonio",
  },
  es: {
    nav: ["El fin de semana", "La propuesta", "Próximos pasos"],
    languageLabel: "Elegir idioma",
    brandLine: "RZ social media · La casa de la creación de contenido",
    date: "DEL 8 AL 10 DE OCTUBRE DE 2026",
    enter: "Entra en la historia",
    introEyebrow: "Un comienzo precioso",
    introTitle: ["Un fin de semana.", "Muchas historias."],
    introLead: "La Torre di Celle es mucho más que un espacio para eventos. Es un mundo donde la gastronomía, el paisaje, la hospitalidad y la celebración se convierten de forma natural en contenido que apetece guardar.",
    introBody: "Esta propuesta está pensada para convertir vuestro fin de semana de boda en una biblioteca de contenido viva: recuerdos personales para vosotros, una identidad visual refinada para el espacio y un ejemplo claro de lo que las futuras parejas podrán vivir aquí.",
    weekendEyebrow: "El fin de semana de boda",
    weekendTitle: ["Tres días,", "un solo lenguaje visual."],
    days: [
      { date: "Jueves · 8 de octubre", title: "Pasta, manos en la masa" },
      { date: "Viernes · 9 de octubre", title: "Pizza y celebración en blanco y rojo" },
      { date: "Sábado · 10 de octubre", title: "El día de la boda" },
    ],
    priceTitle: "LISTA DE PRECIOS",
    weddingPackage: {
      title: "Fin de semana de boda",
      coverageLabel: "Cobertura:",
      coverage: "Tres días",
      includesLabel: "El paquete incluye:",
      items: [
        "Gestión en directo de la cuenta de Instagram, incluida la publicación de Stories y posts en el feed en tiempo real",
        "Fotografías editadas sin límite durante todo el fin de semana",
        "Dos Reels cortos el jueves: uno sobre el espacio, el paisaje y la llegada de los invitados, y otro sobre el taller de pasta",
        "Dos Reels el viernes: uno sobre la mañana y el día en el espacio, y otro sobre la noche de pizza",
        "Tres Reels el día de la boda, creados en torno a los momentos de la jornada, como la llegada en Vespa, los preparativos, la ceremonia y la cena",
        "Un Reel destacado que reúne la historia de los tres días",
        "Cámaras de cine profesionales, cámaras vintage y tomas con dron",
      ],
      note: "Del 8 al 10 de octubre de 2026",
    },
    partnerPackage: {
      title: "Servicio para partners",
      coverageLabel: "Cobertura:",
      coverage: "Adaptada a cada evento",
      includesLabel: "El paquete incluye:",
      items: [
        "Un paquete de contenido RZ personalizado para cada pareja",
        "Precio definido según el evento y el paquete seleccionado",
        "Alcance final acordado en coordinación con La Torre",
        "Comisión del 20% para La Torre por cada reserva confirmada",
      ],
      note: "Precio final coordinado con La Torre",
    },
    nextEyebrow: "El próximo capítulo",
    nextTitle: ["Hagamos de octubre", "el comienzo."],
    nextBody: "La boda ya va a ser extraordinaria. Nuestro papel es conseguir que su energía, su belleza y todo su potencial perduren mucho después de que termine el fin de semana.",
    footer: "Creación de contenido · Redes sociales · Historias de boda",
  },
} as const;

const dayImages = [
  "/images/pasta-workshop.jpg",
  "/images/pizza-evening.jpg",
  "/images/wedding-day.jpg",
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const renderPackage = (
    packageCopy: PackageCopy,
    price: string,
  ) => (
    <article className="card">
      <img className="crest" src={asset("/images/key-burgundy.png")} alt="" loading="lazy" decoding="async" />
      <div className="pkg-en">{packageCopy.title}</div>
      <div className="amount"><span className="now"><small>€</small>{price}</span></div>
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
              {(["en", "it", "es"] as Language[]).map((code) => (
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
          {renderPackage(copy.weddingPackage, "2,000")}
          {renderPackage(copy.partnerPackage, "1,500 to 3,000")}
        </div>
      </section>

      <section className="next-steps" id="next-steps">
        <p className="eyebrow">{copy.nextEyebrow}</p>
        <h2>{copy.nextTitle[0]}<br /><em>{copy.nextTitle[1]}</em></h2>
        <p className="next-copy">{copy.nextBody}</p>
      </section>

      <footer><span>RZ / LA TORRE DI CELLE</span><span>{copy.footer}</span></footer>
    </main>
  );
}
