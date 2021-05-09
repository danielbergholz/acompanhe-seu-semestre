import Link from 'next/link'
import Head from 'next/head'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Text, Flex, Icon, Center, Button } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'

export default function Materias() {
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
          <Button
            mb="30px"
            bg="green.400"
            color="#fff"
            _hover={{ bg: 'green.500' }}
          >
            Adicionar matéria
          </Button>
          <Flex
            backgroundColor="gray.200"
            borderRadius="4px"
            padding="10px 15px"
            cursor="pointer"
            alignItems="center"
            justifyContent="space-between"
            width="400px"
            marginBottom="15px"
          >
            <Text fontSize="18px">SisMic</Text>
            <Icon as={FaTrashAlt} color="red.400" />
          </Flex>
          <Flex
            backgroundColor="gray.200"
            borderRadius="4px"
            padding="10px 15px"
            cursor="pointer"
            alignItems="center"
            justifyContent="space-between"
            width="400px"
          >
            <Text fontSize="18px">Projeto Transversal 2</Text>
            <Icon as={FaTrashAlt} color="red.400" />
          </Flex>
        </Center>
      </Box>
    </>
  )
}
