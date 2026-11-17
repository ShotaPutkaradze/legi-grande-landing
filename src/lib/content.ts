export type Lang = "ka" | "en";

export const PHONE = "+995 577 10 16 10";
export const PHONE_HREF = "+995577101610";

/**
 * Grande colours and prices — the single place to change a price. Prices are
 * in GEL incl. VAT: per piece under 30 pcs, per m² from 30 pcs.
 */
export const PRODUCTS = [
  { name: { ka: "ნაცრისფერი", en: "Gray" }, pricePiece: 17, priceSqm: 41, popular: false, swatch: "#b4b1a8" },
  { name: { ka: "კაპუჩინო", en: "Cappuccino" }, pricePiece: 24, priceSqm: 48, popular: true, swatch: "#977258" },
  { name: { ka: "ობსიდიანი", en: "Obsidian" }, pricePiece: 24, priceSqm: 48, popular: false, swatch: "#3f3f42" },
] as const;

const SLAB_SIZE_CM = "80×40";
const SLAB_THICKNESS_CM = 8;
const CM = { ka: "სმ", en: "cm" } as const;

function priceRows(lang: Lang) {
  return PRODUCTS.map((p) => ({
    name: `Grande — ${p.name[lang]}`,
    size: `${SLAB_SIZE_CM} ${CM[lang]}`,
    thickness: `${SLAB_THICKNESS_CM} ${CM[lang]}`,
    pricePiece: String(p.pricePiece),
    priceSqm: String(p.priceSqm),
    popular: p.popular,
    swatch: p.swatch,
  }));
}

