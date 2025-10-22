import { Avatar, AvatarProps } from '@chakra-ui/react';

interface PetAvatarProps extends Omit<AvatarProps, 'src'> {
  petName?: string;
  petImage?: string;
}

export const PetAvatar = ({ petName, petImage, ...props }: PetAvatarProps) => {
  return (
    <Avatar
      name={petName}
      src={petImage}
      bg="teal.500"
      color="white"
      {...props}
    />
  );
};

export default PetAvatar;
