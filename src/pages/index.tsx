import Head from 'next/head'
import Link from 'next/link'
import { Button, Center, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Acompanhe o seu semestre</title>
      </Head>
      <Center flexDirection="column" height="80vh">
        <Text
          fontSize="30px"
          textTransform="uppercase"
          fontWeight="bold"
          mb="40px"
        >
          Acompanhe o seu semestre
        </Text>

        <Link href="/materias">
          <a>
            <Button size="lg">
              <Text fontSize="18px">Ver matérias</Text>
            </Button>
          </a>
        </Link>
      </Center>
    </>
  )
}
