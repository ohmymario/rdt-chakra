import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  // default style of the button
  baseStyle: {
    borderRadius: '60px',
    fontSize: '10pt',
    fontWeight: '700',
    _focus: {
      boxShadow: 'none',
    },
  },

  // if we want to change the size of the button
  // the font size will change
  sizes: {
    sm: {
      fontSize: '8pt',
    },
    md: {
      fontSize: '10pt',
    },
  },

  // variants alter the base style of the button
  variants: {
    solid: {
      color: 'white',
      bg: 'blue.500',
      _hover: {
        bg: 'blue.400',
      },
    },
    outline: {
      color: 'blue.500',
      border: '1px solid',
      borderColor: 'blue.500',
    },
    oauth: {
      height: '34px',
      border: '1px solid',
      borderColor: 'gray.300',
      _hover: {
        bg: 'gray.50',
      },
    },
    postOutline: {
      color: 'gray.500',
      height: '32px',
      border: '1px solid',
      padding: '0px 22px',
      borderColor: 'gray.500',
      _hover: {
        backgroundColor: 'gray.100',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
    },
    postSolid: {
      color: 'gray.600',
      height: '32px',
      border: '1px solid',
      padding: '0px 22px',
      backgroundColor: 'gray.400',
      borderColor: 'gray.400',
      _hover: {
        backgroundColor: 'gray.300',
        borderColor: 'gray.300',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
    },
    auth: {
      color: 'white',
      bg: '#D93A00',
      _hover: {
        bg: '#DC4A14',
      },
      _active: {
        bg: '#D93A00',
      },
    },
  },
};
