export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  monthlyPrice?: number;
  rating?: number;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
}