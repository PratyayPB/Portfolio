import BottomDock from './dock';
import dynamic from 'next/dynamic';

const ScrollTop = dynamic(() =>
  import('@/components/scroll-top').then((mod) => mod.ScrollTop)
);

export default function Navigation() {
  return (
    <>
      <BottomDock className="hidden lg:block" />
      <ScrollTop />
    </>
  );
}
