export interface CarouselImage {
  mobile: string;
  desktop: string;
  alt?: string;
}

export interface CarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showIcons?: boolean;
}
