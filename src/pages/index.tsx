
interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return (
    <>hello word</>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:9000/pools/count');
  const data = await response.json()
  console.log(data)

  return {
    props: {}
  }
}