import React, { useEffect, useMemo, useState } from "react";

const phone = "31626578911";
const logoUrl = "https://i.imgur.com/C7temb6.jpg";

const products = [
  { name: "Canada Goose Bodywarmer Matt", price: "€85", image: "https://i.imgur.com/l64xcsu.jpg", variants: ["Navy Blue", "White", "Grey", "Black"].map((label) => ({ label, image: "https://i.imgur.com/l64xcsu.jpg" })) },
  { name: "Canada Goose Bodywarmer Glans", price: "€85", image: "https://i.imgur.com/b1K00q2.jpg", variants: ["Black", "Navy Blue", "Brown", "Beige", "Grey"].map((label) => ({ label, image: "https://i.imgur.com/b1K00q2.jpg" })) },
  { name: "Essentials 1977 Dark Oatmeal Zomerset", price: "€65", image: "https://i.imgur.com/CEHCp1C.jpg", variants: [{ label: "Shirt", image: "https://i.imgur.com/sX4mixA.jpg" }, { label: "Shorts", image: "https://i.imgur.com/CEHCp1C.jpg" }] },
  { name: "Gallery Dept Long Sleeve", price: "€45", image: "https://i.imgur.com/ZpwXpSu.jpg" },
  { name: "Loro Piana Petjes", price: "€35", image: "https://i.imgur.com/oS8tEWb.jpg", variants: ["Burgundy", "Dark Brown", "Rust Orange", "Light Pink", "Orange", "Olive Green"].map((label) => ({ label, image: "https://i.imgur.com/oS8tEWb.jpg" })) },
  { name: "Brazilië Itaú Windbrekers", price: "€70", image: "https://i.imgur.com/VJbNpbG.jpg", variants: [{ label: "Black/White", image: "https://i.imgur.com/VJbNpbG.jpg" }, { label: "Olive Green", image: "https://i.imgur.com/xibvTAs.jpg" }] },
  { name: "Oncloudtilt X Loewe", price: "€90", image: "https://i.imgur.com/wZXpDVg.jpg", variants: [{ label: "Navy/White", image: "https://i.imgur.com/wZXpDVg.jpg" }, { label: "Grey/Brown", image: "https://i.imgur.com/r0GwWgA.jpg" }, { label: "Navy/White (extra photo)", image: "https://i.imgur.com/zAYCE6Z.jpg" }] },
  { name: "Dior B22", price: "€110", image: "https://i.imgur.com/RWdMjbB.jpg", variants: [{ label: "Foto 1", image: "https://i.imgur.com/RWdMjbB.jpg" }, { label: "Foto 2", image: "https://i.imgur.com/7dcktPT.jpg" }] },
  { name: "Moncler Grimpeurs Windbreker", price: "€95", image: "https://i.imgur.com/x9XsThQ.jpg" },
  { name: "Travis Scott Pink Oxford", price: "€110", image: "https://i.imgur.com/chutit9.jpg" },
  { name: "Travis Scott Shy Pink", price: "€110", image: "https://i.imgur.com/FZH1sEL.jpg" },
  { name: "Louis Vuitton Skates Donkerblauw", price: "€140", image: "https://i.imgur.com/VtYDOYA.jpg" },
  { name: "Off White Be Right Back", price: "€140", image: "https://i.imgur.com/CMYGbbK.jpg" },
  { name: "Hermes Bouncing Beige", price: "€110", image: "https://i.imgur.com/d8UCIDk.jpg" },
  { name: "Louis Vuitton Monogram Windbreker", price: "€120", image: "https://i.imgur.com/7dTjIkO.jpg" },
  { name: "Burberry Dubbelzijdige Windbreker", price: "€120", image: "https://i.imgur.com/HTYmMue.jpg", variants: [{ label: "Foto 1", image: "https://i.imgur.com/HTYmMue.jpg" }, { label: "Foto 2", image: "https://i.imgur.com/c9a60qp.jpg" }] },
  { name: "Chanel Runners Zwart", price: "€120", image: "https://i.imgur.com/0OtlmH2.jpg" },
  { name: "Burberry Zwembroek", price: "€60", image: "https://i.imgur.com/MwWxngA.jpg", note: "Bij bestellen kleur aangeven" },
  { name: "Yves Saint Laurent Tasje Beige", price: "€110", image: "https://i.imgur.com/dmze6L3.jpg" },
  { name: "Prada Cups Navy Blue", price: "€110", image: "https://i.imgur.com/kTKInfc.jpg" },
  { name: "Hermes Bouncing Zwart", price: "€110", image: "https://i.imgur.com/4oBzPQC.jpg" },
  { name: "Essentials Fear Of God Light Oatmeal", price: "€90", image: "https://i.imgur.com/Gn4iQVf.jpg", variants: [{ label: "Light Oatmeal", image: "https://i.imgur.com/Gn4iQVf.jpg" }, { label: "Grey", image: "https://i.imgur.com/5R7ZSt2.jpg" }, { label: "Black/White", image: "https://i.imgur.com/ZuK0SsZ.jpg" }, { label: "Black", image: "https://i.imgur.com/W7IdzWf.jpg" }] },
  { name: "Oncloud Trainingspak Zwart", price: "€120", image: "https://i.imgur.com/gw8KRHk.jpg", variants: [{ label: "Black", image: "https://i.imgur.com/gw8KRHk.jpg" }, { label: "Olive", image: "https://i.imgur.com/bfwVHZc.jpg" }, { label: "Navy", image: "https://i.imgur.com/v1eoUdm.jpg" }] },
  { name: "Travis Scott Brown Velvet", price: "€110", image: "https://i.imgur.com/KTOWd7u.jpg", variants: [{ label: "Brown", image: "https://i.imgur.com/KTOWd7u.jpg" }, { label: "Olive Green / White", image: "https://i.imgur.com/xk1XnD8.jpg" }] },
  { name: "Asics Gel Kayano 14 Fjord Grey", price: "€90", image: "https://i.imgur.com/RA9hkTo.jpg" },
  { name: "Chanel Runners Silver White", price: "€110", image: "https://i.imgur.com/qxmzhVM.jpg" },
];

