import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleOpenModalImageView = (url: string) => {
    setSelectedImageUrl(url);
    onOpen();
  };

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={[1,1,2,3]} spacing={'40px'}>
        {cards.map(card => (
          <Card
            key={card.id}
            viewImage={url => handleOpenModalImageView(url)}
            data={card}
          />
        ))}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImageUrl}
      />
    </>
  );
}
