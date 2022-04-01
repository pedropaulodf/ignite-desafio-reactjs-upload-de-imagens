import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Text,
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
      <ModalOverlay/>
      <ModalContent bgColor="pGray.900">
        <ModalBody p={2} >
          <Image src={imgUrl} width="100%" maxW='900px' maxh='600px' borderRadius={3}/>
          <ModalFooter justifyContent="center" p="0" mt={2}>
            <Link href={imgUrl} target={'_blank'}>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