function priceNumber(price) {
  return Number(String(price).replace(/[^0-9]/g, "")) || 0;
}

function buildCartLine(item, index) {
  const choice = item.variantLabel ? ` - Keuze: ${item.variantLabel}` : "";
  const size = item.sizeType === "none" ? " - Maat: geen maat" : item.size ? ` - Maat: ${item.size}` : " - Maat: nog te regelen";
  return `${index + 1}. ${item.name}${choice} - ${item.price} x${item.quantity}${size}`;
}

function buildWhatsappText(cart, total, orderType, shippingMethod) {
  const productsText = cart.map(buildCartLine).join("\n");
  const shipping = orderType === "Bezorgen" ? ` (${shippingMethod})` : "";
  return `Yo DripByDam, ik wil graag bestellen/kopen:\n\n${productsText}\n\nTotaal: €${total}\n\nKeuze: ${orderType}${shipping}\n\nKunnen we de maten en levering regelen?`;
}

function ProductCard({ product, onAdd, onImage }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const selected = product.variants?.[variantIndex];
  const image = selected?.image || product.image;
  const variantLabel = selected?.label;

  return (
    <article className="card">
      <img src={image} alt={product.name} className="product-img" onClick={() => onImage(image)} />
      <div className="card-body">
        <h3>{product.name}</h3>
        {product.variants && (
          <div className="chips">
            {product.variants.map((variant, index) => (
              <button key={variant.label} className={index === variantIndex ? "chip active" : "chip"} onClick={() => setVariantIndex(index)}>{variant.label}</button>
            ))}
          </div>
        )}
        <p className="price">{product.price}</p>
        <p className="stock">Op aanvraag</p>
        {product.note && <p className="note">{product.note}</p>}
        <div className="row">
          <button className="btn dark grow" onClick={() => onAdd({ ...product, image, variantLabel })}>In mandje</button>
          <a className="btn light" href="#contact">Contact</a>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  useEffect(() => {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.setAttribute("name", "viewport");
      document.head.appendChild(viewport);
    }
    viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
  }, []);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [orderType, setOrderType] = useState("Bezorgen");
  const [shippingMethod, setShippingMethod] = useState("DHL");
  const [fallback, setFallback] = useState("");

  const total = useMemo(() => cart.reduce((sum, item) => sum + priceNumber(item.price) * item.quantity, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const whatsappText = useMemo(() => buildWhatsappText(cart, total, orderType, shippingMethod), [cart, total, orderType, shippingMethod]);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappText)}`;

  function addToCart(product) {
    const cartKey = `${product.name}-${product.variantLabel || "default"}`;
    setCart((current) => {
      const found = current.find((item) => item.cartKey === cartKey);
      if (found) return current.map((item) => item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, cartKey, quantity: 1, sizeType: "none", size: "" }];
    });
    setCartOpen(true);
    setFallback("");
  }

  function updateItem(cartKey, changes) {
    setCart((current) => current.map((item) => item.cartKey === cartKey ? { ...item, ...changes } : item));
  }

  return (
    <>
      <style>{css}</style>
      <meta name="google-site-verification" content="M8XQ7X4VbdjPavWCjYI3Y" />
      <main>
        <nav className="nav">
          <a className="brand" href="#home"><img src={logoUrl} alt="logo" />DripByDam</a>
          <div className="nav-links"><a href="#home">Home</a><a href="#shop">Producten</a><button onClick={() => setCartOpen(true)}>Winkelmandje ({count})</button><a href="#contact">Contact</a></div>
          <button className="cart-pill" onClick={() => setCartOpen(true)}>Mandje ({count})</button>
        </nav>

        <section id="home" className="hero">
          <img src={logoUrl} alt="DripByDam logo" className="hero-logo" />
          <p className="eyebrow">Altijd tevreden • Gegarandeerd kwaliteit</p>
          <h1>DripByDam</h1>
          <p>Kwaliteit is prioriteit. Voeg producten toe aan je winkelmandje en stuur je bestelling direct via WhatsApp.</p>
          <div className="hero-actions"><a className="btn cyan" href="#shop">Bekijk producten</a><button className="btn outline" onClick={() => setCartOpen(true)}>Open mandje</button></div>
        </section>

        <section className="dark-section">
          <div className="two-col"><h2>Drip regelen met kwaliteit en vertrouwen.</h2><p>Bij DripByDam staat kwaliteit centraal. Je kunt producten toevoegen aan je winkelmandje. Daarna stuur je jouw bestelling automatisch door via WhatsApp, zodat maten en levering geregeld kunnen worden.</p></div>
        </section>

        <section id="shop" className="shop">
          <div className="section-head"><div><p className="small">Producten</p><h2>Aanbod</h2><div className="black-box"><h3>Andere producten op aanvraag</h3><p>Zoek je een andere kleur, maat of een compleet ander product? Stuur ons een bericht. We kijken of we het voor je kunnen regelen op aanvraag.</p></div></div><button onClick={() => setCartOpen(true)}>Bekijk winkelmandje ({count})</button></div>
          <div className="grid">{products.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} onImage={setSelectedImage} />)}</div>
        </section>

        <section className="dark-section" id="how">
          <p className="eyebrow">Hoe werkt bestellen?</p><h2>Winkelmandje → WhatsApp</h2>
          <div className="info-grid">
            <Info title="1. Kies product" text="Klik op ‘In mandje’ bij de producten die je wilt kopen. Kies daarna eventueel kleur, foto, maat en levering." />
            <Info title="2. Stuur via WhatsApp" text="Klik op ‘Bestel via WhatsApp’. Je winkelmandje komt automatisch in de chat zodat we alles kunnen bevestigen." />
            <Info title="3. Extra foto’s of video’s" text="Wil je betere foto’s of video’s van een product zien? Neem contact op via WhatsApp, Instagram of Snapchat." />
            <Info title="Andere producten op aanvraag" text="Zoek je iets anders of wil je een andere kleur? Stuur ons een bericht. We kijken of we het op aanvraag kunnen regelen." wide />
            <Info title="Betaling" text="Bij verzenden betaal je via Tikkie nadat we contact hebben gehad via WhatsApp. Bij afhalen kan contant worden betaald." />
            <Info title="Verzenden" text="We verzenden via DHL of PostNL. Hier kunnen extra kosten bij komen. Houd rekening met 2–3 weken verzendtijd." />
            <Info title="Afhalen" text="Afhalen kan in omgeving Rotterdam op afspraak." />
            <Info title="Retour & Ruilen" text="Retouren zijn mogelijk binnen 3 dagen als een product niet past. Je krijgt dan een nieuw product met de juiste maat. Niet mooi? Dan krijg je store credit. Geld terug is niet mogelijk." />
          </div>
        </section>

        <section className="faq"><p className="small">FAQ</p><h2>Veelgestelde vragen</h2><Faq q="Hoe lang duurt verzending?" a="De verzendtijd is ongeveer 2–3 weken." /><Faq q="Hoe werkt bestellen?" a="Voeg producten toe aan je winkelmandje en stuur je bestelling via WhatsApp." /><Faq q="Kan ik retourneren?" a="Ja, binnen 3 dagen bij verkeerde maat. Niet mooi? Dan krijg je store credit." /><Faq q="Zijn producten op voorraad?" a="Nee, alle producten zijn op aanvraag. Andere kleuren of producten kunnen ook aangevraagd worden via contact." /><Faq q="Hoe betaal ik?" a="Bij verzenden betaal je via Tikkie nadat we contact hebben gehad via WhatsApp. Bij afhalen kan je contant betalen in omgeving Rotterdam." /></section>

        <section id="contact" className="contact"><div><p className="eyebrow">Contact</p><h2>Vragen of bestellen?</h2><p>Stuur een bericht voor vragen, maten, producten op aanvraag of als je betere foto’s/video’s van een product wilt zien. De verzendtijd is ongeveer 2–3 weken.</p></div><div className="contact-links"><a href={`tel:+${phone}`}>Telefoon: +31 0626578911</a><a href="mailto:ddvinted6@gmail.com">E-mail: ddvinted6@gmail.com</a><a href="https://www.instagram.com/dripbydam">Instagram: @dripbydam</a><a href="https://www.tiktok.com/@dripbydam">TikTok: @dripbydam</a><a href="https://www.snapchat.com/add/dripbydam">Snapchat: dripbydam</a></div></section>
      </main>

      {selectedImage && <div className="lightbox" onClick={() => setSelectedImage(null)}><img src={selectedImage} alt="Product groot" /></div>}

      {cartOpen && <div className="cart-overlay"><aside className="cart"><div className="cart-top"><div><h2>Winkelmandje</h2><p>{count} product(en) • Totaal €{total}</p></div><button className="btn light" onClick={() => setCartOpen(false)}>Sluit</button></div><div className="cart-list">{cart.length === 0 ? <p>Je winkelmandje is leeg.</p> : cart.map((item) => <div className="cart-item" key={item.cartKey}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3>{item.variantLabel && <p>Keuze: {item.variantLabel}</p>}<p>{item.price}</p><select value={item.sizeType} onChange={(e) => updateItem(item.cartKey, { sizeType: e.target.value, size: "" })}><option value="none">Geen maat</option><option value="clothing">Kledingmaat (XS-XXL)</option><option value="shoes">Schoenmaat (36-46)</option></select>{item.sizeType === "clothing" && <div className="size-grid">{["XS", "S", "M", "L", "XL", "XXL"].map((s) => <button className={item.size === s ? "active" : ""} onClick={() => updateItem(item.cartKey, { size: s })} key={s}>{s}</button>)}</div>}{item.sizeType === "shoes" && <select value={item.size} onChange={(e) => updateItem(item.cartKey, { size: e.target.value })}><option value="">Kies schoenmaat</option>{[36,37,38,39,40,41,42,43,44,45,46].map((s) => <option key={s} value={s}>{s}</option>)}</select>}<div className="quantity"><button onClick={() => updateItem(item.cartKey, { quantity: Math.max(1, item.quantity - 1) })}>-</button><b>{item.quantity}</b><button onClick={() => updateItem(item.cartKey, { quantity: item.quantity + 1 })}>+</button><button className="remove" onClick={() => setCart((current) => current.filter((x) => x.cartKey !== item.cartKey))}>Verwijder</button></div></div></div>)}</div><div className="checkout"><h3>Bestelwijze</h3><div className="row"><button className={orderType === "Bezorgen" ? "btn cyan grow" : "btn dark grow"} onClick={() => setOrderType("Bezorgen")}>Bezorgen</button><button className={orderType === "Afhalen" ? "btn cyan grow" : "btn dark grow"} onClick={() => setOrderType("Afhalen")}>Afhalen</button></div>{orderType === "Bezorgen" && <div className="row"><button className={shippingMethod === "DHL" ? "btn cyan grow" : "btn dark grow"} onClick={() => setShippingMethod("DHL")}>DHL</button><button className={shippingMethod === "PostNL" ? "btn cyan grow" : "btn dark grow"} onClick={() => setShippingMethod("PostNL")}>PostNL</button></div>}<div className="total"><b>Totaal</b><b>€{total}</b></div>{cart.length > 0 ? <><a className="btn cyan full" href={whatsappUrl} target="_blank" rel="noreferrer">Bestel via WhatsApp</a><button className="btn outline full" onClick={() => setFallback(`LINK:\n${whatsappUrl}\n\nBERICHT:\n${whatsappText}`)}>Toon bestelbericht</button>{fallback && <textarea readOnly value={fallback} />}</> : <button className="btn disabled full">Mandje is leeg</button>}</div></aside></div>}
    </>
  );
}

function Info({ title, text, wide }) { return <div className={wide ? "info wide" : "info"}><h3>{title}</h3><p>{text}</p></div>; }
function Faq({ q, a }) { return <div className="faq-item"><h3>{q}</h3><p>{a}</p></div>; }

const css = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;background:#050505;color:#fff}a{color:inherit;text-decoration:none}button{font:inherit;cursor:pointer}main{overflow:hidden}.nav{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(5,5,5,.92);border-bottom:1px solid rgba(103,232,249,.22);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:space-between;padding:14px 6%;gap:20px}.brand{display:flex;align-items:center;gap:12px;font-weight:1000;font-size:22px;letter-spacing:.02em}.brand img{width:44px;height:44px;border-radius:50%;border:2px solid #67e8f9;object-fit:cover}.nav-links{display:flex;align-items:center;gap:26px;text-transform:uppercase;font-size:13px;letter-spacing:.08em;color:#d7d7d7}.nav-links a,.nav-links button{transition:.2s}.nav-links a:hover,.nav-links button:hover{color:#67e8f9}.nav-links button{background:transparent;border:0;color:#d7d7d7}.cart-pill,.btn.cyan{background:#67e8f9;color:#000;border:0;border-radius:999px;font-weight:1000;padding:12px 20px;box-shadow:0 10px 28px rgba(103,232,249,.18)}.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:125px 24px 85px;background:radial-gradient(circle at center,#063b4a,#000 64%)}.hero-logo{width:152px;height:152px;border-radius:50%;border:4px solid #67e8f9;object-fit:cover;box-shadow:0 0 55px rgba(34,211,238,.55)}.eyebrow,.small{text-transform:uppercase;letter-spacing:.28em;color:#a5f3fc;font-size:13px}.hero h1{font-size:clamp(54px,9vw,120px);line-height:.88;margin:22px 0 18px;font-weight:1000;text-transform:uppercase;letter-spacing:-.05em}.hero p{max-width:720px;color:#ddd;font-size:18px;line-height:1.65}.hero-actions,.row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}.hero-actions{justify-content:center;margin-top:18px}.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 22px;font-weight:1000;border:1px solid transparent;transition:.2s}.btn:hover{transform:translateY(-1px)}.btn.dark{background:#000;color:#fff}.btn.light{background:#fff;color:#000;border-color:#ddd}.btn.outline{background:transparent;color:#fff;border-color:rgba(103,232,249,.5)}.btn.full{width:100%;margin-top:10px}.btn.disabled{background:#333;color:#888}.grow{flex:1}.dark-section{padding:92px 6%;background:#050505;color:#fff;border-top:1px solid rgba(103,232,249,.16)}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:54px;max-width:1180px;margin:auto;align-items:center}.two-col h2,.dark-section h2,.shop h2,.faq h2,.contact h2{font-size:clamp(34px,5vw,58px);line-height:.98;text-transform:uppercase;margin:0 0 24px;font-weight:1000;letter-spacing:-.035em}.two-col p,.info p,.contact p{color:#cbd5e1;line-height:1.75;font-size:17px}.shop{background:#fff;color:#000;padding:92px 6%}.section-head{display:grid;grid-template-columns:1fr auto;align-items:end;gap:30px;max-width:1180px;margin:0 auto 45px}.section-head>button{border:0;background:#000;color:#fff;border-radius:999px;padding:13px 20px;font-weight:1000}.black-box{margin-top:20px;background:#000;color:#fff;border-radius:28px;padding:24px;box-shadow:0 18px 45px rgba(0,0,0,.16);max-width:720px}.black-box h3{font-size:28px;text-transform:uppercase;margin:0 0 8px;letter-spacing:-.02em}.black-box p{color:#ddd;line-height:1.6;margin:0}.grid{max-width:1180px;margin:auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;align-items:stretch}.card{background:#f7f7f8;border-radius:30px;overflow:hidden;box-shadow:0 10px 32px rgba(0,0,0,.08);display:flex;flex-direction:column;border:1px solid #eee}.product-img{width:100%;height:310px;object-fit:cover;background:#e5e7eb;display:block;cursor:pointer}.card-body{padding:22px;display:flex;flex-direction:column;flex:1}.card h3{min-height:54px;font-size:18px;line-height:1.25;margin:0 0 12px;letter-spacing:-.01em}.chips{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 14px}.chip,.size-grid button{border:1px solid #d4d4d8;background:#fff;color:#000;border-radius:999px;padding:8px 12px;font-weight:900;font-size:12px}.chip.active,.size-grid button.active{background:#000;color:#fff;border-color:#000}.price{color:#555;margin:2px 0 0;font-weight:800}.stock{color:#007b9a;font-weight:1000;margin:5px 0 0}.note{color:#dc2626;font-weight:1000;font-size:13px;margin:6px 0 0}.card .row{margin-top:auto;padding-top:18px}.info-grid{max-width:1180px;margin:42px auto 0;display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.info{border:1px solid rgba(103,232,249,.25);background:rgba(255,255,255,.055);border-radius:28px;padding:28px}.info.wide{grid-column:1/-1}.info h3{color:#a5f3fc;text-transform:uppercase;font-size:23px;margin:0 0 12px;letter-spacing:-.01em}.faq{background:#fff;color:#000;padding:92px 6%;max-width:none}.faq>div,.faq h2,.faq .small{max-width:1180px;margin-left:auto;margin-right:auto}.faq-item{max-width:1180px;margin:13px auto;border:1px solid #e5e7eb;border-radius:22px;padding:22px 24px;background:#fff}.faq-item h3{margin:0 0 8px}.faq-item p{color:#555;margin:0;line-height:1.6}.contact{padding:92px 6%;background:#09090b;display:grid;grid-template-columns:1fr 1fr;gap:54px}.contact-links{display:grid;gap:12px}.contact-links a{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:18px;transition:.2s}.contact-links a:hover{background:rgba(103,232,249,.12);border-color:rgba(103,232,249,.35)}.lightbox{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:20px}.lightbox img{max-width:92vw;max-height:92vh;border-radius:20px}.cart-overlay{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.72);display:flex;justify-content:flex-end}.cart{width:min(720px,100%);height:100%;background:#09090b;color:#fff;display:flex;flex-direction:column;box-shadow:-20px 0 60px rgba(0,0,0,.4)}.cart-top{padding:22px;border-bottom:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:space-between}.cart-top h2{margin:0}.cart-top p{color:#aaa;margin:4px 0 0}.cart-list{flex:1;overflow:auto;padding:18px}.cart-item{display:grid;grid-template-columns:112px 1fr;gap:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:14px;margin-bottom:14px}.cart-item img{width:112px;height:112px;object-fit:cover;border-radius:18px}.cart-item h3{margin:0 0 4px;line-height:1.25}.cart-item p{margin:4px 0;color:#cbd5e1}.cart select{width:100%;background:#000;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:13px;padding:11px;margin-top:8px}.size-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin-top:8px}.quantity{display:flex;align-items:center;gap:10px;margin-top:10px}.quantity button{border:0;border-radius:999px;background:rgba(255,255,255,.12);color:#fff;padding:8px 12px;font-weight:900}.quantity .remove{margin-left:auto;color:#fca5a5}.checkout{border-top:1px solid rgba(255,255,255,.12);padding:18px;max-height:45vh;overflow:auto}.total{display:flex;justify-content:space-between;font-size:20px;margin:16px 0}.checkout textarea{width:100%;height:150px;margin-top:10px;border-radius:14px;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.15);padding:12px}@media(max-width:1000px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.section-head{grid-template-columns:1fr}.two-col{grid-template-columns:1fr}.contact{grid-template-columns:1fr}}@media(max-width:850px){
.nav-links{display:none}.nav{padding:14px 16px}.brand{font-size:20px}.brand img{width:46px;height:46px}.cart-pill{padding:12px 16px;font-size:15px}.grid,.info-grid{grid-template-columns:1fr}.hero{padding:120px 20px 75px;min-height:92vh}.hero h1{font-size:58px}.hero p{font-size:18px;line-height:1.7}.hero-logo{width:140px;height:140px}.shop,.dark-section,.faq,.contact{padding:76px 18px}.shop h2,.dark-section h2,.faq h2,.contact h2{font-size:38px}.black-box{padding:22px;border-radius:24px}.black-box h3{font-size:25px}.black-box p{font-size:16px}.product-img{height:380px}.card{border-radius:26px}.card-body{padding:24px}.card h3{font-size:22px;min-height:auto}.price{font-size:18px}.stock{font-size:18px}.chip{font-size:14px;padding:11px 14px}.card .row{display:grid;grid-template-columns:1fr;gap:12px}.btn{font-size:16px;padding:16px 22px}.section-head{grid-template-columns:1fr}.section-head>button{width:100%;margin-top:16px;font-size:16px;padding:16px}.info{padding:24px}.info h3{font-size:24px}.info p,.faq-item p,.contact p{font-size:17px}.faq-item{padding:24px}.contact-links a{font-size:17px;padding:20px}.cart{width:100%}.cart-top{padding:20px}.cart-top h2{font-size:26px}.cart-item{grid-template-columns:1fr;padding:16px}.cart-item img{width:100%;height:230px}.cart-item h3{font-size:21px}.cart-item p{font-size:16px}.cart select{font-size:16px;padding:14px}.size-grid{grid-template-columns:repeat(3,1fr);gap:10px}.size-grid button{font-size:16px;padding:13px}.quantity button{font-size:18px;padding:10px 15px}.checkout{max-height:50vh;padding:18px}.checkout h3{font-size:23px}.total{font-size:24px}.checkout textarea{font-size:15px;height:170px}.eyebrow,.small{font-size:12px;letter-spacing:.2em}
}
@media(max-width:430px){
.nav{padding:14px 14px}.brand{font-size:19px}.brand img{width:48px;height:48px}.cart-pill{font-size:15px;padding:12px 14px}.hero{padding:118px 18px 70px;min-height:92vh}.hero h1{font-size:54px}.hero p{font-size:19px;line-height:1.7}.hero-logo{width:135px;height:135px}.shop,.dark-section,.faq,.contact{padding:70px 16px}.shop h2,.dark-section h2,.faq h2,.contact h2{font-size:38px}.two-col p,.info p,.contact p,.faq-item p{font-size:18px;line-height:1.7}.product-img{height:390px}.card h3{font-size:23px}.card-body{padding:24px}.chip{font-size:15px;padding:12px 15px}.price,.stock{font-size:19px}.btn{font-size:17px;padding:17px 22px}.black-box h3{font-size:26px}.black-box p{font-size:17px}.info h3{font-size:25px}.contact-links a{font-size:18px}.cart-top h2{font-size:28px}.cart-item h3{font-size:22px}.cart-item img{height:245px}.cart select{font-size:17px;padding:15px}.size-grid button{font-size:17px;padding:14px}.total{font-size:25px}
}
@media(max-width:380px){
.hero h1{font-size:48px}.product-img{height:350px}.card h3{font-size:21px}.shop h2,.dark-section h2,.faq h2,.contact h2{font-size:35px}.btn{font-size:16px;padding:16px 20px}
}
`;
