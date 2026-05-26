'use client';

import { createSupabaseClient } from '@/shared/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Props = {
  userName: string | null;
};

const AuthButton = ({ userName }: Props) => {
  const router = useRouter();
  const supabase = createSupabaseClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (userName) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-500">{userName}</span>
        <button
          onClick={handleLogout}
          className="rounded-full cursor-pointer border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="flex cursor-pointer items-center gap-2 rounded-full bg-[#FEE500] px-4 py-2 text-sm font-medium text-[#191919] transition-opacity hover:opacity-90"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 1C4.134 1 1 3.478 1 6.526c0 1.91 1.168 3.59 2.94 4.614l-.748 2.79a.25.25 0 0 0 .376.272L6.8 12.316A8.6 8.6 0 0 0 8 12.052c3.866 0 7-2.478 7-5.526S11.866 1 8 1Z"
          fill="#191919"
        />
      </svg>
      카카오 로그인
    </button>
  );
};

export default AuthButton;
