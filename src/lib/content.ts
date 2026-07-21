export type Lang = "ka" | "en";

export const PHONE = "+995 577 10 16 10";
export const PHONE_HREF = "+995577101610";

export const content = {
  ka: {
    htmlLang: "ka",
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
    video: {
      eyebrow: "ვიდეო პრეზენტაცია",
      title: "Grande მოქმედებაში",
      text: "უყურე როგორ ცვლის Grande სივრცეს — დაგებიდან საბოლოო შედეგამდე.",
      replace: "ჩაანაცვლე ეს placeholder შენი YouTube/Vimeo ბმულით ან mp4 ფაილით.",
    },
    features: {
      eyebrow: "რატომ Grande",
      title: "შექმნილია სივრცის შესაცვლელად",
      items: [
        {
          title: "მსხვილი ფორმატი",
          text: "დიდი ზომის ფილა ნაკლები ნაკერით — სუფთა, თანამედროვე ვიზუალი ეზოსა და ტერასაზე.",
        },
        {
          title: "ევროპული სტანდარტი",
          text: "წარმოებული ვიბროპრესის ტექნოლოგიით, EN 1338 სტანდარტის შესაბამისად.",
        },
        {
          title: "ყინვაგამძლე",
          text: "გათვლილია ქართულ კლიმატზე — გაყინვა-გალღობის ციკლებისადმი მდგრადი.",
        },
        {
          title: "მაღალი დატვირთვა",
          text: "8 სმ სისქე უძლებს როგორც ფეხით, ისე ავტომობილის დატვირთვას.",
        },
        {
          title: "ფერის სტაბილურობა",
          text: "პიგმენტი მთელ მასაში — ფერი წლების შემდეგაც ინარჩუნებს სიღრმეს.",
        },
        {
          title: "ჰარმონია ბუნებასთან",
          text: "შესანიშნავად ერწყმის გაზონს, ხეებსა და მწვანე გარემოს — ბეტონი ბუნებასთან ერთიანობაში.",
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
      promoTag: "აქცია",
      unitPiece: "₾ / ცალი",
      unitSqm: "₾ / მ²",
      cta: "შეუკვეთე",
      columns: {
        product: "ფერი / დეკორი",
        size: "ზომა",
        underTier: "30 ცალამდე",
        aboveTier: "30 ცალი და მეტი",
      },
      rows: [
        { name: "Grande — ნაცრისფერი", size: "80×40 სმ", thickness: "8 სმ", pricePiece: "17", priceSqm: "41", popular: false, swatch: "#b4b1a8" },
        { name: "Grande — კაპუჩინო", size: "80×40 სმ", thickness: "8 სმ", pricePiece: "24", priceSqm: "48", popular: true, swatch: "#977258" },
        { name: "Grande — ობსიდიანი", size: "80×40 სმ", thickness: "8 სმ", pricePiece: "24", priceSqm: "48", popular: false, swatch: "#3f3f42" },
      ],
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
      required: "სავალდებულო ველი",
      privacy: "გაგზავნით თქვენ ეთანხმებით კონფიდენციალურობის პოლიტიკას.",
      callUs: "ან დაგვირეკე",
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
    htmlLang: "en",
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
    video: {
      eyebrow: "Video presentation",
      title: "Grande in action",
      text: "See how Grande transforms a space — from laying to the finished result.",
      replace: "Replace this placeholder with your YouTube/Vimeo link or an mp4 file.",
    },
    features: {
      eyebrow: "Why Grande",
      title: "Built to transform a space",
      items: [
        {
          title: "Large format",
          text: "Bigger slabs, fewer joints — a clean, contemporary look for yards and terraces.",
        },
        {
          title: "European standard",
          text: "Produced with vibro-press technology in line with the EN 1338 standard.",
        },
        {
          title: "Frost resistant",
          text: "Engineered for the Georgian climate — resistant to freeze-thaw cycles.",
        },
        {
          title: "High load capacity",
          text: "8 cm thickness handles both foot traffic and vehicle loads.",
        },
        {
          title: "Colour stability",
          text: "Pigment through the full body — colour keeps its depth for years.",
        },
        {
          title: "Pairs with nature",
          text: "Looks stunning next to grass, trees and greenery — concrete in natural harmony.",
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
      promoTag: "Promo",
      unitPiece: "₾ / pc",
      unitSqm: "₾ / m²",
      cta: "Order",
      columns: {
        product: "Colour / decor",
        size: "Size",
        underTier: "Under 30 pcs",
        aboveTier: "30 pcs & up",
      },
      rows: [
        { name: "Grande — Gray", size: "80×40 cm", thickness: "8 cm", pricePiece: "17", priceSqm: "41", popular: false, swatch: "#b4b1a8" },
        { name: "Grande — Cappuccino", size: "80×40 cm", thickness: "8 cm", pricePiece: "24", priceSqm: "48", popular: true, swatch: "#977258" },
        { name: "Grande — Obsidian", size: "80×40 cm", thickness: "8 cm", pricePiece: "24", priceSqm: "48", popular: false, swatch: "#3f3f42" },
      ],
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
      required: "Required field",
      privacy: "By submitting you agree to the privacy policy.",
      callUs: "Or call us",
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