export const content = {
  ka: {
    slogan: "ვქმნით ხარისხს!",
    nav: {
      product: "პროდუქტი",
      gallery: "გალერეა",
      pricing: "ფასები",
      contact: "კონტაქტი",
      cta: "შეკვეთა",
    },
    hero: {
      badge: "ახალი კოლექცია",
      title: "GRANDE",
      subtitle: "მსხვილფორმატიანი ბეტონის ფილა",
      tagline: "ბეტონისა და ბუნების სრულყოფილი სინერგია",
      lead: "დიდი ფორმატის ტროტუარის ფილა, რომელიც აერთიანებს ევროპულ დიზაინსა და ქართულ ამინდზე გათვლილ სიმტკიცეს. სუფთა გეომეტრია, მინიმალური ნაკერი, თანამედროვე სივრცე.",
      ctaPrimary: "მიიღე ფასი",
      ctaSecondary: "ფასების ნახვა",
      ctaPrice: "გაიგე ფასი",
      photoCaption: "Grande · ნაცრისფერი · კაპუჩინო · ობსიდიანი",
      certified: "სერტიფიცირებული",
      stats: [
        { value: "15+", label: "წლიანი გამოცდილება" },
        { value: "8 სმ", label: "სისქე / გამძლეობა" },
        { value: "100%", label: "ევროპული სტანდარტი" },
      ],
    },
    features: {
      eyebrow: "რატომ Grande",
      title: "შექმნილია სივრცის შესაცვლელად",
      items: [
        {
          title: "მსხვილი ფორმატი",
          text: "დიდი ზომის ფილა ნაკლები ნაკერით — სუფთა, თანამედროვე ვიზუალი ეზოსა და ტერასაზე.",
          icon: "format",
        },
        {
          title: "ევროპული სტანდარტი",
          text: "წარმოებული ვიბროპრესის ტექნოლოგიით, EN 1338 სტანდარტის შესაბამისად.",
          icon: "standard",
        },
        {
          title: "ყინვაგამძლე",
          text: "გათვლილია ქართულ კლიმატზე — გაყინვა-გალღობის ციკლებისადმი მდგრადი.",
          icon: "frost",
        },
        {
          title: "მაღალი დატვირთვა",
          text: "8 სმ სისქე უძლებს როგორც ფეხით, ისე ავტომობილის დატვირთვას.",
          icon: "load",
        },
        {
          title: "ფერის სტაბილურობა",
          text: "პიგმენტი მთელ მასაში — ფერი წლების შემდეგაც ინარჩუნებს სიღრმეს.",
          icon: "color",
        },
        {
          title: "ჰარმონია ბუნებასთან",
          text: "შესანიშნავად ერწყმის გაზონს, ხეებსა და მწვანე გარემოს — ბეტონი ბუნებასთან ერთიანობაში.",
          icon: "leaf",
        },
      ],
    },
    gallery: {
      eyebrow: "გალერეა",
      title: "Grande ობიექტებზე",
      text: "რეალური ობიექტები Grande ფილით — ნაცრისფერი, კაპუჩინო და ობსიდიანი ფერებში.",
    },
    pricing: {
      eyebrow: "ფასები",
      title: "აირჩიე შენი ფერი",
      note: "30 ცალამდე ფასი მითითებულია ცალობით, 30 ცალიდან — კვადრატულ მეტრზე (მ²). ფასები დღგ-ს ჩათვლით. მინიმალური შეკვეთა არ არის.",
      popular: "პოპულარული",
      unitPiece: "₾ / ცალი",
      unitSqm: "₾ / მ²",
      cta: "შეუკვეთე",
      columns: {
        product: "ფერი / დეკორი",
        size: "ზომა",
        underTier: "30 ცალამდე",
        aboveTier: "30 ცალი და მეტი",
      },
      rows: priceRows("ka"),
    },
    form: {
      eyebrow: "შეკვეთა",
      title: "მიიღე ფასი და კონსულტაცია",
      text: "შეავსე ფორმა და ჩვენი გუნდი დაგიკავშირდება 24 საათში — გავთვლით საჭირო რაოდენობას და მოგცემთ ზუსტ ფასს.",
      name: "სახელი და გვარი",
      phone: "ტელეფონი",
      submit: "გაგზავნა",
      submitting: "იგზავნება...",
      success: "მადლობა! მალე დაგიკავშირდებით.",
      error: "დაფიქსირდა შეცდომა. გთხოვ სცადე თავიდან ან დაგვირეკე.",
      privacy: "გაგზავნით თქვენ ეთანხმებით კონფიდენციალურობის პოლიტიკას.",
      callUs: "ან დაგვირეკე",
    },
    ui: {
      switchLanguage: "ენის შეცვლა",
      menu: "მენიუ",
      close: "დახურვა",
      newRequest: "ახალი მოთხოვნა",
    },
    footer: {
      tagline: "ბეტონის ფილა და ბორდიური ევროპული სტანდარტით — 2010 წლიდან.",
      locations: "მისამართები",
      locationList: ["თბილისი", "ქობულეთი", "თერჯოლა"],
      follow: "გამოგვყევი",
      rights: "ყველა უფლება დაცულია.",
      productLine: "Grande · პრემიუმ ბეტონის ფილა",
    },
  },

  en: {
    slogan: "We create quality!",
    nav: {
      product: "Product",
      gallery: "Gallery",
      pricing: "Pricing",
      contact: "Contact",
      cta: "Order",
    },
    hero: {
      badge: "New collection · LEGI",
      title: "GRANDE",
      subtitle: "Large-format concrete paving slab",
      tagline: "The perfect synergy of concrete and nature",
      lead: "A large-format paving slab that combines European design with strength engineered for the Georgian climate. Clean geometry, minimal joints, a modern surface.",
      ctaPrimary: "Get a price",
      ctaSecondary: "See prices",
      ctaPrice: "Learn price",
      photoCaption: "Grande · Gray · Cappuccino · Obsidian",
      certified: "Certified",
      stats: [
        { value: "15+", label: "years of experience" },
        { value: "8 cm", label: "thickness / durability" },
        { value: "100%", label: "European standard" },
      ],
    },
    features: {
      eyebrow: "Why Grande",
      title: "Built to transform a space",
      items: [
        {
          title: "Large format",
          text: "Bigger slabs, fewer joints — a clean, contemporary look for yards and terraces.",
          icon: "format",
        },
        {
          title: "European standard",
          text: "Produced with vibro-press technology in line with the EN 1338 standard.",
          icon: "standard",
        },
        {
          title: "Frost resistant",
          text: "Engineered for the Georgian climate — resistant to freeze-thaw cycles.",
          icon: "frost",
        },
        {
          title: "High load capacity",
          text: "8 cm thickness handles both foot traffic and vehicle loads.",
          icon: "load",
        },
        {
          title: "Colour stability",
          text: "Pigment through the full body — colour keeps its depth for years.",
          icon: "color",
        },
        {
          title: "Pairs with nature",
          text: "Looks stunning next to grass, trees and greenery — concrete in natural harmony.",
          icon: "leaf",
        },
      ],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Grande on site",
      text: "Real installations with Grande slabs — in Gray, Cappuccino and Obsidian.",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Choose your colour",
      note: "Under 30 pieces priced per piece; from 30 pieces — per m². VAT included. No minimum order.",
      popular: "Popular",
      unitPiece: "₾ / pc",
      unitSqm: "₾ / m²",
      cta: "Order",
      columns: {
        product: "Colour / decor",
        size: "Size",
        underTier: "Under 30 pcs",
        aboveTier: "30 pcs & up",
      },
      rows: priceRows("en"),
    },
    form: {
      eyebrow: "Order",
      title: "Get a price and a consultation",
      text: "Fill in the form and our team will reach out within 24 hours — we'll calculate the quantity you need and give you an exact price.",
      name: "Full name",
      phone: "Phone",
      submit: "Send",
      submitting: "Sending...",
      success: "Thank you! We'll be in touch shortly.",
      error: "Something went wrong. Please try again or call us.",
      privacy: "By submitting you agree to the privacy policy.",
      callUs: "Or call us",
    },
    ui: {
      switchLanguage: "Switch language",
      menu: "Menu",
      close: "Close",
      newRequest: "New request",
    },
    footer: {
      tagline: "Concrete paving and kerbs to European standard — since 2010.",
      locations: "Locations",
      locationList: ["Tbilisi", "Kobuleti", "Terjola"],
      follow: "Follow us",
      rights: "All rights reserved.",
      productLine: "Grande · Premium concrete pavers",
    },
  },
} as const;

export type Content = (typeof content)[Lang];
