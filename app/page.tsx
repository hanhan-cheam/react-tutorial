import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// import { serverGetLastestHomeURL } from '@/utils/check-home-url.server'
import { TOKEN_NAME } from './const/config/token-name';

// handle pathname '/'
const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(`${TOKEN_NAME}`);

  // TODO
  if (!token) redirect('/login');
  // if (token) await serverGetLastestHomeURL(token.value)

  return <>redirecting..</>;
};

export default Page;
