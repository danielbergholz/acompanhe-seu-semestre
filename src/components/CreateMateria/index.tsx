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

interface IProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  load: () => Promise<void>
}

const CreateMateria = ({ isOpen, setIsOpen, load }: IProps) => {
  const [loading, setLoading] = useState(false)
  const codigoRef = useRef<HTMLInputElement>(null)
  const professorRef = useRef<HTMLInputElement>(null)
  const departamentoRef = useRef<HTMLInputElement>(null)
  const nomeRef = useRef<HTMLInputElement>(null)
  const qtdCreditosRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

  const createMateria = async () => {
    const codigo = codigoRef.current.value
    const professor = professorRef.current.value
    const departamento = departamentoRef.current.value
    const nome = nomeRef.current.value
    const qtdCreditos = qtdCreditosRef.current.value

    if (
      codigo === '' ||
      professor === '' ||
      departamento === '' ||
      nome === '' ||
      qtdCreditos === ''
    )
      return

    setLoading(true)

    try {
      await api.post('/materias', {
        codigo,
        professor,
        departamento,
        nome,
        qtdCreditos,
      })
      setIsOpen(false)
      load()
    } catch (err) {
      toast({
        title: 'Erro na criação de matéria',
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
        <ModalHeader>Criar matéria</ModalHeader>
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
            onClick={createMateria}
            isLoading={loading}
          >
            Salvar
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateMateria
