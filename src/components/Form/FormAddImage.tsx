import {
  Box,
  Button,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface ImageToUpload {
  imageUrl: string;
  title: string;
  description: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const imageTypesAllowedRegex =
    /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g;

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: {
        value: true,
        message: 'Arquivo obrigatório',
      },
      validate: {
        lessThan10MB: fileList =>
          fileList[0].size < 10000000 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: fileList =>
          imageTypesAllowedRegex.test(fileList[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: {
        value: true,
        message: 'Título obrigatório',
      },
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres',
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres',
      },
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: {
        value: true,
        message: 'Descrição obrigatória',
      },
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    async (image: ImageToUpload) => {
      await api.post('/api/images', {
        ...image,
        url: imageUrl,
      });
    },
    {
      // TODO ONSUCCESS MUTATION
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    trigger,
  } = useForm();

  const onSubmit = async (data: ImageToUpload): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      // TODO EXECUTE ASYNC MUTATION
      await mutation.mutateAsync(data);

      // TODO SHOW SUCCESS TOAST
      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      setImageUrl('');
      setLocalImageUrl('');
      reset({});
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={[1, 1, 2]} margin={2} spacing={[2,2,6]} templateColumns={['1fr','1fr','1fr 2fr']} >
        <Box mx="auto">
          <Box w="fit-content">
            <FileInput
              setImageUrl={setImageUrl}
              localImageUrl={localImageUrl}
              setLocalImageUrl={setLocalImageUrl}
              setError={setError}
              trigger={trigger}
              // TODO SEND IMAGE ERRORS
              // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
              name="image"
              {...register('image', { ...formValidations.image })}
              error={errors.image}
            />
          </Box>
        </Box>
        <VStack w="full" spacing={4}>
          <Box w="full">
            <TextInput
              placeholder="Título da imagem..."
              // TODO SEND TITLE ERRORS
              // TODO REGISTER TITLE INPUT WITH VALIDATIONS
              name="title"
              {...register('title', { ...formValidations.title })}
              isInvalid={errors.title}
              error={errors.title}
            />
          </Box>
          <Box w="full">
            <TextInput
              placeholder="Descrição da imagem..."
              // TODO SEND DESCRIPTION ERRORS
              // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
              name="description"
              {...register('description', { ...formValidations.description })}
              isInvalid={errors.description}
              error={errors.description}
            />
          </Box>

          <Button
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            type="submit"
            w="100%"
            py={6}
          >
            Enviar
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}
