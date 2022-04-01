import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Text,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl" >
      <ModalOverlay  />
      <ModalContent bgColor="pGray.800" w="fit-content" m={2} >
        <ModalCloseButton />
        <ModalBody p={0} >
          <Image src={imgUrl} width="100%" maxW='900px' maxH='600px' borderTopRadius={5} borderTopRightRadius={5} />
          <ModalFooter justifyContent="center" p="0" m={2}>
            <Link href={imgUrl} target={'_blank'}>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
