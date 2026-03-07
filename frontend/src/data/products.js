const descriptionFiles = import.meta.glob("../assets/ESDM/ESDM/*/*.{txt,TXT}", {
  eager: true,
  query: "?raw",
  import: "default",
});

const imageFiles = import.meta.glob(
  "../assets/ESDM/ESDM/*/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP,AVIF}",
  { eager: true, import: "default" },
);

const pathToFolder = (path) => {
  const parts = path.split("/");
  return parts[parts.length - 2];
};

const pathToFile = (path) => {
  const parts = path.split("/");
  return parts[parts.length - 1];
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const preferredDescriptionRank = (fileName) => {
  const lower = fileName.toLowerCase();
  if (lower === "des.txt") return 0;
  if (lower === "description.txt") return 1;
  if (lower === "dep.txt") return 2;
  if (lower.includes("des")) return 3;
  return 10;
};

const cleanLine = (line) => line.replace(/\s+/g, " ").trim();

const parseDescriptionAndFeatures = (rawText) => {
  const lines = rawText.split(/\r?\n/).map(cleanLine).filter(Boolean);
  const features = [];
  const descriptionLines = [];
  let inFeatureSection = false;

  lines.forEach((line) => {
    const bulletMatch = line.match(/^[-*•]\s*(.+)$/);
    const numberedMatch = line.match(/^\d+\.\s*(.+)$/);
    const featureHeader = line.match(/^features?\s*:?\s*(.*)$/i);

    if (featureHeader) {
      inFeatureSection = true;
      if (featureHeader[1]) features.push(featureHeader[1]);
      return;
    }

    if (bulletMatch) {
      features.push(bulletMatch[1]);
      return;
    }

    if (numberedMatch) {
      features.push(numberedMatch[1]);
      return;
    }

    if (inFeatureSection) {
      features.push(line);
      return;
    }

    descriptionLines.push(line);
  });

  const description = descriptionLines.join(" ").trim();
  const shortDescription = descriptionLines[0] || "No description available.";

  return {
    description: description || "No description available.",
    shortDescription,
    features,
  };
};

const groupedProducts = {};

Object.entries(descriptionFiles).forEach(([path, raw]) => {
  const folder = pathToFolder(path);
  if (!groupedProducts[folder]) {
    groupedProducts[folder] = { name: folder, descriptions: [], images: [] };
  }
  groupedProducts[folder].descriptions.push({
    fileName: pathToFile(path),
    raw,
  });
});

Object.entries(imageFiles).forEach(([path, url]) => {
  const folder = pathToFolder(path);
  if (!groupedProducts[folder]) {
    groupedProducts[folder] = { name: folder, descriptions: [], images: [] };
  }
  groupedProducts[folder].images.push({
    fileName: pathToFile(path),
    url,
  });
});

export const products = Object.values(groupedProducts)
  .map((item) => {
    const chosenDescription = [...item.descriptions].sort((a, b) => {
      const rankDiff =
        preferredDescriptionRank(a.fileName) -
        preferredDescriptionRank(b.fileName);
      if (rankDiff !== 0) return rankDiff;
      return a.fileName.localeCompare(b.fileName);
    })[0];

    const sortedImages = [...item.images].sort((a, b) =>
      a.fileName.localeCompare(b.fileName),
    );
    const chosenImage = sortedImages[0];

    const parsed = parseDescriptionAndFeatures(chosenDescription?.raw || "");

    return {
      id: slugify(item.name),
      name: item.name,
      image: chosenImage?.url || "",
      images: sortedImages.map((img) => img.url),
      shortDescription: parsed.shortDescription,
      description: parsed.description,
      features: parsed.features,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
