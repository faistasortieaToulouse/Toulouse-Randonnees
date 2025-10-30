import data from './gallery-images.json';

export type GalleryImage = {
  id: string;
  alt: string;
  imageUrl: string;
};

export const GalleryImages: GalleryImage[] = data.galleryImages;
