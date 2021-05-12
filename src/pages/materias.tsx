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
  codigo: number
  departamento: string
  nome: string
  professor: string
  qtdCreditos: number
  __v: number
  _id: string
}

export default function Materias() {
  const [loading, setLoading] = useState(false)
  const [materias, setMaterias] = useState<IMateria[]>([])
  const [createMateriaModalOpen, setCreateMateriaModalOpen] = useState(false)

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

  useEffect(() => {
    load()
  }, [])

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
        <Flex
          flexDirection="column"
          marginTop="100px"
          marginBottom="50px"
          alignItems="center"
        >
          {loading ? (
            <Spinner height="40px" width="40px" />
          ) : (
            <>
              <CreateMateria
                isOpen={createMateriaModalOpen}
                setIsOpen={setCreateMateriaModalOpen}
                load={load}
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
                  key={materia._id}
                  backgroundColor="gray.200"
                  borderRadius="4px"
                  padding="10px 15px"
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="space-between"
                  width="400px"
                  marginBottom={i !== materias.length - 1 ? '15px' : '0'}
                >
                  <Flex flexDirection="column">
                    <Text fontSize="18px">
                      {' '}
                      <Text as="strong">Código:</Text> {materia.codigo}
                    </Text>
                    <Text fontSize="18px">
                      {' '}
                      <Text as="strong">Nome:</Text> {materia.nome}
                    </Text>
                    <Text fontSize="18px">
                      {' '}
                      <Text as="strong">Departamento:</Text>{' '}
                      {materia.departamento}
                    </Text>
                    <Text fontSize="18px">
                      {' '}
                      <Text as="strong">Professor:</Text> {materia.professor}
                    </Text>
                    <Text fontSize="18px">
                      {' '}
                      <Text as="strong">Quantidade de créditos:</Text>{' '}
                      {materia.qtdCreditos}
                    </Text>
                  </Flex>
                  <Icon as={FaTrashAlt} color="red.400" />
                </Flex>
              ))}
            </>
          )}
        </Flex>
      </Box>
    </>
  )
}
