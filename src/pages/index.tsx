import Image from "next/image";
import MobileImg from "../assets/app-nlw-copa-preview.png";
import LogoImg from "../assets/logo.svg";
import AvatarImg from "../assets/users-avatar-example.png";
import IconCheckImg from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useCallback, useState } from "react";
interface HomeProps {
  poolCount: number;
  guessesCount: number;
  userCount: number;

}

export default function Home({ poolCount, guessesCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');
  const createPool = useCallback(async (e: FormEvent) => {
    e?.preventDefault();
    try {
      const code = await api.post('/pools', {
        title: poolTitle
      }).then((response) => response.data).then((data) => data.code)

      setPoolTitle('');
      navigator.clipboard.writeText(code);
      alert('Bolão criado com sucesso, codigo já está na sua area de transferencia');
    } catch (error) {
      alert('Não conseguimos criar seu bolão');
    }
  }, [poolTitle]);

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={LogoImg} alt="logo da nlw copa" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div>
          <div className="mt-10 flex items-center gap-2">
            <Image
              src={AvatarImg}
              alt="Imagens dos avatares de que já fez o bolão"
              quality={100}
            />
            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500">+{userCount}</span> pessoas já estão
              usando
            </strong>
          </div>
          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input
              className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
              type="text"
              required
              value={poolTitle}
              onChange={(e) => setPoolTitle(e.target.value)}
              placeholder="Qual nome do seu bolão"
            />
            <button className="bg-yellow-500 hover:bg-yellow-700 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase" type="submit">
              Criar meu bolão
            </button>
          </form>
          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Após criar seu bolão você recebera um codigo unico que poderá ser
            usado para convidar outras pessoas
          </p>
          <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Image src={IconCheckImg} alt="Icone de check" quality={100} />
              <div className="flex flex-col text-gray-100">
                <span className="font-bold text-2xl">+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>
            <div className="w-px h-14 bg-gray-600"></div>
            <div className="flex items-center gap-6">
              <Image src={IconCheckImg} alt="Icone de check" quality={100} />
              <div className="flex flex-col text-gray-100">
                <span className="font-bold text-2xl">+{guessesCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={MobileImg}
        alt="Imagem de dois celulares com as telas do aplicativo nlw copa"
        quality={100}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  const [ userCount, poolCount, guessesCount] = await Promise.all([
    api.get('/users/count').then((response) => response.data).then((data) => data.count),
    api.get('/pools/count').then((response) => response.data).then((data) => data.count),
    api.get('/guesses/count').then((response) => response.data).then((data) => data.count)
  ]);

  return {
    props: {
      poolCount,
      guessesCount,
      userCount
    }
  }

}
