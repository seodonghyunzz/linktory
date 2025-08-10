const defaultSEO = {
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://linktory-nine.vercel.app/",
    site_name: "Linktory",
    images: [
      {
        url: "https://linktory-nine.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Linktory 대표 이미지",
      },
    ],
  },
  twitter: {
    handle: "",
    site: "@linktory",
    cardType: "summary_large_image",
  },
};

export default defaultSEO;