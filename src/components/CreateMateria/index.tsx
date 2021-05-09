import { Dispatch, SetStateAction, MutableRefObject } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Input,
  FormLabel,
  FormControl,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from '@chakra-ui/react'

interface IProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  titleRef: MutableRefObject<HTMLInputElement>
  descriptionRef: MutableRefObject<HTMLInputElement>
  createMateria: () => Promise<void>
}

const CreateMateria = ({
  isOpen,
  setIsOpen,
  titleRef,
  descriptionRef,
  createMateria,
}: IProps) => {
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
            <Input placeholder="Nome da matéria" ref={titleRef} />
          </FormControl>

          <FormControl mt={4}>
            <Input placeholder="Descrição da matéria" ref={descriptionRef} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={createMateria}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateMateria
