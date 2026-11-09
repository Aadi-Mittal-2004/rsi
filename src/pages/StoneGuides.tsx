import { useLocation } from 'react-router-dom';
import { VENEER_HUB } from '@/data/coldClimateGuides';
import Blog from './Blog';

export default function StoneGuides() {
  const collection = useLocation().pathname === VENEER_HUB ? 'veneer' : 'cold-climate';
  return <Blog collection={collection} />;
}
