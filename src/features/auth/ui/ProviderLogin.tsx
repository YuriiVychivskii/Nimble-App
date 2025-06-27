import { Button } from '@/shared/ui/shadcn/button';
import Image from 'next/image';

export default function ProviderLogin() {
  return (
    <div className="mt-5">
      <Button className="w-full" variant="outline">
        <Image alt="" src="assets/forms/google.svg" width={20} height={20} />
        <p>Log-in with Google</p>
      </Button>
    </div>
  );
}
