import { Dispatch, SetStateAction, useRef, useState } from 'react'
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
  const codigoRef = useRef<HTMLInputElement>(null)
  const professorRef = useRef<HTMLInputElement>(null)
  const departamentoRef = useRef<HTMLInputElement>(null)
  const nomeRef = useRef<HTMLInputElement>(null)
  const qtdCreditosRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const updateMateria = async () => {
    const codigo = codigoRef.current.value
    const professor = professorRef.current.value
    const departamento = departamentoRef.current.value
    const nome = nomeRef.current.value
    const qtdCreditos = qtdCreditosRef.current.value

    const updateObject = {}
    if (codigo !== '') {
      Object.assign(updateObject, { codigo })
    }
    if (professor !== '') {
      Object.assign(updateObject, { professor })
    }
    if (departamento !== '') {
      Object.assign(updateObject, { departamento })
    }
    if (nome !== '') {
      Object.assign(updateObject, { nome })
    }
    if (qtdCreditos !== '') {
      Object.assign(updateObject, { qtdCreditos })
    }

    setLoading(true)

    try {
      await api.put(`/materias/${materia.codigo}`, updateObject)
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atualizar matéria</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input placeholder="Código" ref={codigoRef} />
          </FormControl>

          <FormControl mt={4}>
            <Input placeholder="Nome" ref={nomeRef} />
          </FormControl>

          <FormControl mt={4}>
            <Input placeholder="Professor" ref={professorRef} />
          </FormControl>

          <FormControl mt={4}>
            <Input placeholder="Departamento" ref={departamentoRef} />
          </FormControl>

          <FormControl mt={4}>
            <Input placeholder="Quantidade de créditos" ref={qtdCreditosRef} />
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
