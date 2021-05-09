import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Text,
  Flex,
  Icon,
  Center,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { api } from 'src/services/api'
import CreateMateria from 'src/components/CreateMateria'

interface IMateria {
  title: string
}

export default function Materias() {
  const [loading, setLoading] = useState(false)
  const [materias, setMaterias] = useState<IMateria[]>([
    { title: 'SisMic' },
    { title: 'Projeto transversal 2' },
  ])
  const [createMateriaModalOpen, setCreateMateriaModalOpen] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  const createMateria = async () => {
    const title = titleRef.current.value

    if (title === '') return

    setCreateMateriaModalOpen(false)

    setLoading(true)

    try {
      await api.post('/materias', { title })
    } catch (err) {
      console.log({ err })
    }

    load()
    setLoading(false)
  }

  const deleteMateria = async (id: string) => {
    setLoading(true)

    try {
      await api.delete(`/materias/${id}`)
    } catch (err) {
      console.log({ err })
    }

    load()
    setLoading(false)
  }

  const load = async () => {
    setLoading(true)

    try {
      const { data } = await api.get('/materias')
      setMaterias(data)
    } catch (err) {
      console.log({ err })
    }

    setLoading(false)
  }

  // useEffect(() => {
  //   load()
  // }, [])

  return (
    <>
      <Head>
        <title>Matérias</title>
      </Head>
      <Box width="1000px" margin="0 auto" marginTop="25px">
        <Link href="/">
          <a>
            <ArrowBackIcon width="40px" height="40px" />
          </a>
        </Link>
        <Center flexDirection="column" height="70vh">
          {loading ? (
            <Spinner height="40px" width="40px" />
          ) : (
            <>
              <CreateMateria
                createMateria={createMateria}
                isOpen={createMateriaModalOpen}
                setIsOpen={setCreateMateriaModalOpen}
                titleRef={titleRef}
                descriptionRef={descriptionRef}
              />
              <Button
                mb="30px"
                bg="green.400"
                color="#fff"
                _hover={{ bg: 'green.500' }}
                onClick={() => setCreateMateriaModalOpen(true)}
              >
                Adicionar matéria
              </Button>
              {materias.map((materia, i) => (
                <Flex
                  key={i}
                  backgroundColor="gray.200"
                  borderRadius="4px"
                  padding="10px 15px"
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="space-between"
                  width="400px"
                  marginBottom={i !== materias.length - 1 ? '15px' : '0'}
                >
                  <Text fontSize="18px">{materia.title}</Text>
                  <Icon as={FaTrashAlt} color="red.400" />
                </Flex>
              ))}
            </>
          )}
        </Center>
      </Box>
    </>
  )
}
