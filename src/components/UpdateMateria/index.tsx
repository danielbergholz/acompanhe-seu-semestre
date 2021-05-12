import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Input,
  FormControl,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react'
import { api } from 'src/services/api'
import { IMateria } from 'src/pages/materias'

interface IProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  load: () => Promise<void>
  materia: IMateria
}

const UpdateMateria = ({ isOpen, setIsOpen, load, materia }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [codigo, setCodigo] = useState(materia.codigo)
  const [professor, setProfessor] = useState(materia.professor)
  const [departamento, setDepartamento] = useState(materia.departamento)
  const [nome, setNome] = useState(materia.nome)
  const [qtdCreditos, setQtdCreditos] = useState(materia.qtdCreditos)

  const toast = useToast()

  const updateMateria = async () => {
    setLoading(true)

    try {
      await api.put(`/materias/${materia.codigo}`, {
        codigo,
        professor,
        departamento,
        nome,
        qtdCreditos,
      })
      toast({
        title: 'Disciplina atualizada com sucesso!',
        isClosable: true,
        position: 'top',
        duration: 5000,
        status: 'success',
      })
      setIsOpen(false)
      load()
    } catch (err) {
      toast({
        title: 'Erro na atualização da matéria',
        description:
          err?.response?.data?.message || 'Favor tentar novamente mais tarde',
        isClosable: true,
        position: 'top',
        duration: 5000,
        status: 'error',
      })
      console.log({ err })
    }

    setLoading(false)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setCodigo(materia.codigo)
    setProfessor(materia.professor)
    setDepartamento(materia.departamento)
    setNome(materia.nome)
    setQtdCreditos(materia.qtdCreditos)
  }, [materia])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atualizar matéria</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(+e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Quantidade de créditos"
              value={qtdCreditos}
              onChange={(e) => setQtdCreditos(+e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={updateMateria}
            isLoading={loading}
          >
            Atualizar
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateMateria
