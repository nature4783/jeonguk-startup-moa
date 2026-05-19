import { LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <form
        action="/api/admin-login"
        method="post"
        className="w-full max-w-sm rounded-md border border-stone-200 bg-white p-6 shadow-sm"
      >
        <LockKeyhole className="size-10 rounded-md bg-neutral-950 p-2 text-white" />
        <h1 className="mt-4 text-2xl font-black text-neutral-950">관리자 로그인</h1>
        <label className="mt-5 block space-y-1 text-xs font-black text-neutral-500">
          <span>관리자 토큰</span>
          <input
            name="token"
            type="password"
            required
            className="h-11 w-full rounded-md border border-stone-200 px-3 text-sm font-bold outline-none focus:border-neutral-950"
          />
        </label>
        <button
          type="submit"
          className="mt-4 h-11 w-full rounded-md bg-neutral-950 px-5 text-sm font-black text-white"
        >
          로그인
        </button>
      </form>
    </main>
  );
}
